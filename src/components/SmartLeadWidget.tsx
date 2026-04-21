import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Shield, Activity, ArrowRight, Dog } from 'lucide-react';
import { breeds } from '../data/breeds';

export const SmartLeadWidget: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [step, setStep] = useState(1);

  const breedData = breeds.find(b => b.id === selectedBreed);

  return (
    <div className="bg-surface-main border border-border-subtle rounded-3xl p-8 text-text-primary relative overflow-hidden shadow-2xl shadow-brand-primary/5 gold-glow">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-brand-primary/10 rounded-xl">
            <Dog className="w-5 h-5 text-brand-primary" />
          </div>
          <span className="font-display font-black text-xs uppercase tracking-widest text-text-muted">Your Breed Health Guide</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-display font-black leading-[1.1] uppercase">
                See <span className="text-brand-primary">health</span> hacks & insurance cost tips.
              </h2>
              <p className="text-text-secondary text-lg font-medium">
                Check common health traits and typical care costs for your favorite breeds.
              </p>
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Select Verified Breed</label>
                <select 
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  className="w-full bg-surface-base border border-border-subtle text-text-primary rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-primary outline-none appearance-none transition-all cursor-pointer font-bold"
                >
                  <option value="">Choose breed from database...</option>
                  {breeds.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <button
                disabled={!selectedBreed}
                onClick={() => setStep(2)}
                className="w-full py-5 bg-brand-primary hover:bg-brand-accent disabled:opacity-30 disabled:cursor-not-allowed text-surface-bg font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
              >
                Analyze Health Profile <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-surface-elevated rounded-2xl p-6 border border-border-subtle">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={breedData?.image} 
                    alt={breedData?.name} 
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-brand-primary shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-display font-black text-xl uppercase text-text-primary">{breedData?.name}</h3>
                    <p className="text-brand-primary text-[10px] font-black uppercase tracking-widest">Health Profile Ready</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-main p-4 rounded-xl border border-divider">
                    <Activity className="w-5 h-5 text-risk-high mb-2" />
                    <p className="text-[10px] text-text-dim uppercase tracking-wider mb-1 font-bold">Health Risks</p>
                    <p className="font-black text-lg text-text-primary">{breedData?.healthRisks.length} Detected</p>
                  </div>
                  <div className="bg-surface-main p-4 rounded-xl border border-divider">
                    <Shield className="w-5 h-5 text-brand-primary mb-2" />
                    <p className="text-[10px] text-text-dim uppercase tracking-wider mb-1 font-bold">Classification</p>
                    <p className="font-black text-lg text-text-primary uppercase">{breedData?.isCrossbreed ? 'Hybrid' : 'Purebred'}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-xl">
                <p className="text-sm font-bold text-text-secondary leading-relaxed">
                  <span className="text-brand-primary uppercase mr-2">[Note]</span>
                  {breedData?.isHypoallergenic ? "This breed is hypoallergenic, statistically lowering dermatological clinical costs over its lifespan." : "Standard coat maintenance and allergen monitoring required for this breed."}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-surface-soft hover:bg-surface-elevated text-text-primary font-bold rounded-2xl transition-all border border-border-subtle uppercase text-[10px] tracking-widest"
                >
                  Change Breed
                </button>
                <button
                  onClick={() => window.alert('Redirect to Detail Page')}
                  className="flex-[2] py-4 bg-brand-primary hover:bg-brand-accent text-surface-bg font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-brand-primary/20 text-xs"
                >
                  See Full Info
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
