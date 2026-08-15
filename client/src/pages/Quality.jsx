import { FileCheck, FlaskConical, Leaf, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import SectionTitle from '../components/SectionTitle';
import CTASection from '../components/CTASection';
import PageHero from '../components/PageHero';

const DOCS = [
  { title: 'Certificate of Analysis', desc: 'Available on request for shipments, confirming key quality parameters.', icon: FileCheck },
  { title: 'Phytosanitary Certificate', desc: 'Issued to meet plant-health import requirements at destination.', icon: Leaf },
  { title: 'MRL Testing', desc: 'Maximum Residue Limit testing available on request for applicable products.', icon: FlaskConical },
  { title: 'Steam Sterilization', desc: 'Available on request where required for applicable US/EU shipments.', icon: ShieldCheck },
];

export default function Quality() {
  return (
    <>
      <Seo
        title="Quality & Compliance"
        description="KK Global Trade's approach to sourcing, processing, grading, packaging and testing, with export documentation available on request."
      />

      <PageHero eyebrow="Quality & Compliance" title="Quality Built Into Every Shipment" />

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-bold text-navy-900">Quality Assurance</h2>
          <p className="mt-4 leading-relaxed text-navy-500">
            KK Global Trade works with carefully selected sourcing partners and processing facilities. Products
            move through sourcing, quality inspection, processing and grading, and export-ready packaging before
            shipment, so buyers receive product consistent with the specifications agreed at order confirmation.
          </p>
          <p className="mt-4 leading-relaxed text-navy-500">
            Specifications referenced on our product pages (such as moisture content, grade and ASTA/SHU ranges
            for chilli) reflect typical export and trade specifications for these commodities. Exact figures for a
            given shipment are confirmed at the time of order and can be supported by a Certificate of Analysis on
            request.
          </p>
        </div>
      </section>

      <section className="section-padding bg-offwhite">
        <div className="container-page">
          <SectionTitle eyebrow="Documentation" title="Documentation Available on Request" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DOCS.map((doc, idx) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="card hover-lift group p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-50 text-forest-700 transition-colors duration-300 group-hover:bg-forest-700 group-hover:text-white">
                  <doc.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{doc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{doc.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-sm text-navy-400">
            KK Global Trade does not claim ISO, FDA, USDA or organic certification unless valid supporting
            documentation for a specific product and shipment is provided at the time of order.
          </p>
        </div>
      </section>

      <CTASection
        title="Have a documentation requirement?"
        subtitle="Tell us which certificates or testing your shipment needs and we will confirm what we can provide."
      />
    </>
  );
}
