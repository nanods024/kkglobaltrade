const mongoose = require('mongoose');

// Singleton-style collection holding editable company info shown across the
// site (About page, Contact page, footer). Admin can update via Settings.
const companyProfileSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: 'KK Global Trade' },
    tagline: { type: String, default: 'Indian Agricultural Excellence, Delivered Globally' },
    address: { type: String, default: 'Kurnool, Andhra Pradesh, India' },
    phone: { type: String, default: '+91 8500893054' },
    whatsapp: { type: String, default: '918500893054' },
    email: { type: String, default: 'kkglobaltrade1@gmail.com' },
    mission: {
      type: String,
      default:
        "To deliver authentic, high-quality Indian agricultural products to global markets while supporting sustainable sourcing, maintaining quality and creating lasting value for customers and supply partners.",
    },
    vision: {
      type: String,
      default:
        'To become a recognized Indian export brand known for reliability, premium quality, ethical business practices and customer-focused service.',
    },
    values: {
      type: [String],
      default: ['Integrity', 'Quality', 'Reliability', 'Transparency', 'Customer Focus', 'Sustainable Sourcing'],
    },
    googleMapsEmbedUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CompanyProfile', companyProfileSchema);
