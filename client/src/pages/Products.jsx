import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../services/api';
import { PRODUCT_CATEGORIES, AVAILABILITY_OPTIONS } from '../utils/constants';

const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: '-name', label: 'Name (Z-A)' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

  const category = searchParams.get('category') || '';
  const availability = searchParams.get('availability') || '';
  const origin = searchParams.get('origin') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '-createdAt';
  const page = Number(searchParams.get('page') || 1);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    setSearchParams(next);
  };

  const fetchProducts = useCallback(() => {
    setLoading(true);
    getProducts({ category, availability, origin, search, sort, page, limit: 12 })
      .then((res) => {
        setProducts(res.data.data);
        setPagination(res.data.pagination);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, availability, origin, search, sort, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Seo
        title="Export Products"
        description="Browse KK Global Trade's export catalogue of spices, pulses, millets, superfoods and natural ingredients sourced from India."
      />

      <PageHero eyebrow="Our Products" title="Export Product Catalogue" />

      <section className="section-padding bg-offwhite">
        <div className="container-page">
          <div className="mb-10 grid grid-cols-1 gap-4 rounded-2xl bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative sm:col-span-2 lg:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
              <input
                className="input-field pl-9"
                placeholder="Search products..."
                defaultValue={search}
                onChange={(e) => updateParam('search', e.target.value)}
              />
            </div>
            <select className="input-field" value={category} onChange={(e) => updateParam('category', e.target.value)}>
              <option value="">All Categories</option>
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              className="input-field"
              value={availability}
              onChange={(e) => updateParam('availability', e.target.value)}
            >
              <option value="">Any Availability</option>
              {AVAILABILITY_OPTIONS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <select className="input-field" value={sort} onChange={(e) => updateParam('sort', e.target.value)}>
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <ProductGrid products={products} loading={loading} />

          {pagination.pages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: pagination.pages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => updateParam('page', String(i + 1))}
                  className={`h-9 w-9 rounded-md text-sm font-medium ${
                    page === i + 1 ? 'bg-forest-700 text-white' : 'bg-white text-navy-700 hover:bg-navy-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
