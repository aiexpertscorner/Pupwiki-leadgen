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
  ExternalLink
} from 'lucide-react';
import { BreedData } from '@/src/data/breeds';
import { LeadWidget } from './LeadWidget';
import { cn } from '@/src/lib/utils';
import { 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';

interface BreedDetailProps {
  breed: BreedData;
}

export const BreedDetail = ({ breed }: BreedDetailProps) => {
  const radarData = [
    { subject: 'Energy', A: breed.traits.energyLevel, fullMark: 10 },
    { subject: 'Training', A: breed.traits.trainability, fullMark: 10 },
    { subject: 'Shedding', A: breed.traits.shedding, fullMark: 10 },
    { subject: 'Size', A: parseInt(breed.traits.weight) / 7, fullMark: 10 }, // Normalized
    { subject: 'Health', A: 10 - breed.healthRisks.length, fullMark: 10 },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[450px] -mt-8 rounded-b-[32px] overflow-hidden bg-slate-900">
        <img 
          src={breed.image} 
          alt={breed.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
        
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-8 items-end">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary rounded-lg text-[10px] font-black uppercase tracking-widest">
                  <Stethoscope size={14} />
                  Veterinary Reviewed
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/20">
                  {breed.size} Classification
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/20">
                  {breed.origin}
                </div>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black uppercase leading-[0.85] tracking-tighter text-white">
                {breed.name}
              </h1>
              <p className="text-lg md:text-xl text-slate-200 font-medium max-w-xl leading-relaxed">
                Everything you need to know about {breed.name} health risks, traits, and insurance costs in 2026.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-end justify-end">
              <div className="p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-6">
                <div className="flex flex-col items-center gap-1">
                  <Calendar className="text-brand-primary" size={24} />
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Lifespan</span>
                  <span className="text-lg font-black text-white">{breed.traits.lifespan}</span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex flex-col items-center gap-1">
                  <Weight className="text-brand-primary" size={24} />
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Weight</span>
                  <span className="text-lg font-black text-white">{breed.traits.weight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Data & Health */}
        <div className="lg:col-span-2 space-y-16">
          
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                <BarChart3 size={24} />
              </div>
              <h2 className="text-3xl font-display uppercase font-black text-slate-900">Breed Dynamics</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white border border-border-subtle p-10 rounded-3xl shadow-sm">
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                    <Radar
                      name={breed.name}
                      dataKey="A"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">Trait Analysis</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  The {breed.name} exhibits a balanced trait profile. While their energy level is moderate, their trainability score of {breed.traits.trainability}/10 makes them a highly responsive companion. 
                </p>
                <div className="space-y-4">
                  {radarData.map((stat, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-slate-400">{stat.subject}</span>
                        <span className="text-brand-primary">{stat.A}/10</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(stat.A/10)*100}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                          className="h-full bg-brand-primary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Health Risks Table: pSEO Data Points */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-600">
                <HeartPulse size={24} />
              </div>
              <h2 className="text-3xl font-display uppercase font-black text-slate-900">Genetic Health Risks</h2>
            </div>

            <div className="overflow-hidden border border-border-subtle rounded-2xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-border-subtle">
                    <th className="px-6 py-4">Condition</th>
                    <th className="px-6 py-4">Probability</th>
                    <th className="px-6 py-4">Avg. Surgery Cost</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {breed.healthRisks.map((risk, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-900">{risk.condition}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{risk.description}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider",
                          risk.probability === 'High' ? "bg-rose-500/10 text-rose-600" :
                          risk.probability === 'Medium' ? "bg-amber-500/10 text-amber-600" :
                          "bg-emerald-500/10 text-emerald-600"
                        )}>
                          {risk.probability}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1 font-black text-slate-900">
                          <Coins size={14} className="text-brand-primary" />
                          ${risk.avgCost.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <button className="text-[10px] font-black text-slate-400 hover:text-brand-primary flex items-center gap-1 transition-colors uppercase tracking-widest">
                          Learn More
                          <ExternalLink size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4 items-start">
              <Info className="text-brand-primary shrink-0" size={20} />
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Data based on 2025-2026 veterinary cost analysis in the United States. Prices reflect averages across 50 states and include post-operative care. Under our commitment to clinical accuracy, we recommend reviewing these risks with a licensed veterinarian.
              </p>
            </div>
          </section>

          {/* Lead Gen Call to Action */}
          <LeadWidget breed={breed.name} variant="inline" />

        </div>

        {/* Right Column: Sticky Sidebar / Monetization */}
        <div className="space-y-8">
          <div className="sticky top-24 space-y-8">
            {/* Quick Stats Widget */}
              <div className="bg-white border border-border-subtle rounded-3xl p-8 space-y-8 shadow-sm">
                <h3 className="text-xl font-display font-black uppercase tracking-tight text-slate-900 border-b border-slate-100 pb-4">Insurance Quotes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Premium</span>
                    <span className="text-2xl font-black text-slate-900">${breed.avgMonthlyInsurance}/mo</span>
                  </div>
                  <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 opacity-50">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">W/ Add-ons</span>
                    <span className="text-2xl font-black text-slate-900">${breed.avgMonthlyInsurance + 25}/mo</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 text-center font-bold px-4">
                  *Calculated for 1-year old healthy male {breed.name} in Zip Code 50001.
                </p>
                <button className="w-full py-5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-black uppercase text-sm tracking-widest transition-all shadow-md shadow-brand-primary/20">
                  Compare 12 Providers
                </button>
              </div>

              {/* Related/Secondary CPA links */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Expert Recommendations</h3>
                <div className="space-y-8">
                  <div className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-black text-brand-primary uppercase tracking-widest">Wuffes</span>
                       <span className="bg-white px-2 py-0.5 rounded text-[8px] font-black text-slate-400 uppercase border border-slate-200">Sponsor</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 leading-tight group-hover:text-brand-primary transition-colors">Advanced Joint Supplements for {breed.name}s over 5 years.</p>
                  </div>
                  
                  <div className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-black text-brand-primary uppercase tracking-widest">Dog Cloud</span>
                       <span className="bg-white px-2 py-0.5 rounded text-[8px] font-black text-slate-400 uppercase border border-slate-200">Sponsor</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 leading-tight group-hover:text-brand-primary transition-colors">Orthopedic Memory Foam beds designed for Large Breed Support.</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
