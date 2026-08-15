const asyncHandler = require('express-async-handler');
const Enquiry = require('../models/Enquiry');
const { sendEnquiryNotification, sendEnquiryAcknowledgement } = require('../services/emailService');

// @route POST /api/enquiries  (public — the RFQ form on every product page)
const createEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.create({ ...req.body, source: 'RFQ' });

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

// @route GET /api/enquiries (admin)
const getEnquiries = asyncHandler(async (req, res) => {
  const { status, source, page = 1, limit = 20 } = req.query;
  const query = {};
  if (status) query.status = status;
  if (source) query.source = source;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  const [enquiries, total] = await Promise.all([
    Enquiry.find(query)
      .sort('-createdAt')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Enquiry.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: enquiries,
    pagination: { total, page: pageNum, pages: Math.ceil(total / limitNum) || 1, limit: limitNum },
  });
});

// @route GET /api/enquiries/stats (admin) — powers dashboard cards + chart
const getEnquiryStats = asyncHandler(async (req, res) => {
  const [totalProducts, statusCounts, monthly] = await Promise.all([
    require('../models/Product').countDocuments(),
    Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Enquiry.aggregate([
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 },
    ]),
  ]);

  const statusMap = statusCounts.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {});
  const totalEnquiries = statusCounts.reduce((sum, s) => sum + s.count, 0);
  const newEnquiries = statusMap['New'] || 0;
  const activeEnquiries =
    (statusMap['Contacted'] || 0) + (statusMap['Quotation Sent'] || 0) + (statusMap['Negotiation'] || 0);
  const completedEnquiries = (statusMap['Confirmed'] || 0) + (statusMap['Closed'] || 0);

  res.json({
    success: true,
    data: {
      totalProducts,
      totalEnquiries,
      newEnquiries,
      activeEnquiries,
      completedEnquiries,
      statusBreakdown: statusMap,
      monthly: monthly.map((m) => ({
        label: `${m._id.year}-${String(m._id.month).padStart(2, '0')}`,
        count: m.count,
      })),
    },
  });
});

// @route GET /api/enquiries/:id (admin)
const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }
  res.json({ success: true, data: enquiry });
});

// @route PUT /api/enquiries/:id (admin) — mainly used to update status
const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }
  res.json({ success: true, data: enquiry });
});

// @route DELETE /api/enquiries/:id (admin)
const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }
  await enquiry.deleteOne();
  res.json({ success: true, message: 'Enquiry deleted' });
});

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryStats,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
