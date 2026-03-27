import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0;"><strong style="color: #ec4899;">Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong style="color: #ec4899;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; color: #666; font-weight: bold;">Message:</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 10px;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
