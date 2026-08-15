import { ShieldCheck, Award, Handshake, Eye, Users, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import SectionTitle from '../components/SectionTitle';
import CTASection from '../components/CTASection';
import PageHero from '../components/PageHero';
import aboutus from '../assets/images/aboutus.jpg';

const VALUES = [
  { label: 'Integrity', icon: ShieldCheck },
  { label: 'Quality', icon: Award },
  { label: 'Reliability', icon: Handshake },
  { label: 'Transparency', icon: Eye },
  { label: 'Customer Focus', icon: Users },
  { label: 'Sustainable Sourcing', icon: Sprout },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about KK Global Trade, an Indian agricultural exporter connecting global buyers with quality spices, pulses, millets and superfoods."
      />

      <PageHero eyebrow="About Us" title="Who We Are" size="lg" />

      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-navy-900">Who We Are</h2>
            <p className="mt-4 leading-relaxed text-navy-500">
              KK Global Trade is an Indian exporter and global trading company based in Kurnool, Andhra Pradesh,
              specializing in agricultural commodities, spices, pulses, millets, superfoods and natural
              ingredients. We work with carefully selected farmers and processing facilities, focusing on quality,
              consistency, food safety, export-ready processing and efficient global logistics.
            </p>
            <p className="mt-4 leading-relaxed text-navy-500">
              We serve international buyers with bulk supply and private-label solutions, supporting importers,
              distributors, food manufacturers and retail brands around the world.
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
              alt="KK Global Trade agricultural sourcing"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-offwhite">
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
              To deliver authentic, high-quality Indian agricultural products to global markets while supporting
              sustainable sourcing, maintaining quality and creating lasting value for customers and supply
              partners.
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
              To become a recognized Indian export brand known for reliability, premium quality, ethical business
              practices and customer-focused service.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionTitle eyebrow="Our Values" title="What Guides Us" />
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {VALUES.map((v, idx) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="card hover-lift group flex flex-col items-center gap-3 p-6 text-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-50 text-forest-700 transition-colors duration-300 group-hover:bg-forest-700 group-hover:text-white">
                  <v.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-navy-800">{v.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
