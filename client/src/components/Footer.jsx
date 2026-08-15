import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY } from '../utils/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/80">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page section-padding relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-flex rounded-xl bg-white p-3 shadow-glass">
            <img src="/brand/logo-footer.png" alt="KK Global Trade" className="h-14 w-auto" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            Indian agricultural exporter connecting trusted sourcing with international buyers of spices, pulses,
            millets and natural ingredients.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-300">Company</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-gold-300 transition-colors">About Us</Link></li>
            <li><Link to="/quality-compliance" className="hover:text-gold-300 transition-colors">Quality & Compliance</Link></li>
            <li><Link to="/global-trade" className="hover:text-gold-300 transition-colors">Global Trade</Link></li>
            <li><Link to="/private-label" className="hover:text-gold-300 transition-colors">Private Label</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-300">Products</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/products?category=Spices" className="hover:text-gold-300 transition-colors">Spices</Link></li>
            <li><Link to="/products?category=Pulses" className="hover:text-gold-300 transition-colors">Pulses</Link></li>
            <li><Link to="/products?category=Millets+%26+Grains" className="hover:text-gold-300 transition-colors">Millets & Grains</Link></li>
            <li><Link to="/products?category=Superfoods" className="hover:text-gold-300 transition-colors">Superfoods</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-300">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              {COMPANY.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-300" />
              <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-gold-300 transition-colors">{COMPANY.phone}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-300" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-gold-300 transition-colors">{COMPANY.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-white/50">© {year} KK Global Trade. All rights reserved.</p>
          <div className="text-center sm:text-right">
            <p className="text-sm font-medium text-white/80">Looking for a reliable Indian export partner?</p>
            <Link to="/contact" className="btn-gold mt-2 inline-flex">
              Request a Quote
            </Link>
          </div>
        </div>
        <div className="container-page py-4 text-center">
          <p className="text-xs text-white/40">
            Designed by{" "}
            <a
              href="https://nanodigitalservices.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              Nano
              <span className="text-blue-400 ml-1">⚡</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
