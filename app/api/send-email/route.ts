import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "hello@justgoodcampers.com";
const FROM = "JustGoodCampers <bookings@justgoodcampers.com>";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NZ", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function formatNZD(cents: number) {
  return `NZ$${(cents / 100).toLocaleString("en-NZ", { minimumFractionDigits: 0 })}`;
}

function confirmationEmailHtml(data: BookingEmailData): string {
  const addonRows = data.addons.length > 0
    ? data.addons.map((a: { label: string; pricePerDay: number }) =>
        `<tr><td style="padding:6px 0;color:#7A8572;font-size:14px;">${a.label}</td><td style="padding:6px 0;text-align:right;font-size:14px;">${formatNZD(a.pricePerDay * data.numDays)}</td></tr>`
      ).join("")
    : `<tr><td colspan="2" style="padding:6px 0;color:#7A8572;font-size:14px;">No add-ons selected</td></tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F4EE;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F4EE;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#1A3C2E;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0;color:#F7F4EE;font-size:22px;font-weight:700;letter-spacing:-0.5px;">JustGoodCampers</p>
          <p style="margin:8px 0 0;color:rgba(247,244,238,0.6);font-size:13px;">New Zealand Campervan Hire</p>
        </td></tr>

        <!-- Green bar -->
        <tr><td style="background:#D4613C;padding:14px 40px;text-align:center;">
          <p style="margin:0;color:#fff;font-size:16px;font-weight:700;">🏕️ Your booking is confirmed!</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#fff;padding:40px;">
          <p style="margin:0 0 16px;font-size:16px;color:#2D2D2D;">Hi ${data.customerName},</p>
          <p style="margin:0 0 24px;font-size:15px;color:#7A8572;line-height:1.6;">
            Great news — your JustGoodCampers booking is confirmed. We're excited to have you on the road in New Zealand. Here's your booking summary:
          </p>

          <!-- Booking summary box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F4EE;border-radius:12px;padding:24px;margin-bottom:24px;">
            <tr>
              <td style="padding:6px 0;">
                <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#7A8572;">Booking reference</p>
                <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#1A3C2E;">#${data.bookingId.slice(0, 8).toUpperCase()}</p>
              </td>
            </tr>
            <tr><td style="border-top:1px solid #E0DCD5;padding:16px 0 0;margin-top:16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:14px;color:#7A8572;padding-bottom:10px;">Camper</td>
                  <td style="font-size:14px;font-weight:600;color:#2D2D2D;text-align:right;padding-bottom:10px;">${data.camperName}</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#7A8572;padding-bottom:10px;">Pick-up</td>
                  <td style="font-size:14px;font-weight:600;color:#2D2D2D;text-align:right;padding-bottom:10px;">${formatDate(data.pickupDate)}</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#7A8572;padding-bottom:10px;">Drop-off</td>
                  <td style="font-size:14px;font-weight:600;color:#2D2D2D;text-align:right;padding-bottom:10px;">${formatDate(data.dropoffDate)}</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#7A8572;padding-bottom:10px;">Duration</td>
                  <td style="font-size:14px;font-weight:600;color:#2D2D2D;text-align:right;padding-bottom:10px;">${data.numDays} days</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#7A8572;">Pickup location</td>
                  <td style="font-size:14px;font-weight:600;color:#2D2D2D;text-align:right;">Auckland, New Zealand</td>
                </tr>
              </table>
            </td></tr>
            ${data.addons.length > 0 ? `
            <tr><td style="border-top:1px solid #E0DCD5;padding-top:16px;margin-top:16px;">
              <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#7A8572;">Add-ons</p>
              <table width="100%" cellpadding="0" cellspacing="0">${addonRows}</table>
            </td></tr>` : ""}
            <tr><td style="border-top:2px solid #1A3C2E;padding-top:16px;margin-top:16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:16px;font-weight:700;color:#1A3C2E;">Total</td>
                  <td style="font-size:20px;font-weight:700;color:#1A3C2E;text-align:right;">${formatNZD(data.totalPrice)}</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#2D2D2D;">What happens next?</p>
          <ul style="margin:0 0 24px;padding-left:20px;color:#7A8572;font-size:14px;line-height:1.8;">
            <li>We'll reach out before your trip to confirm pickup time and details</li>
            <li>No deposit is required — you pay on the day of pickup</li>
            <li>Free cancellation up to 14 days before your pickup date</li>
            <li>We'll be available 24/7 during your trip if you need anything</li>
          </ul>

          <p style="margin:0 0 8px;font-size:14px;color:#7A8572;">Questions? We're always a message away:</p>
          <p style="margin:0 0 4px;font-size:14px;">📧 <a href="mailto:hello@justgoodcampers.com" style="color:#2D6A4F;">hello@justgoodcampers.com</a></p>
          <p style="margin:0 0 24px;font-size:14px;">💬 <a href="https://wa.me/64000000000" style="color:#2D6A4F;">WhatsApp us</a></p>

          <p style="margin:0;font-size:14px;color:#7A8572;line-height:1.6;">
            Looking forward to seeing you in Auckland!<br>
            <strong style="color:#2D2D2D;">The JustGoodCampers team</strong>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#F7F4EE;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #E0DCD5;">
          <p style="margin:0;font-size:12px;color:#7A8572;">JustGoodCampers · Auckland, New Zealand · <a href="https://justgoodcampers.com" style="color:#2D6A4F;">justgoodcampers.com</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function enquiryEmailHtml(data: BookingEmailData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F4EE;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F4EE;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#1A3C2E;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0;color:#F7F4EE;font-size:22px;font-weight:700;">JustGoodCampers</p>
          <p style="margin:8px 0 0;color:rgba(247,244,238,0.6);font-size:13px;">New Zealand Campervan Hire</p>
        </td></tr>
        <tr><td style="background:#fff;padding:40px;">
          <p style="margin:0 0 16px;font-size:16px;color:#2D2D2D;">Hi ${data.customerName},</p>
          <p style="margin:0 0 24px;font-size:15px;color:#7A8572;line-height:1.6;">
            Thanks for reaching out to JustGoodCampers! We've received your enquiry and will get back to you within a few hours with availability and next steps.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F4EE;border-radius:12px;padding:24px;margin-bottom:24px;">
            <tr><td>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:14px;color:#7A8572;padding-bottom:10px;">Camper</td>
                  <td style="font-size:14px;font-weight:600;color:#2D2D2D;text-align:right;padding-bottom:10px;">${data.camperName}</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#7A8572;padding-bottom:10px;">Pick-up</td>
                  <td style="font-size:14px;font-weight:600;color:#2D2D2D;text-align:right;padding-bottom:10px;">${formatDate(data.pickupDate)}</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#7A8572;">Drop-off</td>
                  <td style="font-size:14px;font-weight:600;color:#2D2D2D;text-align:right;">${formatDate(data.dropoffDate)}</td>
                </tr>
              </table>
            </td></tr>
          </table>
          <p style="margin:0 0 8px;font-size:14px;color:#7A8572;">Can't wait? Message us directly:</p>
          <p style="margin:0 0 4px;font-size:14px;">📧 <a href="mailto:hello@justgoodcampers.com" style="color:#2D6A4F;">hello@justgoodcampers.com</a></p>
          <p style="margin:0 0 24px;font-size:14px;">💬 <a href="https://wa.me/64000000000" style="color:#2D6A4F;">WhatsApp us</a></p>
          <p style="margin:0;font-size:14px;color:#7A8572;">Talk soon,<br><strong style="color:#2D2D2D;">The JustGoodCampers team</strong></p>
        </td></tr>
        <tr><td style="background:#F7F4EE;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #E0DCD5;">
          <p style="margin:0;font-size:12px;color:#7A8572;">JustGoodCampers · Auckland, New Zealand · <a href="https://justgoodcampers.com" style="color:#2D6A4F;">justgoodcampers.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function adminNotificationHtml(data: BookingEmailData): string {
  return `<h2 style="font-family:sans-serif;">New ${data.bookingType === "direct" ? "Booking" : "Enquiry"} — JustGoodCampers</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Name</td><td style="padding:6px 0;font-weight:600;">${data.customerName}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Email</td><td style="padding:6px 0;">${data.customerEmail}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Phone</td><td style="padding:6px 0;">${data.customerPhone}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Camper</td><td style="padding:6px 0;">${data.camperName}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Pick-up</td><td style="padding:6px 0;">${formatDate(data.pickupDate)}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Drop-off</td><td style="padding:6px 0;">${formatDate(data.dropoffDate)}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Days</td><td style="padding:6px 0;">${data.numDays}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Total</td><td style="padding:6px 0;font-weight:700;">${formatNZD(data.totalPrice)}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Type</td><td style="padding:6px 0;">${data.bookingType}</td></tr>
  ${data.flightNumber ? `<tr><td style="padding:6px 12px 6px 0;color:#666;">Flight</td><td style="padding:6px 0;">${data.flightNumber}</td></tr>` : ""}
  ${data.notes ? `<tr><td style="padding:6px 12px 6px 0;color:#666;">Notes</td><td style="padding:6px 0;">${data.notes}</td></tr>` : ""}
</table>`;
}

interface BookingEmailData {
  bookingId: string;
  bookingType: "direct" | "enquiry";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  camperName: string;
  pickupDate: string;
  dropoffDate: string;
  numDays: number;
  totalPrice: number;
  addons: { id: string; label: string; pricePerDay: number }[];
  flightNumber?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: BookingEmailData = await req.json();
    const isDirect = data.bookingType === "direct";

    const [customerResult, adminResult] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: data.customerEmail,
        subject: isDirect
          ? "Your JustGoodCampers booking is confirmed! 🏕️"
          : "We received your enquiry — JustGoodCampers",
        html: isDirect ? confirmationEmailHtml(data) : enquiryEmailHtml(data),
      }),
      resend.emails.send({
        from: FROM,
        to: ADMIN_EMAIL,
        subject: `New ${isDirect ? "booking" : "enquiry"}: ${data.customerName} · ${data.camperName} · ${formatDate(data.pickupDate)}`,
        html: adminNotificationHtml(data),
      }),
    ]);

    if (customerResult.error || adminResult.error) {
      console.error("Resend error:", customerResult.error ?? adminResult.error);
      return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-email route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
