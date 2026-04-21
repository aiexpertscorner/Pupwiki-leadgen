import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Info, 
  Coins, 
  ChevronDown,
  Building2,
  Shield,
  Stethoscope,
  HeartPulse
} from 'lucide-react';
import { BreedData } from '@/src/data/breeds';
import { cn } from '@/src/lib/utils';

interface InsurancePlan {
  id: string;
  provider: string;
  name: string;
  premiumMultiplier: number;
  deductible: number;
  reimbursement: number;
  highlight: string;
  features: string[];
  vulnerabilityMatch: string[];
}

interface InsuranceComparisonProps {
  breed: BreedData;
  age?: number;
  stateCode?: string;
}

import { useActuarial } from '../hooks/useActuarial';

export const InsuranceComparison: React.FC<InsuranceComparisonProps> = ({ breed, age = 3, stateCode = 'CA' }) => {
  const [activePlan, setActivePlan] = useState<string | null>('p-1');
  const actuarial = useActuarial(breed.slug, age, stateCode);
  const monthlyPremium = actuarial.finalMonthlyPremium;

  const plans: InsurancePlan[] = [
    {
      id: 'p-1',
      provider: 'PupGuard Elite',
      name: 'Full Support',
      premiumMultiplier: 1.0,
      deductible: 250,
      reimbursement: 90,
      highlight: 'Best Coverage',
      features: [
        '90% Back on vet bills',
        'Direct Vet Settlement',
        'Congenital issues covered'
      ],
      vulnerabilityMatch: [breed.healthRisks[0].condition, 'Breed-specific issues']
    },
    {
      id: 'p-2',
      provider: 'VetTrust Pro',
      name: 'Balanced Care',
      premiumMultiplier: 0.85,
      deductible: 500,
      reimbursement: 80,
      highlight: 'Popular Choice',
      features: [
        '80% Coverage for visits',
        'Routine checkups included',
        'Easy claims tracking'
      ],
      vulnerabilityMatch: ['Accidents', 'Common Illness']
    },
    {
      id: 'p-3',
      provider: 'CanineCare Core',
      name: 'Safety Net',
      premiumMultiplier: 0.65,
      deductible: 1000,
      reimbursement: 70,
      highlight: 'Budget Friendly',
      features: [
        '70% Emergency coverage',
        'No annual coverage limit',
        '24/7 Expert support'
      ],
      vulnerabilityMatch: ['Major Surgery', 'Hospital stays']
    }
  ];

  return (
    <section id="insurance" className="scroll-mt-32 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-brand-primary/10 rounded-[28px] text-brand-primary border border-brand-primary/20 shadow-2xl">
              <ShieldCheck size={40} className="md:size-44" />
            </div>
            <div className="space-y-1">
               <h2 className="text-3xl md:text-5xl font-display uppercase font-black text-text-primary tracking-tighter">Insurance Guide</h2>
               <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">Updated for 2026</p>
            </div>
          </div>
          <p className="text-text-muted max-w-xl text-base md:text-lg font-bold italic opacity-80 leading-relaxed">
            Comparing the best insurance plans tailored for the health and lifestyle of the <span className="text-brand-primary underline decoration-brand-primary/30 underline-offset-4">{breed.name}</span>.
          </p>
        </div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="flex items-center gap-6 px-8 py-5 bg-surface-main/60 backdrop-blur-xl border border-divider rounded-[32px] premium-card shadow-2xl"
        >
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-1">
                {actuarial.isEstimate ? 'National Average' : 'Localized Quote'}
              </span>
              <span className="text-3xl font-black text-text-primary tracking-tighter">
                ${monthlyPremium.toFixed(2)}
                <span className="text-sm opacity-40 ml-1 font-bold">/mo</span>
              </span>
           </div>
           <div className="w-px h-12 bg-divider" />
           <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <span className="text-[8px] font-black px-1.5 py-0.5 bg-brand-primary/10 border border-brand-primary/20 rounded text-brand-primary uppercase">Age: {age}y</span>
                <span className="text-[8px] font-black px-1.5 py-0.5 bg-brand-primary/10 border border-brand-primary/20 rounded text-brand-primary uppercase">State: {stateCode}</span>
             </div>
             <Info className="text-brand-primary opacity-60" size={16} />
           </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
        {plans.map((plan) => (
          <motion.div 
            key={plan.id}
            whileHover={{ y: -10 }}
            className={cn(
              "relative flex flex-col p-10 rounded-[48px] border transition-all duration-700 overflow-hidden group cursor-pointer shadow-2xl",
              activePlan === plan.id 
                ? "bg-surface-elevated border-brand-primary ring-1 ring-brand-primary/20 shadow-brand-primary/5" 
                : "bg-surface-main border-divider hover:border-text-muted"
            )}
            onClick={() => setActivePlan(plan.id)}
          >
            {activePlan === plan.id && (
              <div className="absolute top-0 right-0 px-8 py-3 bg-brand-primary text-surface-bg text-[10px] font-black uppercase tracking-[0.3em] rounded-bl-[32px] shadow-2xl z-20">
                Top Recommendation
              </div>
            )}

            <div className="space-y-8 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                   <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">{plan.provider}</p>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-text-primary group-hover:text-brand-primary transition-colors leading-none">{plan.name}</h3>
              </div>

              <div className="flex items-baseline gap-1 py-8 border-y border-divider/50">
                <span className="text-6xl font-black text-text-primary tracking-tighter leading-none">${Math.round(monthlyPremium * plan.premiumMultiplier)}</span>
                <span className="text-xl font-bold text-text-dim">/mo</span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2 p-5 bg-surface-base/50 rounded-[28px] border border-divider shadow-inner group-hover:border-brand-primary/10 transition-colors">
                  <p className="text-[9px] font-black text-text-dim uppercase tracking-[0.2em] text-center">Deductible</p>
                  <p className="text-2xl font-black text-text-primary text-center tracking-tight">${plan.deductible}</p>
                </div>
                <div className="space-y-2 p-5 bg-surface-base/50 rounded-[28px] border border-divider shadow-inner group-hover:border-brand-primary/10 transition-colors">
                  <p className="text-[9px] font-black text-text-dim uppercase tracking-[0.2em] text-center">Back</p>
                  <p className="text-2xl font-black text-brand-primary text-center tracking-tight">{plan.reimbursement}%</p>
                </div>
              </div>

              <div className="space-y-5 py-2">
                <div className="flex items-center gap-3">
                   <ShieldCheck size={18} className="text-brand-primary" />
                   <span className="text-[10px] font-black text-text-primary uppercase tracking-[0.25em]">Plan Highlights</span>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-bold text-text-muted leading-relaxed opacity-70 italic">
                    Designed to help cover the costs of <span className="text-text-primary">{breed.healthRisks.slice(0,2).map(r => r.condition).join(', ')}</span>.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {plan.vulnerabilityMatch.map((v, i) => (
                      <span key={i} className="px-3 py-1.5 bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded-xl text-[9px] font-black uppercase tracking-[0.1em]">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-divider/30">
                {plan.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 size={16} className="text-brand-primary shrink-0" />
                    <span className="text-[11px] font-black text-text-muted leading-tight uppercase tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-full py-6 rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 mt-4 shadow-2xl",
                  activePlan === plan.id 
                    ? "bg-brand-primary text-surface-bg shadow-brand-primary/20" 
                    : "bg-surface-base border border-divider text-text-primary hover:bg-surface-elevated"
                )}
              >
                Get a Quote
                <ArrowRight size={16} />
              </motion.button>
            </div>

            <div className="absolute -bottom-16 -right-16 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none scale-150">
               <Shield size={240} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="p-10 md:p-16 bg-surface-main/40 border border-divider rounded-[64px] premium-card flex flex-col lg:flex-row gap-12 items-center justify-between relative overflow-hidden"
      >
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px]" />
         <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="p-5 bg-brand-primary/10 rounded-[32px] shadow-inner text-brand-primary border border-brand-primary/20">
               <Info size={40} />
            </div>
            <div className="space-y-3">
               <h4 className="text-2xl font-black uppercase tracking-tight text-text-primary">Data & Accuracy</h4>
               <p className="text-sm md:text-base text-text-muted font-bold leading-relaxed max-w-2xl italic opacity-80">
                  These estimates are based on actual pet insurance data and common vet costs for the <span className="text-text-primary">{breed.name}</span> in 2026. Costs may vary based on your dog's health history and specific insurance provider terms.
               </p>
            </div>
         </div>
         <div className="flex -space-x-5 relative z-10 scale-110">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-16 h-16 rounded-full border-4 border-surface-bg bg-surface-base shadow-2xl flex items-center justify-center overflow-hidden">
                <Building2 size={28} className="text-brand-primary opacity-40" />
              </div>
            ))}
         </div>
      </motion.div>
    </section>
  );
};
