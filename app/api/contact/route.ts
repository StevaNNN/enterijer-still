import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  locale?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n"]/g, "").trim();
}

export async function POST(req: Request) {
  let body: ContactPayload;

  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() || "Website contact form";
  const message = body.message?.trim() ?? "";
  const locale = body.locale?.trim() || "en";

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Name, email and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email format." },
      { status: 400 },
    );
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const secure =
    process.env.SMTP_SECURE === undefined
      ? true
      : process.env.SMTP_SECURE === "true";

  if (!user || !pass) {
    return NextResponse.json(
      {
        success: false,
        error: "Email service is not configured. Missing SMTP_USER/SMTP_PASS.",
      },
      { status: 500 },
    );
  }

  if (!to) {
    return NextResponse.json(
      {
        success: false,
        error: "Email service is not configured. Missing CONTACT_TO_EMAIL.",
      },
      { status: 500 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.verify();

    const safeName = sanitizeHeaderValue(name);
    const safeEmail = sanitizeHeaderValue(email);

    await transporter.sendMail({
      from: `"${safeName} (via EnterijerStil)"`,
      to,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `${subject} — ${safeName}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Locale: ${locale}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5;">
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Locale:</strong> ${locale}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown SMTP error.";
    console.error("[contact-email] send failed", {
      host,
      port,
      secure,
      user,
      to,
      message,
    });

    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "development"
            ? `Failed to send email: ${message}`
            : "Failed to send email.",
      },
      { status: 500 },
    );
  }
}
