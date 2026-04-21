import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Home, 
  Users, 
  Activity, 
  Scissors, 
  Brain, 
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Construction,
  Trees
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface FinderData {
  living: 'apartment' | 'small_house' | 'large_house';
  family: 'single' | 'kids' | 'other_pets';
  activity: 'low' | 'moderate' | 'active';
  grooming: 'low' | 'moderate' | 'high';
  experience: 'beginner' | 'experienced';
  protection: boolean;
}

interface BreedFinderQuizProps {
  onComplete: (data: FinderData) => void;
  onBack?: () => void;
}

export const BreedFinderQuiz: React.FC<BreedFinderQuizProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [data, setData] = useState<FinderData>({
    living: 'apartment',
    family: 'single',
    activity: 'moderate',
    grooming: 'moderate',
    experience: 'beginner',
    protection: false
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    if (step === 1 && onBack) {
      onBack();
    } else {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (step === totalSteps) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="max-w-xl mx-auto w-full px-4 py-4 md:py-8">
      {/* Brand Header */}
      <div className="text-center mb-8 md:mb-12">
         <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight uppercase text-text-primary">
            Breed<span className="text-brand-primary">Match</span>
         </h1>
         <div className="mt-8 space-y-4">
            <div className="w-full h-1.5 bg-divider rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className="h-full bg-brand-primary"
               />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-text-dim">{Math.round(progress)}% Match Profile Built</p>
         </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">Your Living Space?</h2>
               <p className="text-text-muted font-bold">This helps us narrow down size and energy requirements.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'apartment', label: 'Apartment', icon: <Home size={20} />, desc: 'Compact living, limited outdoor space' },
                { id: 'small_house', label: 'Small House', icon: <Trees size={20} />, desc: 'Modest yard or nearby park access' },
                { id: 'large_house', label: 'Large House', icon: <Construction size={20} />, desc: 'Large yard or private acreage' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setData({ ...data, living: opt.id as any });
                    nextStep();
                  }}
                  className={cn(
                    "flex items-center gap-4 p-5 rounded-3xl border transition-all text-left",
                    data.living === opt.id ? "bg-brand-primary/10 border-brand-primary text-brand-primary" : "bg-surface-card border-divider text-text-primary hover:border-text-dim"
                  )}
                >
                  <div className="p-3 bg-surface-base rounded-2xl">{opt.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-black uppercase tracking-widest">{opt.label}</p>
                    <p className="text-xs text-text-muted font-medium">{opt.desc}</p>
                  </div>
                  <ChevronRight size={18} className="opacity-30" />
                </button>
              ))}
            </div>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">Family Dynamics?</h2>
               <p className="text-text-muted font-bold">Matching for temperament and safety.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
               {[
                 { id: 'single', label: 'Just Me / Couple', icon: <Users size={20} />, desc: 'Calm household, focused attention' },
                 { id: 'kids', label: 'Kids in House', icon: <Sparkles size={20} />, desc: 'Needs a patient, playful temperament' },
                 { id: 'other_pets', label: 'Other Pets', icon: <Activity size={20} />, desc: 'Friendly with other dogs or cats' },
               ].map(opt => (
                 <button
                   key={opt.id}
                   onClick={() => {
                     setData({ ...data, family: opt.id as any });
                     nextStep();
                   }}
                   className={cn(
                     "flex items-center gap-4 p-5 rounded-3xl border transition-all text-left",
                     data.family === opt.id ? "bg-brand-primary/10 border-brand-primary text-brand-primary" : "bg-surface-card border-divider text-text-primary hover:border-text-dim"
                   )}
                 >
                   <div className="p-3 bg-surface-base rounded-2xl">{opt.icon}</div>
                   <div className="flex-1">
                     <p className="text-sm font-black uppercase tracking-widest">{opt.label}</p>
                     <p className="text-xs text-text-muted font-medium">{opt.desc}</p>
                   </div>
                   <ChevronRight size={18} className="opacity-30" />
                 </button>
               ))}
            </div>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">Activity Lifestyle?</h2>
               <p className="text-text-muted font-bold">How much exercise can you guarantee?</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
               {[
                 { id: 'low', label: 'Relaxed', desc: 'Short daily walks / cuddles', icon: <Activity size={20} className="opacity-50" /> },
                 { id: 'moderate', label: 'Active', desc: 'Daily playtime / 1hr exercise', icon: <Activity size={20} /> },
                 { id: 'active', label: 'High Energy', desc: 'Running / hiking / intense work', icon: <Activity size={20} className="animate-pulse" /> },
               ].map(opt => (
                 <button
                   key={opt.id}
                   onClick={() => {
                     setData({ ...data, activity: opt.id as any });
                     nextStep();
                   }}
                   className={cn(
                     "flex items-center gap-4 p-5 rounded-3xl border transition-all text-left",
                     data.activity === opt.id ? "bg-brand-primary/10 border-brand-primary text-brand-primary" : "bg-surface-card border-divider text-text-primary hover:border-text-dim"
                   )}
                 >
                   <div className="p-3 bg-surface-base rounded-2xl">{opt.icon}</div>
                   <div className="flex-1">
                     <p className="text-sm font-black uppercase tracking-widest">{opt.label}</p>
                     <p className="text-xs text-text-muted font-medium">{opt.desc}</p>
                   </div>
                   <ChevronRight size={18} className="opacity-30" />
                 </button>
               ))}
            </div>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">Maintenance?</h2>
               <p className="text-text-muted font-bold">Brush, groom, or low shedding?</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
               {[
                 { id: 'low', label: 'Wash & Go', icon: <Scissors size={20} className="rotate-90" />, desc: 'Minimal brushing, low shedding' },
                 { id: 'moderate', label: 'Regular Care', icon: <Scissors size={20} />, desc: 'Weekly brushing needed' },
                 { id: 'high', label: 'Style Me', icon: <Scissors size={20} className="text-brand-primary" />, desc: 'Professional grooming required' },
               ].map(opt => (
                 <button
                   key={opt.id}
                   onClick={() => {
                     setData({ ...data, grooming: opt.id as any });
                     nextStep();
                   }}
                   className={cn(
                     "flex items-center gap-4 p-5 rounded-3xl border transition-all text-left",
                     data.grooming === opt.id ? "bg-brand-primary/10 border-brand-primary text-brand-primary" : "bg-surface-card border-divider text-text-primary hover:border-text-dim"
                   )}
                 >
                   <div className="p-3 bg-surface-base rounded-2xl">{opt.icon}</div>
                   <div className="flex-1">
                     <p className="text-sm font-black uppercase tracking-widest">{opt.label}</p>
                     <p className="text-xs text-text-muted font-medium">{opt.desc}</p>
                   </div>
                   <ChevronRight size={18} className="opacity-30" />
                 </button>
               ))}
            </div>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div 
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">Your Experience?</h2>
               <p className="text-text-muted font-bold">Be honest! Every dog has an IQ rank.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
               {[
                 { id: 'beginner', label: 'Beginner', icon: <Brain size={20} className="opacity-50" />, desc: 'Looking for a "easy" first dog' },
                 { id: 'experienced', label: 'Experienced', icon: <Brain size={20} />, desc: 'Comfortable with training needs' },
               ].map(opt => (
                 <button
                   key={opt.id}
                   onClick={() => {
                     setData({ ...data, experience: opt.id as any });
                     nextStep();
                   }}
                   className={cn(
                     "flex items-center gap-4 p-5 rounded-3xl border transition-all text-left",
                     data.experience === opt.id ? "bg-brand-primary/10 border-brand-primary text-brand-primary" : "bg-surface-card border-divider text-text-primary hover:border-text-dim"
                   )}
                 >
                   <div className="p-3 bg-surface-base rounded-2xl">{opt.icon}</div>
                   <div className="flex-1">
                     <p className="text-sm font-black uppercase tracking-widest">{opt.label}</p>
                     <p className="text-xs text-text-muted font-medium">{opt.desc}</p>
                   </div>
                   <ChevronRight size={18} className="opacity-30" />
                 </button>
               ))}
            </div>
            
            <div className="pt-4">
              <button
                onClick={() => setData({ ...data, protection: !data.protection })}
                className={cn(
                  "w-full flex items-center gap-4 p-5 rounded-3xl border transition-all text-left",
                  data.protection ? "bg-brand-primary/10 border-brand-primary" : "bg-surface-card border-divider"
                )}
              >
                <div className="p-3 bg-surface-base rounded-xl text-brand-primary">
                  <ShieldAlert size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black uppercase tracking-widest">Protective Instincts?</p>
                  <p className="text-xs text-text-muted font-medium">Do you want a guard dog or alert dog?</p>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                  data.protection ? "border-brand-primary bg-brand-primary text-surface-bg" : "border-divider"
                )}>
                  {data.protection && <CheckCircle2 size={14} />}
                </div>
              </button>
            </div>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === 6 && (
           <motion.div 
            key="step-final"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-10 py-4"
          >
            {isAnalyzing ? (
              <div className="space-y-10 py-12">
                <div className="relative w-32 h-32 mx-auto">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-brand-primary/20 border-t-brand-primary rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-brand-primary">
                    <Activity className="animate-bounce" size={40} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">Scanning Breeds...</h2>
                  <div className="flex flex-col gap-2 max-w-xs mx-auto">
                    {[
                      "Analyzing temperament profiles",
                      "Matching lifestyle constraints",
                      "Filtering maintenance requirements",
                      "Finding your perfect companion"
                    ].map((text, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.5 }}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-dim"
                      >
                        <CheckCircle2 size={12} className="text-brand-primary" />
                        {text}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <div className="w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl" />
                  </div>
                  <div className="relative z-10 w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-brand-primary/40">
                    <CheckCircle2 size={48} className="text-surface-bg" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-display font-black text-text-primary uppercase tracking-tighter leading-none">
                    Matches Found!
                  </h2>
                  <p className="text-text-muted font-bold text-lg max-w-sm mx-auto">
                    We've filtered {totalBreeds} breeds to find your top matches based on your lifestyle.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => onComplete(data)}
                    className="group relative w-full py-6 bg-brand-primary text-surface-bg rounded-2xl font-black uppercase text-base tracking-[0.3em] shadow-[0_20px_50px_rgba(244,194,13,0.3)] hover:shadow-brand-primary/40 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    Reveal My Matches
                  </button>
                  <p className="text-[9px] font-black uppercase tracking-widest text-text-dim opacity-50">Discovery Engine • 2026 Edition</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const totalBreeds = 50; // Mock count based on data
