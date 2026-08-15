import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle, Send } from 'lucide-react';
import { createEnquiry } from '../services/api';
import { buildWhatsAppLink, productWhatsAppMessage, GENERIC_WHATSAPP_MESSAGE } from '../utils/whatsapp';
import { UNIT_OPTIONS } from '../utils/constants';

// Used on every product detail page ("Request a Quote") and can also be
// embedded standalone (e.g. a general enquiry section on the home page).
export default function QuoteForm({ product }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      product: product?.name || '',
      unit: 'MT',
    },
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setError('');
    try {
      await createEnquiry({ ...data, productSlug: product?.slug || '' });
      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again or WhatsApp us directly.');
    }
  };

  const whatsappLink = buildWhatsAppLink(
    product ? productWhatsAppMessage(product.name) : GENERIC_WHATSAPP_MESSAGE
  );

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <h3 className="text-xl font-semibold text-navy-900">Thank you.</h3>
        <p className="mt-2 text-navy-500">Our export team will review your enquiry and contact you shortly.</p>
        <button type="button" onClick={() => setSubmitted(false)} className="btn-primary mt-6">
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5 p-6 sm:p-8">
      <div>
        <h3 className="text-xl font-semibold text-navy-900">Request a Quote</h3>
        <p className="mt-1 text-sm text-navy-500">
          {product ? `Enquire about ${product.name}` : 'Tell us what you are looking for and we will get back to you.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="name">Name *</label>
          <input id="name" className="input-field" {...register('name', { required: 'Name is required' })} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label-field" htmlFor="companyName">Company Name</label>
          <input id="companyName" className="input-field" {...register('companyName')} />
        </div>
        <div>
          <label className="label-field" htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            className="input-field"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label-field" htmlFor="phone">Phone *</label>
          <input id="phone" className="input-field" {...register('phone', { required: 'Phone is required' })} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="label-field" htmlFor="country">Country *</label>
          <input id="country" className="input-field" {...register('country', { required: 'Country is required' })} />
          {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
        </div>
        <div>
          <label className="label-field" htmlFor="product">Product</label>
          <input id="product" className="input-field" readOnly={Boolean(product)} {...register('product')} />
        </div>
        <div>
          <label className="label-field" htmlFor="quantity">Required Quantity</label>
          <input id="quantity" className="input-field" placeholder="e.g. 25" {...register('quantity')} />
        </div>
        <div>
          <label className="label-field" htmlFor="unit">Unit</label>
          <select id="unit" className="input-field" {...register('unit')}>
            {UNIT_OPTIONS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-field" htmlFor="grade">Grade / Specification</label>
          <input id="grade" className="input-field" {...register('grade')} />
        </div>
        <div>
          <label className="label-field" htmlFor="packaging">Packaging Requirement</label>
          <input id="packaging" className="input-field" {...register('packaging')} />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="destination">Destination Port</label>
          <input id="destination" className="input-field" {...register('destination')} />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="message">Message</label>
          <textarea id="message" rows={4} className="input-field" {...register('message')} />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
          <Send className="h-4 w-4" />
          {isSubmitting ? 'Submitting...' : 'Submit RFQ'}
        </button>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1">
          <MessageCircle className="h-4 w-4" />
          WhatsApp Enquiry
        </a>
      </div>
    </form>
  );
}
