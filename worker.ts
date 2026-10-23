import {
  loadDonations,
  loadDistributions,
  calculateStats,
  recordVerifiedPayment,
  verifyRazorpaySignature,
  verifyWebhookSignature
} from "./functions/api/_store.ts";

export interface Env {
  ASSETS?: { fetch: (req: Request) => Promise<Response> };
  DB?: any;
  TRANSPARENCY_KV?: any;
  KV?: any;
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  RAZORPAY_WEBHOOK_SECRET?: string;
}

const jsonResponse = (data: any, status = 200, extraHeaders: Record<string, string> = {}) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Razorpay-Signature",
      ...extraHeaders
    }
  });
};

// In-memory sliding-window IP rate limiter to protect dynamic API endpoints under 500+ concurrent traffic
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120; // 120 requests/min per IP
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);
  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  record.count++;
  return true;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-Razorpay-Signature"
        }
      });
    }

    // Rate-limit dynamic API requests to prevent resource exhaustion during traffic spikes
    if (url.pathname.startsWith("/api/")) {
      const clientIp = request.headers.get("cf-connecting-ip") || "anonymous";
      if (!checkRateLimit(clientIp)) {
        return jsonResponse(
          { success: false, message: "Too many requests. Please try again in a minute." },
          429,
          { "Retry-After": "60" }
        );
      }
    }

    // 1. GET /api/donations/transparency or /api/transparency
    if (
      request.method === "GET" &&
      (url.pathname === "/api/donations/transparency" || url.pathname === "/api/transparency")
    ) {
      try {
        const donations = await loadDonations(env);
        const distributions = await loadDistributions(env);
        const stats = calculateStats(donations, distributions);
        return jsonResponse({ success: true, data: stats }, 200, {
          "Cache-Control": "public, max-age=10, stale-while-revalidate=30"
        });
      } catch (err) {
        return jsonResponse({ success: false, error: String(err) }, 500);
      }
    }

    // 2. POST /api/donations/create-order
    if (request.method === "POST" && url.pathname === "/api/donations/create-order") {
      try {
        const body = (await request.json().catch(() => ({}))) as any;
        const amount = Number(body.amount);
        if (isNaN(amount) || amount < 1) {
          return jsonResponse({ success: false, message: "Minimum contribution amount is ₹1" }, 400);
        }

        const keyId = env.RAZORPAY_KEY_ID || "";
        const keySecret = env.RAZORPAY_KEY_SECRET || "";

        if (keyId && keySecret) {
          const authHeader = "Basic " + btoa(`${keyId}:${keySecret}`);
          const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              amount: Math.round(amount * 100),
              currency: "INR",
              receipt: `zyn_don_${Date.now()}`
            })
          });

          if (rzpRes.ok) {
            const rzpOrder = (await rzpRes.json()) as any;
            return jsonResponse({
              success: true,
              orderId: rzpOrder.id,
              amount,
              currency: "INR",
              keyId
            });
          }
        }

        const fallbackOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        return jsonResponse({
          success: true,
          orderId: fallbackOrderId,
          amount,
          currency: "INR",
          keyId: keyId || "rzp_test_zynova"
        });
      } catch (err) {
        return jsonResponse({ success: false, error: String(err) }, 500);
      }
    }

    // 3. POST /api/donations/verify
    if (request.method === "POST" && url.pathname === "/api/donations/verify") {
      try {
        const body = (await request.json().catch(() => ({}))) as any;
        const { paymentId, orderId, signature, amount, donorName, donorEmail } = body;

        const numAmount = Number(amount);
        if (!paymentId || isNaN(numAmount) || numAmount < 1) {
          return jsonResponse({ success: false, message: "Valid payment ID and minimum ₹1 amount required." }, 400);
        }

        const secret = env.RAZORPAY_KEY_SECRET || "";
        if (secret && signature && orderId) {
          const isValid = await verifyRazorpaySignature(orderId, paymentId, signature, secret);
          if (!isValid) {
            return jsonResponse({ success: false, message: "Cryptographic signature verification failed." }, 403);
          }
        }

        const { added, record } = await recordVerifiedPayment(
          {
            amount: numAmount,
            currency: "INR",
            paymentMethod: "UPI / Online",
            paymentId: paymentId.trim(),
            orderId: orderId?.trim() || undefined,
            donorName: donorName?.trim() || "Anonymous",
            donorEmail: donorEmail?.trim() || undefined,
            paymentStatus: "verified"
          },
          env
        );

        const donations = await loadDonations(env);
        const distributions = await loadDistributions(env);
        const stats = calculateStats(donations, distributions);

        return jsonResponse({
          success: true,
          verified: true,
          isNewContribution: added,
          amount: numAmount,
          record,
          stats
        });
      } catch (err) {
        return jsonResponse({ success: false, error: String(err) }, 500);
      }
    }

    // 4. POST /api/donations/webhook
    if (request.method === "POST" && url.pathname === "/api/donations/webhook") {
      try {
        const rawBody = await request.text();
        const signature = request.headers.get("x-razorpay-signature") || "";
        const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET || "";

        if (webhookSecret) {
          const isValid = await verifyWebhookSignature(rawBody, signature, webhookSecret);
          if (!isValid) {
            return new Response("Invalid signature", { status: 400 });
          }
        }

        const payload = JSON.parse(rawBody);
        const event = payload.event;

        if (event === "payment.captured" || event === "order.paid") {
          const entity = payload.payload?.payment?.entity || payload.payload?.order?.entity;
          if (!entity) return new Response("Missing payment entity", { status: 400 });

          const amountPaise = Number(entity.amount);
          const amountInr = amountPaise >= 100 ? amountPaise / 100 : amountPaise;

          const { added } = await recordVerifiedPayment(
            {
              amount: amountInr,
              currency: "INR",
              paymentMethod: entity.method ? `Razorpay (${entity.method})` : "UPI / Online",
              paymentId: entity.id,
              orderId: entity.order_id,
              donorName: entity.notes?.donorName || "Anonymous",
              donorEmail: entity.email,
              paymentStatus: "verified"
            },
            env
          );

          const donations = await loadDonations(env);
          const distributions = await loadDistributions(env);
          const stats = calculateStats(donations, distributions);

          return jsonResponse({ status: "ok", added, stats });
        }

        return jsonResponse({ status: "ignored_event" });
      } catch (_err) {
        return new Response("Internal webhook error", { status: 500 });
      }
    }

    // 5. POST /api/donations (reconciliation submission)
    if (request.method === "POST" && url.pathname === "/api/donations") {
      try {
        const body = (await request.json().catch(() => ({}))) as any;
        const { donorName, donorEmail, amount, currency, transactionReference, paymentMethod, anonymous } = body;
        const numAmount = Number(amount);

        if (isNaN(numAmount) || numAmount < 1 || !transactionReference) {
          return jsonResponse({ success: false, message: "Valid amount (min ₹1) and reference ID required." }, 400);
        }

        const { added, record } = await recordVerifiedPayment(
          {
            amount: numAmount,
            currency: currency || "INR",
            paymentMethod: paymentMethod || "UPI",
            paymentId: `upi_ref_${transactionReference.trim()}`,
            transactionReference: transactionReference.trim(),
            donorName: anonymous ? "Anonymous" : (donorName || "Anonymous"),
            donorEmail: donorEmail || undefined,
            paymentStatus: "verified"
          },
          env
        );

        const donations = await loadDonations(env);
        const distributions = await loadDistributions(env);
        const stats = calculateStats(donations, distributions);

        return jsonResponse(
          {
            success: true,
            isNew: added,
            donation: record,
            stats
          },
          201
        );
      } catch (err) {
        return jsonResponse({ success: false, error: String(err) }, 500);
      }
    }

    // Default: Fallback to static assets (SPA) with edge caching & performance headers
    if (env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      
      // Enrich static assets with optimal Cache-Control headers if successful
      if (assetResponse.status >= 200 && assetResponse.status < 300) {
        const headers = new Headers(assetResponse.headers);
        const path = url.pathname;

        // 1. Immutable hashed chunks in /assets/ (JS, CSS) -> Cache for 1 year
        if (path.startsWith("/assets/")) {
          headers.set("Cache-Control", "public, max-age=31536000, immutable");
        }
        // 2. Static media (videos, frames, icons, images, fonts) -> Cache 7 days with background revalidation
        else if (/\.(jpg|jpeg|png|webp|svg|gif|mp4|webm|woff2|woff|ttf|ico)$/i.test(path)) {
          headers.set("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
        }
        // 3. SPA Root HTML -> Revalidate on each visit so updates are instant
        else if (path === "/" || path === "/index.html" || !path.includes(".")) {
          headers.set("Cache-Control", "public, max-age=0, must-revalidate");
        }

        // Security & protection headers
        headers.set("X-Content-Type-Options", "nosniff");
        headers.set("X-Frame-Options", "SAMEORIGIN");
        headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

        return new Response(assetResponse.body, {
          status: assetResponse.status,
          statusText: assetResponse.statusText,
          headers
        });
      }

      return assetResponse;
    }

    return new Response("Not found", { status: 404 });
  }
};
