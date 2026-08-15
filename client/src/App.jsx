import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Quality from './pages/Quality';
import GlobalTrade from './pages/GlobalTrade';
import PrivateLabel from './pages/PrivateLabel';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import ProtectedRoute from './routes/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import AdminProducts from './admin/Products';
import ProductForm from './admin/ProductForm';
import Enquiries from './admin/Enquiries';
import Settings from './admin/Settings';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetails />} />
        <Route path="quality-compliance" element={<Quality />} />
        <Route path="global-trade" element={<GlobalTrade />} />
        <Route path="private-label" element={<PrivateLabel />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Admin */}
      <Route path="admin/login" element={<Login />} />
      <Route path="admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<ProductForm mode="create" />} />
          <Route path="products/:id/edit" element={<ProductForm mode="edit" />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
