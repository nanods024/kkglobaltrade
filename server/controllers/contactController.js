const asyncHandler = require('express-async-handler');
const Enquiry = require('../models/Enquiry');
const { sendEnquiryNotification, sendEnquiryAcknowledgement } = require('../services/emailService');

// @route POST /api/contact
// General contact-page submissions are stored in the same enquiries
// collection as RFQs, tagged source: 'Contact', so admins see everything
// in one Enquiries dashboard.
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, country, message, companyName } = req.body;

  const enquiry = await Enquiry.create({
    name,
    email,
    phone,
    country: country || 'Not specified',
    companyName,
    message,
    source: 'Contact',
  });

  await Promise.all([
    sendEnquiryNotification(enquiry).catch((e) => console.error('Notify email failed:', e.message)),
    sendEnquiryAcknowledgement(enquiry).catch((e) => console.error('Ack email failed:', e.message)),
  ]);

  res.status(201).json({
    success: true,
    message: 'Thank you. Our export team will review your enquiry and contact you shortly.',
    data: enquiry,
  });
});

module.exports = { submitContact };
