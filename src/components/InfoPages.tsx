import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Database, FileText, ChevronRight, HelpCircle } from 'lucide-react';

export const MethodologyPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-16">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-text-dim hover:text-brand-primary transition-colors text-[10px] font-black uppercase tracking-widest"
      >
        <ChevronRight className="rotate-180" size={14} />
        Back
      </button>

      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary text-[10px] font-black uppercase tracking-widest">
          <Database size={12} />
          Data & E-E-A-T
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-text-primary leading-[0.9]">
          Our Data <br/><span className="text-brand-primary">Methodology</span>
        </h1>
        <p className="text-xl text-text-secondary font-medium leading-relaxed max-w-2xl">
          At Pupwiki, transparency is our core principle. We translate complex actuarial datasets into clear, actionable insights for dog parents.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <section className="space-y-6 border-l-2 border-brand-primary pl-8">
          <h2 className="text-3xl font-display font-black uppercase tracking-tight text-text-primary">1. Actuarial Sourcing</h2>
          <p className="text-text-muted leading-relaxed font-medium">
            Our insurance cost estimates are grounded in real-world actuarial data. We utilize standardized base premiums (anchored at a $5,000 coverage limit) which are then adjusted using three primary vectors:
          </p>
          <ul className="space-y-4 pt-4">
            <li className="flex gap-4">
              <div className="w-6 h-6 bg-surface-elevated rounded flex items-center justify-center text-brand-primary font-black text-xs shrink-0">A</div>
              <div>
                <span className="text-text-primary font-bold uppercase block text-sm">Breed-Specific Base Rates</span>
                <span className="text-text-dim text-sm">Derived from historical claim frequency and severity data across 50+ major US breeds.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 bg-surface-elevated rounded flex items-center justify-center text-brand-primary font-black text-xs shrink-0">B</div>
              <div>
                <span className="text-text-primary font-bold uppercase block text-sm">Age Sensitivity Adjustments</span>
                <span className="text-text-dim text-sm">We apply age multipliers that account for the nonlinear increase in healthcare requirements as a dog matures (indices ranging from 1.0 to 3.5x).</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 bg-surface-elevated rounded flex items-center justify-center text-brand-primary font-black text-xs shrink-0">C</div>
              <div>
                <span className="text-text-primary font-bold uppercase block text-sm">Geographic Cost Indexing</span>
                <span className="text-text-dim text-sm">Localized multipliers for all 50 US states, factoring in regional veterinary labor costs and state-specific insurance regulations.</span>
              </div>
            </li>
          </ul>
        </section>

        <section className="p-8 md:p-12 bg-surface-main rounded-[40px] border border-divider space-y-6">
          <div className="flex items-center gap-4 text-brand-primary">
            <ShieldCheck size={32} />
            <h2 className="text-2xl font-display font-black uppercase tracking-tight">Trust & Verification</h2>
          </div>
          <p className="text-text-secondary leading-relaxed">
            Every breed health profile is audited for accuracy against peer-reviewed veterinary studies. Our "Risk Categories" (Low to Very High) are designed to help owners anticipate preventative care needs before they become emergencies.
          </p>
          <div className="pt-6 border-t border-divider flex items-center justify-between gap-4 flex-wrap">
             <div className="space-y-1">
               <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Last System Audit</span>
               <span className="text-text-primary font-bold block">April 21, 2026</span>
             </div>
             <div className="space-y-1">
               <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Data Stewardship</span>
               <span className="text-text-primary font-bold block">Editorial Independence Board</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const EditorialPolicy = ({ onBack }: { onBack: () => void }) => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 space-y-16">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-text-dim hover:text-brand-primary transition-colors text-[10px] font-black uppercase tracking-widest"
        >
          <ChevronRight className="rotate-180" size={14} />
          Back
        </button>
  
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary text-[10px] font-black uppercase tracking-widest">
            <FileText size={12} />
            E-E-A-T Framework
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-text-primary leading-[0.9]">
            Editorial <br/><span className="text-brand-primary">Independence</span>
          </h1>
          <p className="text-xl text-text-secondary font-medium leading-relaxed max-w-2xl">
            We provide impartial, data-driven insights. Our recommendations are never influenced by affiliate partnerships or sponsored content.
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-10 bg-surface-base border border-divider rounded-[32px] space-y-4">
             <h3 className="text-xl font-black uppercase text-text-primary">Medical Integrity</h3>
             <p className="text-sm text-text-muted leading-relaxed">
               All health-related content is cross-referenced with the Pupwiki Breed Health Profiles dataset, which is updated monthly to reflect the latest canine medical research.
             </p>
           </div>
           <div className="p-10 bg-surface-base border border-divider rounded-[32px] space-y-4">
             <h3 className="text-xl font-black uppercase text-text-primary">Financial Objectivity</h3>
             <p className="text-sm text-text-muted leading-relaxed">
               Our cost calculators use standardized actuarial factors to ensure every user receives an objective baseline, regardless of market fluctuations.
             </p>
           </div>
        </div>
      </div>
    );
  };
