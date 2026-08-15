import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Container, BadgeCheck } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

const TRUST_BADGES = [
  { icon: Container, label: 'FCL Container Supply' },
  { icon: ShieldCheck, label: 'Export-Ready Packaging' },
  { icon: BadgeCheck, label: 'Certificate of Analysis on Request' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-950">
      {/* Layered background: hero photograph + brand-tinted overlay + subtle logo watermark */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-110 bg-cover bg-center"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1800&q=70"
          alt=""
          className="h-full w-full object-cover opacity-45"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-navy-950/30" />

      <img
        src="/brand/logo-mark.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-[26rem] w-auto opacity-[0.06] sm:h-[34rem]"
      />

      {/* Floating gradient orbs for subtle depth/motion */}
      <div
        className="pointer-events-none absolute left-[8%] top-[18%] h-40 w-40 animate-float-slow rounded-full bg-gold-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[12%] right-[12%] h-56 w-56 animate-float-slow rounded-full bg-forest-500/20 blur-3xl [animation-delay:1.5s]"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-page relative flex min-h-[88vh] flex-col items-start justify-center py-28 sm:min-h-[92vh]"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-300 backdrop-blur-sm"
        >
          Indian Agricultural Exporter
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]"
        >
          Indian Agricultural Excellence,{' '}
          <span className="text-gradient-gold">Delivered Globally</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          KK Global Trade connects trusted Indian agricultural sourcing with international buyers through reliable
          quality, bulk supply, export-ready packaging and global trade solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link to="/products" className="btn-gold">
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="btn-outline">
            Request a Quote
          </Link>
          <WhatsAppButton
            floating={false}
            message="Hello KK Global Trade, I would like to know more about your export products and services."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-14 flex flex-wrap gap-3"
        >
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-sm"
            >
              <badge.icon className="h-3.5 w-3.5 text-gold-300" />
              {badge.label}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
