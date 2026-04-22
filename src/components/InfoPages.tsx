import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck, Database, FileText, Calendar, CheckCircle, AlertTriangle, BookOpen, Star } from 'lucide-react';
import { AuthorCard, PUPWIKI_AUTHORS } from '@/src/components/AuthorCard';

// ─── Schema helpers ───────────────────────────────────────────────────────────

const METHODOLOGY_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://pupwiki.com/methodology#article',
      headline: 'PupWiki Data Methodology: Actuarial, Age & Geographic Cost Factors',
      description:
        'How PupWiki calculates breed-specific dog insurance cost estimates using licensed actuarial data, nonlinear age multipliers, and geographic indexing across all 50 US states.',
      author: [
        { '@type': 'Person', name: 'Dr. Sarah Mitchell', jobTitle: 'Lead Veterinary Advisor' },
        { '@type': 'Person', name: 'James Chen',         jobTitle: 'Head of Data Science'    },
      ],
      publisher: {
        '@type': 'Organization',
        '@id':   'https://pupwiki.com/#organization',
        name:    'PupWiki',
      },
      datePublished: '2025-01-01',
      dateModified:  '2026-04-21',
      mainEntityOfPage: 'https://pupwiki.com/methodology',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://pupwiki.com/' },
          { '@type': 'ListItem', position: 2, name: 'Methodology', item: 'https://pupwiki.com/methodology' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name:    'How does PupWiki calculate monthly insurance costs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:  'We multiply a breed-specific base premium (derived from actuarial filings) by an age-bracket factor (ranging from 1.0× to 3.53×) and a US state cost-of-living multiplier (0.84× to 1.38×). The formula is: localized_premium = base_premium × age_factor × state_multiplier.',
          },
        },
        {
          '@type': 'Question',
          name:    'Where does PupWiki\'s actuarial data come from?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:  'Our base premiums are derived from public actuarial state filings submitted by licensed pet insurance companies, cross-referenced with Forbes Advisor\'s summary of Veterinary Pet Insurance Co. data.',
          },
        },
        {
          '@type': 'Question',
          name:    'How often is PupWiki data updated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:  'Breed health profiles and insurance rate data are reviewed and updated monthly. The last full system audit was completed on April 21, 2026.',
          },
        },
      ],
    },
  ],
};

const EDITORIAL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type':    'WebPage',
  '@id':      'https://pupwiki.com/editorial',
  name:       'PupWiki Editorial Independence & E-E-A-T Standards',
  description: 'PupWiki\'s full editorial policy: how we source data, handle affiliate relationships, and maintain Google YMYL compliance for pet health content.',
  url:        'https://pupwiki.com/editorial',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',             item: 'https://pupwiki.com/' },
      { '@type': 'ListItem', position: 2, name: 'Editorial Policy', item: 'https://pupwiki.com/editorial' },
    ],
  },
};

// ─── Shared sub-components ────────────────────────────────────────────────────

const BackButton = ({ onBack }: { onBack: () => void }) => (
  <button
    onClick={onBack}
    className="flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors text-xs font-semibold uppercase tracking-[0.15em] group"
  >
    <ChevronRight
      size={14}
      className="rotate-180 group-hover:-translate-x-0.5 transition-transform"
    />
    Back
  </button>
);

const MetaBadge = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-text-dim">{label}</span>
    <span className="block text-sm font-semibold text-text-primary">{value}</span>
  </div>
);

// ─── Methodology Page ─────────────────────────────────────────────────────────

