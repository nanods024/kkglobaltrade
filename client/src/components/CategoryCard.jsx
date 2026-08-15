import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ title, items, icon: Icon, category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="card hover-lift group flex flex-col p-7"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-forest-600 to-forest-800 text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
        {Icon && <Icon className="h-6 w-6" />}
      </div>
      <h3 className="text-lg font-semibold text-navy-900">{title}</h3>
      <ul className="mt-3 flex-1 space-y-1.5 text-sm text-navy-500">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link
        to={`/products?category=${encodeURIComponent(category)}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors hover:text-forest-800"
      >
        View Products
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
