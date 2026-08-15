import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import { submitContact } from '../services/api';
import { buildWhatsAppLink, GENERIC_WHATSAPP_MESSAGE } from '../utils/whatsapp';
import { COMPANY } from '../utils/constants';

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setError('');
    try {
      await submitContact(data);
      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again or WhatsApp us directly.');
    }
  };

  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact KK Global Trade in Kurnool, Andhra Pradesh, India for export enquiries, quotations and product information."
      />

      <PageHero eyebrow="Contact" title="Talk to Our Export Team" />

      <section className="section-padding bg-white">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-navy-900">KK Global Trade</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" />
                <span className="text-navy-700">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-forest-600" />
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="text-navy-700 hover:text-forest-700">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-forest-600" />
                <a href={`mailto:${COMPANY.email}`} className="text-navy-700 hover:text-forest-700">
                  {COMPANY.email}
                </a>
              </li>
            </ul>

            <a
              href={buildWhatsAppLink(GENERIC_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-8 inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>

            <div className="mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-navy-100 shadow-glass">
              <iframe
                title="KK Global Trade location - Kurnool, Andhra Pradesh"
                src="https://www.google.com/maps?q=Kurnool,+Andhra+Pradesh,+India&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div className="card p-8 text-center">
                <h3 className="text-xl font-semibold text-navy-900">Thank you.</h3>
                <p className="mt-2 text-navy-500">
                  Our export team will review your enquiry and contact you shortly.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="btn-primary mt-6">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-navy-900">Send Enquiry</h3>
                <div>
                  <label className="label-field" htmlFor="c-name">Name *</label>
                  <input id="c-name" className="input-field" {...register('name', { required: true })} />
                  {errors.name && <p className="mt-1 text-xs text-red-600">Name is required</p>}
                </div>
                <div>
                  <label className="label-field" htmlFor="c-companyName">Company Name</label>
                  <input id="c-companyName" className="input-field" {...register('companyName')} />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label-field" htmlFor="c-email">Email *</label>
                    <input id="c-email" type="email" className="input-field" {...register('email', { required: true })} />
                    {errors.email && <p className="mt-1 text-xs text-red-600">Email is required</p>}
                  </div>
                  <div>
                    <label className="label-field" htmlFor="c-phone">Phone *</label>
                    <input id="c-phone" className="input-field" {...register('phone', { required: true })} />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">Phone is required</p>}
                  </div>
                </div>
                <div>
                  <label className="label-field" htmlFor="c-country">Country</label>
                  <input id="c-country" className="input-field" {...register('country')} />
                </div>
                <div>
                  <label className="label-field" htmlFor="c-message">Message *</label>
                  <textarea id="c-message" rows={5} className="input-field" {...register('message', { required: true })} />
                  {errors.message && <p className="mt-1 text-xs text-red-600">Message is required</p>}
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
