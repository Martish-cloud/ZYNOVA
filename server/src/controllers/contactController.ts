import { Request, Response, NextFunction } from "express";
import { contactInquirySchema } from "../schemas/validation.js";
import { prisma } from "../services/db.js";
import { emailService } from "../services/emailService.js";

export const handleContactSubmit = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = contactInquirySchema.parse(req.body);

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        serviceRequired: validatedData.serviceRequired,
        budgetRange: validatedData.budgetRange,
        message: validatedData.message
      }
    });

    const emailSubject = `🚀 New Project Enquiry: ${inquiry.name} (${inquiry.serviceRequired}) - ZYNOVA`;
    const emailBody = `
New Client Enquiry Received on ZYNOVA Platform:

• Client Name: ${inquiry.name}
• Client Email: ${inquiry.email}
• Client Phone: ${inquiry.phone || "Not provided"}
• Company / Organization: ${inquiry.company || "Not provided"}
• Service Requested: ${inquiry.serviceRequired}
• Budget Range: ${inquiry.budgetRange || "Not specified"}
• Submitted At: ${inquiry.createdAt.toLocaleString()}

Project Message / Enquiry:
--------------------------------------------------
${inquiry.message}
--------------------------------------------------
Inquiry ID: ${inquiry.id}
`;

    await emailService.sendNotification({
      subject: emailSubject,
      text: emailBody,
      html: `<pre style="font-family: monospace; font-size: 14px; line-height: 1.5;">${emailBody}</pre>`
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your project inquiry has been received by ZYNOVA. Our leadership will review and respond within 12 hours.",
      inquiryId: inquiry.id
    });
  } catch (error) {
    next(error);
  }
};
