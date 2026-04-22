import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, ArrowRight, Leaf, Zap, Star } from 'lucide-react';
import { affiliateProducts } from '@/src/data/affiliate';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ChefpawAdProps {
  /** Name of the breed being viewed — used to personalise copy */
  breedName?:    string;
  /** From breed data: "active" | "regular" | "calm" */
  energyLevel?:  string;
  /** From breed data: "small" | "medium" | "large" */
  sizeCategory?: string;
  /** "card" = default bordered card; "compact" = slim inline strip */
  variant?:      'card' | 'compact';
}

// ─── Static copy helpers ──────────────────────────────────────────────────────

const ENERGY_COPY: Record<string, string> = {
  active:  'High-energy breeds burn through more calories and demand better nutrition.',
  regular: 'Consistent fresh nutrition helps maintain an optimal weight for your breed.',
  calm:    'Fresh, portion-controlled meals support a healthy weight in lower-activity dogs.',
};

// ─── ChefpawAd ────────────────────────────────────────────────────────────────

export const ChefpawAd = ({
  breedName    = 'your dog',
  energyLevel  = 'active',
  sizeCategory = 'large',
  variant      = 'card',
}: ChefpawAdProps) => {
  const product = affiliateProducts.find(p => p.id === 'chefpaw-1') ?? affiliateProducts[0];
  const energyCopy = ENERGY_COPY[energyLevel] ?? ENERGY_COPY.active;

  const ctaLabel =
    sizeCategory === 'large'
      ? `Perfect for large breeds like ${breedName}`
      : `Great for ${breedName} owners`;

  // ── Compact strip ──
  if (variant === 'compact') {
    return (
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className="group flex items-center gap-4 p-4 bg-white border border-border-subtle rounded-xl hover:border-brand-primary/30 hover:shadow-[0_4px_20px_rgba(217,119,6,0.08)] transition-all"
        aria-label={`ChefPaw affiliate link — ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-14 h-14 object-cover rounded-lg shrink-0 bg-stone-50"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-0.5">
            Nutrition Upgrade
          </p>
          <p className="text-sm font-semibold text-text-primary truncate">
            {product.name}
          </p>
          <p className="text-xs text-text-muted">${product.price.toFixed(2)}</p>
        </div>
        <ArrowRight
          size={16}
          className="text-brand-primary shrink-0 group-hover:translate-x-0.5 transition-transform"
        />
        <span className="sr-only">Affiliate partner</span>
      </a>
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
      aria-label="Sponsored recommendation: ChefPaw"
    >
      {/* Amber left-accent rule */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-l-2xl" />

      <div className="pl-5 pr-6 py-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-between mb-5">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-dark">
            <ChefHat size={12} />
            Nutrition Recommendation
          </span>
          <span className="text-[9px] font-medium text-text-dim uppercase tracking-widest">
            Affiliate Partner
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Product image */}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="shrink-0 group/img"
          >
            <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-stone-50 border border-border-subtle">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              />
            </div>
          </a>

          {/* Copy */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-display font-bold text-text-primary leading-snug">
                Control What Goes in {breedName !== 'your dog' ? `Your ${breedName}'s` : 'the'} Bowl
              </h3>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                {energyCopy}
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Leaf,  label: 'Fresh Ingredients'   },
                { icon: Zap,   label: 'Vet-Formulated'      },
                { icon: Star,  label: 'AKC Featured'        },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-soft border border-border-subtle rounded-full text-[10px] font-semibold text-text-secondary"
                >
                  <Icon size={10} className="text-brand-primary" />
                  {label}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-[10px] text-text-dim uppercase tracking-widest">{ctaLabel}</p>
                <p className="text-xl font-display font-black text-text-primary">
                  ${product.price.toFixed(0)}
                  <span className="text-sm font-normal text-text-muted ml-1">one-time</span>
                </p>
              </div>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-accent text-white text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-sm shadow-brand-primary/20 whitespace-nowrap"
              >
                Shop ChefPaw <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
