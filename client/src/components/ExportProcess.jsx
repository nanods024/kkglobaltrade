import { motion } from 'framer-motion';

const STEPS = [
  { num: '01', title: 'Sourcing', desc: 'Working with selected farmers and suppliers across trusted growing regions.' },
  { num: '02', title: 'Quality Inspection', desc: 'Incoming material checked against buyer and export specifications.' },
  { num: '03', title: 'Processing & Grading', desc: 'Cleaning, sorting and grading to the required export standard.' },
  { num: '04', title: 'Packaging', desc: 'Export-ready packaging in food-grade bags, bulk or retail formats.' },
  { num: '05', title: 'Documentation', desc: 'Certificate of Analysis, invoices and shipping documentation prepared.' },
  { num: '06', title: 'Container Loading', desc: 'Careful container loading to protect product quality in transit.' },
  { num: '07', title: 'International Shipment', desc: 'Coordination of ocean freight to the buyer\'s destination port.' },
  { num: '08', title: 'Delivery', desc: 'Shipment tracked through to delivery at the agreed destination.' },
];

export default function ExportProcess() {
  return (
    <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        className="pointer-events-none absolute inset-x-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent lg:block"
        aria-hidden="true"
      />
      {STEPS.map((step, idx) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: idx * 0.06 }}
          className="card hover-lift relative p-6"
        >
          <span className="font-display text-3xl font-bold text-gold-500">{step.num}</span>
          <h3 className="mt-3 text-lg font-semibold text-navy-900">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-500">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
