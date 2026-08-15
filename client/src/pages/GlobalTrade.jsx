import Seo from '../components/Seo';
import SectionTitle from '../components/SectionTitle';
import ExportProcess from '../components/ExportProcess';
import CTASection from '../components/CTASection';
import PageHero from '../components/PageHero';

export default function GlobalTrade() {
  return (
    <>
      <Seo
        title="Global Trade"
        description="How KK Global Trade moves agricultural products from sourcing through to international delivery, step by step."
      />

      <PageHero
        eyebrow="Global Trade"
        title="Our Export Workflow"
        subtitle="A structured, step-by-step process designed to move product from Indian sourcing regions to international buyers reliably and consistently."
      />

      <section className="section-padding bg-offwhite">
        <div className="container-page">
          <SectionTitle title="From Sourcing to International Delivery" />
          <div className="mt-12">
            <ExportProcess />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-bold text-navy-900">Logistics & Trade Support</h2>
          <p className="mt-4 leading-relaxed text-navy-500">
            We coordinate container loading, shipping documentation and ocean freight for bulk export orders,
            typically supplied as full container load (FCL) quantities. Buyers requiring smaller trial quantities
            or specific packaging formats are welcome to share their requirement through our enquiry form, and our
            team will confirm feasibility, pricing and lead time.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
