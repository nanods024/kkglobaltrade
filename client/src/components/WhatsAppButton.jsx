import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink, GENERIC_WHATSAPP_MESSAGE } from '../utils/whatsapp';

// Floating action button present on every page. When a product-specific
// message is supplied via props (from a product detail page), it is used
// instead of the generic greeting.
export default function WhatsAppButton({ message, floating = true, className = '' }) {
  const link = buildWhatsAppLink(message || GENERIC_WHATSAPP_MESSAGE);

  if (floating) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with KK Global Trade on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    );
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={`btn-whatsapp ${className}`}>
      <MessageCircle className="h-4 w-4" />
      WhatsApp Us
    </a>
  );
}
