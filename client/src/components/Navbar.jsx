import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { NAV_LINKS, COMPANY } from '../utils/constants';
import { buildWhatsAppLink, GENERIC_WHATSAPP_MESSAGE } from '../utils/whatsapp';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full nav-glass transition-all duration-300 ${
        scrolled ? 'shadow-nav' : 'shadow-none'
      }`}
    >
      <div
        className={`container-page flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-[68px]' : 'h-20 sm:h-24'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/brand/logo-nav.png"
            alt="KK Global Trade"
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-10' : 'h-12 sm:h-14'}`}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-3.5 py-2 text-[13.5px] font-medium tracking-wide transition-colors hover:text-forest-700 ${
                  isActive ? 'text-forest-700' : 'text-navy-600'
                }`
              }
              end={link.to === '/'}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gold-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 text-[13px] font-medium text-navy-500 transition-colors hover:text-forest-700"
          >
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.phone}
          </a>
          <a
            href={buildWhatsAppLink(GENERIC_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#128C4A] transition-transform hover:scale-105 hover:bg-[#25D366]/20"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <Link to="/contact" className="btn-gold !py-2.5">
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-navy-700 transition-colors hover:bg-navy-50 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-navy-100 bg-white/95 backdrop-blur-md lg:hidden"
          >
            <motion.nav
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: {},
              }}
              className="container-page flex flex-col gap-1.5 py-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.to}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -12 },
                  }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2.5 text-base font-medium ${
                        isActive ? 'bg-forest-50 text-forest-700' : 'text-navy-700'
                      }`
                    }
                    end={link.to === '/'}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -12 } }}
                className="mt-3 flex flex-col gap-3"
              >
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 px-3 text-sm font-medium text-navy-500"
                >
                  <Phone className="h-4 w-4" />
                  {COMPANY.phone}
                </a>
                <div className="flex gap-3 px-3">
                  <a
                    href={buildWhatsAppLink(GENERIC_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="btn-whatsapp flex-1"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold flex-1">
                    Request a Quote
                  </Link>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
