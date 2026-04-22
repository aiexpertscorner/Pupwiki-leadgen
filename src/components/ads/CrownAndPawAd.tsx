import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, Gift, Sparkles } from 'lucide-react';
import { affiliateProducts } from '@/src/data/affiliate';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CrownAndPawAdProps {
  /** Breed name to personalise headline */
  breedName?: string;
  /**
   * "card"    – standard editorial card (default, for breed pages)
   * "compact" – slim horizontal strip
   * "gallery" – 3-product mosaic for homepage / featured sections
   */
  variant?: 'card' | 'compact' | 'gallery';
  /**
   * Which C&P product to feature prominently (defaults to 'crown-veteran').
   * Other products appear as secondary grid items in gallery mode.
   */
  featuredProductId?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CROWN_IDS = [
  'crown-veteran',
  'crown-noble',
  'crown-count',
  'crown-colonel',
  'crown-princess',
  'crown-mug',
  'crown-socks',
  'crown-tshirt',
];

// ─── CrownAndPawAd ────────────────────────────────────────────────────────────

export const CrownAndPawAd = ({
  breedName         = 'Your Dog',
  variant           = 'card',
  featuredProductId = 'crown-veteran',
}: CrownAndPawAdProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const crownProducts = affiliateProducts.filter(p => CROWN_IDS.includes(p.id));
  const featured      = crownProducts.find(p => p.id === featuredProductId) ?? crownProducts[0];
  const secondary     = crownProducts.filter(p => p.id !== featured.id).slice(0, 3);

  // ── Compact strip ──
  if (variant === 'compact') {
    return (
      <a
        href={featured.url}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className="group flex items-center gap-4 p-4 bg-white border border-border-subtle rounded-xl hover:border-brand-primary/30 hover:shadow-[0_4px_20px_rgba(217,119,6,0.08)] transition-all"
        aria-label={`Crown and Paw affiliate – ${featured.name}`}
      >
        <img
          src={featured.image}
          alt={featured.name}
          className="w-14 h-14 object-cover rounded-lg shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-0.5">Gift Idea</p>
          <p className="text-sm font-semibold text-text-primary leading-tight">
            Turn {breedName} into a Masterpiece
          </p>
          <p className="text-xs text-text-muted">Custom portraits from ${Math.min(...crownProducts.map(p => p.price)).toFixed(2)}</p>
        </div>
        <ArrowRight size={16} className="text-brand-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
      </a>
    );
  }

  // ── Gallery mode ──
  if (variant === 'gallery') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
        className="bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden"
        aria-label="Sponsored: Crown and Paw custom pet portraits"
      >
        <div className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="section-eyebrow">
                <Sparkles size={12} className="text-brand-primary" />
                Gift Recommendation
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary">
                Immortalise {breedName !== 'Your Dog' ? breedName : 'Your Dog'}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                Commission a hand-crafted custom portrait. A gift that tells the story of your dog's personality.
              </p>
            </div>
            <span className="text-[9px] text-text-dim uppercase tracking-widest shrink-0">Affiliate Partner</span>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-4 gap-3">
            {[featured, ...secondary].map(p => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-xl overflow-hidden aspect-square border border-amber-200 hover:border-brand-primary transition-all"
                aria-label={p.name}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredId === p.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                {p.id === featured.id && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-brand-primary text-white text-[9px] font-bold rounded-md uppercase tracking-wide">
                    Popular
                  </div>
                )}
                <div className={`absolute inset-0 bg-black/40 flex items-end p-2 transition-opacity ${hoveredId === p.id ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-white text-[10px] font-semibold leading-tight line-clamp-2">{p.name}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-amber-200">
            <p className="text-sm text-text-muted">
              Custom portraits &amp; gifts starting from{' '}
              <strong className="text-text-primary">${Math.min(...crownProducts.map(p => p.price)).toFixed(2)}</strong>
            </p>
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-accent text-white text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-sm shadow-brand-primary/20 whitespace-nowrap"
            >
              Browse All Portraits <ArrowRight size={15} />
            </a>
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
      aria-label="Sponsored recommendation: Crown and Paw"
    >
      {/* Amber left-accent rule */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-l-2xl" />

      <div className="pl-5 pr-6 py-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-between mb-5">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-dark">
            <Gift size={12} />
            Gift Recommendation
          </span>
          <span className="text-[9px] font-medium text-text-dim uppercase tracking-widest">Affiliate Partner</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Featured image */}
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="shrink-0 group/img"
          >
            <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden border border-border-subtle bg-stone-50">
              <img
                src={featured.image}
                alt={featured.name}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              />
            </div>
          </a>

          {/* Copy */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-display font-bold text-text-primary leading-snug">
                Turn {breedName !== 'Your Dog' ? breedName : 'Your Dog'} into a Masterpiece
              </h3>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                Commission a one-of-a-kind custom portrait — from regal canvases to quirky gifts.
                Designed to celebrate every breed's personality.
              </p>
            </div>

            {/* Secondary thumbnails */}
            <div className="flex gap-2">
              {secondary.slice(0, 3).map(p => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="w-11 h-11 rounded-lg overflow-hidden border border-border-subtle hover:border-brand-primary transition-colors shrink-0"
                  aria-label={p.name}
                >
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </a>
              ))}
              <span className="w-11 h-11 rounded-lg border border-dashed border-border-subtle flex items-center justify-center text-[9px] text-text-dim font-medium">
                +{crownProducts.length - 4} more
              </span>
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-[10px] text-text-dim uppercase tracking-widest">Starting from</p>
                <p className="text-xl font-display font-black text-text-primary">
                  ${Math.min(...crownProducts.map(p => p.price)).toFixed(2)}
                </p>
              </div>
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-accent text-white text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-sm shadow-brand-primary/20 whitespace-nowrap"
              >
                <Heart size={14} /> Browse Portraits
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
