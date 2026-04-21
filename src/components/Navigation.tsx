import React from 'react';
import { Search, Dog, ShieldCheck, Menu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-main/80 backdrop-blur-md border-b border-divider">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-surface-bg">
            <Dog size={20} />
          </div>
          <span className="text-xl font-display font-black tracking-tight uppercase text-text-primary">
            Pup<span className="text-brand-primary">wiki</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-bold text-text-secondary hover:text-brand-primary transition-colors">Breeds</a>
          <a href="#" className="text-sm font-bold text-text-secondary hover:text-brand-primary transition-colors">Health Guides</a>
          <a href="#" className="text-sm font-bold text-text-secondary hover:text-brand-primary transition-colors">Expert Data</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-text-dim hover:text-brand-primary transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-accent text-surface-bg text-sm font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-brand-primary/10">
            <ShieldCheck size={18} />
            Diagnostics
          </button>
          <button className="md:hidden p-2 text-text-dim">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export const Footer = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  return (
    <footer className="bg-surface-main border-t border-divider mt-20">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-surface-bg">
                <Dog size={20} />
              </div>
              <span className="text-xl font-display font-black tracking-tight uppercase text-text-primary">
                Pup<span className="text-brand-primary">wiki</span>
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              The world's most authoritative database for breed-specific health data. Empowering pet parents with clinical insight.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-xs font-black text-text-muted uppercase tracking-widest mb-8">Directories</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><button onClick={() => onNavigate('home')} className="hover:text-brand-primary transition-colors">Master Breeds</button></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Health Benchmarks</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Designer Hybrids</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Longevity Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-black text-text-muted uppercase tracking-widest mb-8">Expert Resources</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><button onClick={() => onNavigate('methodology')} className="hover:text-brand-primary transition-colors">Data Methodology</button></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Condition Calculator</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Insurance Metrics</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Care Protocols</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-black text-text-muted uppercase tracking-widest mb-8">Authoritative</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><button onClick={() => onNavigate('editorial')} className="hover:text-brand-primary transition-colors">Editorial Standard</button></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Verification Policy</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">E-E-A-T Framework</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Medical Disclosure</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-divider flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-text-dim text-center md:text-left">
            © 2026 Pupwiki. Reference data for educational purposes only. Always consult a veterinarian.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-text-dim">
            <a href="#" className="hover:text-brand-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
