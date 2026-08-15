import { motion } from 'framer-motion';

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow && (
        <span
          className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? 'text-gold-300' : 'text-gold-600'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl font-bold sm:text-4xl ${light ? 'text-white' : 'text-navy-900'}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-white/80' : 'text-navy-500'}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}
