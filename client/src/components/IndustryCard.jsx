import { motion } from 'framer-motion';

export default function IndustryCard({ name, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className="card hover-lift group flex flex-col items-center gap-3 p-6 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-50 text-gold-600 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-white">
        {Icon && <Icon className="h-6 w-6" />}
      </div>
      <p className="text-sm font-medium text-navy-800">{name}</p>
    </motion.div>
  );
}
