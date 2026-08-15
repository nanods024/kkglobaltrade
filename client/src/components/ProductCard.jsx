import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Package } from 'lucide-react';

export default function ProductCard({ product }) {
  const image = product.images?.[0] || 'https://placehold.co/800x600/001f48/f7f4ec?text=KK+Global+Trade';
  const keySpec = product.specifications?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="card hover-lift group flex flex-col overflow-hidden"
    >
      <Link to={`/products/${product.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-navy-50">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-forest-700 shadow-sm backdrop-blur-sm">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-navy-900 transition-colors group-hover:text-forest-700">
            {product.name}
          </h3>
        </Link>
        {product.shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy-500">{product.shortDescription}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-navy-400">
          {keySpec && (
            <span className="font-medium text-navy-600">
              {keySpec.parameter}: <span className="text-navy-500">{keySpec.value}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <Package className="h-3.5 w-3.5 text-gold-500" />
            MOQ: {product.minimumOrderQuantity || 'On request'}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-gold-500" />
            {product.countryOfOrigin || 'India'}
          </span>
        </div>

        <div className="mt-5 flex gap-2 border-t border-navy-50 pt-4">
          <Link to={`/products/${product.slug}`} className="btn-ghost flex-1 !px-3 !py-2 text-xs">
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to={`/products/${product.slug}#request-quote`} className="btn-primary flex-1 !px-3 !py-2 text-xs">
            Request Quote
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
