import React from 'react';
import { Search, Dog, ShieldCheck, Menu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border-subtle shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
            <Dog size={20} />
          </div>
          <span className="text-xl font-display font-black tracking-tight uppercase text-slate-900">
            Pup<span className="text-brand-primary">wiki</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-semibold text-slate-600 hover:text-brand-primary transition-colors">Breeds</a>
          <a href="#" className="text-sm font-semibold text-slate-600 hover:text-brand-primary transition-colors">Care Guides</a>
          <a href="#" className="text-sm font-semibold text-slate-600 hover:text-brand-primary transition-colors">Health</a>
          <a href="#" className="text-sm font-semibold text-slate-600 hover:text-brand-primary transition-colors">Community</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold rounded-lg transition-all active:scale-95 shadow-sm shadow-brand-primary/20">
            <ShieldCheck size={18} />
            Free Quote
          </button>
          <button className="md:hidden p-2 text-slate-400">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-border-subtle mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                <Dog size={20} />
              </div>
              <span className="text-xl font-display font-black tracking-tight uppercase text-slate-900">
                Pup<span className="text-brand-primary">wiki</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm">
              The world's most comprehensive programmatic database for dog breeds and health risks. Empowering pet parents with data.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Breeds</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Popular Breeds</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Low Shedding</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Easy to Train</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Hypoallergenic</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Pet Insurance Guide</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Vet Bill Calculator</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Health Risks DB</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Breed Quiz</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-brand-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Referral Policy</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Editorial Stand</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © 2026 Pupwiki.com. Dedicated to pet longevity through data. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
