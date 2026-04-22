import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dog, Menu, X, ChevronRight, BookOpen, HeartPulse, ShieldCheck, Users } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavProps {
  onNavigate: (view: string) => void;
  currentView?: string;
}

// ─── Desktop nav link definitions ─────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Browse Breeds', view: 'home',        icon: BookOpen    },
  { label: 'Health Guides', view: 'home',        icon: HeartPulse  },
  { label: 'Methodology',   view: 'methodology', icon: ShieldCheck },
  { label: 'About Us',      view: 'about',       icon: Users       },
];

// ─── Header ───────────────────────────────────────────────────────────────────

export const Header = ({ onNavigate, currentView }: NavProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled]             = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu whenever the view changes
  useEffect(() => { setIsMobileMenuOpen(false); }, [currentView]);

  const handleNav = (view: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Sticky shell ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        {/* ── Top editorial ribbon ── */}
        <div className="bg-brand-dark text-amber-100 hidden sm:block">
          <p className="max-w-7xl mx-auto px-4 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.22em]">
            ✦&nbsp; Actuarial Data &nbsp;·&nbsp; 81 Breeds &nbsp;·&nbsp; All 50 States &nbsp;·&nbsp; Updated April 2026 &nbsp;✦
          </p>
        </div>

        {/* ── Main nav bar ── */}
        <div className="max-w-7xl mx-auto px-4 h-[4.5rem] flex items-center justify-between gap-6">

          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="PupWiki home"
          >
            <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-brand-primary/25 group-hover:scale-105 transition-transform">
              <Dog size={20} />
            </div>
            <span className="text-[1.35rem] font-display font-black text-text-primary leading-none select-none">
              Pup<span className="text-brand-primary italic">Wiki</span>
            </span>
          </button>

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
              onClick={() => setIsMobileMenuOpen(o => !o)}
              className="md:hidden p-2 -mr-1 text-text-muted hover:text-brand-primary transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
            />

            {/* Panel */}
            <motion.div
              key="mobile-panel"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="fixed top-[calc(4.5rem+1.625rem)] left-0 right-0 z-40 bg-white border-b border-border-subtle shadow-xl md:hidden"
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

export const Footer = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: 'Explore',
      links: [
        { label: 'All Breeds',       action: () => onNavigate('home')        },
        { label: 'Breed Finder Quiz', action: () => onNavigate('discovery-quiz') },
        { label: 'Designer Hybrids', action: () => onNavigate('home')        },
        { label: 'Health Benchmarks', action: () => onNavigate('home')       },
      ],
    },
    {
      heading: 'Health & Data',
      links: [
        { label: 'Data Methodology',  action: () => onNavigate('methodology') },
        { label: 'Insurance Metrics', action: () => onNavigate('home')        },
        { label: 'Condition Guides',  action: () => onNavigate('home')        },
        { label: 'Care Protocols',    action: () => onNavigate('home')        },
      ],
    },
    {
      heading: 'About Us',
      links: [
        { label: 'Our Mission',          action: () => onNavigate('about')    },
        { label: 'Editorial Standards',  action: () => onNavigate('editorial') },
        { label: 'Our Team',             action: () => onNavigate('about')    },
        { label: 'Affiliate Disclosure', action: () => onNavigate('about')    },
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
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-brand-primary/25">
                <Dog size={20} />
              </div>
              <span className="text-[1.35rem] font-display font-black text-white leading-none">
                Pup<span className="text-brand-primary italic">Wiki</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              The authoritative reference for dog breed health data, actuarial insurance costs,
              and lifestyle-matched breed discovery.
            </p>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              Source-referenced · Actuarial data · Editorially independent
            </p>
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-bold text-stone-500 uppercase tracking-[0.18em] mb-6">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map(link => (
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
          <div className="flex items-center gap-6 text-[11px] font-medium text-stone-500">
            <button onClick={() => onNavigate('about')}    className="hover:text-amber-400 transition-colors">Privacy</button>
            <button onClick={() => onNavigate('about')}    className="hover:text-amber-400 transition-colors">Terms</button>
            <button onClick={() => onNavigate('about')}    className="hover:text-amber-400 transition-colors">Cookies</button>
            <button onClick={() => onNavigate('editorial')} className="hover:text-amber-400 transition-colors">Affiliate Disclosure</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
