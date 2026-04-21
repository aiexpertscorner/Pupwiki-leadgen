import React from 'react';
import { X, Search, SlidersHorizontal } from 'lucide-react';
import { BreedSize } from '@/src/data/breeds';

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedSize: BreedSize | 'All';
  setSelectedSize: (val: BreedSize | 'All') => void;
  selectedTemperament: string[];
  toggleTemperament: (val: string) => void;
  selectedOrigin: string | 'All';
  setSelectedOrigin: (val: string | 'All') => void;
  selectedType: 'All' | 'Purebred' | 'Crossbreed';
  setSelectedType: (val: 'All' | 'Purebred' | 'Crossbreed') => void;
  origins: string[];
  onClose?: () => void;
}

const TEMPERAMENTS = [
  "Friendly", "Intelligent", "Calm", "Energetic", "Active", "Playful", "Alert", "Devoted", "Lively", "Courageous"
];

export const FilterSection = ({
  searchQuery,
  setSearchQuery,
  selectedSize,
  setSelectedSize,
  selectedTemperament,
  toggleTemperament,
  selectedOrigin,
  setSelectedOrigin,
  selectedType,
  setSelectedType,
  origins,
  onClose
}: FilterSectionProps) => {
  return (
    <div className="space-y-8">
      {onClose && (
        <div className="flex items-center justify-between pb-6 border-b border-divider lg:hidden">
          <h2 className="text-xl font-display font-black uppercase tracking-tight text-text-primary">Quick Filters</h2>
          <button onClick={onClose} className="p-2 text-text-dim hover:text-text-primary transition-colors">
            <X size={24} />
          </button>
        </div>
      )}

      {/* Name Search */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted px-1">Discover Breed</label>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim group-focus-within:text-brand-primary transition-colors" size={16} />
          <input 
            type="text"
            placeholder="Search database..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-base border border-border-subtle rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all text-text-primary placeholder:text-text-dim"
          />
        </div>
      </div>

      {/* Breed Type Filter */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted px-1">Purebred or Mixed</label>
        <div className="flex bg-surface-base p-1.5 rounded-2xl border border-divider">
          {(['All', 'Purebred', 'Crossbreed'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                selectedType === type
                  ? 'bg-surface-elevated text-brand-primary shadow-lg border border-border-subtle'
                  : 'text-text-dim hover:text-text-secondary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted px-1">Dog Size</label>
        <div className="grid grid-cols-2 gap-3">
          {(['All', 'Small', 'Medium', 'Large'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedSize === size
                  ? 'bg-brand-primary text-surface-bg shadow-xl shadow-brand-primary/20 border border-brand-accent/20'
                  : 'bg-surface-base border border-divider text-text-dim hover:border-brand-primary/30 hover:text-text-secondary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Temperament Tags */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted px-1">Dog Personality</label>
        <div className="flex flex-wrap gap-2">
          {TEMPERAMENTS.map((temp) => (
            <button
              key={temp}
              onClick={() => toggleTemperament(temp)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all border ${
                selectedTemperament.includes(temp)
                  ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                  : 'bg-surface-base border-divider text-text-dim hover:border-text-muted'
              }`}
            >
              {temp}
            </button>
          ))}
        </div>
      </div>

      {/* Country of Origin */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted px-1">Where they're from</label>
        <div className="relative">
          <select
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
            className="w-full bg-surface-base border border-divider rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 appearance-none cursor-pointer text-text-primary font-bold transition-all"
          >
            <option value="All">All Countries</option>
            {origins.map(origin => (
              <option key={origin} value={origin}>{origin}</option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-dim">
            <SlidersHorizontal size={14} className="rotate-90" />
          </div>
        </div>
      </div>

      {/* Clear All Button */}
      <button 
        onClick={() => {
          setSearchQuery('');
          setSelectedSize('All');
          setSelectedOrigin('All');
          window.location.reload(); // Quick reset hack for all states if needed
        }}
        className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-text-primary transition-colors border border-dashed border-divider rounded-2xl mt-4"
      >
        Reset All Filters
      </button>
    </div>
  );
};
