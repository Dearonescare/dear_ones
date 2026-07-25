import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  enquirySchema,
  type EnquiryFieldErrors,
  type EnquiryResult,
} from "@/lib/validation";
import { siteConfig } from "@/config/site";

// Resend requires the Node.js runtime (not Edge).
export const runtime = "nodejs";

function firstErrors(
  fieldErrors: Record<string, string[] | undefined>
): EnquiryFieldErrors {
  const out: EnquiryFieldErrors = {};
  for (const [key, messages] of Object.entries(fieldErrors)) {
    if (messages && messages.length > 0) {
      out[key as keyof EnquiryFieldErrors] = messages[0];
    }
  }
  return out;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request): Promise<NextResponse<EnquiryResult>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request." },
      { status: 400 }
    );
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        status: "error",
        message: "Please review the highlighted fields.",
        fieldErrors: firstErrors(parsed.error.flatten().fieldErrors),
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot: quietly accept and drop suspected bot submissions.
  if (data.company && data.company.length > 0) {
    return NextResponse.json({ status: "success" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.formRecipient;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Email delivery not configured — acknowledge honestly without claiming
  // the message was sent, so the UI can offer direct contact fallbacks.
  if (!apiKey || !to || !from) {
    return NextResponse.json({
      status: "unconfigured",
      message:
        "Thanks — your details are ready to send. Email delivery is not configured yet, so please reach us directly using the options below.",
    });
  }

  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone/WhatsApp: ${data.phone}`,
    `Lives in: ${data.country}`,
    `Parent's city: ${data.parentCity}`,
    `Support type: ${data.supportType}`,
    `Preferred contact: ${data.contactMethod} (${data.contactTime})`,
    "",
    "Message:",
    data.message || "(none provided)",
  ];

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New enquiry — ${data.name} (${data.supportType})`,
      text: lines.join("\n"),
      html: `<h2>New Dear Ones enquiry</h2><pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(
        lines.join("\n")
      )}</pre>`,
    });

    if (result.error) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "We couldn’t send your message just now. Please try again or contact us directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ status: "success" });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message:
          "We couldn’t send your message just now. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
