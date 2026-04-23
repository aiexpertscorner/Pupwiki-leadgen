import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, BookOpen, HeartPulse, ShieldCheck, Users } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavProps {
  onNavigate: (view: string) => void;
  currentView?: string;
}

interface FooterProps {
  onNavigate: (view: string) => void;
}

interface BrandLogoProps {
  onClick?: () => void;
  variant?: 'header' | 'footer';
}

// ─── Shared nav links ─────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Browse Breeds', view: 'home', icon: BookOpen },
  { label: 'Health Guides', view: 'home', icon: HeartPulse },
  { label: 'Methodology', view: 'methodology', icon: ShieldCheck },
  { label: 'About Us', view: 'about', icon: Users },
];

// ─── Reusable brand logo ──────────────────────────────────────────────────────

const BrandLogo = ({ onClick, variant = 'header' }: BrandLogoProps) => {
  const isHeader = variant === 'header';

  const content = (
    <img
      src="/Pupwiki-logo.png"
      alt="PupWiki"
      className={
        isHeader
          ? 'block h-12 w-auto max-w-[190px] object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-[3.15rem] sm:max-w-[220px] md:h-[3.35rem] md:max-w-[240px]'
          : 'block h-12 w-auto max-w-[220px] object-contain sm:h-14 sm:max-w-[250px]'
      }
      loading={isHeader ? 'eager' : 'lazy'}
      decoding="async"
    />
  );

  if (!onClick) return content;

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        isHeader
          ? 'group flex items-center shrink-0'
          : 'group inline-flex items-center rounded-2xl bg-white/95 px-3 py-2 shadow-sm ring-1 ring-white/10 transition-transform hover:scale-[1.01]'
      }
      aria-label="PupWiki home"
    >
      {content}
    </button>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────

export const Header = ({ onNavigate, currentView }: NavProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  const handleNav = (view: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        {/* ── Top editorial ribbon ── */}
        <div className="hidden sm:block bg-brand-dark text-amber-100">
          <p className="max-w-7xl mx-auto px-4 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.22em]">
            ✦&nbsp; Actuarial Data &nbsp;·&nbsp; 81 Breeds &nbsp;·&nbsp; All 50 States
            &nbsp;·&nbsp; Updated April 2026 &nbsp;✦
          </p>
        </div>

        {/* ── Main nav bar ── */}
        <div className="max-w-7xl mx-auto px-4 h-20 sm:h-[5.25rem] flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <BrandLogo variant="header" onClick={() => handleNav('home')} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, view }) => (
              <button
                key={label}
                onClick={() => handleNav(view)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === view && view !== 'home'
                    ? 'text-brand-primary bg-brand-primary/8 font-semibold'
                    : 'text-text-muted hover:text-text-primary hover:bg-stone-100'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleNav('discovery-quiz')}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2 bg-brand-primary hover:bg-brand-accent text-white text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-sm shadow-brand-primary/20 whitespace-nowrap"
            >
              Find My Breed <ChevronRight size={15} className="-mr-1" />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="md:hidden p-2 -mr-1 text-text-muted hover:text-brand-primary transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
            />

            <motion.div
              key="mobile-panel"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="fixed top-20 sm:top-[calc(5.25rem+1.625rem)] left-0 right-0 z-40 bg-white border-b border-border-subtle shadow-xl md:hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-5 space-y-1">
                {NAV_LINKS.map(({ label, view, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleNav(view)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-text-secondary hover:text-text-primary hover:bg-stone-50 transition-all text-left"
                  >
                    <Icon size={18} className="text-brand-primary shrink-0" />
                    {label}
                  </button>
                ))}

                <div className="pt-3 border-t border-divider">
                  <button
                    onClick={() => handleNav('discovery-quiz')}
                    className="w-full py-3.5 bg-brand-primary hover:bg-brand-accent text-white font-semibold rounded-xl text-sm transition-colors"
                  >
                    Find My Breed →
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export const Footer = ({ onNavigate }: FooterProps) => {
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: 'Explore',
      links: [
        { label: 'All Breeds', action: () => onNavigate('home') },
        { label: 'Breed Finder Quiz', action: () => onNavigate('discovery-quiz') },
        { label: 'Designer Hybrids', action: () => onNavigate('home') },
        { label: 'Health Benchmarks', action: () => onNavigate('home') },
      ],
    },
    {
      heading: 'Health & Data',
      links: [
        { label: 'Data Methodology', action: () => onNavigate('methodology') },
        { label: 'Insurance Metrics', action: () => onNavigate('home') },
        { label: 'Condition Guides', action: () => onNavigate('home') },
        { label: 'Care Protocols', action: () => onNavigate('home') },
      ],
    },
    {
      heading: 'About Us',
      links: [
        { label: 'Our Mission', action: () => onNavigate('about') },
        { label: 'Editorial Standards', action: () => onNavigate('editorial') },
        { label: 'Our Team', action: () => onNavigate('about') },
        { label: 'Affiliate Disclosure', action: () => onNavigate('about') },
      ],
    },
  ];

  return (
    <footer className="bg-stone-900 text-stone-400">
      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <BrandLogo variant="footer" onClick={() => onNavigate('home')} />

            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              The authoritative reference for dog breed health data, actuarial insurance costs,
              and lifestyle-matched breed discovery.
            </p>

            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              Source-referenced · Actuarial data · Editorially independent
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-bold text-stone-500 uppercase tracking-[0.18em] mb-6">
                {col.heading}
              </h4>

              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-sm text-stone-400 hover:text-amber-400 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500 text-center sm:text-left">
            © {year} PupWiki. Reference data for educational purposes only.&nbsp;
            <span className="text-stone-600">Always consult a licensed veterinarian.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 text-[11px] font-medium text-stone-500">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-amber-400 transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-amber-400 transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-amber-400 transition-colors"
            >
              Cookies
            </button>
            <button
              onClick={() => onNavigate('editorial')}
              className="hover:text-amber-400 transition-colors"
            >
              Affiliate Disclosure
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};