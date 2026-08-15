export const COMPANY = {
  name: 'KK Global Trade',
  address: 'Kurnool, Andhra Pradesh, India',
  phone: import.meta.env.VITE_COMPANY_PHONE || '+91 8500893054',
  email: import.meta.env.VITE_COMPANY_EMAIL || 'kkglobaltrade1@gmail.com',
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Quality & Compliance', to: '/quality-compliance' },
  { label: 'Global Trade', to: '/global-trade' },
  { label: 'Private Label', to: '/private-label' },
  { label: 'Contact', to: '/contact' },
];

export const PRODUCT_CATEGORIES = ['Spices', 'Pulses', 'Millets & Grains', 'Superfoods', 'Natural Ingredients'];

export const AVAILABILITY_OPTIONS = ['In Stock', 'Seasonal', 'On Request'];

export const UNIT_OPTIONS = ['KG', 'MT', 'Container (20ft)', 'Container (40ft)', 'Other'];

export const ENQUIRY_STATUSES = ['New', 'Contacted', 'Quotation Sent', 'Negotiation', 'Confirmed', 'Closed'];
