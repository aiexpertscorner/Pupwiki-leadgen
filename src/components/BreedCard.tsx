import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Activity, Brain, Scissors } from 'lucide-react';
import { BreedData } from '@/src/data/breeds';
import { SmartImage } from './ui/SmartImage';

interface BreedCardProps {
  breed: BreedData;
}

export const BreedCard = ({ breed }: BreedCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-surface-main border border-divider rounded-[32px] overflow-hidden hover:border-brand-primary transition-all cursor-pointer shadow-2xl flex flex-col h-full premium-card hover:shadow-brand-primary/5"
    >
      <div className="relative h-52 md:h-64 overflow-hidden bg-surface-base">
        <SmartImage 
          src={breed.image} 
          alt={breed.name}
          className="w-full h-full group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100 brightness-[0.85] group-hover:brightness-[1.05] grayscale-[0.2] group-hover:grayscale-0"
        />
        {/* Subtle Brand Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-bg via-transparent to-brand-primary/5 opacity-70 group-hover:opacity-40 transition-opacity duration-700" />
        
        {/* Hover Highlight Glow Overlay */}
        <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-soft-light" />

        <div className="absolute top-4 left-4 right-4 md:top-5 md:left-5 md:right-5 flex justify-between items-start z-10">
           {breed.isCrossbreed ? (
             <div className="px-2.5 py-1.5 bg-brand-primary text-surface-bg text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl">
               Hybrid
             </div>
           ) : (
             <div className="px-2.5 py-1.5 bg-surface-elevated/90 backdrop-blur-md text-brand-primary text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-lg border border-brand-primary/30">
               Purebred
             </div>
           )}
           <div className="px-2.5 py-1.5 bg-black/65 backdrop-blur-md rounded-lg text-[8px] md:text-[9px] font-black text-white uppercase tracking-widest border border-white/10 shadow-lg">
              Rank #{breed.akc_popularity || '??'}
           </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 z-10">
          <h3 className="text-2xl md:text-3xl font-display font-black leading-none uppercase tracking-tighter text-white drop-shadow-2xl">
            {breed.name}
          </h3>
        </div>
      </div>

      <div className="p-5 md:p-8 space-y-5 md:space-y-8 flex-1 flex flex-col">
        {/* Key Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1 p-2.5 bg-surface-base rounded-2xl border border-divider group-hover:border-brand-primary/20 transition-colors">
            <Activity size={14} className="text-brand-primary opacity-60 md:size-4" />
            <span className="text-[8px] md:text-[9px] font-black text-text-dim uppercase tracking-widest text-center">Energy</span>
            <span className="text-xs md:text-sm font-black text-text-primary uppercase">{breed.traits.energyLevel}/10</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2.5 bg-surface-base rounded-2xl border border-divider group-hover:border-brand-primary/20 transition-colors overflow-hidden">
            <Brain size={14} className="text-brand-primary opacity-60 md:size-4" />
            <span className="text-[8px] md:text-[9px] font-black text-text-dim uppercase tracking-widest text-center">Smart Level</span>
            <span className="text-xs md:text-sm font-black text-text-primary uppercase tracking-tighter truncate w-full text-center">
              {breed.ranking_data?.intelligence_label?.split(' ')[0] || "Standard"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2.5 bg-surface-base rounded-2xl border border-divider group-hover:border-brand-primary/20 transition-colors">
            <Scissors size={14} className="text-brand-primary opacity-60 md:size-4" />
            <span className="text-[8px] md:text-[9px] font-black text-text-dim uppercase tracking-widest text-center">Size</span>
            <span className="text-xs md:text-sm font-black text-brand-primary uppercase truncate w-full text-center">{breed.size}</span>
          </div>
        </div>

        {/* Behavioral Metadata */}
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {typeof breed.temperament === 'string' ? breed.temperament.split(', ').slice(0, 3).map((temp, i) => (
            <span key={i} className="px-2.5 py-1.5 bg-surface-base text-text-muted rounded-lg text-[9px] md:text-[10px] font-black border border-divider uppercase tracking-tight">
              {temp}
            </span>
          )) : breed.temperament.slice(0, 3).map((temp, i) => (
            <span key={i} className="px-2.5 py-1.5 bg-surface-base text-text-muted rounded-lg text-[9px] md:text-[10px] font-black border border-divider uppercase tracking-tight">
              {temp}
            </span>
          ))}
        </div>

        <p className="text-xs md:text-sm text-text-dim font-bold leading-relaxed line-clamp-2 italic opacity-60 flex-1">
          "{breed.description}"
        </p>

        {/* Monthly Care Cost */}
        <div className="flex items-center justify-between pt-6 border-t border-divider mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] md:text-[10px] font-black text-text-dim uppercase tracking-widest">Est. Insurance</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-black text-brand-primary tracking-tighter">${breed.avgMonthlyInsurance}</span>
              <span className="text-xs md:text-sm font-bold text-text-dim">/mo</span>
            </div>
          </div>
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="p-3.5 md:p-4 bg-brand-primary/10 border-2 border-brand-primary/20 text-brand-primary rounded-xl md:rounded-2xl transition-all group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-surface-bg shadow-xl"
          >
             <ArrowRight size={20} className="md:size-6" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
