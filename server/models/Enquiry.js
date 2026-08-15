const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    companyName: { type: String, default: '', trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    product: { type: String, default: '' },
    productSlug: { type: String, default: '' },
    quantity: { type: String, default: '' },
    unit: {
      type: String,
      enum: ['KG', 'MT', 'Container (20ft)', 'Container (40ft)', 'Other'],
      default: 'MT',
    },
    grade: { type: String, default: '' },
    packaging: { type: String, default: '' },
    destination: { type: String, default: '' },
    message: { type: String, default: '' },
    source: { type: String, enum: ['RFQ', 'Contact'], default: 'RFQ' },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Quotation Sent', 'Negotiation', 'Confirmed', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
