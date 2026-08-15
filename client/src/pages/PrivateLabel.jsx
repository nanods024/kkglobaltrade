import { Package, Boxes, Tag, ClipboardList, Layers, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import SectionTitle from '../components/SectionTitle';
import CTASection from '../components/CTASection';
import PageHero from '../components/PageHero';

const OFFERINGS = [
  { title: 'Custom Packaging', desc: 'Packaging formats adapted to buyer requirements.', icon: Package },
  { title: 'Bulk Packaging', desc: 'Bulk formats suited to container-load export orders.', icon: Boxes },
  { title: 'Retail Packaging', desc: 'Retail-ready pack sizes for grocery and specialty shelves.', icon: Tag },
  { title: 'Buyer-Specific Specifications', desc: 'Grade, moisture and packaging aligned to buyer specification.', icon: ClipboardList },
  { title: 'Custom Labelling', desc: 'Labelling produced to the buyer\'s private-label branding.', icon: Layers },
  { title: 'Export-Ready Packing', desc: 'Packing suited to international shipment and handling.', icon: Truck },
];

export default function PrivateLabel() {
  return (
    <>
      <Seo
        title="Private Label Solutions"
        description="KK Global Trade offers private-label and OEM export solutions with custom packaging, retail packaging and buyer-specific specifications."
      />

      <PageHero
        eyebrow="Private Label"
        title="Private Label Export Solutions"
        subtitle="We support private-label and OEM requirements with custom packaging, retail-ready formats and buyer-specific product specifications."
      />

      <section className="section-padding bg-offwhite">
        <div className="container-page">
          <SectionTitle title="What We Offer" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERINGS.map((o, idx) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="card hover-lift group p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-50 text-gold-600 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-white">
                  <o.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Have a private label requirement in mind?"
        subtitle="Share your product, packaging and branding needs and our export team will confirm what we can support."
        buttonLabel="Discuss Your Private Label Requirement"
      />
    </>
  );
}
