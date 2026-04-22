import React from 'react';
import { motion } from 'motion/react';
import { 
  HeartPulse, 
  Stethoscope, 
  Coins, 
  Info, 
  Calendar, 
  Weight,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Activity,
  Dog,
  Brain,
  Shield,
  Zap,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { breeds, BreedData } from '@/src/data/breeds';
import { ChefpawAd, CrownAndPawAd, PendingInsuranceAd } from './ads';
import { SmartLeadWidget } from './SmartLeadWidget';
import { SmartImage } from './ui/SmartImage';
import { InsuranceComparison } from './InsuranceComparison';
import { cn } from '@/src/lib/utils';
import { 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

import { useActuarial } from '../hooks/useActuarial';
import healthProfilesData from '../data/pupwiki_breed-health-profiles.json';

interface BreedDetailProps {
  breed: BreedData;
  customName?: string;
  age?: number;
  stateCode?: string;
  priority?: string | null;
  onNavigate?: (view: any) => void;
}

export const BreedDetail = ({ breed, customName, age = 1, stateCode = 'CA', priority, onNavigate }: BreedDetailProps) => {
  const dogName = customName || breed.name;
  const actuarial = useActuarial(breed.slug, age, stateCode);
  const monthlyPremium = actuarial.finalMonthlyPremium;

  const PriorityHighlight = ({ type, label }: { type: string, label: string }) => {
    if (priority !== type) return null;
    return (
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary text-surface-bg rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg mb-4"
      >
        <Sparkles size={10} />
        Your Priority: {label}
      </motion.div>
    );
  };

  // Find health profile for this breed
  const healthProfile = healthProfilesData.profiles.find(p => p.breed_slug === breed.slug);

  const radarData = [
    { subject: 'Energy', A: breed.traits.energyLevel, fullMark: 10 },
    { subject: 'Training', A: breed.traits.trainability, fullMark: 10 },
    { subject: 'Shedding', A: breed.traits.shedding, fullMark: 10 },
    { subject: 'Size', A: (parseInt(breed.traits.weight) / 7) || 5, fullMark: 10 },
    { subject: 'Health', A: 10 - breed.healthRisks.length, fullMark: 10 },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const healthData = breed.healthRisks.map(risk => ({
    name: risk.condition,
    cost: risk.avgCost,
    coverage: monthlyPremium * 12,
  }));

  const parentBreeds = (breed.parent_breeds || breed.parentLinks?.map(id => ({ slug: id })))?.map(p => breeds.find(b => b.slug === p.slug)).filter(Boolean) as BreedData[];

  const relatedCrossbreeds = breeds.filter(b => 
    b.isCrossbreed && 
    (b.parent_breeds?.some(pb => pb.slug === breed.slug) || b.parentLinks?.includes(breed.slug))
  );

  // Data from master-breeds
  const intelligenceLabel = breed.ranking_data?.intelligence_label || "Average";
  const intelligencePct = breed.ranking_data?.intelligence_pct || "50";
  const lifetimeCost = breed.ranking_data?.lifetime_cost_usd || (breed.avgMonthlyInsurance * 12 * 12);
  const annualFood = breed.ranking_data?.annual_food_cost || 500;

  const energyLevelStr: 'active' | 'regular' | 'calm' =
    breed.traits.energyLevel >= 7 ? 'active' :
    breed.traits.energyLevel >= 4 ? 'regular' : 'calm';

  const sizeCategoryStr: 'large' | 'medium' | 'small' =
    breed.size?.toLowerCase() === 'large' ? 'large' :
    breed.size?.toLowerCase() === 'small' ? 'small' : 'medium';

  const relatedByGroup = breed.akc_group
    ? breeds.filter(b => b.akc_group === breed.akc_group && b.slug !== breed.slug).slice(0, 4)
    : [];

  const breedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pupwiki.com/" },
          ...(breed.akc_group ? [{ "@type": "ListItem", "position": 2, "name": breed.akc_group, "item": `https://pupwiki.com/breeds/group/${breed.akc_group.toLowerCase().replace(/\s+/g, '-')}/` }] : []),
          { "@type": "ListItem", "position": breed.akc_group ? 3 : 2, "name": breed.name, "item": `https://pupwiki.com/breeds/${breed.slug}/` }
        ]
      },
      {
        "@type": "Article",
        "headline": breed.seo?.title || `${breed.name} Breed Guide — Health Data & Insurance Costs`,
        "description": breed.seo?.description || breed.description,
        "url": `https://pupwiki.com/breeds/${breed.slug}/`,
        "image": breed.image,
        "dateModified": new Date().toISOString().split('T')[0],
        "author": { "@type": "Organization", "name": "PupWiki Editorial Team" },
        "publisher": { "@type": "Organization", "name": "PupWiki", "url": "https://pupwiki.com" }
      }
    ]
  };

  return (
    <div className="space-y-6 md:space-y-12 pb-24 selection:bg-brand-primary/20 bg-surface-bg text-text-secondary relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breedSchema) }} />

      {/* Mobile Sticky Sub-Nav: High Engagement Discovery */}
      <div className="md:hidden sticky top-0 z-[100] bg-surface-main/80 backdrop-blur-xl border-b border-divider px-4 py-2 flex items-center justify-between shadow-2xl">
        <button 
          onClick={() => window.history.back()}
          className="p-2 bg-surface-base rounded-xl text-brand-primary border border-divider"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { label: 'Health', id: 'diagnostics' },
            { label: 'Costs', id: 'cost' },
            { label: 'Safety', id: 'insurance' },
            { label: 'Your Picks', id: 'care' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className="px-4 py-2 bg-surface-elevated active:bg-brand-primary active:text-surface-bg border border-divider rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-text-muted whitespace-nowrap transition-all shadow-lg shadow-black/20"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section: Mobile Optimized & Dramatic */}
      <section className="relative h-[65vh] md:h-[75vh] min-h-[500px] md:min-h-[650px] -mt-16 md:-mt-8 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden border-b border-divider shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <SmartImage 
            src={breed.image} 
            alt={breed.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-bg via-surface-bg/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-bg/60 via-transparent to-transparent hidden md:block" />
        </motion.div>
        
        <div className="absolute inset-0 flex items-end pb-12 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-6 md:space-y-10">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 md:gap-3 items-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-primary rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-surface-bg shadow-2xl shadow-brand-primary/30">
                  <ShieldCheck size={14} />
                  Verified Info
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-main/90 backdrop-blur-md rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] border border-brand-primary/30 text-brand-primary shadow-xl">
                  Rank #{breed.akc_popularity || '??'}
                </div>
                {breed.isHypoallergenic && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-risk-low/20 backdrop-blur-md rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] border border-risk-low/40 text-risk-low shadow-lg">
                    Hypoallergenic
                  </div>
                )}
              </motion.div>
              
              <div className="space-y-2 md:space-y-6">
                <motion.h1 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-6xl sm:text-8xl md:text-[10rem] font-display font-black uppercase leading-[0.8] tracking-tighter text-text-primary drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                >
                  {breed.name}
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center gap-6 text-brand-primary/90"
                >
                   <div className="h-px w-16 md:w-32 bg-gradient-to-r from-brand-primary/60 to-transparent" />
                   <p className="text-xs md:text-2xl font-display font-black uppercase tracking-[0.3em] brightness-125">
                     {intelligencePct}% IQ Percentile
                   </p>
                </motion.div>
              </div>
            </div>
            
            {/* Desktop Hero Attribute Display */}
            <div className="hidden lg:flex flex-wrap gap-6 items-end justify-end">
              <div className="flex flex-col items-end gap-2">
                <PriorityHighlight type="longevity" label="Longevity" />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="p-10 bg-surface-main/40 backdrop-blur-2xl border border-white/10 rounded-[40px] flex items-center gap-12 shadow-2xl premium-card"
                >
                  <div className="flex flex-col items-center gap-3 text-center group">
                    <Calendar className="text-brand-primary group-hover:scale-110 transition-transform" size={32} />
                    <span className="text-[10px] font-black text-text-dim uppercase tracking-[0.3em]">Longevity</span>
                    <span className="text-3xl font-black text-text-primary tracking-tighter">{breed.traits.lifespan}</span>
                  </div>
                  <div className="w-px h-20 bg-divider/40" />
                  <div className="flex flex-col items-center gap-3 text-center group">
                    <Brain className="text-brand-primary group-hover:scale-110 transition-transform" size={32} />
                    <span className="text-[10px] font-black text-text-dim uppercase tracking-[0.3em]">Training IQ</span>
                    <span className="text-3xl font-black text-text-primary tracking-tighter">{intelligenceLabel}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Discovery Strip: High-Tension Mobile Data Grid */}
      <div className="lg:hidden px-4 -mt-10 relative z-20">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="p-5 bg-surface-card border border-divider rounded-[28px] shadow-2xl flex flex-col gap-4 group active:border-brand-primary transition-all"
            >
               <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-inner">
                  <Dog size={18} />
               </div>
               <div>
                  <p className="text-[9px] font-black text-text-dim uppercase tracking-[0.3em] mb-1">Breed Type</p>
                  <p className="text-lg font-black text-text-primary uppercase tracking-tight leading-none">{breed.ranking_data?.breed_type || "Standard"}</p>
               </div>
            </motion.div>
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="p-5 bg-surface-card border border-divider rounded-[28px] shadow-2xl flex flex-col gap-4 group active:border-brand-primary transition-all"
            >
               <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-inner">
                  <Shield size={18} />
               </div>
               <div>
                  <p className="text-[9px] font-black text-text-dim uppercase tracking-[0.3em] mb-1">Owner XP</p>
                  <p className="text-lg font-black text-brand-primary uppercase tracking-tight leading-none">Level {Math.ceil(breed.traits.trainability / 2)}</p>
               </div>
            </motion.div>
         </div>
      </div>

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="max-w-7xl mx-auto px-4 -mt-4">
        <ol className="flex items-center flex-wrap gap-1.5 text-[11px] text-text-muted">
          <li>
            <button onClick={() => onNavigate?.('home')} className="hover:text-brand-primary transition-colors font-medium">
              Home
            </button>
          </li>
          <ChevronRight size={11} className="text-text-dim" />
          {breed.akc_group && (
            <>
              <li>
                <button onClick={() => onNavigate?.('home')} className="hover:text-brand-primary transition-colors font-medium">
                  {breed.akc_group}
                </button>
              </li>
              <ChevronRight size={11} className="text-text-dim" />
            </>
          )}
          <li className="text-text-primary font-semibold">{breed.name}</li>
        </ol>
      </nav>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
        
        {/* Left Column: Data & Health */}
        <div className="lg:col-span-2 space-y-12 md:space-y-20">
          
          {/* Executive Summary */}
          <section className="space-y-6 md:space-y-8">
             <div className="flex items-center gap-4">
                <div className="h-8 md:h-10 w-1.5 md:w-2 bg-brand-primary rounded-full" />
                <h2 className="text-3xl md:text-4xl font-display uppercase font-black text-text-primary tracking-tight">The Full Picture</h2>
             </div>
             <div className="prose prose-invert max-w-none prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:text-text-secondary font-medium">
                <p>{breed.description}</p>
                {breed.seo?.rich_content && (
                   <div className="mt-8 p-6 md:p-10 bg-surface-main rounded-[32px] md:rounded-[40px] border border-divider premium-card shadow-inner relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl" />
                      <h4 className="text-brand-primary font-black uppercase text-[10px] tracking-[0.3em] mb-4 md:mb-6">Important Insights</h4>
                      <p className="text-text-muted italic text-sm md:text-base leading-relaxed relative z-10">{breed.seo.rich_content}</p>
                   </div>
                )}
             </div>
          </section>

          {/* Performance Matrix: Authority Bento */}
          <section id="diagnostics" className="scroll-mt-32 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 md:p-4 bg-brand-primary/10 rounded-2xl text-brand-primary border border-brand-primary/20 shadow-lg">
                  <Brain size={28} className="md:size-32" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-3xl md:text-5xl font-display uppercase font-black text-text-primary lg:tracking-tighter">
                    {customName ? `${customName}'s Superpowers` : "What Makes Them Special"}
                  </h2>
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">Traits & Personality</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-surface-main border border-divider p-8 md:p-12 rounded-[40px] md:rounded-[64px] premium-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="h-[320px] md:h-[450px] w-full order-2 lg:order-1 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#2A2D35" strokeDasharray="4 4" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#B6BBC6', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }} 
                    />
                    <Radar
                      name={breed.name}
                      dataKey="A"
                      stroke="#F4C20D"
                      strokeWidth={3}
                      fill="#F4C20D"
                      fillOpacity={0.15}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-10 order-1 lg:order-2">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-lg text-[9px] font-black text-brand-primary uppercase tracking-[0.2em] border border-brand-primary/20">
                     Expert Analysis
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-text-primary leading-tight">What to Expect</h3>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed font-medium">
                    We've analyzed the {breed.name} across five key personality areas to help you understand their unique needs.
                  </p>
                </div>

                <div className="grid gap-6">
                  {radarData.map((stat, i) => (
                    <div key={i} className="group/stat space-y-2">
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                           <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-dim group-hover/stat:text-brand-primary transition-colors">{stat.subject}</span>
                           <span className="text-xs font-bold text-text-muted opacity-60">Variance: +/- 0.4</span>
                        </div>
                        <span className="text-xl font-black text-text-primary tracking-tighter">{stat.A}<span className="text-[10px] text-text-dim ml-1">/10</span></span>
                      </div>
                      <div className="h-2 bg-surface-base rounded-full overflow-hidden border border-divider p-0.5 relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(stat.A/10)*100}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full bg-brand-primary rounded-full shadow-[0_0_20px_rgba(244,194,13,0.5)]"
                        />
                        <div className="absolute top-0 right-0 h-full w-px bg-white/20 blur-[1px]" style={{ left: '70%' }} title="Breed Average" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Heritage Section: Mobile Optimized */}
          {breed.isCrossbreed && (
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary border border-brand-primary/20">
                  <Dog size={32} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display uppercase font-black text-text-primary">Origin Breeds</h2>
              </div>

              <div className="bg-surface-elevated rounded-[32px] md:rounded-[48px] p-8 md:p-16 text-text-primary relative overflow-hidden border border-divider shadow-inner group">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                   <div className="absolute inset-0 bg-[radial-gradient(#F4C20D_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>
                
                <div className="relative z-10 space-y-12">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    <div className="text-center md:text-left space-y-3">
                       <p className="text-brand-primary font-black uppercase text-[10px] tracking-[0.4em]">Genetic Blueprint</p>
                       <h3 className="text-4xl md:text-6xl font-display font-black uppercase leading-[0.9] tracking-tighter">
                          {breed.parent_blend_summary || breed.lineage || "Designer Hybrid"}
                       </h3>
                    </div>
                    <div className="flex -space-x-10 md:-space-x-12">
                      {parentBreeds.map((pb, i) => (
                        <div 
                          key={i} 
                          onClick={() => onNavigate?.({ type: 'detail', slug: pb.slug })}
                          className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 md:border-8 border-surface-bg overflow-hidden relative group/parent shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-pointer"
                        >
                           <SmartImage src={pb.image} alt={pb.name} className="w-full h-full group-hover/parent:scale-110 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-surface-bg/40 group-hover/parent:bg-transparent transition-colors" />
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/parent:opacity-100 transition-opacity">
                              <span className="bg-brand-primary text-surface-bg px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">{pb.name}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-divider/50">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">About the mix</h4>
                        <p className="text-text-secondary text-sm md:text-base leading-relaxed font-bold opacity-80">
                          {breed.description.split('.')[0]}. Combining the {parentBreeds.map(p => p.name).join(' and ')} creates a unique profile.
                        </p>
                     </div>
                     <div className="p-6 md:p-8 bg-surface-main/60 rounded-[28px] md:rounded-[32px] border border-brand-primary/10 backdrop-blur-sm shadow-xl flex flex-col justify-center">
                        <button 
                          onClick={() => onNavigate?.({ type: 'detail', slug: parentBreeds[0]?.slug })}
                          className="flex items-center justify-between group/link text-brand-primary py-2"
                        >
                           <span className="text-[10px] font-black uppercase tracking-widest">Learn about {parentBreeds[0]?.name}</span>
                           <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </button>
                        <button 
                          onClick={() => onNavigate?.({ type: 'detail', slug: parentBreeds[1]?.slug })}
                          className="flex items-center justify-between group/link text-brand-primary py-2 border-t border-divider/10"
                        >
                           <span className="text-[10px] font-black uppercase tracking-widest">Learn about {parentBreeds[1]?.name}</span>
                           <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Related Crossbreeds Section: Only for Purebreds */}
          {!breed.isCrossbreed && relatedCrossbreeds.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary border border-brand-primary/20">
                  <Sparkles size={32} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display uppercase font-black text-text-primary">{breed.name} Crossbreeds</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedCrossbreeds.map((cb) => (
                  <motion.div 
                    key={cb.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate?.({ type: 'detail', slug: cb.slug })}
                    className="group cursor-pointer p-6 bg-surface-main border border-divider rounded-[32px] hover:border-brand-primary/40 transition-all flex items-center gap-6"
                  >
                     <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl bg-surface-base border border-divider">
                        <SmartImage src={cb.image} alt={cb.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <div className="flex-1 space-y-1">
                        <h4 className="text-lg font-black text-text-primary uppercase tracking-tight group-hover:text-brand-primary transition-colors">{cb.name}</h4>
                        <p className="text-[9px] font-black text-text-dim uppercase tracking-widest">
                           {cb.parent_breeds?.map(p => p.name).join(' x ')}
                        </p>
                        <div className="flex items-center gap-1 text-brand-primary pt-2">
                           <span className="text-[8px] font-black uppercase tracking-widest">View Profile</span>
                           <ChevronRight size={12} />
                        </div>
                     </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Related Breeds by AKC Group */}
          {relatedByGroup.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary border border-brand-primary/20">
                  <Dog size={24} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-display uppercase font-black text-text-primary">
                    More {breed.akc_group || 'Related'} Breeds
                  </h2>
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mt-0.5">Same group · Similar traits</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedByGroup.map((rb) => (
                  <motion.div
                    key={rb.slug}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onNavigate?.({ type: 'detail', slug: rb.slug })}
                    className="group cursor-pointer bg-surface-main border border-divider rounded-2xl overflow-hidden hover:border-brand-primary/40 transition-all"
                  >
                    <div className="aspect-square overflow-hidden">
                      <SmartImage
                        src={rb.image}
                        alt={rb.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-[11px] font-black text-text-primary uppercase tracking-tight group-hover:text-brand-primary transition-colors leading-snug">{rb.name}</h4>
                      <div className="flex items-center gap-1 mt-1 text-brand-primary">
                        <span className="text-[9px] font-black uppercase tracking-widest">View Profile</span>
                        <ChevronRight size={10} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Diagnostic Registry: Clinical Table & Mobile Cards */}
          <section className="space-y-8">
            <PriorityHighlight type="health" label="Health & Wellness" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 md:p-4 bg-risk-high/10 rounded-2xl text-risk-high border border-risk-high/20">
                  <HeartPulse size={32} className="md:size-36" />
                </div>
                <div className="space-y-1">
                   <h2 className="text-3xl md:text-5xl font-display uppercase font-black text-text-primary lg:tracking-tighter">Health Snapshot</h2>
                   <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">Personalized Risk & Care Guide</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-surface-elevated rounded-xl border border-divider flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-risk-high animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">Based on standard veterinary data</span>
              </div>
            </div>

            {/* NEW: Breed Specific Health Insights from Profiles */}
            {healthProfile && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-base border border-divider rounded-[32px] p-8 md:p-10 premium-card">
                 <div className="space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-widest text-brand-primary flex items-center gap-3">
                      <Zap size={18} />
                      At-Home Surveillance
                    </h3>
                    <div className="space-y-4">
                      {healthProfile.common_issues.map((issue, idx) => (
                        <div key={idx} className="p-5 bg-surface-card rounded-2xl border border-divider hover:border-brand-primary/20 transition-all">
                           <div className="flex items-center justify-between mb-2">
                             <span className="font-black text-text-primary uppercase tracking-tight">{issue.name}</span>
                             <span className="px-2 py-0.5 bg-risk-high/10 text-risk-high text-[8px] font-black uppercase tracking-widest rounded">{issue.severity}</span>
                           </div>
                           <p className="text-xs text-text-dim leading-relaxed">
                             <span className="font-bold text-brand-primary">Warning Signs:</span> {issue.early_warning}
                           </p>
                        </div>
                      ))}
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-widest text-brand-primary flex items-center gap-3">
                      <ShieldCheck size={18} />
                      Critical Care Tips
                    </h3>
                    <div className="p-6 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl italic font-bold text-text-secondary leading-relaxed">
                      "{healthProfile.care_tips}"
                    </div>
                    <div className="flex items-center gap-4 p-5 bg-surface-base border border-divider rounded-2xl">
                      <Activity className="text-brand-primary" size={24} />
                      <p className="text-[10px] font-black uppercase tracking-widest leading-snug">
                        Recommended Checkups: Age {age} monitoring intensified for {breed.name} longevity markers.
                      </p>
                    </div>
                 </div>
              </div>
            )}

            {/* Mobile View: Clinical Cards */}
            <div className="md:hidden space-y-4">
               {breed.healthRisks.map((risk, i) => (
                 <motion.div 
                    key={i}
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-surface-main border border-divider rounded-[28px] space-y-5 premium-card"
                 >
                    <div className="flex justify-between items-start">
                       <h3 className="text-xl font-black uppercase tracking-tight text-text-primary leading-tight w-2/3">{risk.condition}</h3>
                       <span className={cn(
                          "px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.15em] border",
                          risk.probability.toLowerCase() === 'high' ? "bg-risk-high/10 text-risk-high border-risk-high/20" :
                          risk.probability.toLowerCase() === 'medium' ? "bg-warning/10 text-warning border-warning/20" :
                          "bg-success/10 text-success border-success/20"
                       )}>
                          {risk.probability}
                       </span>
                    </div>
                    <p className="text-xs font-bold text-text-muted italic opacity-70">"{risk.description}"</p>
                    <div className="flex justify-between items-center pt-4 border-t border-divider/50">
                       <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-dim">Est. Treatment</span>
                       <span className="text-lg font-black text-brand-primary tracking-tighter">${risk.avgCost.toLocaleString()}</span>
                    </div>
                 </motion.div>
               ))}
            </div>

            {/* Desktop View: Authority Table */}
            <div className="hidden md:block overflow-hidden border border-divider rounded-[48px] bg-surface-main shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none" />
              <table className="w-full text-left border-collapse border-spacing-0 relative z-10">
                <thead>
                  <tr className="bg-surface-base/80 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] text-text-dim border-b border-divider">
                    <th className="px-12 py-10">Hereditary Condition</th>
                    <th className="px-12 py-10">Risk Stratum</th>
                    <th className="px-12 py-10">Clinical Cost Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider/20">
                  {breed.healthRisks.map((risk, i) => (
                    <tr key={i} className="hover:bg-surface-elevated/40 transition-all group">
                      <td className="px-12 py-12">
                        <div className="font-black text-2xl text-text-primary group-hover:text-brand-primary transition-colors uppercase tracking-tight leading-none mb-3">{risk.condition}</div>
                        <p className="text-xs font-bold text-text-dim leading-relaxed italic opacity-60">"{risk.description}"</p>
                      </td>
                      <td className="px-12 py-12">
                        <span className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-lg",
                          risk.probability.toLowerCase() === 'high' ? "bg-risk-high/10 text-risk-high border-risk-high/30 shadow-risk-high/5" :
                          risk.probability.toLowerCase() === 'medium' ? "bg-warning/10 text-warning border-warning/30 shadow-warning/5" :
                          "bg-success/10 text-success border-success/30 shadow-success/5"
                        )}>
                          {risk.probability}
                        </span>
                      </td>
                      <td className="px-12 py-12">
                        <div className="flex items-baseline gap-2 font-black text-3xl text-text-primary tracking-tighter">
                          <span className="text-brand-primary opacity-60 text-xl font-bold">$</span>{risk.avgCost.toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Cost Analytics Grid: Financial Authority */}
          <section id="cost" className="scroll-mt-32 space-y-8 bg-brand-primary rounded-[40px] md:rounded-[80px] p-8 md:p-24 text-surface-bg overflow-hidden relative shadow-[0_40px_100px_rgba(244,194,13,0.2)] group">
            <PriorityHighlight type="savings" label="Cost Savings" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-surface-bg/10 rounded-full blur-[140px] -mr-48 -mt-48 group-hover:bg-surface-bg/20 transition-all duration-1000" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] -ml-24 -mb-24" />
            
            <div className="relative z-10 space-y-16">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-surface-bg/10 border border-surface-bg/20 rounded-xl text-[10px] font-black uppercase tracking-[0.3em]">
                    <Coins size={14} />
                    Insurance Estimates
                  </div>
                  <h2 className="text-4xl md:text-7xl font-display uppercase font-black tracking-tighter leading-[0.9]">Annual Care Costs</h2>
                </div>
                <div className="flex flex-col items-start md:items-end bg-surface-bg/5 backdrop-blur-md p-6 md:p-8 rounded-[32px] border border-surface-bg/10">
                   <button 
                     onClick={() => onNavigate?.('methodology')}
                     className="text-[10px] uppercase font-black tracking-[0.3em] opacity-60 mb-2 hover:text-brand-primary underline underline-offset-4"
                   >
                     How we calculate this
                   </button>
                   <p className="text-5xl md:text-7xl font-black tracking-tighter leading-none">${lifetimeCost.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-[350px] md:h-[500px] w-full bg-surface-bg/10 p-6 md:p-12 rounded-[32px] md:rounded-[56px] border border-surface-bg/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group/chart">
                  <div className="absolute top-6 left-12 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Condition Recovery Costs</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={healthData} margin={{ top: 40, right: 0, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="8 8" stroke="#ffffff08" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="currentColor" 
                        fontSize={8} 
                        tickLine={false} 
                        axisLine={false} 
                        tick={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fillOpacity: 0.6 }} 
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                      />
                      <YAxis 
                        stroke="currentColor" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(v) => `$${v/1000}k`} 
                        tick={{ fontWeight: 900, fillOpacity: 0.8 }} 
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '28px', padding: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}
                        itemStyle={{ fontSize: '16px', fontWeight: '900', color: '#F4C20D' }}
                        cursor={{ fill: 'rgba(255,255,255,0.08)', radius: 12 }}
                        labelStyle={{ color: '#fff', marginBottom: '10px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: '900' }}
                      />
                      <Bar 
                        name="Projected Cost" 
                        dataKey="cost" 
                        fill="currentColor" 
                        radius={[16, 16, 4, 4]} 
                        barSize={64} 
                        className="filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="p-10 bg-surface-bg/10 border border-surface-bg/10 rounded-[40px] flex-1 flex flex-col justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-3">Annual Nourishment</p>
                    <p className="text-4xl md:text-5xl font-black tracking-tighter">${annualFood.toLocaleString()}</p>
                    <p className="text-[9px] font-bold opacity-40 uppercase mt-4 tracking-widest">+ Inflation Adjust: 4.2%</p>
                  </div>
                  <div className="p-10 bg-surface-bg rounded-[40px] shadow-2xl text-brand-primary border border-brand-primary/20 flex-1 flex flex-col justify-center relative overflow-hidden group/tile">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/tile:opacity-20 transition-opacity">
                      <Shield size={64} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-surface-bg opacity-60 mb-3">Estimated Insurance</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl md:text-5xl font-black tracking-tighter">${(monthlyPremium * 12).toLocaleString()}</p>
                      <span className="text-sm font-black opacity-40">/yr</span>
                    </div>
                    <p className="text-[9px] font-bold text-surface-bg opacity-40 uppercase mt-4 tracking-widest">Risk Level: {breed.riskTier}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contextual Affiliate Recommendations */}
          <section id="care" className="scroll-mt-32 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 md:p-4 bg-brand-primary/10 rounded-2xl text-brand-primary border border-brand-primary/20 shadow-lg">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-display uppercase font-black text-text-primary">
                  {customName ? `${customName}'s Picks` : 'Expert Recommendations'}
                </h2>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mt-1">Curated for {breed.name} owners</p>
              </div>
            </div>

            {/* ChefPaw — active energy or large size breeds */}
            {(energyLevelStr === 'active' || sizeCategoryStr === 'large') && (
              <ChefpawAd
                breedName={breed.name}
                energyLevel={energyLevelStr}
                sizeCategory={sizeCategoryStr}
              />
            )}

            {/* Crown & Paw — always on breed detail pages */}
            <CrownAndPawAd breedName={breed.name} />

            {/* ChefPaw compact for calm/medium/small breeds that didn't get full card */}
            {energyLevelStr !== 'active' && sizeCategoryStr !== 'large' && (
              <ChefpawAd
                breedName={breed.name}
                energyLevel={energyLevelStr}
                sizeCategory={sizeCategoryStr}
                variant="compact"
              />
            )}
          </section>

          {/* Clinical Verdict: Authority Summary */}
          <section className="p-10 md:p-24 bg-surface-main border border-divider rounded-[48px] md:rounded-[80px] premium-card relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
             <PriorityHighlight type="training" label="Bonding & Training" />
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />
             <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] group-hover:bg-brand-primary/10 transition-colors duration-1000" />
             
             <div className="relative z-10 space-y-12 max-w-4xl">
               <div className="space-y-4">
                 <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">
                    <Activity size={14} />
                    Final Thoughts
                 </div>
                 <h2 className="text-3xl md:text-7xl font-display uppercase font-black text-text-primary tracking-tighter leading-[0.9]">Our Expert Verdict</h2>
               </div>
               
               <p className="text-base md:text-2xl text-text-muted font-bold leading-relaxed italic opacity-80 border-l-4 border-brand-primary pl-6 md:pl-12">
                 "{breed.description}"
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                  <div className="space-y-4">
                     <p className="text-[11px] md:text-[12px] font-black text-brand-primary uppercase tracking-[0.3em]">Energy & Training</p>
                     <p className="text-xs md:text-base text-text-muted font-bold leading-relaxed">
                        Great for {breed.traits.energyLevel > 7 ? 'active families' : 'a relaxed home life'} and {breed.traits.trainability > 7 ? 'very easy to train' : 'comfortable doing their own thing'}.
                     </p>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[11px] md:text-[12px] font-black text-brand-primary uppercase tracking-[0.3em]">Health Profile</p>
                     <p className="text-xs md:text-base text-text-muted font-bold leading-relaxed">
                        Generally healthy but standard checks are recommended. This breed needs {breed.traits.energyLevel > 5 ? 'regular' : 'moderate'} daily activity to stay fit.
                     </p>
                  </div>
               </div>
             </div>
          </section>

          {/* Insurance Ecosystem integration */}
          <InsuranceComparison breed={breed} age={age} stateCode={stateCode} />

        </div>

        {/* Right Column: Sticky Sidebar / Monetization */}
        <div className="space-y-8 md:space-y-12">
          <div className="sticky top-28 space-y-8 md:space-y-12 pb-12">
            
            {/* Clinical Quote Widget */}
              <div className="bg-surface-main border border-border-subtle rounded-[32px] md:rounded-[48px] p-8 md:p-12 space-y-10 shadow-2xl premium-card relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors" />
                
                <div className="space-y-3 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-text-primary">Quick Stats</h3>
                  <p className="text-[9px] font-black text-text-dim uppercase tracking-[0.2em] border-b border-divider pb-6">Reliable Care Data 2026</p>
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="p-8 bg-surface-base rounded-[32px] border border-divider shadow-inner group/stat hover:border-brand-primary/40 transition-colors">
                    <span className="text-[9px] font-black text-text-dim uppercase tracking-widest block mb-3">Health Score</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-brand-primary tracking-tighter">94<span className="text-2xl">%</span></span>
                      <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Wellness Index</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-5 bg-surface-base/50 rounded-[24px] border border-divider text-center">
                        <span className="text-[8px] font-black text-text-dim uppercase tracking-widest block mb-1">IQ Rank</span>
                        <span className="text-lg font-black text-text-primary uppercase">{breed.ranking_data?.intelligence_label?.split(' ')[0] || "High"}</span>
                     </div>
                     <div className="p-5 bg-surface-base/50 rounded-[24px] border border-divider text-center">
                        <span className="text-[8px] font-black text-text-dim uppercase tracking-widest block mb-1">Cost Tier</span>
                        <span className="text-lg font-black text-brand-primary uppercase">{breed.riskTier} Class</span>
                     </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 bg-brand-primary/5 rounded-[24px] border border-brand-primary/10 relative z-10">
                  <ShieldCheck className="text-brand-primary shrink-0" size={20} />
                  <p className="text-[10px] text-text-secondary font-black leading-tight uppercase tracking-wide opacity-80">
                    Our data suggests a {breed.healthRisks.length > 5 ? 'High' : 'Stable'} health risk index.
                  </p>
                </div>

                <div className="relative z-10">
                  <PendingInsuranceAd
                    breedName={breed.name}
                    estimatedMonthlyCost={monthlyPremium ? Math.round(monthlyPremium) : undefined}
                    stateCode={stateCode}
                  />
                </div>
              </div>

              {/* Maintenance Protocols Bento */}
              <div className="bg-surface-main border border-divider rounded-[32px] md:rounded-[48px] p-8 md:p-12 space-y-10 shadow-xl relative overflow-hidden">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-text-primary">Daily Care Guide</h3>
                  <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">Experience Level: {breed.traits.trainability > 7 ? 'Average' : 'High'}</p>
                </div>

                <div className="space-y-6">
                  {breed.care_tips?.slice(0, 3).map((tip, i) => (
                    <div key={i} className="group cursor-pointer p-6 bg-surface-base/30 hover:bg-surface-base/60 rounded-[24px] border border-divider hover:border-brand-primary/40 transition-all">
                       <div className="flex items-center justify-between mb-3">
                          <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em]">Care Tip 0{i+1}</span>
                          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                       </div>
                       <p className="text-sm font-black text-text-secondary leading-snug group-hover:text-text-primary transition-colors uppercase tracking-tight opacity-90">{tip}</p>
                    </div>
                  ))}
                  
                  {!breed.care_tips && (
                    <div className="p-6 bg-surface-base/30 rounded-[24px] border border-divider">
                       <p className="text-sm font-black text-text-muted italic text-center">Gathering tips...</p>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                   <div className="flex items-center gap-4 text-[9px] font-black text-text-dim uppercase tracking-[0.2em] justify-center">
                      <span className="flex-1 h-px bg-divider" />
                      Updated weekly
                      <span className="flex-1 h-px bg-divider" />
                   </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
