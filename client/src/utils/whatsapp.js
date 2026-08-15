const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '918500893054';

// Builds a wa.me link with a pre-filled, context-aware message. Used by the
// floating WhatsApp button (generic) and product pages (product-specific).
export function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function productWhatsAppMessage(productName) {
  return `Hello KK Global Trade, I am interested in your ${productName}. Please share export price, MOQ, specifications and shipping details.`;
}

export const GENERIC_WHATSAPP_MESSAGE =
  'Hello KK Global Trade, I would like to know more about your export products and services.';
