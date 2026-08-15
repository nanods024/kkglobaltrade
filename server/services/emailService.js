const nodemailer = require('nodemailer');

const hasEmailCredentials = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD);

let transporter = null;
if (hasEmailCredentials) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: String(process.env.EMAIL_SECURE).toLowerCase() !== 'false',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

// Sends mail via Nodemailer when EMAIL_USER/EMAIL_PASSWORD are configured.
// Otherwise logs the message to the console so enquiry submission still
// works end-to-end in development without real SMTP credentials.
async function sendMail({ to, subject, html, text }) {
  if (!transporter) {
    console.log('--- EMAIL (dev mode - no SMTP credentials configured) ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(text || html);
    console.log('------------------------------------------------------------');
    return { delivered: false, reason: 'no-smtp-credentials' };
  }

  await transporter.sendMail({
    from: `"KK Global Trade" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    text,
  });
  return { delivered: true };
}

function enquiryNotificationHtml(enquiry) {
  return `
    <h2>New Enquiry${enquiry.product ? ` – ${enquiry.product}` : ''}</h2>
    <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${enquiry.name}</td></tr>
      <tr><td><strong>Company</strong></td><td>${enquiry.companyName || '-'}</td></tr>
      <tr><td><strong>Email</strong></td><td>${enquiry.email}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${enquiry.phone}</td></tr>
      <tr><td><strong>Country</strong></td><td>${enquiry.country}</td></tr>
      <tr><td><strong>Product</strong></td><td>${enquiry.product || '-'}</td></tr>
      <tr><td><strong>Quantity</strong></td><td>${enquiry.quantity || '-'} ${enquiry.unit || ''}</td></tr>
      <tr><td><strong>Grade / Spec</strong></td><td>${enquiry.grade || '-'}</td></tr>
      <tr><td><strong>Packaging</strong></td><td>${enquiry.packaging || '-'}</td></tr>
      <tr><td><strong>Destination Port</strong></td><td>${enquiry.destination || '-'}</td></tr>
      <tr><td><strong>Message</strong></td><td>${enquiry.message || '-'}</td></tr>
    </table>
  `;
}

async function sendEnquiryNotification(enquiry) {
  const to = process.env.COMPANY_NOTIFY_EMAIL || 'kkglobaltrade1@gmail.com';
  const subject = `New Product Enquiry – ${enquiry.product || 'General Enquiry'}`;
  return sendMail({ to, subject, html: enquiryNotificationHtml(enquiry) });
}

async function sendEnquiryAcknowledgement(enquiry) {
  const subject = 'We received your enquiry – KK Global Trade';
  const html = `
    <p>Dear ${enquiry.name},</p>
    <p>Thank you for your enquiry${enquiry.product ? ` regarding <strong>${enquiry.product}</strong>` : ''}.
    Our export team will review your enquiry and contact you shortly.</p>
    <p>KK Global Trade<br/>Kurnool, Andhra Pradesh, India<br/>+91 8500893054</p>
  `;
  return sendMail({ to: enquiry.email, subject, html });
}

module.exports = { sendMail, sendEnquiryNotification, sendEnquiryAcknowledgement };
