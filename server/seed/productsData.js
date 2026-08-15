// Product data sourced from the KK Global Trade catalogue specification.
//
// Image provenance:
//  - Dried Red Chilli, Turmeric Powder, Green Cardamom, Moringa Powder are
//    confirmed, closely-matching stock photographs (Unsplash).
//  - Black Gram, Pigeon Pea and Stevia use closely-related generic stock
//    photography (e.g. dark whole beans / yellow split peas / dried green
//    leaves) as a stand-in for the exact commodity, since a confirmed,
//    precisely-matching photo of that specific pulse/herb could not be
//    verified within this build.
//  - Finger Millet/Ragi and Sorghum/Jowar keep a branded placeholder — no
//    stock photo could be confidently verified as showing that specific
//    grain, and the spec asks not to use random/unrelated imagery.
// Swap any of these for real product photography via Admin → Products.
const PLACEHOLDER = (label) => `https://placehold.co/800x600/001f48/f7f4ec?text=${encodeURIComponent(label)}`;

module.exports = [
  {
    name: 'Dried Red Chilli / Chilli Powder',
    category: 'Spices',
    hsCode: '09042211 / 09042219',
    botanicalName: 'Capsicum annuum L.',
    shortDescription:
      'Export-grade dried red chilli and chilli powder, supplied whole, crushed or as fine powder, with Guntur, Andhra Pradesh as a major sourcing hub.',
    description:
      'KK Global Trade supplies export-grade dried red chilli sourced primarily from Guntur, Andhra Pradesh, one of India\'s leading chilli-growing regions. Available whole, crushed or as fine chilli powder to suit buyer requirements across food processing, spice blending and retail packaging.',
    applications: ['Food processing', 'Spice blending', 'Retail & foodservice', 'Seasoning manufacture'],
    grade: 'Export grade, whole / crushed / powder',
    moisture: '≤10%',
    packaging: ['25 kg PP bag', '50 kg PP bag', 'Multi-layer food-grade bags'],
    minimumOrderQuantity: '1 x 20ft container',
    countryOfOrigin: 'India',
    sourcingRegion: 'Guntur, Andhra Pradesh',
    priceBasis: 'FOB / CIF – price depends on quantity and destination',
    leadTime: 'On request, subject to order quantity and season',
    availability: 'On Request',
    specifications: [
      { parameter: 'ASTA Colour', value: '80–160+' },
      { parameter: 'SHU (Pungency)', value: '20,000–80,000+' },
      { parameter: 'Moisture', value: '≤10%' },
      { parameter: 'Form', value: 'Whole / Crushed / Fine Powder' },
    ],
    images: [
      'https://images.unsplash.com/photo-1566045023256-fb2339a82526?auto=format&fit=crop&w=1000&q=75',
    ],
    featured: true,
    published: true,
    seoTitle: 'Dried Red Chilli & Chilli Powder Exporter from India | KK Global Trade',
    seoDescription:
      'KK Global Trade supplies export-grade dried red chilli and chilli powder from Guntur, India, with bulk packaging and Certificate of Analysis on request.',
  },
  {
    name: 'Organic Turmeric Powder',
    category: 'Spices',
    hsCode: '09103010 / 09103020',
    botanicalName: 'Curcuma longa',
    shortDescription:
      'Export-grade turmeric supplied as dried whole fingers or ground powder, with steam sterilization available on request.',
    description:
      'KK Global Trade supplies turmeric sourced from trusted Indian growing regions, available as dried whole turmeric fingers or ground turmeric powder. Steam sterilization can be arranged on request for buyers with additional food-safety requirements.',
    applications: ['Food & beverage', 'Spice blending', 'Nutraceutical use', 'Retail packaging'],
    grade: 'Export grade, whole finger / powder',
    moisture: '≤10%',
    packaging: ['25 kg food-grade bag', '50 kg food-grade bag', 'Retail pouches on request'],
    minimumOrderQuantity: '1 x 20ft container',
    countryOfOrigin: 'India',
    sourcingRegion: 'India',
    priceBasis: 'FOB / CIF – price depends on quantity and destination',
    leadTime: 'On request, subject to order quantity and season',
    availability: 'On Request',
    specifications: [
      { parameter: 'Curcumin Content', value: '2.5%–5%+' },
      { parameter: 'Moisture', value: '≤10%' },
      { parameter: 'Sterilization', value: 'Steam sterilization available on request' },
      { parameter: 'Form', value: 'Whole finger / Ground powder' },
    ],
    images: [
      'https://images.unsplash.com/photo-1768729340164-7d83fe18384d?auto=format&fit=crop&w=1000&q=75',
    ],
    featured: true,
    published: true,
    seoTitle: 'Organic Turmeric Powder Exporter from India | KK Global Trade',
    seoDescription:
      'KK Global Trade supplies export-grade organic turmeric powder from India with bulk packaging, buyer-specific specifications and international trade support.',
  },
  {
    name: 'Green Cardamom',
    category: 'Spices',
    hsCode: '09083110 / 09083120 / 09083130 / 09083190',
    botanicalName: 'Elettaria cardamomum',
    shortDescription: 'Bold 8mm+ green cardamom with medium and mixed grades also available.',
    description:
      'KK Global Trade supplies green cardamom in bold, medium and mixed grades to suit a range of buyer specifications, sourced from India. Pricing depends on grade and order quantity.',
    applications: ['Food & beverage', 'Spice blending', 'Confectionery', 'Retail packaging'],
    grade: 'Bold 8mm+ / Medium / Mixed',
    moisture: '≤10%',
    packaging: ['5 kg food-grade bag/tin', '10 kg food-grade bag/tin', '25 kg food-grade bag/tin'],
    minimumOrderQuantity: '3 tons',
    countryOfOrigin: 'India',
    sourcingRegion: 'India',
    priceBasis: 'Price depends on quantity and grade',
    leadTime: 'On request',
    availability: 'On Request',
    specifications: [
      { parameter: 'Size Grade', value: 'Bold 8mm+ (also Medium / Mixed available)' },
      { parameter: 'Moisture', value: '≤10%' },
      { parameter: 'Country of Origin', value: 'India' },
    ],
    images: [
      'https://images.unsplash.com/photo-1758657996330-095d08451cd9?auto=format&fit=crop&w=1000&q=75',
    ],
    featured: true,
    published: true,
    seoTitle: 'Green Cardamom Exporter from India | KK Global Trade',
    seoDescription:
      'KK Global Trade supplies bold and medium-grade green cardamom from India for international buyers, with flexible packaging and quantity-based pricing.',
  },
  {
    name: 'Organic Moringa Powder',
    category: 'Superfoods',
    hsCode: '12119029',
    botanicalName: 'Moringa oleifera',
    shortDescription: 'Shade-dried organic moringa leaf powder, with bulk drum packaging available on request.',
    description:
      'KK Global Trade supplies shade-dried organic moringa leaf powder from India, packed in food-grade multi-layer bags. Bulk drum packaging can be arranged on request for larger orders.',
    applications: ['Health & wellness foods', 'Nutraceuticals', 'Functional beverages', 'Supplement manufacture'],
    grade: 'Shade-dried organic leaf powder',
    moisture: '≤8%',
    packaging: ['1 kg food-grade bag', '5 kg food-grade bag', '25 kg food-grade multi-layer bag', 'Bulk drums on request'],
    minimumOrderQuantity: '10 tons',
    countryOfOrigin: 'India',
    sourcingRegion: 'India',
    priceBasis: 'Price depends on quantity',
    leadTime: 'On request',
    availability: 'On Request',
    specifications: [
      { parameter: 'Processing', value: 'Shade-dried leaf, organic' },
      { parameter: 'Moisture', value: '≤8%' },
      { parameter: 'Country of Origin', value: 'India' },
    ],
    images: [
      'https://images.unsplash.com/photo-1565117661210-fd54898de423?auto=format&fit=crop&w=1000&q=75',
    ],
    featured: true,
    published: true,
    seoTitle: 'Organic Moringa Powder Exporter from India | KK Global Trade',
    seoDescription:
      'KK Global Trade supplies shade-dried organic moringa leaf powder from India in bulk packaging for health & wellness and nutraceutical buyers.',
  },
  {
    name: 'Stevia Powder',
    category: 'Superfoods',
    hsCode: '12119029',
    botanicalName: 'Stevia rebaudiana',
    shortDescription:
      'Natural sweetener supplied as leaf powder or extract grade, used across food, beverage and pharmaceutical applications.',
    description:
      'KK Global Trade supplies natural stevia sweetener from India in leaf powder and extract grades. Stevia is widely used across food, beverage and pharmaceutical applications as a natural, low-calorie sweetener alternative.',
    applications: ['Food & beverage', 'Pharmaceutical formulations', 'Natural sweetener blends'],
    grade: 'Leaf powder / Extract',
    moisture: '≤6%',
    packaging: ['1 kg multi-layer food-grade bag', '5 kg multi-layer food-grade bag', '25 kg multi-layer food-grade bag'],
    minimumOrderQuantity: '5 tons',
    countryOfOrigin: 'India',
    sourcingRegion: 'India',
    priceBasis: 'Price depends on quantity and grade',
    leadTime: 'On request',
    availability: 'On Request',
    specifications: [
      { parameter: 'Form', value: 'Leaf powder / Extract' },
      { parameter: 'Moisture', value: '≤6%' },
      { parameter: 'Country of Origin', value: 'India' },
    ],
    // Generic dried-green-leaf stand-in — not a confirmed stevia-specific photo.
    images: ['https://images.pexels.com/photos/38520403/pexels-photo-38520403.jpeg?auto=compress&w=1000'],
    featured: false,
    published: true,
    seoTitle: 'Stevia Powder Supplier from India | KK Global Trade',
    seoDescription:
      'KK Global Trade supplies natural stevia leaf powder and extract grades from India for food, beverage and pharmaceutical applications.',
  },
  {
    name: 'Black Gram / Urad',
    category: 'Pulses',
    hsCode: '07133100',
    botanicalName: 'Vigna mungo',
    shortDescription: 'Sortex-cleaned FMQ (Fair Medium Quality) black gram / urad for export.',
    description:
      'KK Global Trade supplies sortex-cleaned black gram (urad) at Fair Medium Quality (FMQ) grade from India, packed in export-standard bags for bulk international shipment.',
    applications: ['Food manufacturing', 'Retail & wholesale distribution', 'Food service'],
    grade: 'FMQ (Fair Medium Quality), Sortex cleaned',
    moisture: '≤12%',
    packaging: ['25 kg PP woven/jute bag', '50 kg PP woven/jute bag'],
    minimumOrderQuantity: '1 x 20ft container',
    countryOfOrigin: 'India',
    sourcingRegion: 'India',
    priceBasis: 'Price depends on quantity',
    leadTime: 'On request',
    availability: 'On Request',
    specifications: [
      { parameter: 'Grade', value: 'FMQ, Sortex cleaned' },
      { parameter: 'Moisture', value: '≤12%' },
      { parameter: 'Country of Origin', value: 'India' },
    ],
    // Generic whole dark-bean stand-in — not a confirmed urad-specific photo.
    images: ['https://images.pexels.com/photos/35553040/pexels-photo-35553040.jpeg?auto=compress&w=1000'],
    featured: false,
    published: true,
    seoTitle: 'Black Gram / Urad Exporter from India | KK Global Trade',
    seoDescription:
      'KK Global Trade supplies sortex-cleaned, export-grade black gram (urad) from India in bulk container quantities.',
  },
  {
    name: 'Pigeon Pea / Red Gram',
    category: 'Pulses',
    hsCode: '07136000',
    botanicalName: 'Cajanus cajan',
    shortDescription: 'Sortex-cleaned FMQ pigeon pea / red gram, available whole or split.',
    description:
      'KK Global Trade supplies sortex-cleaned pigeon pea (red gram/tur) at FMQ grade from India, with whole or split product options available according to buyer specification.',
    applications: ['Food manufacturing', 'Retail & wholesale distribution', 'Food service'],
    grade: 'FMQ (Fair Medium Quality), Sortex cleaned',
    moisture: '≤12%',
    packaging: ['25 kg PP woven/jute bag', '50 kg PP woven/jute bag'],
    minimumOrderQuantity: '1 x 20ft container',
    countryOfOrigin: 'India',
    sourcingRegion: 'India',
    priceBasis: 'Price depends on quantity',
    leadTime: 'On request',
    availability: 'On Request',
    specifications: [
      { parameter: 'Grade', value: 'FMQ, Sortex cleaned' },
      { parameter: 'Moisture', value: '≤12%' },
      { parameter: 'Form', value: 'Whole or split, per buyer specification' },
    ],
    // Generic split-yellow-pea stand-in — not a confirmed toor dal-specific photo.
    images: ['https://images.pexels.com/photos/14965274/pexels-photo-14965274.jpeg?auto=compress&w=1000'],
    featured: false,
    published: true,
    seoTitle: 'Pigeon Pea / Red Gram Exporter from India | KK Global Trade',
    seoDescription:
      'KK Global Trade supplies sortex-cleaned pigeon pea (red gram) from India, whole or split, in bulk container quantities.',
  },
  {
    name: 'Finger Millet / Ragi',
    category: 'Millets & Grains',
    hsCode: '10082039',
    botanicalName: 'Eleusine coracana',
    shortDescription:
      'Cleaned finger millet (ragi) with organic and conventional lots available, meeting growing health-food and gluten-free demand.',
    description:
      'KK Global Trade supplies cleaned finger millet (ragi) from India, with organic and conventional lots available on request. Finger millet is seeing growing demand internationally in health-food and gluten-free product segments.',
    applications: ['Health-food products', 'Gluten-free flour', 'Retail packaging'],
    grade: 'Cleaned, organic/conventional on request',
    moisture: '≤13%',
    packaging: ['25 kg PP woven/jute bag', '50 kg PP woven/jute bag', 'Retail packaging on request'],
    minimumOrderQuantity: '1 x 20ft container',
    countryOfOrigin: 'India',
    sourcingRegion: 'India',
    priceBasis: 'Price depends on quantity',
    leadTime: 'On request',
    availability: 'On Request',
    specifications: [
      { parameter: 'Grade', value: 'Cleaned' },
      { parameter: 'Moisture', value: '≤13%' },
      { parameter: 'Lot Type', value: 'Organic and conventional lots available on request' },
    ],
    images: [PLACEHOLDER('Finger Millet Ragi')],
    featured: true,
    published: true,
    seoTitle: 'Finger Millet (Ragi) Exporter from India | KK Global Trade',
    seoDescription:
      'KK Global Trade supplies cleaned finger millet (ragi) from India, organic and conventional lots, for health-food and gluten-free markets.',
  },
  {
    name: 'Sorghum / Jowar',
    category: 'Millets & Grains',
    hsCode: '10079000',
    botanicalName: 'Sorghum bicolor',
    shortDescription:
      'Cleaned sorghum (jowar) suitable for food, feed and gluten-free flour applications, with organic and conventional lots available.',
    description:
      'KK Global Trade supplies cleaned sorghum (jowar) from India, with organic and conventional lots available on request. Suitable for food, feed and gluten-free flour applications, with bulk packaging available on request.',
    applications: ['Food', 'Animal feed', 'Gluten-free flour'],
    grade: 'Cleaned, organic/conventional on request',
    moisture: '≤12%',
    packaging: ['25 kg PP woven bag', '50 kg PP woven bag', 'Bulk packaging on request'],
    minimumOrderQuantity: '1 x 20ft container',
    countryOfOrigin: 'India',
    sourcingRegion: 'India',
    priceBasis: 'Price depends on quantity',
    leadTime: 'On request',
    availability: 'On Request',
    specifications: [
      { parameter: 'Grade', value: 'Cleaned' },
      { parameter: 'Moisture', value: '≤12%' },
      { parameter: 'Lot Type', value: 'Organic and conventional lots available on request' },
    ],
    images: [PLACEHOLDER('Sorghum Jowar')],
    featured: false,
    published: true,
    seoTitle: 'Sorghum (Jowar) Exporter from India | KK Global Trade',
    seoDescription:
      'KK Global Trade supplies cleaned sorghum (jowar) from India for food, feed and gluten-free flour applications in bulk container quantities.',
  },
];
