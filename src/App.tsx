import React, { useState, useMemo, useEffect } from 'react';
import { Header, Footer } from '@/src/components/Navigation';
import { BreedCard } from '@/src/components/BreedCard';
import { BreedDetail } from '@/src/components/BreedDetail';
import { LeadWidget } from '@/src/components/LeadWidget';
import { FilterSection } from '@/src/components/FilterSection';
import { breeds, BreedSize } from '@/src/data/breeds';
import { Search, ShieldCheck, ChevronRight, Dog, SlidersHorizontal, Brain, HeartPulse, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedBreedSlug, setSelectedBreedSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState<BreedSize | 'All'>('All');
  const [selectedTemperament, setSelectedTemperament] = useState<string[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<string | 'All'>('All');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const origins = useMemo(() => {
    return Array.from(new Set(breeds.map(b => b.origin))).sort();
  }, []);

  const toggleTemperament = (temp: string) => {
    setSelectedTemperament(prev => 
      prev.includes(temp) ? prev.filter(t => t !== temp) : [...prev, temp]
    );
  };

  const filteredBreeds = useMemo(() => {
    return breeds.filter(b => {
      const matchSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSize = selectedSize === 'All' || b.size === selectedSize;
      const matchOrigin = selectedOrigin === 'All' || b.origin === selectedOrigin;
      const matchTemp = selectedTemperament.length === 0 || 
        selectedTemperament.every(t => b.temperament.includes(t));
      
      return matchSearch && matchSize && matchOrigin && matchTemp;
    });
  }, [searchQuery, selectedSize, selectedOrigin, selectedTemperament]);

  const selectedBreedData = useMemo(() => {
    return breeds.find(b => b.slug === selectedBreedSlug);
  }, [selectedBreedSlug]);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFilterDrawerOpen]);

  return (
    <div className="min-h-screen flex flex-col pt-16 selection:bg-brand-primary/20 selection:text-brand-primary font-sans antialiased">
      <Header />

      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {!selectedBreedSlug ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 md:space-y-20 pb-20 bg-slate-50"
            >
              {/* Home Hero */}
              <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-white border-b border-slate-100">
                 <div className="absolute inset-0 z-0">
                   <img 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=2000" 
                    className="w-full h-full object-cover opacity-5 lg:opacity-10 scale-105"
                    referrerPolicy="no-referrer"
                    alt="HeroBackground"
                   />
                   <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white" />
                 </div>

                 <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 md:space-y-12 py-12 md:py-20">
                   <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary text-[10px] font-black uppercase tracking-[0.3em]"
                   >
                     <ShieldCheck size={14} />
                     US Market Strategy 2026
                   </motion.div>
                   
                   <div className="space-y-4">
                    <h1 className="text-5xl md:text-8xl lg:text-[140px] font-display font-black uppercase leading-[0.82] tracking-tighter text-slate-900">
                      The <span className="text-brand-primary">Data</span> Wiki for <span className="italic text-slate-200">Every</span> Breed.
                    </h1>
                    <p className="text-base md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed px-4">
                      Programmatic health data, breed-specific insurance costs, and veterinary insights for 277+ breeds.
                    </p>
                   </div>
                   
                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-2xl mx-auto w-full">
                     <div className="relative w-full group">
                       <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={22} />
                       <input 
                         type="text"
                         placeholder="Search 277+ Breeds..."
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-6 py-4 md:py-5 text-lg md:text-xl font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm placeholder:text-slate-300 text-slate-900"
                       />
                     </div>
                     <button className="w-full sm:w-auto whitespace-nowrap px-10 py-4 md:py-5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-primary/20">
                       Find Match
                     </button>
                   </div>
                   
                   <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-4 md:pt-8 opacity-20">
                      {['VETERINARY REVIEWED', 'EVIDENCE BASED', 'TRUSTED DATA'].map((tag, i) => (
                        <span key={i} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">{tag}</span>
                      ))}
                   </div>
                 </div>
              </section>

              {/* Grid Section with Search/Filters */}
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* Desktop Sidebar Filters */}
                <aside className="hidden lg:block space-y-10 border-r border-slate-200 pr-12 h-fit sticky top-24">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <SlidersHorizontal size={20} className="text-brand-primary" />
                    <h2 className="text-xl font-display font-black uppercase tracking-tight">Filters</h2>
                  </div>
                  <FilterSection 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    selectedTemperament={selectedTemperament}
                    toggleTemperament={toggleTemperament}
                    selectedOrigin={selectedOrigin}
                    setSelectedOrigin={setSelectedOrigin}
                    origins={origins}
                  />
                </aside>

                {/* Main Breed Feed */}
                <div className="lg:col-span-3 space-y-10">
                  
                  {/* Lead Gen Banner on Home - Optimized for Feed Flow */}
                  <div className="mb-12">
                    <LeadWidget variant="inline" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight text-slate-900">
                         {filteredBreeds.length} Breeds Identified
                       </h2>
                       <p className="text-slate-400 font-bold text-sm tracking-wide">Showing verified results for 2026</p>
                    </div>
                    {/* Mobile Filter Toggle */}
                    <button 
                      onClick={() => setIsFilterDrawerOpen(true)}
                      className="lg:hidden flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm active:scale-95 transition-all"
                    >
                      <SlidersHorizontal size={14} className="text-brand-primary" />
                      Filters
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {filteredBreeds.map((breed) => (
                      <div key={breed.id} onClick={() => {
                          setSelectedBreedSlug(breed.slug);
                          window.scrollTo(0, 0);
                      }}>
                        <BreedCard breed={breed} />
                      </div>
                    ))}
                  </div>

                  {filteredBreeds.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-100 px-6">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Dog className="text-slate-200" size={40} />
                      </div>
                      <h3 className="text-2xl font-display font-black uppercase text-slate-900 mb-2">No Matches Found</h3>
                      <p className="text-slate-400 font-bold mb-8">Try adjusting your filters to find similar breeds.</p>
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedSize('All');
                          setSelectedOrigin('All');
                          setSelectedTemperament([]);
                        }}
                        className="px-8 py-3 bg-brand-primary text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-brand-primary/20"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Feature/Context Section */}
              <section className="bg-white py-24 md:py-32 border-y border-slate-100">
                 <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-24">
                    <div className="text-center space-y-6 md:space-y-8 max-w-3xl mx-auto px-4">
                      <div className="inline-block h-1 w-12 bg-slate-900 rounded-full mb-2" />
                      <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight leading-[0.95] text-slate-900">Programmatic Knowledge Clusters</h2>
                      <p className="text-slate-400 font-medium text-lg md:text-xl leading-relaxed">Data-driven insights addressing common pain points across the North American market.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                      {[
                        { title: "Insurance & Costs", desc: "Average vet bills by breed and state for 2026. Detailed insurance comparisons.", icon: <ShieldCheck size={36} /> },
                        { title: "Behavioral Analysis", desc: "Trainability metrics and separation anxiety solutions via Pupford.", icon: <Brain size={36} /> },
                        { title: "Orthopedic Health", desc: "Senior support for dysplasia-prone breeds via Dog Cloud.", icon: <HeartPulse size={16} /> },
                        { title: "Nutrition Logic", desc: "Caloric requirements processed through our Astro variation engine.", icon: <BarChart3 size={36} /> },
                      ].map((cluster, i) => (
                        <div key={i} className="p-8 md:p-10 bg-slate-50 border border-slate-100 rounded-[32px] space-y-6 md:space-y-8 hover:bg-white hover:border-brand-primary hover:shadow-xl hover:shadow-brand-primary/5 transition-all cursor-pointer group hover:-translate-y-2">
                           <div className="text-brand-primary group-hover:scale-110 transition-transform origin-left">{cluster.icon}</div>
                           <div className="space-y-3 md:space-y-4">
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900">{cluster.title}</h3>
                            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-bold">{cluster.desc}</p>
                           </div>
                           <div className="pt-2 md:pt-4 flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                             Explore Cluster <ChevronRight size={14} />
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="pt-4 md:pt-8 bg-slate-50"
            >
              <div className="max-w-7xl mx-auto px-4 mb-8">
                <button 
                  onClick={() => setSelectedBreedSlug(null)}
                  className="flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-brand-primary transition-colors uppercase tracking-[0.3em] group"
                >
                  <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={18} />
                  Return to breeds
                </button>
              </div>
              {selectedBreedData && <BreedDetail breed={selectedBreedData} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[65] bg-white rounded-t-[32px] p-8 pb-12 max-h-[90vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
              <FilterSection 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedTemperament={selectedTemperament}
                toggleTemperament={toggleTemperament}
                selectedOrigin={selectedOrigin}
                setSelectedOrigin={setSelectedOrigin}
                origins={origins}
                onClose={() => setIsFilterDrawerOpen(false)}
              />
              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full mt-8 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl active:scale-95 transition-all"
              >
                Apply 2026 Data Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
