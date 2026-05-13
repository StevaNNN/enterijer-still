import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  locale?: string;
  website?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n"]/g, "").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
  const website = body.website?.trim() ?? "";

  if (website) {
    return NextResponse.json({ success: true });
  }

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

  if (message.length > 5000 || subject.length > 200 || name.length > 120) {
    return NextResponse.json(
      { success: false, error: "Input too long." },
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

    if (process.env.NODE_ENV === "development") {
      await transporter.verify();
    }

    const safeName = sanitizeHeaderValue(name);
    const safeEmail = sanitizeHeaderValue(email);
    const safeSubject = sanitizeHeaderValue(subject);
    const safeMessage = escapeHtml(message);
    const safeTextName = name.replaceAll("\n", " ").replaceAll("\r", " ");
    const safeTextEmail = email.replaceAll("\n", " ").replaceAll("\r", " ");

    await transporter.sendMail({
      from: `"${safeName} (via EnterijerStil)"`,
      to,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `${safeSubject} — ${safeName}`,
      text: [
        `Name: ${safeTextName}`,
        `Email: ${safeTextEmail}`,
        `Locale: ${locale}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5;">
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Locale:</strong> ${escapeHtml(locale)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
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
