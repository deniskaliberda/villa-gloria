import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  react: React.ReactElement;
  bookingId?: string;
  emailType: string;
}

/**
 * Send an email via Resend and log it in the database.
 */
export async function sendEmail({
  to,
  subject,
  react,
  bookingId,
  emailType,
}: SendEmailOptions) {
  const supabase = createAdminClient();

  // Check for duplicate emails (same booking, same type, within last hour)
  if (bookingId) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from("email_log")
      .select("id")
      .eq("booking_id", bookingId)
      .eq("email_type", emailType)
      .gte("sent_at", oneHourAgo)
      .limit(1);

    if (existing && existing.length > 0) {
      console.log(`Skipping duplicate email: ${emailType} for ${bookingId}`);
      return { success: true, skipped: true };
    }
  }

  try {
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Villa Gloria <noreply@villa-gloria.com>";
    const { error } = await getResend().emails.send({
      from: fromEmail,
      to,
      subject,
      react,
    });

    if (error) {
      // Log failed email
      await supabase.from("email_log").insert({
        booking_id: bookingId || null,
        email_type: emailType,
        recipient: to,
        subject,
        status: "failed",
        error: error.message,
      });
      console.error(`Email send failed: ${error.message}`);
      return { success: false, error: error.message };
    }

    // Log successful email
    await supabase.from("email_log").insert({
      booking_id: bookingId || null,
      email_type: emailType,
      recipient: to,
      subject,
      status: "sent",
    });

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    await supabase.from("email_log").insert({
      booking_id: bookingId || null,
      email_type: emailType,
      recipient: to,
      subject,
      status: "failed",
      error: message,
    });
    return { success: false, error: message };
  }
}

/**
 * Send notification to admin about a new booking.
 */
export async function notifyAdmin(
  subject: string,
  react: React.ReactElement,
  bookingId?: string,
  emailType: string = "admin_notification"
) {
  const adminEmail = process.env.ADMIN_EMAIL || "info@villa-gloria.com";
  return sendEmail({
    to: adminEmail,
    subject,
    react,
    bookingId,
    emailType,
  });
}

/**
 * Send approval request to owner (Wieland Oswald).
 */
export async function notifyOwner(
  subject: string,
  react: React.ReactElement,
  bookingId?: string,
  emailType: string = "approval_request"
) {
  const ownerEmail = process.env.OWNER_EMAIL || process.env.ADMIN_EMAIL || "info@villa-gloria.com";
  return sendEmail({
    to: ownerEmail,
    subject,
    react,
    bookingId,
    emailType,
  });
}

/**
 * Send booking notification to on-site caretaker (Betreuerin).
 */
export async function notifyCaretaker(
  subject: string,
  react: React.ReactElement,
  bookingId?: string,
  emailType: string = "caretaker_notification"
) {
  const caretakerEmail = process.env.CARETAKER_EMAIL;
  if (!caretakerEmail) {
    console.log("CARETAKER_EMAIL not set, skipping caretaker notification");
    return { success: true, skipped: true };
  }
  return sendEmail({
    to: caretakerEmail,
    subject,
    react,
    bookingId,
    emailType,
  });
}
