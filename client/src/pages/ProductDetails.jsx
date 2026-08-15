import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo';
import SpecificationTable from '../components/SpecificationTable';
import QuoteForm from '../components/QuoteForm';
import WhatsAppButton from '../components/WhatsAppButton';
import { getProductBySlug } from '../services/api';
import { productWhatsAppMessage } from '../utils/whatsapp';

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getProductBySlug(slug)
      .then((res) => {
        setProduct(res.data.data);
        setActiveImage(0);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="container-page section-padding text-center text-navy-400">Loading product...</div>;
  }

  if (notFound || !product) {
    return (
      <div className="container-page section-padding text-center">
        <h1 className="text-2xl font-bold text-navy-900">Product not found</h1>
        <p className="mt-3 text-navy-500">The product you are looking for is not available.</p>
        <Link to="/products" className="btn-primary mt-6 inline-flex">
          Browse Products
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ['https://placehold.co/800x600/001f48/f7f4ec?text=KK+Global+Trade'];

  return (
    <>
      <Seo title={product.seoTitle || product.name} description={product.seoDescription || product.shortDescription} />

      <div className="bg-navy-50 py-4">
        <div className="container-page text-sm text-navy-400">
          <Link to="/" className="hover:text-forest-700">Home</Link> /{' '}
          <Link to="/products" className="hover:text-forest-700">Products</Link> /{' '}
          <span className="text-navy-700">{product.name}</span>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* LEFT: Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-navy-50 shadow-glass">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
            {images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${
                      activeImage === idx ? 'border-forest-600' : 'border-transparent hover:border-navy-200'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT: Key info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wide text-forest-600">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-navy-900">{product.name}</h1>
            {product.botanicalName && <p className="mt-1 italic text-navy-400">{product.botanicalName}</p>}
            {product.shortDescription && (
              <p className="mt-4 leading-relaxed text-navy-500">{product.shortDescription}</p>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-navy-400">HS Code</dt>
                <dd className="font-medium text-navy-900">{product.hsCode || '—'}</dd>
              </div>
              <div>
                <dt className="text-navy-400">Origin</dt>
                <dd className="font-medium text-navy-900">{product.countryOfOrigin || '—'}</dd>
              </div>
              <div>
                <dt className="text-navy-400">MOQ</dt>
                <dd className="font-medium text-navy-900">{product.minimumOrderQuantity || '—'}</dd>
              </div>
              <div>
                <dt className="text-navy-400">Grade</dt>
                <dd className="font-medium text-navy-900">{product.grade || '—'}</dd>
              </div>
              <div>
                <dt className="text-navy-400">Moisture</dt>
                <dd className="font-medium text-navy-900">{product.moisture || '—'}</dd>
              </div>
              <div>
                <dt className="text-navy-400">Availability</dt>
                <dd className="font-medium text-navy-900">{product.availability || '—'}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#request-quote" className="btn-primary">
                Request a Quote
              </a>
              <WhatsAppButton
                floating={false}
                message={productWhatsAppMessage(product.name)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRODUCT OVERVIEW */}
      {product.description && (
        <section className="section-padding bg-offwhite">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="container-page max-w-3xl"
          >
            <h2 className="text-2xl font-bold text-navy-900">Product Overview</h2>
            <p className="mt-4 leading-relaxed text-navy-500">{product.description}</p>
          </motion.div>
        </section>
      )}

      {/* TECHNICAL SPECIFICATIONS + PACKAGING */}
      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-navy-900">Technical Specifications</h2>
            <div className="mt-5">
              <SpecificationTable product={product} />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-navy-900">Packaging</h2>
            <ul className="mt-5 space-y-3">
              {(product.packaging?.length ? product.packaging : ['On request']).map((p) => (
                <li key={p} className="flex items-start gap-2 text-navy-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                  {p}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-navy-900">Applications</h2>
            <ul className="mt-5 space-y-3">
              {(product.applications?.length ? product.applications : ['On request']).map((a) => (
                <li key={a} className="flex items-start gap-2 text-navy-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* QUALITY ASSURANCE */}
      <section className="section-padding bg-forest-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="container-page max-w-3xl text-white"
        >
          <h2 className="text-2xl font-bold">Quality Assurance</h2>
          <p className="mt-4 leading-relaxed text-white/80">
            This product moves through sourcing, quality inspection, processing and grading, and export-ready
            packaging before shipment. Certificate of Analysis is available on request; see our{' '}
            <Link to="/quality-compliance" className="underline hover:text-gold-300">
              Quality & Compliance
            </Link>{' '}
            page for full documentation details.
          </p>
        </motion.div>
      </section>

      {/* ENQUIRY FORM */}
      <section id="request-quote" className="section-padding bg-offwhite">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="container-page max-w-2xl"
        >
          <QuoteForm product={product} />
        </motion.div>
      </section>
    </>
  );
}