export const MethodologyPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(METHODOLOGY_SCHEMA, null, 0) }}
      />

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto px-4 py-10 space-y-14 pb-24"
        itemScope
        itemType="https://schema.org/Article"
      >
        {/* Breadcrumb nav */}
        <nav className="flex items-center gap-2 text-xs text-text-muted" aria-label="Breadcrumb">
          <button onClick={onBack} className="hover:text-brand-primary transition-colors">Home</button>
          <ChevronRight size={12} />
          <span className="text-text-primary font-medium">Methodology</span>
        </nav>

        {/* Hero */}
        <header className="space-y-6">
          <span className="section-eyebrow">
            <Database size={13} className="text-brand-primary" />
            Data &amp; E-E-A-T
          </span>

          <h1
            className="text-4xl md:text-6xl font-display font-black text-text-primary leading-[1.05]"
            itemProp="headline"
          >
            Our Data<br />
            <span className="text-brand-primary italic">Methodology</span>
          </h1>

          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl font-normal" itemProp="description">
            Transparency is the foundation of trust. This page explains exactly where our data
            comes from, how we calculate costs, and what checks ensure accuracy — so you can
            decide how much confidence to place in every number.
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-8 pt-2 pb-6 border-b border-divider">
            <MetaBadge label="Last System Audit"  value="April 21, 2026" />
            <MetaBadge label="Data Stewardship"   value="Editorial Independence Board" />
            <MetaBadge label="Veterinary Review"  value="Dr. Sarah Mitchell, DVM" />
            <MetaBadge label="Actuarial Review"   value="James Chen, MS Actuarial Science" />
          </div>
        </header>

        {/* ── Section 1: Actuarial Sourcing ── */}
        <section className="space-y-6" aria-labelledby="actuarial-heading">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-display font-black text-sm shrink-0 mt-0.5">1</div>
            <h2 id="actuarial-heading" className="text-2xl md:text-3xl font-display font-bold text-text-primary">
              Actuarial Sourcing
            </h2>
          </div>

          <p className="text-text-secondary leading-relaxed pl-12">
            Insurance cost estimates start from <strong>breed-specific base premiums</strong> anchored to
            a $5,000 annual coverage limit at the USA national average market. These figures derive from
            public actuarial state filings submitted by licensed pet insurance carriers, cross-referenced
            with Forbes Advisor's summary of Veterinary Pet Insurance Co. data.
          </p>

          <div className="pl-12 space-y-4">
            {[
              {
                label: 'A — Breed-Specific Base Rates',
                detail: 'Derived from historical claim frequency and severity data across 50+ major US breeds. Breeds with higher genetic ailment counts carry higher base premiums.',
              },
              {
                label: 'B — Age Sensitivity Adjustments',
                detail: 'We apply age multipliers that reflect the non-linear increase in veterinary costs as dogs age. Multipliers range from 1.0× (age 1–2 baseline) to 3.53× (age 14+). Source: Veterinary Pet Insurance Co. state filing summary.',
              },
              {
                label: 'C — Geographic Cost Indexing',
                detail: 'Localised multipliers for all 50 US states and DC factor in regional veterinary labour costs and state-specific insurance regulations. Range: 0.84× (Mississippi) to 1.38× (New York).',
              },
            ].map(({ label, detail }) => (
              <div key={label} className="flex gap-4 p-5 bg-white border border-border-subtle rounded-xl">
                <CheckCircle size={18} className="text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1">{label}</p>
                  <p className="text-sm text-text-muted leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formula callout */}
          <div className="pl-12">
            <div className="bg-brand-primary/6 border border-brand-primary/20 rounded-xl p-5 font-mono text-sm text-text-primary">
              <p className="text-xs text-brand-dark font-sans font-bold uppercase tracking-widest mb-2">Premium Formula</p>
              monthly_estimate = base_premium × age_factor × state_multiplier
            </div>
          </div>
        </section>

        {/* ── Section 2: Health Risk Profiles ── */}
        <section className="space-y-6" aria-labelledby="health-heading">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-display font-black text-sm shrink-0 mt-0.5">2</div>
            <h2 id="health-heading" className="text-2xl md:text-3xl font-display font-bold text-text-primary">
              Health Risk Profiles
            </h2>
          </div>

          <p className="text-text-secondary leading-relaxed pl-12">
            Each breed's health-risk section is compiled from peer-reviewed veterinary studies and
            clinical data, then audited by Dr. Sarah Mitchell before publication. Risk categories
            (Low → Very High) represent the expected frequency and financial impact of genetic
            conditions across the breed population.
          </p>

          <div className="pl-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Low',       colour: 'bg-green-50  border-green-200  text-green-700'  },
              { label: 'Medium',    colour: 'bg-amber-50  border-amber-200  text-amber-700'  },
              { label: 'Very High', colour: 'bg-red-50    border-red-200    text-red-700'    },
            ].map(({ label, colour }) => (
              <div key={label} className={`p-4 rounded-xl border text-center ${colour}`}>
                <p className="font-bold text-sm">{label} Risk</p>
                <p className="text-xs mt-1 opacity-80 leading-tight">
                  {label === 'Low'  && 'Rare hereditary issues; claim frequency < 10 %'}
                  {label === 'Medium' && 'Moderate conditions; avg. lifetime claim $4–8 k'}
                  {label === 'Very High' && 'High claim frequency; avg. lifetime cost > $15 k'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: Trust & Verification ── */}
        <section className="space-y-6" aria-labelledby="trust-heading">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-display font-black text-sm shrink-0 mt-0.5">3</div>
            <h2 id="trust-heading" className="text-2xl md:text-3xl font-display font-bold text-text-primary">
              Trust &amp; Verification
            </h2>
          </div>

          <div className="pl-12 p-6 bg-white border border-border-subtle rounded-2xl space-y-4">
            <div className="flex items-center gap-3 text-brand-primary">
              <ShieldCheck size={24} />
              <p className="font-display font-bold text-text-primary">How we maintain accuracy</p>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Every breed health profile is cross-referenced against the Pupwiki Breed Health
              Profiles dataset and audited by our veterinary advisor before any update goes live.
              "Risk Categories" are designed to help owners anticipate preventive care needs —
              not to alarm. We flag uncertainty where data is limited or contested.
            </p>
            <div className="flex gap-2 pt-2">
              <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-text-muted leading-relaxed">
                PupWiki cost data is for educational planning purposes only and is not a
                substitute for a veterinarian's assessment or a formal insurance quote.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="space-y-5" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-display font-bold text-text-primary">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: 'How does PupWiki calculate monthly insurance costs?',
              a: 'We multiply a breed-specific base premium by an age-bracket multiplier (1.0× – 3.53×) and a state cost index (0.84× – 1.38×). The result is a monthly estimate anchored to a $5,000 annual coverage limit.',
            },
            {
              q: "Where does PupWiki's actuarial data come from?",
              a: "Base premiums derive from public actuarial state filings by licensed pet insurance carriers, cross-referenced with Forbes Advisor's summary of Veterinary Pet Insurance Co. data.",
            },
            {
              q: 'How often is PupWiki data updated?',
              a: 'Breed health profiles and insurance rate data are reviewed monthly. The last full system audit was completed April 21, 2026.',
            },
            {
              q: 'Does affiliate income affect breed rankings or health scores?',
              a: 'No. Affiliate relationships are contractually and editorially separated from data production. No brand can pay to improve a breed\'s health score, lower an insurance estimate, or alter quiz-matching results.',
            },
          ].map(({ q, a }) => (
            <details
              key={q}
              className="group border border-border-subtle rounded-xl overflow-hidden bg-white"
              itemScope
              itemType="https://schema.org/Question"
            >
              <summary
                className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-text-primary hover:text-brand-primary transition-colors text-sm"
                itemProp="name"
              >
                {q}
                <ChevronRight
                  size={16}
                  className="shrink-0 text-text-dim group-open:rotate-90 transition-transform"
                />
              </summary>
              <div
                className="px-6 pb-5 text-sm text-text-secondary leading-relaxed border-t border-divider pt-4"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <p itemProp="text">{a}</p>
              </div>
            </details>
          ))}
        </section>

        {/* Authors */}
        <section className="space-y-6">
          <h2 className="text-xl font-display font-bold text-text-primary">Reviewed By</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[PUPWIKI_AUTHORS[0], PUPWIKI_AUTHORS[1]].map(a => (
              <AuthorCard key={a.name} author={a} />
            ))}
          </div>
        </section>
      </motion.article>
    </>
  );
};

