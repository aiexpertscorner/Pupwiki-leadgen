import React from 'react';
import { X, Search } from 'lucide-react';
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
  origins,
  onClose
}: FilterSectionProps) => {
  return (
    <div className="space-y-8">
      {onClose && (
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 lg:hidden">
          <h2 className="text-xl font-display font-black uppercase tracking-tight">Filter Results</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>
      )}

      {/* Name Search */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Breed Name</label>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary" size={16} />
          <input 
            type="text"
            placeholder="Search breeds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all text-slate-900"
          />
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Size Classification</label>
        <div className="grid grid-cols-2 gap-2">
          {(['All', 'Small', 'Medium', 'Large'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedSize === size
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                  : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Temperament Tags */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Temperament</label>
        <div className="flex flex-wrap gap-2">
          {TEMPERAMENTS.map((temp) => (
            <button
              key={temp}
              onClick={() => toggleTemperament(temp)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                selectedTemperament.includes(temp)
                  ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                  : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
              }`}
            >
              {temp}
            </button>
          ))}
        </div>
      </div>

      {/* Country of Origin */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Origin Country</label>
        <select
          value={selectedOrigin}
          onChange={(e) => setSelectedOrigin(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary appearance-none cursor-pointer text-slate-900 font-medium"
        >
          <option value="All">All Countries</option>
          {origins.map(origin => (
            <option key={origin} value={origin}>{origin}</option>
          ))}
        </select>
      </div>

      {/* Clear All Button */}
      <button 
        onClick={() => {
          setSearchQuery('');
          setSelectedSize('All');
          setSelectedOrigin('All');
          // Clear temperament (handled by parent usually, but good to add if passed)
        }}
        className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-900 transition-colors border border-dashed border-slate-200 rounded-xl"
      >
        Reset Filters
      </button>
    </div>
  );
};
