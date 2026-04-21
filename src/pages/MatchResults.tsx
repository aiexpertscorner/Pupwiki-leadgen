import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { breeds, BreedData } from '@/src/data/breeds';
import { BreedCard } from '@/src/components/BreedCard';
import { FinderData } from '@/src/components/BreedFinderQuiz';
import { 
  Trophy, 
  ChevronRight, 
  RefreshCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface MatchResultsProps {
  finderData: FinderData;
  onReset: () => void;
  onSelectBreed: (slug: string) => void;
}

export const MatchResults: React.FC<MatchResultsProps> = ({ finderData, onReset, onSelectBreed }) => {
  const matches = useMemo(() => {
    // Basic scoring algorithm
    const scoredBreeds = breeds.map(breed => {
      let score = 0;

      // Size vs Living
      if (finderData.living === 'apartment') {
        if (breed.size === 'Small' || breed.size === 'small') score += 20;
        else if (breed.size === 'Medium' || breed.size === 'medium') score += 10;
        else score -= 10;
      } else if (finderData.living === 'small_house') {
        score += 15;
      } else {
        score += 20; // Large house fits all
      }

      // Energy vs Activity
      const energy = breed.traits.energyLevel;
      if (finderData.activity === 'low') {
        if (energy <= 4) score += 20;
        else if (energy <= 7) score += 5;
        else score -= 15;
      } else if (finderData.activity === 'moderate') {
        if (energy >= 4 && energy <= 8) score += 20;
        else score += 5;
      } else {
        if (energy >= 7) score += 20;
        else score -= 10;
      }

      // Grooming / Shedding
      const shedding = breed.traits.shedding;
      if (finderData.grooming === 'low') {
         if (shedding <= 3) score += 20;
         else if (shedding <= 6) score += 5;
         else score -= 10;
      } else if (finderData.grooming === 'high') {
         if (shedding >= 7) score += 15;
         else score += 5;
      } else {
         score += 15;
      }

      // Trainability vs Experience
      const train = breed.traits.trainability;
      if (finderData.experience === 'beginner') {
        if (train >= 7) score += 20;
        else score -= 10;
      } else {
        score += 20; // Experienced can handle all
      }

      // Demeanor vs Family (Kids)
      if (finderData.family === 'kids') {
        const demeanor = breed.traits.demeanor_value ? breed.traits.demeanor_value * 10 : 7;
        if (demeanor >= 7) score += 20;
        else score -= 10;
      }

      return { breed, score };
    });

    return scoredBreeds
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [finderData]);

  return (
    <div className="min-h-screen bg-surface-bg pb-24">
      {/* Dynamic Results Header */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-divider">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/5 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary text-[10px] font-black uppercase tracking-[0.4em]"
           >
             <Trophy size={14} />
             Found {matches.length} Perfect Matches
           </motion.div>

           <div className="space-y-4">
             <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-text-primary leading-[0.9]">
               Tailored To <br/>
               <span className="text-brand-primary italic">Your</span> Life.
             </h1>
             <p className="text-text-muted font-bold text-lg max-w-2xl mx-auto uppercase tracking-wide">
                Based on your {finderData.living} living, {finderData.experience} experience, and {finderData.activity} lifestyle.
             </p>
           </div>
           
           <div className="flex justify-center">
             <button 
              onClick={onReset}
              className="flex items-center gap-2 group text-[10px] font-black uppercase tracking-[0.3em] text-text-dim hover:text-brand-primary transition-colors"
             >
                <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                Retake Discovery Quiz
             </button>
           </div>
        </div>
      </section>

      {/* Matches Grid */}
      <section className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-divider pb-8">
           <div className="space-y-1">
             <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-text-primary">Top Recommendations</h2>
             <p className="text-text-muted font-bold text-[10px] tracking-widest uppercase">Ranked by Lifestyle Compatibility Score</p>
           </div>
           <div className="flex items-center gap-3 px-4 py-2 bg-surface-main border border-divider rounded-xl">
             <Info size={14} className="text-brand-primary" />
             <span className="text-[9px] font-black uppercase tracking-widest text-text-dim">Matches updated for 2026</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {matches.map(({ breed, score }, i) => (
            <motion.div 
              key={breed.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelectBreed(breed.slug)}
              className="group cursor-pointer relative"
            >
              <div className="absolute -top-3 -right-3 z-20 bg-brand-primary text-surface-bg px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl group-hover:scale-110 transition-transform">
                #{i + 1} Match
              </div>
              
              <div className="relative overflow-hidden rounded-[32px] border border-divider bg-surface-card transition-all group-hover:border-brand-primary/40 group-hover:shadow-[0_20px_60px_-15px_rgba(244,194,13,0.15)] group-hover:-translate-y-2">
                 <BreedCard breed={breed} />
                 
                 <div className="p-6 pt-0 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-surface-base border border-divider flex items-center justify-center">
                         <Sparkles size={14} className="text-brand-primary" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Compatibility</span>
                    </div>
                    <span className="text-xl font-black text-brand-primary">{Math.min(99, 85 + (score / 4))}%</span>
                 </div>

                 <div className="px-6 pb-6 mt-4 border-t border-divider/50 pt-4 flex items-center justify-between text-brand-primary group-hover:translate-x-1 transition-transform">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">View Analysis</span>
                    <ChevronRight size={16} />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action: Broad Search */}
      <section className="max-w-7xl mx-auto px-4 mt-24">
        <div className="bg-surface-main border border-divider rounded-[48px] md:rounded-[80px] p-10 md:p-24 text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(#F4C20D_1px,transparent_1px)] [background-size:32px_32px]" />
          </div>
          
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tight text-text-primary">Not Quite Right?</h2>
              <p className="text-text-muted font-bold text-lg max-w-xl mx-auto">Explore our full database of over 200 breeds through custom filters.</p>
            </div>
            
            <button 
              onClick={onReset}
              className="px-12 py-6 bg-brand-primary text-surface-bg rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:scale-105 transition-all shadow-xl shadow-brand-primary/20"
            >
              Browse All Breeds
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
