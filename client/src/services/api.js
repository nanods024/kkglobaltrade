import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach the admin JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kkgt_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the admin token expires/is invalid, bounce back to the login page.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('kkgt_admin_token');
      localStorage.removeItem('kkgt_admin_user');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ---- Products ----
export const getProducts = (params) => api.get('/products', { params });
export const getFeaturedProducts = () => api.get('/products/featured');
export const getProductBySlug = (slug) => api.get(`/products/${slug}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const togglePublishProduct = (id) => api.patch(`/products/${id}/publish`);
export const uploadProductImages = (formData) =>
  api.post('/products/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

// ---- Categories ----
export const getCategories = () => api.get('/categories');
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// ---- Enquiries ----
export const createEnquiry = (data) => api.post('/enquiries', data);
export const getEnquiries = (params) => api.get('/enquiries', { params });
export const getEnquiryStats = () => api.get('/enquiries/stats');
export const getEnquiryById = (id) => api.get(`/enquiries/${id}`);
export const updateEnquiry = (id, data) => api.put(`/enquiries/${id}`, data);
export const deleteEnquiry = (id) => api.delete(`/enquiries/${id}`);

// ---- Contact ----
export const submitContact = (data) => api.post('/contact', data);

// ---- Company ----
export const getCompanyProfile = () => api.get('/company');
export const updateCompanyProfile = (data) => api.put('/company', data);

// ---- Auth ----
export const loginAdmin = (data) => api.post('/auth/login', data);
export const getCurrentAdmin = () => api.get('/auth/me');
export const changeAdminPassword = (data) => api.put('/auth/change-password', data);

export default api;
