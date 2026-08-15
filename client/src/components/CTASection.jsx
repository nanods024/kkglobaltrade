import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTASection({
  title = 'Looking for a reliable Indian export partner?',
  subtitle = 'Share your requirement and our export team will get back to you with pricing, specifications and lead time.',
  buttonLabel = 'Request a Quote',
  buttonTo = '/contact',
}) {
  return (
    <section className="relative overflow-hidden bg-forest-900">
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="container-page section-padding relative flex flex-col items-center gap-6 text-center"
      >
        <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="max-w-xl text-white/75">{subtitle}</p>
        <Link to={buttonTo} className="btn-gold">
          {buttonLabel}
        </Link>
      </motion.div>
    </section>
  );
}
