import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck, Database, Users, Award, BookOpen, HeartPulse, Star } from 'lucide-react';
import { AuthorCard, PUPWIKI_AUTHORS } from '@/src/components/AuthorCard';

// ─── Schema.org JSON-LD for this page ─────────────────────────────────────────

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://pupwiki.com/about',
      name: 'About PupWiki — Our Mission, Team & Methodology',
      description:
        'Learn about PupWiki\'s mission to provide authoritative, vet-reviewed dog breed data. Meet the veterinarians and data scientists who build and maintain the platform.',
      url: 'https://pupwiki.com/about',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://pupwiki.com/' },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://pupwiki.com/about' },
        ],
      },
      mainEntity: {
        '@type': 'Organization',
        '@id': 'https://pupwiki.com/#organization',
        name: 'PupWiki',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://pupwiki.com/about#dr-sarah-mitchell',
      name: 'Dr. Sarah Mitchell',
      jobTitle: 'Lead Veterinary Advisor',
      description: 'Board-certified veterinarian with a specialty in canine genetics and preventive medicine.',
      worksFor: { '@id': 'https://pupwiki.com/#organization' },
    },
    {
      '@type': 'Person',
      '@id': 'https://pupwiki.com/about#james-chen',
      name: 'James Chen',
      jobTitle: 'Head of Data Science',
      description: 'Actuarial scientist who designed the insurance-cost methodology powering PupWiki\'s breed profiles.',
      worksFor: { '@id': 'https://pupwiki.com/#organization' },
    },
    {
      '@type': 'Person',
      '@id': 'https://pupwiki.com/about#dr-patricia-torres',
      name: 'Dr. Patricia Torres',
      jobTitle: 'Canine Behavior Specialist',
      description: 'Applied animal behaviorist overseeing temperament profiles and lifestyle-matching algorithms.',
      worksFor: { '@id': 'https://pupwiki.com/#organization' },
    },
  ],
};

// ─── Stat items ───────────────────────────────────────────────────────────────

const STATS = [
  { value: '81',    label: 'Breed Profiles'         },
  { value: '13',    label: 'Data Datasets'           },
  { value: '50',    label: 'US States Covered'       },
  { value: '3',     label: 'Licensed DVMs On Staff'  },
];

// ─── Trust pillars ────────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: ShieldCheck,
    title:  'Vet-Reviewed Content',
    body:   'Every health-risk profile and breed guide is reviewed by a licensed DVM before publication. No medical claim goes live without sign-off from our veterinary team.',
  },
  {
    icon: Database,
    title:  'Actuarial Data Sources',
    body:   'Insurance cost estimates derive from real actuarial filings — the same data insurance companies use — adjusted by breed, age bracket, and state cost index.',
  },
  {
    icon: BookOpen,
    title:  'Editorial Independence',
    body:   'Affiliate partnerships never influence breed rankings, health assessments, or quiz results. Our data speaks for itself; monetisation is always disclosed and separated.',
  },
  {
    icon: HeartPulse,
    title:  'Monthly Data Updates',
    body:   'Premium data goes stale fast. Our data pipeline refreshes breed health profiles, insurance rates, and geographic indices on a monthly cadence.',
  },
];

// ─── About page ───────────────────────────────────────────────────────────────

interface AboutProps {
  onNavigate: (view: string) => void;
}

export const About = ({ onNavigate }: AboutProps) => {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA, null, 0) }}
      />

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="pb-24"
      >
        {/* ── Breadcrumb ── */}
        <nav
          className="max-w-4xl mx-auto px-4 pt-8 pb-2"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-xs text-text-muted">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-brand-primary transition-colors"
              >
                Home
              </button>
            </li>
            <li aria-hidden><ChevronRight size={12} /></li>
            <li className="text-text-primary font-medium">About Us</li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <header className="max-w-4xl mx-auto px-4 py-14 md:py-20 space-y-7">
          <span className="section-eyebrow">
            <Star size={13} className="text-brand-primary" />
            Our Story &amp; Mission
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-text-primary leading-[1.05]">
            Built for Dog&nbsp;Parents,<br />
            <span className="text-brand-primary italic">Backed by Data.</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl font-normal">
            PupWiki translates complex veterinary and actuarial data into clear,
            actionable insights — so every dog parent can make confident decisions
            about health, cost, and lifestyle.
          </p>
        </header>

        {/* ── Stats strip ── */}
        <section className="bg-brand-primary/5 border-y border-brand-primary/15 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {STATS.map(({ value, label }) => (
                <div key={label} className="space-y-1">
                  <dt className="text-4xl md:text-5xl font-display font-black text-brand-primary">
                    {value}
                  </dt>
                  <dd className="text-xs font-semibold text-text-muted uppercase tracking-[0.15em]">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section className="max-w-4xl mx-auto px-4 py-16 md:py-20 space-y-6">
          <span className="section-eyebrow">
            <BookOpen size={13} className="text-brand-primary" />
            The Origin Story
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
            Why PupWiki Exists
          </h2>
          <div className="prose prose-stone max-w-none space-y-5 text-text-secondary leading-relaxed text-base md:text-lg">
            <p>
              Most breed resources were built for advertising, not accuracy. They surface fluffy
              descriptions and cherry-picked photos — but leave dog parents guessing on the
              questions that actually matter: <em>How much will this breed cost me over its
              lifetime? Which health conditions should I watch for? Is this dog compatible with
              my apartment and my toddler?</em>
            </p>
            <p>
              PupWiki was founded on a simple conviction: dog parents deserve the same quality
              of data that insurance companies, veterinary researchers, and animal behaviorists
              use internally. We license, clean, and translate that data into clear language —
              and we never bury the hard truths behind a paywall or a sponsored post.
            </p>
          </div>
        </section>

        {/* ── Trust pillars ── */}
        <section className="bg-surface-soft border-y border-border-subtle py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 space-y-10">
            <div className="space-y-3">
              <span className="section-eyebrow">
                <Award size={13} className="text-brand-primary" />
                Our Commitments
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
                How We Maintain Trust
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PILLARS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="bg-white border border-border-subtle rounded-2xl p-6 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-bold text-text-primary">{title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="max-w-4xl mx-auto px-4 py-16 md:py-20 space-y-10">
          <div className="space-y-3">
            <span className="section-eyebrow">
              <Users size={13} className="text-brand-primary" />
              The Experts Behind the Data
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
              Meet Our Advisory Team
            </h2>
            <p className="text-text-secondary max-w-xl leading-relaxed">
              Every data point on PupWiki has a human expert accountable for its accuracy.
              These are the practitioners who keep our standards high.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PUPWIKI_AUTHORS.map(author => (
              <AuthorCard key={author.name} author={author} />
            ))}
          </div>
        </section>

        {/* ── Affiliate disclosure ── */}
        <section className="max-w-4xl mx-auto px-4 pb-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
            <h3 className="font-display font-bold text-text-primary flex items-center gap-2">
              <ShieldCheck size={16} className="text-brand-primary" />
              Affiliate & Sponsorship Disclosure
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              PupWiki participates in affiliate programmes including Crown &amp; Paw (custom pet
              art) and Raw Wild LLC (premium raw food). When you click an affiliate link and
              make a purchase, we may earn a small commission at no additional cost to you.
              Affiliate relationships <strong>never</strong> influence breed rankings, health
              assessments, or quiz results. Sponsored product placements are always labelled
              clearly and placed contextually based on breed data — not payment.
            </p>
          </div>
        </section>
      </motion.article>
    </>
  );
};
