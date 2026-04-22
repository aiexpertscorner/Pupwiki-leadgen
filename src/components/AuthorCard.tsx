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

// ─── Canonical author data (reused across About + pages) ─────────────────────

export const PUPWIKI_AUTHORS: Author[] = [
  {
    name:        'Dr. Sarah Mitchell',
    title:       'Lead Veterinary Advisor',
    credentials: 'DVM · DACVIM · 14 Years Clinical Experience',
    bio:         'Board-certified internist with a specialty in canine genetics and preventive medicine. Dr. Mitchell audits every health-risk profile on PupWiki and serves as the final authority on all medical content before publication.',
    initials:    'SM',
    expertise:   ['Canine Internal Medicine', 'Breed Genetics', 'Preventive Care'],
  },
  {
    name:        'James Chen',
    title:       'Head of Data Science',
    credentials: 'MS Actuarial Science · Former MetLife Analytics Lead',
    bio:         'Former actuarial modeler who built the insurance-cost methodology powering all 81 breed profiles. James designed the three-variable premium engine (breed × age × state) and leads ongoing data-pipeline improvements.',
    initials:    'JC',
    expertise:   ['Actuarial Modeling', 'Pet Insurance Data', 'Statistical Engineering'],
  },
  {
    name:        'Dr. Patricia Torres',
    title:       'Canine Behavior Specialist',
    credentials: 'PhD Applied Animal Behavior · Certified CAAB · 18 Years Research',
    bio:         'Applied animal behaviorist whose work spans breed-specific behavioral research and family-compatibility science. Dr. Torres oversees temperament profiles and the lifestyle-matching algorithm behind the Breed Finder Quiz.',
    initials:    'PT',
    expertise:   ['Canine Behavior', 'Breed Temperament Profiling', 'Family Compatibility'],
  },
];
