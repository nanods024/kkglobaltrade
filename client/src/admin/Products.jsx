import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye, EyeOff, AlertTriangle, X } from 'lucide-react';
import { getProducts, deleteProduct, togglePublishProduct } from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAll = () => {
    setLoading(true);
    getProducts({ all: true, limit: 100 })
      .then((res) => setProducts(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      await deleteProduct(deleteTarget._id);
      setDeleteTarget(null);
      fetchAll();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async (id) => {
    await togglePublishProduct(id);
    fetchAll();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Products</h1>
          <p className="mt-1 text-sm text-navy-400">Manage the product catalogue shown on the website.</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-navy-100 bg-navy-50 text-left text-xs uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">MOQ</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {loading && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-navy-400">Loading...</td></tr>
            )}
            {!loading && products.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-navy-400">No products yet. Add your first product, or run the seed script.</td></tr>
            )}
            {products.map((p) => (
              <tr key={p._id}>
                <td className="px-4 py-3 font-medium text-navy-900">{p.name}</td>
                <td className="px-4 py-3 text-navy-500">{p.category}</td>
                <td className="px-4 py-3 text-navy-500">{p.minimumOrderQuantity || '—'}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      p.published ? 'bg-forest-50 text-forest-700' : 'bg-navy-100 text-navy-500'
                    }`}
                  >
                    {p.published ? 'Published' : 'Unpublished'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      title={p.published ? 'Unpublish' : 'Publish'}
                      onClick={() => handleTogglePublish(p._id)}
                      className="rounded-md p-2 text-navy-500 hover:bg-navy-50"
                    >
                      {p.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <Link to={`/admin/products/${p._id}/edit`} className="rounded-md p-2 text-navy-500 hover:bg-navy-50">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(p)}
                      className="rounded-md p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy-900">Delete product?</h2>
                  <p className="mt-1 text-sm text-navy-500">
                    You are about to remove <span className="font-semibold text-navy-900">{deleteTarget.name}</span>.
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close delete dialog"
                onClick={() => setDeleteTarget(null)}
                className="rounded-full p-1.5 text-navy-400 transition hover:bg-navy-50 hover:text-navy-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300"
              >
                {isDeleting ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
