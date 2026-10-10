import { Request, Response, NextFunction } from "express";
import { discoveryBookingSchema } from "../schemas/validation.js";
import { prisma } from "../services/db.js";
import { emailService } from "../services/emailService.js";

export const handleBookingSubmit = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = discoveryBookingSchema.parse(req.body);

    const booking = await prisma.discoveryBooking.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        service: validatedData.service,
        preferredDate: validatedData.preferredDate,
        preferredTime: validatedData.preferredTime,
        message: validatedData.message
      }
    });

    const emailSubject = `📅 New Discovery Call Booking: ${booking.name} (${booking.preferredDate || "Immediate"} @ ${booking.preferredTime || "Flexible"}) - ZYNOVA`;
    const emailBody = `
New Discovery Call Request on ZYNOVA Platform:

• Client Name: ${booking.name}
• Work Email: ${booking.email}
• Company / Brand: ${booking.company || "Not provided"}
• Service Domain: ${booking.service}
• Requested Date: ${booking.preferredDate || "Earliest Available"}
• Preferred Time: ${booking.preferredTime || "Flexible"}
• Booking Timestamp: ${booking.createdAt.toLocaleString()}

Project Scope / Brief:
--------------------------------------------------
${booking.message}
--------------------------------------------------
Booking ID: ${booking.id}
`;

    await emailService.sendNotification({
      subject: emailSubject,
      text: emailBody,
      html: `<pre style="font-family: monospace; font-size: 14px; line-height: 1.5;">${emailBody}</pre>`
    });

    res.status(201).json({
      success: true,
      message: "Discovery call request received. We will send a calendar invite and direct confirmation to your email shortly.",
      bookingId: booking.id
    });
  } catch (error) {
    next(error);
  }
};
