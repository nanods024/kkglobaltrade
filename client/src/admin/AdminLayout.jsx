import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, MessagesSquare, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LINKS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/enquiries', label: 'Enquiries', icon: MessagesSquare },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-navy-50">
      <aside className="hidden w-64 flex-col bg-navy-950 text-white lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <Link to="/" className="font-display text-lg font-bold">KK Global Trade</Link>
          <p className="mt-0.5 text-xs uppercase tracking-wider text-gold-300">Admin Dashboard</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-forest-700 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 px-4 py-4">
          <p className="truncate text-sm text-white/70">{user?.name}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-3 flex items-center gap-2 text-sm text-white/70 hover:text-gold-300"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-navy-100 bg-white px-6 py-4 lg:hidden">
          <span className="font-display text-lg font-bold text-navy-900">KK Global Trade Admin</span>
          <button type="button" onClick={logout} className="text-sm text-navy-500">Log out</button>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-navy-100 bg-white px-3 py-2 lg:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-forest-50 text-forest-700' : 'text-navy-500'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
