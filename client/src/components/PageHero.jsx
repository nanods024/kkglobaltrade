import { motion } from 'framer-motion';

// Shared banner used at the top of every secondary page (About, Products,
// Quality & Compliance, Global Trade, Private Label, Contact) so the site
// reads as one consistent visual system rather than a per-page treatment.
export default function PageHero({ eyebrow, title, subtitle, size = 'md' }) {
  return (
    <section className={`relative overflow-hidden bg-navy-950 text-center text-white ${size === 'lg' ? 'py-24' : 'py-16 sm:py-20'}`}>
      <div
        className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-forest-500/15 blur-3xl"
        aria-hidden="true"
      />
      <img
        src="/brand/logo-mark.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-[-6rem] h-64 w-auto opacity-[0.05]"
      />

      <div className="container-page relative">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-300"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className={size === 'lg' ? 'text-4xl font-bold sm:text-5xl' : 'text-3xl font-bold sm:text-4xl'}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-4 max-w-2xl text-white/75"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