// ─── Editorial Policy Page ────────────────────────────────────────────────────

export const EditorialPolicy = ({ onBack }: { onBack: () => void }) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(EDITORIAL_SCHEMA, null, 0) }}
      />

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto px-4 py-10 space-y-12 pb-24"
      >
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-muted" aria-label="Breadcrumb">
          <button onClick={onBack} className="hover:text-brand-primary transition-colors">Home</button>
          <ChevronRight size={12} />
          <span className="text-text-primary font-medium">Editorial Policy</span>
        </nav>

        {/* Hero */}
        <header className="space-y-6">
          <span className="section-eyebrow">
            <FileText size={13} className="text-brand-primary" />
            E-E-A-T Framework
          </span>

          <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary leading-[1.05]">
            Editorial<br />
            <span className="text-brand-primary italic">Independence</span>
          </h1>

          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl font-normal">
            We provide impartial, data-driven insights. Our recommendations are never
            influenced by affiliate partnerships, sponsored content, or breeder incentives.
          </p>
        </header>

        {/* Core principles */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              icon: ShieldCheck,
              title: 'Medical Integrity',
              body:  'All health-related content is cross-referenced with the Pupwiki Breed Health Profiles dataset — updated monthly — and signed off by a licensed DVM before any change goes live.',
            },
            {
              icon: Database,
              title: 'Financial Objectivity',
              body:  'Cost calculators use standardised actuarial factors. Every user receives the same objective baseline regardless of market fluctuations or commercial relationships.',
            },
            {
              icon: Star,
              title: 'No Pay-to-Rank',
              body:  'Breed rankings, quiz results, and health scores are driven purely by data. No brand can purchase a higher ranking or a more favourable health assessment.',
            },
            {
              icon: BookOpen,
              title: 'Source Transparency',
              body:  'Every data point links to its origin: actuarial filings, veterinary studies, or AKC records. We flag uncertainty and update content when better data emerges.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-white border border-border-subtle rounded-2xl p-6 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Icon size={20} />
              </div>
              <h3 className="font-display font-bold text-text-primary">{title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{body}</p>
            </div>
          ))}
        </section>

        {/* Google YMYL */}
        <section className="bg-surface-soft border border-border-subtle rounded-2xl p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-display font-bold text-text-primary flex items-center gap-2">
            <ShieldCheck size={20} className="text-brand-primary" />
            YMYL &amp; Google E-E-A-T Compliance
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            PupWiki content falls within Google's YMYL (Your Money or Your Life) category
            because health and financial decisions affecting pets and families are involved.
            We meet the E-E-A-T standard — <strong>Experience, Expertise, Authoritativeness,
            Trustworthiness</strong> — through:
          </p>
          <ul className="space-y-2 text-sm text-text-secondary">
            {[
              'Named, credentialed authors on all health and financial content',
              'External veterinary review before publication',
              'Transparent data sourcing with citable references',
              'Regular audit cycle (minimum monthly) by the Editorial Independence Board',
              'Clear separation between editorial content and affiliate recommendations',
            ].map(item => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-green-600 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Correction policy */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-text-primary">
            Corrections &amp; Complaints
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            If you believe any PupWiki content contains a factual error, please contact our
            editorial team. We commit to reviewing all substantiated correction requests within
            5 business days and publishing a correction notice on the affected page within 10
            business days of verification.
          </p>
          <div className="text-sm text-text-muted">
            Contact: <a href="mailto:editorial@pupwiki.com" className="text-brand-primary hover:underline">editorial@pupwiki.com</a>
          </div>
        </section>

        {/* Last updated footer */}
        <footer className="flex items-center gap-2 text-xs text-text-dim border-t border-divider pt-6">
          <Calendar size={13} />
          Policy last reviewed: <strong className="text-text-muted">April 21, 2026</strong>
        </footer>
      </motion.article>
    </>
  );
};
