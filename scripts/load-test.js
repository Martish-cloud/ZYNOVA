import autocannon from "autocannon";
import { spawn } from "child_process";
import http from "http";

const PORT = 4173;
const HOST = `http://localhost:${PORT}`;

// Helper to wait until preview server is active
function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode && res.statusCode >= 200) {
            resolve(true);
          } else {
            setTimeout(check, 300);
          }
        })
        .on("error", () => {
          if (Date.now() - start > timeoutMs) {
            reject(new Error("Timeout waiting for preview server"));
          } else {
            setTimeout(check, 300);
          }
        });
    };
    check();
  });
}

async function runScenario(name, connections, durationSeconds) {
  console.log(`\n======================================================`);
  console.log(`🚀 Starting Scenario: ${name}`);
  console.log(`   Connections (Concurrent Virtual Users): ${connections}`);
  console.log(`   Duration: ${durationSeconds}s`);
  console.log(`======================================================`);

  const result = await autocannon({
    url: HOST,
    connections,
    duration: durationSeconds,
    pipelining: 1,
    requests: [
      { method: "GET", path: "/" },
      { method: "GET", path: "/assets/index-DFAOu9_n.js" },
      { method: "GET", path: "/assets/index-CpnHAkHS.css" },
      { method: "GET", path: "/assets/vendor-react-Bx5cGGDU.js" },
      { method: "GET", path: "/favicon.svg" }
    ]
  });

  const totalRequests = result.requests.total;
  const reqPerSec = result.requests.average;
  const p50 = result.latency.p50;
  const p90 = result.latency.p90;
  const p95 = result.latency.p97_5 || result.latency.p90; // autocannon stores 97.5th percentile
  const p99 = result.latency.p99;
  const errors = result.errors + result.timeouts + result.non2xx;
  const errorRate = totalRequests > 0 ? ((errors / totalRequests) * 100).toFixed(2) : "0.00";
  const throughputMB = (result.throughput.average / (1024 * 1024)).toFixed(2);

  console.log(`\n📊 RESULTS for ${name}:`);
  console.log(`   Total Requests: ${totalRequests.toLocaleString()}`);
  console.log(`   Requests / sec: ${reqPerSec.toFixed(1)} req/s`);
  console.log(`   Throughput:     ${throughputMB} MB/s`);
  console.log(`   Latency (p50):  ${p50} ms`);
  console.log(`   Latency (p90):  ${p90} ms`);
  console.log(`   Latency (p95):  ${p95} ms`);
  console.log(`   Latency (p99):  ${p99} ms`);
  console.log(`   Errors / Non2xx: ${errors}`);
  console.log(`   Error Rate:     ${errorRate}%`);

  const passed = p95 < 1000 && parseFloat(errorRate) < 1.0;
  console.log(`   Status:         ${passed ? "✅ PASSED" : "⚠️ NEEDS TUNING"}`);

  return {
    name,
    connections,
    totalRequests,
    reqPerSec: reqPerSec.toFixed(1),
    p50,
    p90,
    p95,
    p99,
    throughputMB,
    errors,
    errorRate: `${errorRate}%`,
    passed
  };
}

async function main() {
  console.log("Starting Vite Preview production server for staging load test...");
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT)], {
    shell: true,
    stdio: "pipe"
  });

  server.stdout.on("data", () => {});

  try {
    await waitForServer(HOST);
    console.log(`Production staging server ready at ${HOST}`);

    const results = [];

    // 1. Baseline: 50 concurrent virtual users
    results.push(await runScenario("Baseline (50 Concurrent Users)", 50, 10));

    // 2. Intermediate Load: 200 concurrent virtual users
    results.push(await runScenario("Intermediate Load (200 Concurrent Users)", 200, 10));

    // 3. Fallback Target: 350-400 concurrent virtual users
    results.push(await runScenario("Fallback Target (350 Concurrent Users)", 350, 10));

    // 4. Primary Target: 500 concurrent virtual users
    results.push(await runScenario("Primary Target (500 Concurrent Users)", 500, 10));

    console.log(`\n\n======================================================`);
    console.log(`🎯 COMPREHENSIVE LOAD TEST SUMMARY TABLE`);
    console.log(`======================================================`);
    console.table(
      results.map((r) => ({
        Scenario: r.name,
        "Concurrent Users": r.connections,
        "Req/sec": r.reqPerSec,
        "p50 (ms)": `${r.p50} ms`,
        "p90 (ms)": `${r.p90} ms`,
        "p95 (ms)": `${r.p95} ms`,
        "p99 (ms)": `${r.p99} ms`,
        Throughput: `${r.throughputMB} MB/s`,
        "Error Rate": r.errorRate,
        Result: r.passed ? "PASSED" : "NEEDS TUNING"
      }))
    );
  } catch (err) {
    console.error("Load test error:", err);
  } finally {
    console.log("Shutting down preview server...");
    server.kill();
    process.exit(0);
  }
}

main();
