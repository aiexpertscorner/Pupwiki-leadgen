import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Author {
  name:         string;
  title:        string;
  credentials:  string;
  bio:          string;
  initials:     string;
  expertise:    string[];
  /** Optional Unsplash / CDN photo URL */
  photoUrl?:    string;
  /** Optional link (LinkedIn, profile page, etc.) */
  profileUrl?:  string;
}

interface AuthorCardProps {
  author:    Author;
  /** 'compact' renders a smaller horizontal layout for inline bylines */
  variant?:  'default' | 'compact';
}

// ─── AuthorCard ───────────────────────────────────────────────────────────────

export const AuthorCard = ({ author, variant = 'default' }: AuthorCardProps) => {
  const { name, title, credentials, bio, initials, expertise, photoUrl } = author;

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        <Avatar initials={initials} photoUrl={photoUrl} size="sm" />
        <div>
          <p className="text-sm font-semibold text-text-primary leading-tight">{name}</p>
          <p className="text-xs text-text-muted">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border-subtle rounded-2xl p-6 space-y-5 hover:border-brand-primary/30 hover:shadow-[0_4px_24px_rgba(217,119,6,0.08)] transition-all">
      {/* Header row */}
      <div className="flex items-start gap-4">
        <Avatar initials={initials} photoUrl={photoUrl} size="lg" />
        <div className="min-w-0">
          <h3 className="text-lg font-display font-bold text-text-primary leading-tight">
            {name}
          </h3>
          <p className="text-sm font-semibold text-brand-primary mt-0.5">{title}</p>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">{credentials}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-text-secondary leading-relaxed border-t border-divider pt-4">
        {bio}
      </p>

      {/* Expertise tags */}
      {expertise.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {expertise.map(tag => (
            <span key={tag} className="tag-amber">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Avatar sub-component ─────────────────────────────────────────────────────

interface AvatarProps {
  initials:  string;
  photoUrl?: string;
  size:      'sm' | 'lg';
}

const Avatar = ({ initials, photoUrl, size }: AvatarProps) => {
  const dim = size === 'lg' ? 'w-16 h-16 text-xl' : 'w-10 h-10 text-sm';

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={initials}
        className={`${dim} rounded-full object-cover border-2 border-brand-muted shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${dim} rounded-full bg-brand-primary/10 border-2 border-brand-primary/20 flex items-center justify-center font-display font-bold text-brand-dark shrink-0`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

// ─── Data source descriptions (replaces fabricated expert bios) ───────────────
//
// PupWiki does not currently employ named veterinary or actuarial reviewers.
// Content is compiled from public breed-authority sources listed below.
// This array is kept for structural reuse; populate with real team members
// when a verified editorial team is in place.

export interface DataSource {
  name:      string;
  title:     string;
  body:      string;
  initials:  string;
  tags:      string[];
}

export const PUPWIKI_DATA_SOURCES: DataSource[] = [
  {
    name:     'Breed Health Data',
    title:    'Public Breed-Authority Sources',
    body:     'Hereditary condition profiles are compiled from publicly available breed-health literature including AKC breed health statements, OFA (Orthopedic Foundation for Animals) prevalence data, and published veterinary epidemiology summaries. All content is educational and informational only.',
    initials: 'BH',
    tags:     ['AKC Breed Health', 'OFA Data', 'Veterinary Literature'],
  },
  {
    name:     'Insurance Cost Estimates',
    title:    'Actuarial & Market Data',
    body:     'Monthly premium estimates are calculated from public actuarial state filings by licensed pet insurance carriers, cross-referenced with Forbes Advisor\'s summary of Veterinary Pet Insurance Co. data. All figures are estimates for planning purposes, not insurance quotes.',
    initials: 'IC',
    tags:     ['Actuarial Filings', 'Forbes Advisor Data', 'VPI Summary'],
  },
  {
    name:     'Temperament & Behaviour Profiles',
    title:    'Breed Standard & Registry Sources',
    body:     'Temperament descriptors are drawn from AKC breed standards, UKC breed descriptions, and FCI breed documentation. Behavioural scores are relative indicators derived from those descriptions, not clinical assessments.',
    initials: 'TB',
    tags:     ['AKC Breed Standards', 'UKC Descriptions', 'FCI Documentation'],
  },
];

// Legacy export kept for component compatibility — maps DataSource to Author shape
export const PUPWIKI_AUTHORS: Author[] = PUPWIKI_DATA_SOURCES.map(ds => ({
  name:        ds.name,
  title:       ds.title,
  credentials: ds.tags.join(' · '),
  bio:         ds.body,
  initials:    ds.initials,
  expertise:   ds.tags,
}));
