import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BookOpen,
  ChevronRight,
  HeartPulse,
  Menu,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';

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

const LOGO_SRC = '/Pupwiki-logo.png';

const NAV_LINKS = [
  { label: 'Browse Breeds', view: 'home', icon: BookOpen },
  { label: 'Health Guides', view: 'home', icon: HeartPulse },
  { label: 'Methodology', view: 'methodology', icon: ShieldCheck },
  { label: 'About Us', view: 'about', icon: Users },
] as const;

const BrandLogo = ({ onClick, variant = 'header' }: BrandLogoProps) => {
  const isHeader = variant === 'header';

  const image = (
    <img
      src={LOGO_SRC}
      alt="PupWiki"
      className={
        isHeader
          ? 'block h-[3.2rem] w-auto max-w-[220px] object-contain origin-left transition-transform duration-200 group-hover:scale-[1.02] sm:h-[3.35rem] sm:max-w-[235px] md:h-[3.5rem] md:max-w-[250px]'
          : 'block h-[3.35rem] w-auto max-w-[240px] object-contain sm:h-[3.7rem] sm:max-w-[270px]'
      }
      loading={isHeader ? 'eager' : 'lazy'}
      decoding="async"
    />
  );

  if (!onClick) return image;

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        isHeader
          ? 'group flex items-center shrink-0 overflow-visible'
          : 'group inline-flex items-center rounded-[1.15rem] bg-white/95 px-3.5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.14)] ring-1 ring-white/10 transition-transform duration-200 hover:scale-[1.01]'
      }
      aria-label="PupWiki home"
    >
      {image}
    </button>
  );
};

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
            ? 'border-b border-stone-200/80 bg-white/95 backdrop-blur-md shadow-[0_2px_18px_rgba(0,0,0,0.06)]'
            : 'bg-white/88 backdrop-blur-sm'
        }`}
      >
        <div className="hidden sm:block bg-brand-dark text-amber-100">
          <p className="max-w-7xl mx-auto px-4 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.22em]">
            ✦&nbsp; Actuarial Data &nbsp;·&nbsp; 81 Breeds &nbsp;·&nbsp; All 50 States
            &nbsp;·&nbsp; Updated April 2026 &nbsp;✦
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:h-[5.25rem] sm:gap-6 sm:px-5 lg:px-6">
          <BrandLogo variant="header" onClick={() => handleNav('home')} />

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, view }) => {
              const isActive = currentView === view && view !== 'home';

              return (
                <button
                  key={label}
                  onClick={() => handleNav(view)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-primary/8 text-brand-primary shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]'
                      : 'text-text-muted hover:bg-stone-100 hover:text-text-primary'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleNav('discovery-quiz')}
              className="hidden sm:flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-primary/20 transition-all hover:bg-brand-accent active:scale-95"
            >
              Find My Breed <ChevronRight size={15} className="-mr-1" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-stone-100 hover:text-brand-primary"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="fixed left-0 right-0 top-20 z-40 border-b border-stone-200 bg-white shadow-xl md:hidden sm:top-[calc(5.25rem+1.625rem)]"
            >
              <div className="max-w-7xl mx-auto space-y-1 px-4 py-5">
                {NAV_LINKS.map(({ label, view, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleNav(view)}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-base font-medium text-text-secondary transition-all hover:bg-stone-50 hover:text-text-primary"
                  >
                    <Icon size={18} className="shrink-0 text-brand-primary" />
                    {label}
                  </button>
                ))}

                <div className="pt-3 border-t border-stone-200">
                  <button
                    onClick={() => handleNav('discovery-quiz')}
                    className="w-full rounded-xl bg-brand-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
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
    <footer className="bg-[#17120E] text-stone-300">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              <BrandLogo variant="footer" onClick={() => onNavigate('home')} />

              <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-300">
                The authoritative reference for dog breed health data, actuarial insurance costs,
                and lifestyle-matched breed discovery.
              </p>

              <p className="mt-3 max-w-xs text-xs leading-relaxed text-amber-100/70">
                Source-referenced · Actuarial data · Editorially independent
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200/55">
                {col.heading}
              </h4>

              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-left text-sm text-stone-300/88 transition-colors hover:text-amber-300"
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

      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:flex-row sm:px-5 sm:text-left lg:px-6">
          <p className="text-xs text-stone-400/80">
            © {year} PupWiki. Reference data for educational purposes only.&nbsp;
            <span className="text-stone-500">Always consult a licensed veterinarian.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium text-stone-400/80 sm:justify-end sm:gap-6">
            <button
              onClick={() => onNavigate('about')}
              className="transition-colors hover:text-amber-300"
            >
              Privacy
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="transition-colors hover:text-amber-300"
            >
              Terms
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="transition-colors hover:text-amber-300"
            >
              Cookies
            </button>
            <button
              onClick={() => onNavigate('editorial')}
              className="transition-colors hover:text-amber-300"
            >
              Affiliate Disclosure
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};