import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  Wheat,
  Leaf,
  Sprout,
  ShieldCheck,
  Globe2,
  Truck,
  Award,
  Boxes,
  Tag,
  HeadphonesIcon,
  Building2,
  Store,
  ChefHat,
  FlaskConical,
  Warehouse,
  Users,
} from 'lucide-react';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';
import ExportProcess from '../components/ExportProcess';
import IndustryCard from '../components/IndustryCard';
import CTASection from '../components/CTASection';
import QuoteForm from '../components/QuoteForm';
import { getFeaturedProducts } from '../services/api';
import aboutus from '../assets/images/aboutus.jpg';

const CATEGORY_CARDS = [
  { title: 'Spices', category: 'Spices', icon: Flame, items: ['Red Chilli', 'Turmeric', 'Cardamom'] },
  { title: 'Pulses', category: 'Pulses', icon: Wheat, items: ['Black Gram / Urad', 'Pigeon Pea / Red Gram'] },
  {
    title: 'Millets & Grains',
    category: 'Millets & Grains',
    icon: Sprout,
    items: ['Finger Millet / Ragi', 'Sorghum / Jowar'],
  },
  {
    title: 'Superfoods & Natural Ingredients',
    category: 'Superfoods',
    icon: Leaf,
    items: ['Moringa Powder', 'Stevia Powder'],
  },
];

const WHY_CHOOSE_US = [
  { title: 'Premium Quality Products', icon: Award },
  { title: 'Trusted Indian Sourcing', icon: Building2 },
  { title: 'Export-Ready Processing', icon: Boxes },
  { title: 'Quality Assurance', icon: ShieldCheck },
  { title: 'Bulk Supply', icon: Warehouse },
  { title: 'Private Label Solutions', icon: Tag },
  { title: 'Reliable Global Logistics', icon: Truck },
  { title: 'Dedicated Customer Support', icon: HeadphonesIcon },
];

const INDUSTRIES = [
  { name: 'Importers & Distributors', icon: Globe2 },
  { name: 'Indian Grocery Chains', icon: Store },
  { name: 'Food Manufacturers', icon: Boxes },
  { name: 'Spice & Seasoning Companies', icon: Flame },
  { name: 'Health & Wellness Brands', icon: Leaf },
  { name: 'Nutraceutical Companies', icon: FlaskConical },
  { name: 'Restaurants & Food Service', icon: ChefHat },
  { name: 'Retail Chains', icon: Store },
  { name: 'Private Label Brands', icon: Users },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts()
      .then((res) => setFeatured(res.data.data))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Seo
        title="Indian Agricultural Exporter of Spices, Pulses, Millets & Superfoods"
        description="KK Global Trade is an Indian exporter of spices, pulses, millets and superfoods, offering bulk supply, private-label solutions and reliable global trade support."
      />

      <Hero />

      {/* WHAT WE EXPORT */}
      <section className="section-padding bg-offwhite">
        <div className="container-page">
          <SectionTitle
            eyebrow="What We Export"
            title="Categories of Indian Agricultural Products"
            subtitle="Sourced, processed and packed for international buyers across food, retail and nutraceutical markets."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_CARDS.map((c) => (
              <CategoryCard key={c.category} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionTitle
            eyebrow="Featured Products"
            title="Popular Export Products"
            subtitle="A selection from our export catalogue — full specifications available on each product page."
          />
          <div className="mt-12">
            <ProductGrid products={featured} loading={loading} emptyMessage="Products will appear here shortly." />
          </div>
          <div className="mt-10 text-center">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-padding bg-forest-900">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              About KK Global Trade
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Bringing India's Agricultural Heritage to the World
            </h2>
            <p className="mt-5 leading-relaxed text-white/80">
              KK Global Trade is committed to bringing the richness of India's agricultural heritage to customers
              around the world. We work with carefully selected farmers and processing facilities while focusing on
              quality, consistency, food safety, export-ready processing and efficient global logistics.
            </p>
            <p className="mt-4 leading-relaxed text-white/80">
              We serve international buyers with spices, pulses, millets, superfoods and natural food ingredients.
            </p>
            <Link to="/about" className="btn-gold mt-7 inline-flex">
              Learn More About Us
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="group aspect-[4/3] w-full overflow-hidden rounded-2xl bg-navy-800 shadow-glass"
          >
            <img
              src={aboutus}
              alt="Indian agricultural sourcing and processing"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding bg-offwhite">
        <div className="container-page">
          <SectionTitle
            eyebrow="Why Choose Us"
            title="Why Choose KK Global Trade"
            subtitle="Positioning built around what international buyers value most in an export partner."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.07 }}
                className="card hover-lift group p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-50 text-forest-700 transition-colors duration-300 group-hover:bg-forest-700 group-hover:text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPORT PROCESS */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionTitle
            eyebrow="Global Export Process"
            title="From Sourcing to Delivery"
            subtitle="A structured export workflow designed for consistency and reliability."
          />
          <div className="mt-12">
            <ExportProcess />
          </div>
          <div className="mt-10 text-center">
            <Link to="/global-trade" className="btn-primary">
              Explore Our Global Trade Process
            </Link>
          </div>
        </div>
      </section>

      {/* QUALITY & COMPLIANCE */}
      <section className="section-padding bg-navy-900">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="group order-2 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-navy-800 shadow-glass lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=60"
              alt="Quality inspection of export agricultural products"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Quality & Compliance
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Built Around Consistent Quality</h2>
            <p className="mt-5 leading-relaxed text-white/80">
              Our products move through sourcing, quality inspection, processing, grading and packaging before
              export, with Certificate of Analysis and Phytosanitary Certificate documentation available on
              request.
            </p>
            <Link to="/quality-compliance" className="btn-gold mt-7 inline-flex">
              View Quality & Compliance
            </Link>
          </div>
        </div>
      </section>

      {/* PRIVATE LABEL */}
      <section className="section-padding bg-offwhite">
        <div className="container-page text-center">
          <SectionTitle
            eyebrow="Private Label Solutions"
            title="Custom Packaging & Private Label Export"
            subtitle="Buyer-specific packaging, labelling and specifications for retail, foodservice and private-label brands."
          />
          <Link to="/private-label" className="btn-primary mt-8 inline-flex">
            Discuss Your Private Label Requirement
          </Link>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionTitle
            eyebrow="Industries We Serve"
            title="Who We Work With"
            subtitle="Supplying a broad range of international buyers across the food and wellness value chain."
          />
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {INDUSTRIES.map((ind) => (
              <IndustryCard key={ind.name} {...ind} />
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST A QUOTE */}
      <section className="section-padding bg-offwhite">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              align="left"
              eyebrow="Request a Quote"
              title="Talk to Our Export Team"
              subtitle="Send us your requirement — product, quantity, packaging and destination — and we will respond with pricing and next steps."
            />
          </div>
          <QuoteForm />
        </div>
      </section>

      <CTASection />
    </>
  );
}
