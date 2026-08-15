const mongoose = require('mongoose');
const slugify = require('slugify');

const specificationSchema = new mongoose.Schema(
  {
    parameter: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ['Spices', 'Pulses', 'Millets & Grains', 'Superfoods', 'Natural Ingredients'],
    },
    hsCode: { type: String, default: '' },
    botanicalName: { type: String, default: '' },
    description: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    applications: { type: [String], default: [] },
    grade: { type: String, default: '' },
    moisture: { type: String, default: '' },
    packaging: { type: [String], default: [] },
    minimumOrderQuantity: { type: String, default: '' },
    countryOfOrigin: { type: String, default: 'India' },
    sourcingRegion: { type: String, default: '' },
    priceBasis: { type: String, default: 'FOB / CIF – price depends on quantity and destination' },
    leadTime: { type: String, default: '' },
    availability: {
      type: String,
      enum: ['In Stock', 'Seasonal', 'On Request'],
      default: 'On Request',
    },
    specifications: { type: [specificationSchema], default: [] },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', botanicalName: 'text' });

productSchema.pre('validate', function setSlug(next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
