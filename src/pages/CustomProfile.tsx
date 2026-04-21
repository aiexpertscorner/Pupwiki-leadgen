import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Shield, 
  Activity, 
  Coins, 
  Info, 
  Award, 
  Zap, 
  Dog, 
  ChevronRight, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { breeds, BreedData } from '@/src/data/breeds';
import { BreedDetail } from '../components/BreedDetail';
import { cn } from '@/src/lib/utils';
import { SmartImage } from '../components/ui/SmartImage';

interface QuizData {
  name: string;
  isUnknown: boolean;
  breedSlug: string | null;
  crossbreedSlugs: string[];
  attributes: {
    size: any;
    energy: number | null;
    activityLevel: string | null;
    shedding: number | null;
  };
  age: number;
  priority: 'health' | 'savings' | 'training' | 'longevity' | null;
  stateCode: string;
}

interface CustomProfileProps {
  quizData: QuizData;
  onReset: () => void;
  onNavigate: (view: any) => void;
}

export const CustomProfile: React.FC<CustomProfileProps> = ({ quizData, onReset, onNavigate }) => {
  // Find matching breed
  const matchedBreed = useMemo(() => {
    if (quizData.breedSlug) {
      return breeds.find(b => b.slug === quizData.breedSlug);
    }
    
    // Find closest match for unknown/mix
    return breeds.find(b => {
      const matchSize = b.size.toLowerCase() === quizData.attributes.size?.toLowerCase();
      const matchEnergy = Math.abs((b.traits.energyLevel || 5) - (quizData.attributes.energy || 5)) <= 2;
      return matchSize && matchEnergy;
    }) || breeds[0]; // Fallback to first breed
  }, [quizData]);

  const priorityLabels = {
    health: 'Advanced Health Monitoring',
    savings: 'Cost & Savings Strategy',
    training: 'Behavior & Training Roadmap',
    longevity: 'Longevity & Aging Support'
  };

  if (!matchedBreed) return null;

  return (
    <div className="bg-surface-bg min-h-screen">
      {/* Personalized Header */}
      <div className="relative pt-24 pb-12 overflow-hidden border-b border-divider">
        <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/30 rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/20 rounded-full -ml-48 -mb-48" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest hover:text-brand-primary transition-all mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Start Over
          </button>

          <div className="flex flex-col md:flex-row items-center gap-10">
             <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] md:rounded-[64px] overflow-hidden border-4 border-surface-card shadow-2xl rotate-3">
                   <SmartImage src={matchedBreed.image} className="w-full h-full object-cover" alt={quizData.name || 'Your Dog'} />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                   <Heart className="text-surface-bg fill-surface-bg" size={32} />
                </div>
             </div>

             <div className="flex-1 text-center md:text-left space-y-4">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-brand-primary text-[10px] font-black uppercase tracking-widest">
                    <Sparkles size={14} />
                    Customized for {quizData.name || 'Friendly'}
                  </div>
                  {quizData.priority && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-divider rounded-xl text-text-primary text-[10px] font-black uppercase tracking-widest">
                      <Shield size={14} className="text-brand-primary" />
                      Priority: {priorityLabels[quizData.priority]}
                    </div>
                  )}
                </div>
                
                <h1 className="text-6xl md:text-8xl font-display font-black text-text-primary uppercase tracking-tighter leading-none">
                  Hello, <span className="text-brand-primary">{quizData.name || 'Buddy'}</span>!
                </h1>
                <p className="text-xl md:text-2xl text-text-muted font-bold max-w-xl">
                  {quizData.isUnknown 
                    ? `Based on your profile, we've matched ${quizData.name || 'your buddy'} with the traits of a ${matchedBreed.name}.`
                    : `We've prepared a comprehensive guide for your beautiful ${matchedBreed.name}.`}
                </p>
                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                   <div className="px-6 py-3 bg-surface-card rounded-2xl border border-divider text-brand-primary font-black uppercase text-[10px] tracking-widest">
                     {quizData.age} Years Old
                   </div>
                   <div className="px-6 py-3 bg-surface-card rounded-2xl border border-divider text-brand-primary font-black uppercase text-[10px] tracking-widest">
                     {quizData.stateCode} Region
                   </div>
                   <div className="px-6 py-3 bg-surface-card rounded-2xl border border-divider text-brand-primary font-black uppercase text-[10px] tracking-widest">
                     {quizData.attributes.activityLevel || 'Moderate'} Activity
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Re-use refined breed detail component but with accessible wrappers or overrides if needed */}
      <div className="relative pt-12">
        <div className="max-w-7xl mx-auto px-4 mb-12">
           <h2 className="text-4xl md:text-6xl font-display font-black text-text-primary uppercase tracking-tighter mb-4">
             The <span className="text-brand-primary">Full Story</span>
           </h2>
           <p className="text-text-muted font-bold max-w-2xl">
             We've translated all the expert data into plain English. Here is exactly what to expect with {quizData.name || 'your dog'}.
           </p>
        </div>
        
        <div className="pointer-events-auto">
          <BreedDetail 
            breed={matchedBreed} 
            customName={quizData.name} 
            age={quizData.age}
            stateCode={quizData.stateCode}
            priority={quizData.priority}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
};
