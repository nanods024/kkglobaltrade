import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, UploadCloud, X } from 'lucide-react';
import {
  getProducts,
  createProduct,
  updateProduct,
  uploadProductImages,
} from '../services/api';
import { PRODUCT_CATEGORIES, AVAILABILITY_OPTIONS } from '../utils/constants';

// Converts newline-separated textarea input <-> string[] fields the API
// expects (packaging, applications), and comma-separated spec rows.
function toListValue(text) {
  return text
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean);
}

export default function ProductForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [specRows, setSpecRows] = useState([{ parameter: '', value: '' }]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      category: PRODUCT_CATEGORIES[0],
      hsCode: '',
      botanicalName: '',
      shortDescription: '',
      description: '',
      grade: '',
      moisture: '',
      minimumOrderQuantity: '',
      countryOfOrigin: 'India',
      sourcingRegion: '',
      priceBasis: '',
      leadTime: '',
      availability: 'On Request',
      packagingText: '',
      applicationsText: '',
      featured: false,
      published: true,
      seoTitle: '',
      seoDescription: '',
    },
  });

  useEffect(() => {
    if (mode !== 'edit' || !id) return;
    // The admin edit route only has the Mongo _id, but the read API is
    // slug-based; list-then-find keeps this simple without a second
    // "get by id" backend route.
    getProducts({ all: true, limit: 200 }).then((res) => {
      const product = res.data.data.find((p) => p._id === id);
      if (!product) {
        setError('Product not found');
        setLoading(false);
        return;
      }
      reset({
        ...product,
        packagingText: (product.packaging || []).join('\n'),
        applicationsText: (product.applications || []).join('\n'),
      });
      setImages(product.images || []);
      setSpecRows(product.specifications?.length ? product.specifications : [{ parameter: '', value: '' }]);
      setLoading(false);
    });
  }, [mode, id, reset]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append('images', f));
      const res = await uploadProductImages(formData);
      setImages((prev) => [...prev, ...res.data.urls]);
      if (res.data.warning) setError(res.data.warning);
    } catch (err) {
      setError(err.response?.data?.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url) => setImages((prev) => prev.filter((u) => u !== url));

  const updateSpecRow = (idx, field, value) => {
    setSpecRows((prev) => prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row)));
  };

  const addSpecRow = () => setSpecRows((prev) => [...prev, { parameter: '', value: '' }]);
  const removeSpecRow = (idx) => setSpecRows((prev) => prev.filter((_, i) => i !== idx));

  const onSubmit = async (data) => {
    setError('');
    const payload = {
      ...data,
      packaging: toListValue(data.packagingText || ''),
      applications: toListValue(data.applicationsText || ''),
      specifications: specRows.filter((r) => r.parameter && r.value),
      images,
    };
    delete payload.packagingText;
    delete payload.applicationsText;

    try {
      if (mode === 'edit') {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    }
  };

  if (loading) return <p className="text-navy-400">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">{mode === 'edit' ? 'Edit Product' : 'Add Product'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field">Product Name *</label>
            <input className="input-field" {...register('name', { required: true })} />
          </div>
          <div>
            <label className="label-field">Category *</label>
            <select className="input-field" {...register('category', { required: true })}>
              {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label-field">HS Code</label>
            <input className="input-field" {...register('hsCode')} />
          </div>
          <div>
            <label className="label-field">Botanical Name</label>
            <input className="input-field" {...register('botanicalName')} />
          </div>
          <div>
            <label className="label-field">Grade</label>
            <input className="input-field" {...register('grade')} />
          </div>
          <div>
            <label className="label-field">Moisture</label>
            <input className="input-field" {...register('moisture')} />
          </div>
          <div>
            <label className="label-field">Minimum Order Quantity</label>
            <input className="input-field" {...register('minimumOrderQuantity')} />
          </div>
          <div>
            <label className="label-field">Country of Origin</label>
            <input className="input-field" {...register('countryOfOrigin')} />
          </div>
          <div>
            <label className="label-field">Sourcing Region</label>
            <input className="input-field" {...register('sourcingRegion')} />
          </div>
          <div>
            <label className="label-field">Availability</label>
            <select className="input-field" {...register('availability')}>
              {AVAILABILITY_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="label-field">Price Basis</label>
            <input className="input-field" {...register('priceBasis')} />
          </div>
          <div>
            <label className="label-field">Lead Time</label>
            <input className="input-field" {...register('leadTime')} />
          </div>
        </div>

        <div>
          <label className="label-field">Short Description</label>
          <textarea rows={2} className="input-field" {...register('shortDescription')} />
        </div>
        <div>
          <label className="label-field">Full Description</label>
          <textarea rows={4} className="input-field" {...register('description')} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field">Packaging (one per line)</label>
            <textarea rows={3} className="input-field" {...register('packagingText')} />
          </div>
          <div>
            <label className="label-field">Applications (one per line)</label>
            <textarea rows={3} className="input-field" {...register('applicationsText')} />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="label-field mb-0">Technical Specifications</label>
            <button type="button" onClick={addSpecRow} className="text-sm font-medium text-forest-700 hover:underline">
              + Add Row
            </button>
          </div>
          <div className="space-y-2">
            {specRows.map((row, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  className="input-field"
                  placeholder="Parameter (e.g. ASTA Colour)"
                  value={row.parameter}
                  onChange={(e) => updateSpecRow(idx, 'parameter', e.target.value)}
                />
                <input
                  className="input-field"
                  placeholder="Value (e.g. 80-160+)"
                  value={row.value}
                  onChange={(e) => updateSpecRow(idx, 'value', e.target.value)}
                />
                <button type="button" onClick={() => removeSpecRow(idx)} className="rounded-md px-2 text-red-500 hover:bg-red-50">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="label-field">Product Images</label>
          <div className="flex flex-wrap gap-3">
            {images.map((url) => (
              <div key={url} className="relative h-20 w-20 overflow-hidden rounded-md border border-navy-100">
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-navy-200 text-navy-400 hover:border-forest-400 hover:text-forest-600">
              <UploadCloud className="h-5 w-5" />
              <span className="text-[10px]">{uploading ? 'Uploading...' : 'Upload'}</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field">SEO Title</label>
            <input className="input-field" {...register('seoTitle')} />
          </div>
          <div>
            <label className="label-field">SEO Description</label>
            <input className="input-field" {...register('seoDescription')} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" {...register('featured')} className="h-4 w-4 rounded border-navy-300" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-navy-700">
            <input type="checkbox" {...register('published')} className="h-4 w-4 rounded border-navy-300" />
            Published
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            <Save className="h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="rounded-md border border-navy-200 px-6 py-3 text-sm font-semibold text-navy-600 hover:bg-navy-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
