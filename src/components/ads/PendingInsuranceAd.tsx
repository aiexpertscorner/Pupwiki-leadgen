import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Bell, ArrowRight, Sparkles, CheckCircle, Lock } from 'lucide-react';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface PendingInsuranceAdProps {
  /** Breed name to personalise cost teaser */
  breedName?:           string;
  /** Estimated monthly cost from actuarial data — shows in the teaser */
  estimatedMonthlyCost?: number;
  /** 2-letter US state code for geographic personalisation */
  stateCode?:           string;
  /** "card" = standard editorial card (default); "banner" = full-width feature */
  variant?:             'card' | 'banner';
}

// ─── Static helpers ───────────────────────────────────────────────────────────

const COMING_FEATURES = [
  'Side-by-side plan comparisons',
  'Breed-specific deductible guidance',
  'Real-time quotes from top carriers',
];

// ─── PendingInsuranceAd ───────────────────────────────────────────────────────

export const PendingInsuranceAd = ({
  breedName            = 'your dog',
  estimatedMonthlyCost,
  stateCode,
  variant              = 'card',
}: PendingInsuranceAdProps) => {
  const [email,       setEmail]       = useState('');
  const [submitted,   setSubmitted]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    // Simulate async submit — replace with real API call in Phase 2
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 800);
  };

  const costLine = estimatedMonthlyCost
    ? `estimated at ~$${estimatedMonthlyCost}/mo for ${breedName}${stateCode ? ` in ${stateCode}` : ''}`
    : `personalised for ${breedName}`;

  // ── Banner ──
  if (variant === 'banner') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
        className="bg-stone-900 text-white rounded-2xl overflow-hidden relative"
        aria-label="Pet insurance comparison — coming soon"
      >
        {/* Warm amber glow */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, #D97706 0%, transparent 70%)' }}
        />

        <div className="relative px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row gap-8 items-center">
          {/* Left copy */}
          <div className="flex-1 space-y-5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-brand-primary/20 border border-brand-primary/30 rounded-full text-brand-accent text-[10px] font-bold uppercase tracking-widest">
                <Sparkles size={10} />
                Coming Soon
              </span>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
                Pet Insurance Comparison,<br />
                Built for Your Breed.
              </h2>
              <p className="text-stone-400 text-sm mt-2 leading-relaxed">
                We're partnering with leading carriers to bring you real-time,
                breed-specific insurance quotes — {costLine}.
              </p>
            </div>

            <ul className="space-y-2">
              {COMING_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-stone-300">
                  <CheckCircle size={14} className="text-brand-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right email form */}
          <div className="w-full md:w-72 shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-brand-accent">
                <Bell size={18} />
                <p className="font-semibold text-sm">Get Early Access</p>
              </div>

              {submitted ? (
                <div className="text-center py-4 space-y-2">
                  <CheckCircle size={28} className="text-green-400 mx-auto" />
                  <p className="text-sm text-stone-200 font-medium">You're on the list!</p>
                  <p className="text-xs text-stone-500">We'll notify you as soon as quotes go live.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/15 rounded-lg text-white placeholder:text-stone-500 text-sm focus:outline-none focus:border-brand-primary/60 transition-colors"
                    aria-label="Email address for insurance notification"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-primary hover:bg-brand-accent text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-60"
                  >
                    {isSubmitting ? 'Saving…' : (
                      <>Notify Me <ArrowRight size={14} /></>
                    )}
                  </button>
                </form>
              )}

              <p className="flex items-center gap-1.5 text-[10px] text-stone-600">
                <Lock size={9} />
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  // ── Default card ──
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="relative bg-white border border-border-subtle rounded-2xl overflow-hidden"
      aria-label="Pet insurance comparison — coming soon"
    >
      {/* Amber left-accent rule */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-l-2xl" />

      <div className="pl-5 pr-6 py-6 space-y-5">
        {/* Eyebrow */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-dark">
            <ShieldCheck size={12} />
            Insurance Guide
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 bg-brand-primary/10 border border-brand-primary/25 rounded-full text-brand-dark text-[9px] font-bold uppercase tracking-wider">
            <Sparkles size={9} />
            Coming Soon
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-display font-bold text-text-primary leading-snug">
            Pet Insurance Comparison<br />
            <span className="text-brand-primary">Built for {breedName !== 'your dog' ? breedName + 's' : 'Your Breed'}</span>
          </h3>
          {estimatedMonthlyCost ? (
            <p className="text-sm text-text-muted leading-relaxed">
              Current estimate: <strong className="text-text-primary">${estimatedMonthlyCost}/mo</strong>
              {stateCode && ` in ${stateCode}`}. Compare top carriers when our tool launches.
            </p>
          ) : (
            <p className="text-sm text-text-muted leading-relaxed">
              Real-time quotes from top carriers, tailored to your breed's risk profile.
              Side-by-side comparison — no broker fees.
            </p>
          )}
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2">
          {COMING_FEATURES.map(f => (
            <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-soft border border-border-subtle rounded-full text-[10px] font-medium text-text-muted">
              <CheckCircle size={9} className="text-green-600" />
              {f}
            </span>
          ))}
        </div>

        {/* Email capture */}
        {submitted ? (
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
            <CheckCircle size={18} className="text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">You're on the list!</p>
              <p className="text-xs text-green-700">We'll email you when quotes go live.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 min-w-0 px-3 py-2.5 bg-surface-soft border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-brand-primary/50 transition-colors"
              aria-label="Email for insurance early access"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-primary hover:bg-brand-accent text-white text-sm font-semibold rounded-lg transition-all whitespace-nowrap disabled:opacity-60"
            >
              {isSubmitting ? '…' : <><Bell size={14} /> Notify Me</>}
            </button>
          </form>
        )}

        <p className="flex items-center gap-1.5 text-[10px] text-text-dim">
          <Lock size={9} />
          No spam. We'll only email when quotes go live.
        </p>
      </div>
    </motion.section>
  );
};
