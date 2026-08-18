import {
  Sprout,
  Wheat,
  Handshake,
  RefreshCcw,
  MapPin,
  Users,
  Globe2,
  Rocket,
  Ship,
  Quote,
  ShieldCheck,
  Award,
  Eye,
  Leaf,
  Flame,
  HeartPulse,
  Package,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import SectionTitle from '../components/SectionTitle';
import CTASection from '../components/CTASection';
import PageHero from '../components/PageHero';
import aboutus from '../assets/images/aboutus.jpeg';

const TIMELINE = [
  {
    year: '1951',
    title: 'Where It All Began',
    icon: Sprout,
    desc: "In the early years after India's independence, our family turned to agriculture during difficult times. We started with rice cultivation, working with traditional methods and deep respect for the land.",
    quote: 'When you respect the soil, it rewards you in return.',
  },
  {
    year: '1960s – 1980s',
    title: 'Growing Through Generations',
    icon: Wheat,
    desc: 'Our agricultural work expanded into rice, cotton, maize, finger millet and pigeon pea. We worked closely with farming communities and established Ramayya Mills, bringing cultivation and processing together to create better value for both farmers and buyers.',
    quote: 'A business is meaningful only when the people behind it grow with it.',
  },
  {
    year: 'Every Season',
    title: 'Built on Fairness and Trust',
    icon: Handshake,
    desc: 'Farmers were given land on lease, freedom to choose crops, and fair compensation — often above market rates. There were no shortcuts, no hidden practices. Only trust and transparency, even when the business faced severe setbacks.',
    quote: 'True strength is standing with people when everything falls apart.',
  },
  {
    year: 'Rebuilding',
    title: 'Rebuilding From the Ground Up',
    icon: RefreshCcw,
    desc: 'After losing much of his resources, our grandfather chose to rebuild rather than retreat. With limited means, he supported farmers with seeds, guidance and encouragement. Slowly, the fields came alive again, the mills restarted, and trust was restored.',
    quote: 'A business only grows when it grows with its people.',
  },
  {
    year: '1990',
    title: 'Expanding Beyond Boundaries',
    icon: MapPin,
    desc: 'Our work began expanding beyond our region through new partnerships and growing demand. Our first major buyer outside our area came from Madhya Pradesh, marking our first step beyond local markets and the start of a deeper understanding of trade.',
  },
  {
    year: '2022',
    title: 'A New Generation, A New Vision',
    icon: Users,
    desc: 'The next generation stepped forward with the establishment of Krishna Mills and Krishna Godowns — continuing to build on the same foundation of Agriculture, Trust, Quality and Relationships.',
  },
  {
    year: '2024',
    title: 'Looking Toward Global Markets',
    icon: Globe2,
    desc: 'We began exploring global markets more seriously, recognizing the rising international demand for Indian agricultural products such as spices, pulses, millets and natural ingredients.',
  },
  {
    year: 'February 2026',
    title: 'The Birth of KK Global Trade',
    icon: Rocket,
    highlight: true,
    desc: 'We launched KK Global Trade — a natural evolution of a journey built over generations, not a sudden beginning. We entered global trade with care, ensuring strong sourcing, documentation and logistics.',
    quote: 'Going global is an opportunity. Going global the right way is a responsibility.',
  },
];

const TODAY = [
  { label: 'Spices', icon: Flame },
  { label: 'Pulses', icon: Package },
  { label: 'Millets', icon: Wheat },
  { label: 'Natural Food Ingredients', icon: Leaf },
  { label: 'Wellness Ingredients', icon: HeartPulse },
];

const VALUES = [
  { title: 'Respect the Farmer', desc: 'Every product begins with them.', icon: Sprout },
  { title: 'Respect the Product', desc: 'Quality starts at the source.', icon: Award },
  { title: 'Respect the Buyer', desc: 'Every market is unique.', icon: Eye },
  { title: 'Keep Your Word', desc: 'Because trust defines trade.', icon: ShieldCheck },
];

function Milestone({ item, idx }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: (idx % 4) * 0.05 }}
      className="relative flex gap-5 pl-2 sm:gap-8"
    >
      <div className="relative flex flex-none flex-col items-center">
        <div
          className={`flex h-11 w-11 flex-none items-center justify-center rounded-full ring-4 ring-offwhite sm:h-12 sm:w-12 ${
            item.highlight ? 'bg-gold-500 text-white' : 'bg-forest-700 text-white'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="mt-2 w-px flex-1 bg-navy-100" aria-hidden="true" />
      </div>

      <div className={`pb-10 ${item.highlight ? 'w-full' : ''}`}>
        <span
          className={`inline-block text-xs font-semibold uppercase tracking-[0.2em] ${
            item.highlight ? 'text-gold-600' : 'text-forest-700'
          }`}
        >
          {item.year}
        </span>
        <div
          className={`mt-3 rounded-2xl p-6 sm:p-7 ${
            item.highlight
              ? 'card border border-gold-200 bg-gradient-to-br from-gold-50 to-white shadow-card-hover'
              : 'card hover-lift'
          }`}
        >
          <h3 className="text-lg font-bold text-navy-900 sm:text-xl">{item.title}</h3>
          <p className="mt-3 leading-relaxed text-navy-500">{item.desc}</p>
          {item.quote && (
            <blockquote className="mt-4 border-l-4 border-gold-500 pl-4 text-sm font-medium italic text-navy-700">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="From rice fields in 1951 to global trade in 2026 — the story of KK Global Trade, a family-driven Indian agricultural export business built on trust, resilience and relationships that last generations."
      />

      <PageHero
        eyebrow="About Us"
        title="From Our Roots in India to Markets Around the World"
        subtitle="Every great journey begins somewhere. Ours began with the land."
        size="lg"
      />

      {/* Our Roots */}
      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
              Our Roots
            </span>
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Ours Began With the Land</h2>
            <p className="mt-4 leading-relaxed text-navy-500">
              Long before KK Global Trade came into existence, our family&rsquo;s life was deeply rooted in
              agriculture. The soil was not just where we worked — it was where we learned discipline, patience and
              purpose.
            </p>
            <p className="mt-4 leading-relaxed text-navy-500">
              For generations, we have believed in simple but powerful values: trust, hard work, resilience and
              respect for farmers. These values continue to guide us today as we step confidently into global trade.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="group aspect-[4/3] w-full overflow-hidden rounded-2xl bg-navy-50 shadow-glass"
          >
            <img
              src={aboutus}
              alt="KK Global Trade agricultural roots and sourcing"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding bg-offwhite">
        <div className="container-page">
          <SectionTitle eyebrow="Our Journey" title="A Legacy Built One Generation at a Time" />
          <div className="mx-auto mt-14 max-w-3xl">
            {TIMELINE.map((item, idx) => (
              <Milestone key={item.year} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* First Global Step */}
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div
          className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-forest-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="container-page relative"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-white">
              <Ship className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Our First Global Step</span>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Organic Moringa Powder, From India to Colorado, USA
            </h2>
            <p className="leading-relaxed text-white/75">
              Our first international shipment travelled from India to the United States — landing in Colorado via
              the Port of Los Angeles. It was more than a shipment; it was a milestone of pride. For the first time,
              something grown through our network reached a global customer.
            </p>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
              <Quote className="mt-1 h-5 w-5 flex-none text-gold-300" />
              <p className="italic text-white/85">
                From Indian soil to international shelves. And this was only the beginning.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="card hover-lift p-8"
          >
            <h3 className="text-xl font-bold text-navy-900">Our Mission</h3>
            <p className="mt-4 leading-relaxed text-navy-500">
              To connect global buyers with trusted Indian agricultural products — spices, pulses, millets and
              natural ingredients — sourced with care and delivered with consistency, quality and compliance.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card hover-lift p-8"
          >
            <h3 className="text-xl font-bold text-navy-900">Our Vision</h3>
            <p className="mt-4 leading-relaxed text-navy-500">
              To carry a generational legacy of trust and resilience onto the world stage — building reliable
              supply partnerships, not just supplying products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do Today */}
      <section className="section-padding bg-offwhite">
        <div className="container-page">
          <SectionTitle
            eyebrow="What We Do Today"
            title="Trusted Indian Agricultural Products, Delivered Globally"
            subtitle="We carefully match each requirement with the right sourcing, ensuring quality, consistency and compliance. We don't just supply products — we build reliable supply partnerships."
          />
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {TODAY.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="card hover-lift group flex flex-col items-center gap-3 p-6 text-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-50 text-forest-700 transition-colors duration-300 group-hover:bg-forest-700 group-hover:text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-navy-800">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionTitle eyebrow="Our Values" title="What Guides Us, Even as We Grow Globally" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="card hover-lift group p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-50 text-forest-700 transition-colors duration-300 group-hover:bg-forest-700 group-hover:text-white">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* From India to the World */}
      <section className="bg-offwhite py-16 text-center sm:py-20">
        <div className="container-page mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">From India to the World</h2>
          <p className="mt-4 leading-relaxed text-navy-500">
            Our journey began in Indian fields. Today, it reaches global markets. But at its heart, KK Global Trade
            remains the same — a family-driven legacy built on trust, resilience and relationships that last
            generations. We are still at the beginning of our global journey, and we welcome partners, importers and
            distributors worldwide to grow with us.
          </p>
          <p className="mt-6 font-display text-lg italic text-forest-700">
            From our roots in India. To your markets around the world.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
