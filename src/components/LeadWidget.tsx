import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface LeadWidgetProps {
  breed?: string;
  variant?: 'inline' | 'sidebar' | 'hero';
}

export const LeadWidget = ({ breed, variant = 'inline' }: LeadWidgetProps) => {
  const [zip, setZip] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length === 5) {
      setSubmitted(true);
      // Simulate redirection or lead capture
      setTimeout(() => {
        window.open('https://embracepetinsurance.com', '_blank', 'no-referrer');
      }, 1500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden bg-brand-primary rounded-2xl p-8 sm:p-12 shadow-lg shadow-brand-primary/10",
        variant === 'sidebar' ? "p-6 rounded-xl" : ""
      )}
    >
      {/* Subtle overlay patterns */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900/10 rounded-full blur-2xl -ml-32 -mb-32" />

      <div className="relative flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 space-y-5 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={14} />
            Official Health Partner
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black leading-tight tracking-tight">
            Protect your <span className="text-blue-200">{breed || 'Dog'}</span> today.
          </h2>
          <p className="text-blue-50 font-medium text-lg leading-relaxed">
            Average vet bills for {breed || 'large breeds'} have increased by 44%. Save up to 90% on unexpected costs.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-4">
            {[
              "90% Reimbursement",
              "Next Day Coverage",
              "Any Vet, Anywhere"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 size={16} className="text-blue-300" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-auto min-w-[320px]">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">
                    Enter Zip Code
                  </label>
                  <input 
                    type="text" 
                    placeholder="90210"
                    maxLength={5}
                    value={zip}
                    onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-2xl font-bold tracking-widest placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all text-slate-900"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-5 rounded-xl font-black uppercase text-sm tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-md shadow-brand-primary/20"
                >
                  Fetch Free Quote
                  <ArrowRight size={18} />
                </button>
                <p className="text-[10px] text-center text-slate-400 font-semibold leading-relaxed px-4">
                  No credit card required. Comparing 12+ providers including Embrace & Pets Best.
                </p>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-6 text-center"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Finding Top Rates...</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Redirecting to our secure partner portal to complete your quote.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
