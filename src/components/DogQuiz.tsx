import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Search, Dog, Activity, ShieldCheck, Heart, Sparkles, CheckCircle2, Clock, Zap, Target, HeartPulse, Coins, Brain } from 'lucide-react';
import { breeds, BreedSize, BreedData } from '@/src/data/breeds';
import { cn } from '@/src/lib/utils';
import { SmartImage } from './ui/SmartImage';

import statesData from '../data/us-states-index.json';

interface QuizData {
  name: string;
  isUnknown: boolean;
  breedSlug: string | null;
  crossbreedSlugs: string[];
  attributes: {
    size: BreedSize | null;
    energy: number | null;
    activityLevel: string | null;
    shedding: number | null;
  };
  age: number;
  priority: string | null;
  stateCode: string;
}

interface DogQuizProps {
  onComplete: (data: QuizData) => void;
  onBack?: () => void;
}

export const DogQuiz: React.FC<DogQuizProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [data, setData] = useState<QuizData>({
    name: '',
    isUnknown: false,
    breedSlug: null,
    crossbreedSlugs: [],
    attributes: {
      size: null,
      energy: null,
      activityLevel: null,
      shedding: null,
    },
    age: 1,
    priority: null,
    stateCode: 'CA' // Default
  });
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredBreeds = breeds.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  const totalSteps = data.isUnknown ? 8 : 7;
  const progress = (step / totalSteps) * 100;

  useEffect(() => {
    if (step === totalSteps) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, totalSteps]);

  const states = statesData.states;

  return (
    <div className="max-w-xl mx-auto w-full px-4 py-4 md:py-8">
      {/* Brand Header */}
      <div className="text-center mb-8 md:mb-12">
         <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight uppercase text-text-primary">
            Pup<span className="text-brand-primary">wiki</span>
         </h1>
         <div className="mt-8 space-y-4">
            <div className="w-full h-1.5 bg-divider rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className="h-full bg-brand-primary"
               />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-text-dim">{Math.round(progress)}% Complete</p>
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
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">What is your dog's name?</h2>
               <p className="text-text-muted font-bold">If you haven't picked one yet, just leave it blank!</p>
            </div>
            <div className="space-y-4">
              <input 
                type="text"
                placeholder="e.g. Joe"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && nextStep()}
                className="w-full bg-surface-main border border-border-subtle rounded-2xl px-6 py-5 text-2xl font-black text-text-primary focus:border-brand-primary transition-all text-center focus:outline-none"
              />
              <button 
                onClick={nextStep}
                className="w-full py-5 bg-brand-primary text-surface-bg rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:shadow-brand-primary/20 active:scale-98 transition-all"
              >
                Continue
              </button>
            </div>
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
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">
                 What breed is {data.name || 'your dog'}?
               </h2>
               <p className="text-text-muted font-bold text-sm">Pick a broad breed or tell us it's a mix!</p>
            </div>

            <div className="space-y-4">
               <div className="relative">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-dim" size={20} />
                 <input 
                   type="text"
                   placeholder="Search breeds..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-surface-main border border-border-subtle rounded-2xl pl-14 pr-6 py-4 text-text-primary focus:border-brand-primary outline-none transition-all"
                 />
               </div>

               <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                 {filteredBreeds.map(breed => (
                   <button
                     key={breed.slug}
                     onClick={() => {
                       setData({ ...data, breedSlug: breed.slug, isUnknown: false });
                       nextStep();
                     }}
                     className={cn(
                       "flex items-center gap-4 p-4 rounded-2xl border text-left transition-all",
                       data.breedSlug === breed.slug ? "bg-brand-primary/10 border-brand-primary text-brand-primary" : "bg-surface-card border-divider text-text-primary hover:border-text-dim"
                     )}
                   >
                     <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                       <SmartImage src={breed.image} alt={breed.name} className="w-full h-full object-cover" />
                     </div>
                     <span className="font-bold uppercase tracking-tight">{breed.name}</span>
                     <ChevronRight className="ml-auto opacity-30" size={18} />
                   </button>
                 ))}
               </div>

               <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2 py-4">
                    <div className="h-px flex-1 bg-divider" />
                    <span className="text-[10px] font-black text-text-dim uppercase tracking-widest">Or choose another path</span>
                    <div className="h-px flex-1 bg-divider" />
                  </div>
                  <button 
                    onClick={() => {
                      setData({ ...data, isUnknown: true, breedSlug: null });
                      nextStep();
                    }}
                    className="w-full py-4 bg-surface-card border border-divider rounded-2xl font-bold text-text-primary hover:border-brand-primary transition-all flex items-center justify-center gap-2 group"
                  >
                    <Sparkles className="text-brand-primary group-hover:scale-125 transition-transform" size={18} />
                    I'm not exactly sure / It's a mix!
                  </button>
               </div>
            </div>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === 3 && data.isUnknown && (
          <motion.div 
            key="step3-unknown"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">Let's narrow it down!</h2>
               <p className="text-text-muted font-bold">Pick the closest size for {data.name || 'your buddy'}.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {(['Small', 'Medium', 'Large'] as BreedSize[]).map((size) => (
                 <button
                   key={size}
                   onClick={() => setData({ ...data, attributes: { ...data.attributes, size } })}
                   className={cn(
                     "p-6 rounded-3xl border flex flex-col items-center gap-4 transition-all hover:scale-105",
                     data.attributes.size === size ? "bg-brand-primary/10 border-brand-primary ring-2 ring-brand-primary/20" : "bg-surface-card border-divider"
                   )}
                 >
                   <div className={cn(
                     "bg-brand-primary/5 p-4 rounded-full",
                     size === 'Small' ? 'scale-75' : size === 'Large' ? 'scale-125' : ''
                   )}>
                     <Dog className="text-brand-primary" size={24} />
                   </div>
                   <span className="font-bold uppercase tracking-widest text-[10px] text-text-primary">{size}</span>
                 </button>
               ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-dim tracking-widest ml-1">Energy Level</label>
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      onClick={() => setData({ ...data, attributes: { ...data.attributes, energy: val } })}
                      className={cn(
                        "flex-1 py-4 rounded-xl border font-bold transition-all",
                        data.attributes.energy === val ? "bg-brand-primary text-surface-bg border-brand-primary shadow-lg" : "bg-surface-card border-divider text-text-muted"
                      )}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              disabled={!data.attributes.size || !data.attributes.energy}
              onClick={nextStep}
              className="w-full py-5 bg-brand-primary text-surface-bg rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue
            </button>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === (data.isUnknown ? 4 : 3) && (
          <motion.div 
            key="step-age"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">How old is {data.name || 'Joe'}?</h2>
               <p className="text-text-muted font-bold text-sm">Age helps us figure out care and feeding!</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-center gap-8">
                <button 
                  onClick={() => setData({ ...data, age: Math.max(0, (data.age || 1) - 1) })}
                  className="w-16 h-16 rounded-full border border-divider flex items-center justify-center text-text-primary hover:bg-surface-card transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="text-7xl font-display font-black text-brand-primary">
                  {data.age}
                </div>
                <button 
                  onClick={() => setData({ ...data, age: Math.min(25, (data.age || 1) + 1) })}
                  className="w-16 h-16 rounded-full border border-divider flex items-center justify-center text-text-primary hover:bg-surface-card transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <p className="text-center text-text-dim font-black uppercase tracking-widest text-[10px]">Years old</p>

              <button 
                onClick={nextStep}
                className="w-full py-5 bg-brand-primary text-surface-bg rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:shadow-brand-primary/20 transition-all"
              >
                Continue
              </button>
            </div>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === (data.isUnknown ? 5 : 4) && (
          <motion.div 
            key="step-activity"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">How active is {data.name || 'your dog'}?</h2>
               <p className="text-text-muted font-bold text-sm">This helps us customize exercise and joint health tips.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
               {[
                 { id: 'low', label: 'Low', desc: 'Mostly indoor / short walks', icon: <Clock size={20} /> },
                 { id: 'moderate', label: 'Moderate', desc: 'Daily walks and playtime', icon: <Activity size={20} /> },
                 { id: 'active', label: 'Very Active', desc: 'Long runs / hiking / sports', icon: <Zap size={20} /> },
                 { id: 'pro', label: 'Working Dog', desc: 'Professional training / farm life', icon: <Target size={20} /> },
               ].map((level) => (
                 <button
                   key={level.id}
                   onClick={() => {
                     setData({ ...data, attributes: { ...data.attributes, activityLevel: level.id } });
                     nextStep();
                   }}
                   className={cn(
                     "w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all",
                     data.attributes.activityLevel === level.id ? "bg-brand-primary/10 border-brand-primary text-brand-primary" : "bg-surface-card border-divider text-text-primary hover:border-text-dim"
                   )}
                 >
                   <div className="p-3 bg-surface-base rounded-xl">
                      {level.icon}
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-black uppercase tracking-widest">{level.label}</p>
                      <p className="text-xs text-text-muted font-medium">{level.desc}</p>
                   </div>
                   <ChevronRight className="opacity-30" size={18} />
                 </button>
               ))}
            </div>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === (data.isUnknown ? 6 : 5) && (
          <motion.div 
            key="step-priority"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">What's your biggest priority?</h2>
               <p className="text-text-muted font-bold text-sm">We'll highlight these details in your dog's custom report.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
               {[
                 { id: 'health', label: 'Health & Wellness', desc: 'Preventing disease and genetic issues', icon: <HeartPulse size={20} /> },
                 { id: 'savings', label: 'Savings & Insurance', desc: 'Managing vet bills and costs', icon: <Coins size={20} /> },
                 { id: 'training', label: 'Bonding & Training', desc: 'Behavior and daily interaction', icon: <Brain size={20} /> },
                 { id: 'longevity', label: 'Longevity', desc: 'Keeping them by your side longer', icon: <Clock size={20} /> },
               ].map((p) => (
                 <button
                   key={p.id}
                   onClick={() => {
                     setData({ ...data, priority: p.id });
                     nextStep();
                   }}
                   className={cn(
                     "w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all",
                     data.priority === p.id ? "bg-brand-primary/10 border-brand-primary text-brand-primary" : "bg-surface-card border-divider text-text-primary hover:border-text-dim"
                   )}
                 >
                   <div className="p-3 bg-surface-base rounded-xl">
                      {p.icon}
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-black uppercase tracking-widest">{p.label}</p>
                      <p className="text-xs text-text-muted font-medium">{p.desc}</p>
                   </div>
                   <ChevronRight className="opacity-30" size={18} />
                 </button>
               ))}
            </div>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === (data.isUnknown ? 7 : 6) && (
          <motion.div 
            key="step-location"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
               <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight">What state do you live in?</h2>
               <p className="text-text-muted font-bold text-sm">Vet costs vary by state. Let's localize your report!</p>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {states.map(s => (
                <button
                  key={s.code}
                  onClick={() => {
                    setData({ ...data, stateCode: s.code });
                    nextStep();
                  }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border text-left transition-all",
                    data.stateCode === s.code ? "bg-brand-primary/10 border-brand-primary text-brand-primary" : "bg-surface-card border-divider text-text-primary hover:border-text-dim"
                  )}
                >
                  <span className="font-bold uppercase tracking-tight">{s.name}</span>
                  <div className="text-[10px] font-black opacity-40">{s.code}</div>
                </button>
              ))}
            </div>

            <button onClick={prevStep} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-text-dim uppercase tracking-widest py-2">
              <ChevronLeft size={14} /> Back
            </button>
          </motion.div>
        )}

        {step === totalSteps && (
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Dog className="text-brand-primary animate-bounce" size={40} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">Analyzing Data...</h2>
                  <div className="flex flex-col gap-2 max-w-xs mx-auto">
                    {[
                      "Looking up breed health data",
                      "Calculating cost estimates",
                      "Compiling care information",
                      "Generating your overview"
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
                    Your <span className="text-brand-primary">Custom Report</span> is Ready!
                  </h2>
                  <p className="text-text-muted font-bold text-lg max-w-sm mx-auto">
                    We've put together a breed health overview and cost estimate for {data.name || 'your pup'}.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => onComplete(data)}
                    className="group relative w-full py-6 bg-brand-primary text-surface-bg rounded-2xl font-black uppercase text-base tracking-[0.3em] shadow-[0_20px_50px_rgba(244,194,13,0.3)] hover:shadow-brand-primary/40 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    See {data.name || "Your Dog"}'s Profile
                  </button>
                  <p className="text-[9px] font-black uppercase tracking-widest text-text-dim opacity-50">Expert Verified • 100% Free</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
