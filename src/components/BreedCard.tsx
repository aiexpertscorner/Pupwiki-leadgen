import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Activity, Brain, Scissors } from 'lucide-react';
import { BreedData } from '@/src/data/breeds';

interface BreedCardProps {
  breed: BreedData;
}

export const BreedCard = ({ breed }: BreedCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-brand-primary transition-all cursor-pointer shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 flex flex-col h-full"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
        <img 
          src={breed.image} 
          alt={breed.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
          <h3 className="text-xl md:text-2xl font-display font-black leading-none uppercase tracking-tight text-white drop-shadow-md">
            {breed.name}
          </h3>
          <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
            {breed.size}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1 flex flex-col">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-brand-primary/20 transition-colors">
            <Activity size={14} className="text-brand-primary" />
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center">Energy</span>
            <span className="text-xs font-black text-slate-900">{breed.traits.energyLevel}/10</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-brand-primary/20 transition-colors">
            <Brain size={14} className="text-brand-primary" />
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center">Train</span>
            <span className="text-xs font-black text-slate-900">{breed.traits.trainability}/10</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-brand-primary/20 transition-colors">
            <Scissors size={14} className="text-brand-primary" />
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center">Shed</span>
            <span className="text-xs font-black text-slate-900">{breed.traits.shedding}/10</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {breed.temperament.slice(0, 3).map((temp, i) => (
            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[9px] font-bold border border-slate-200">
              {temp}
            </span>
          ))}
        </div>

        <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed flex-1">
          {breed.description}
        </p>

        <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Insure from</span>
            <span className="text-xl font-black text-slate-900 line-through decoration-slate-200 opacity-30 text-xs">$95/mo</span>
            <span className="text-xl font-black text-brand-primary leading-none">${breed.avgMonthlyInsurance}/mo</span>
          </div>
          <div className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10 group-hover:bg-brand-primary group-hover:shadow-brand-primary/20 transition-all flex items-center gap-2">
            Details
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
