import React, { useState, useMemo, useEffect } from 'react';
import { Header, Footer } from '@/src/components/Navigation';
import { BreedCard } from '@/src/components/BreedCard';
import { BreedDetail } from '@/src/components/BreedDetail';
import { DogQuiz } from '@/src/components/DogQuiz';
import { BreedFinderQuiz, FinderData } from '@/src/components/BreedFinderQuiz';
import { CustomProfile } from '@/src/pages/CustomProfile';
import { MatchResults } from '@/src/pages/MatchResults';
import { FilterSection } from '@/src/components/FilterSection';
import { SmartImage } from '@/src/components/ui/SmartImage';
import { breeds, BreedSize } from '@/src/data/breeds';
import { Search, ShieldCheck, ChevronRight, Dog, SlidersHorizontal, Brain, HeartPulse, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { MethodologyPage, EditorialPolicy } from '@/src/components/InfoPages';

type AppView = 'home' | 'quiz' | 'discovery-quiz' | 'custom' | 'match-results' | 'detail' | 'methodology' | 'editorial';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [selectedBreedSlug, setSelectedBreedSlug] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<any>(null);
  const [finderData, setFinderData] = useState<FinderData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState<BreedSize | 'All'>('All');
  const [selectedTemperament, setSelectedTemperament] = useState<string[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<string | 'All'>('All');
  const [selectedType, setSelectedType] = useState<'All' | 'Purebred' | 'Crossbreed'>('All');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const origins = useMemo(() => {
    return Array.from(new Set(breeds.map(b => b.origin))).sort();
  }, []);

  const filteredBreeds = useMemo(() => {
    return breeds.filter(b => {
      const matchSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSize = selectedSize === 'All' || b.size === selectedSize;
      const matchOrigin = selectedOrigin === 'All' || b.origin === selectedOrigin;
      const matchType = selectedType === 'All' || 
        (selectedType === 'Purebred' && !b.isCrossbreed) || 
        (selectedType === 'Crossbreed' && b.isCrossbreed);
      const matchTemp = selectedTemperament.length === 0 || 
        selectedTemperament.every(t => b.temperament.includes(t));
      
      return matchSearch && matchSize && matchOrigin && matchTemp && matchType;
    });
  }, [searchQuery, selectedSize, selectedOrigin, selectedTemperament, selectedType]);

  const selectedBreedData = useMemo(() => {
    return breeds.find(b => b.slug === selectedBreedSlug);
  }, [selectedBreedSlug]);

  const toggleTemperament = (temp: string) => {
    setSelectedTemperament(prev => 
      prev.includes(temp) ? prev.filter(t => t !== temp) : [...prev, temp]
    );
  };

  const handleQuizComplete = (data: any) => {
    setQuizData(data);
    setView('custom');
    window.scrollTo(0, 0);
  };

  const handleFinderComplete = (data: FinderData) => {
    setFinderData(data);
    setView('match-results');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (target: any) => {
    if (typeof target === 'string') {
      setView(target as AppView);
    } else if (target?.type === 'detail') {
      setSelectedBreedSlug(target.slug);
      setView('detail');
      window.scrollTo(0, 0);
    }
  };

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFilterDrawerOpen]);

  return (
    <div className="min-h-screen flex flex-col pt-16 selection:bg-brand-primary/20 selection:text-brand-primary font-sans antialiased bg-surface-bg text-text-secondary">
      <Header />

      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 md:space-y-20 pb-20"
            >
              {/* Reworked Homepage Hero: Focus on Discovery & Personalization */}
              <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-divider">
                 <div className="absolute inset-0 z-0">
                   <SmartImage 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=2000" 
                    className="w-full h-full opacity-10 scale-105"
                    alt="HeroBackground"
                   />
                   <div className="absolute inset-0 bg-gradient-to-b from-surface-bg via-surface-bg/40 to-surface-bg" />
                 </div>

                 <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-10 md:space-y-14 py-20 md:py-32">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                      <Sparkles size={14} className="animate-pulse" />
                      Discover Your Pup's Perfect Life
                    </motion.div>
                    
                    <div className="space-y-4">
                     <h1 className="text-6xl md:text-8xl lg:text-[140px] font-display font-black uppercase leading-[0.80] tracking-tighter text-text-primary">
                       Your Dog. <br/>
                       The <span className="text-brand-primary italic">Full</span> Story.
                     </h1>
                     <p className="text-xl md:text-3xl text-text-secondary font-bold max-w-2xl mx-auto leading-tight px-4">
                       Everything you need to know about your dog, translated from vet-talk into <span className="text-brand-primary">plain English</span>.
                     </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full px-4">
                       <button 
                         onClick={() => setView('quiz')}
                         className="group relative flex flex-col items-center gap-6 p-10 bg-surface-main border border-divider rounded-[40px] hover:border-brand-primary/40 transition-all hover:shadow-[0_30px_80px_-20px_rgba(244,194,13,0.2)] text-left"
                       >
                         <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center text-brand-primary mb-2 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={40} />
                         </div>
                         <div className="text-center space-y-2">
                           <h3 className="text-2xl font-display font-black uppercase text-text-primary">Already a Parent?</h3>
                           <p className="text-xs text-text-muted font-bold uppercase tracking-widest leading-relaxed">Personalized health report & <br/>localized vet cost index.</p>
                         </div>
                         <div className="w-full py-4 bg-brand-primary text-surface-bg rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-2 mt-4">
                           Generate My Report <ArrowRight size={14} />
                         </div>
                       </button>

                       <button 
                         onClick={() => setView('discovery-quiz')}
                         className="group relative flex flex-col items-center gap-6 p-10 bg-surface-main border border-divider rounded-[40px] hover:border-brand-primary/40 transition-all hover:shadow-[0_30px_80px_-20px_rgba(244,194,13,0.2)] text-left"
                       >
                         <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center text-brand-primary mb-2 group-hover:scale-110 transition-transform">
                            <Dog size={40} />
                         </div>
                         <div className="text-center space-y-2">
                           <h3 className="text-2xl font-display font-black uppercase text-text-primary">Looking for a Pup?</h3>
                           <p className="text-xs text-text-muted font-bold uppercase tracking-widest leading-relaxed">Discovery engine to find breeds <br/>matched to your lifestyle.</p>
                         </div>
                         <div className="w-full py-4 bg-brand-primary text-surface-bg rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-2 mt-4">
                           Discovery Quiz <ArrowRight size={14} />
                         </div>
                       </button>
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-dim opacity-60">Loved by 10,000+ happy dog parents</p>
                 </div>
              </section>

              {/* Feed Content */}
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-12 pt-12">
                <aside className="hidden lg:block space-y-10 border-r border-divider pr-12 h-fit sticky top-24">
                  <div className="flex items-center gap-3 pb-4 border-b border-divider">
                    <SlidersHorizontal size={20} className="text-brand-primary" />
                    <h2 className="text-xl font-display font-black uppercase tracking-tight">Browse Breeds</h2>
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
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    origins={origins}
                  />
                </aside>

                <div className="lg:col-span-3 space-y-10">
                   <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-text-primary">
                         Find Your Favorite
                       </h2>
                       <p className="text-text-muted font-bold text-sm tracking-wide uppercase">All breeds, simplified for humans</p>
                    </div>
                    <button 
                      onClick={() => setIsFilterDrawerOpen(true)}
                      className="lg:hidden flex items-center gap-2 px-5 py-3 bg-surface-main border border-border-subtle rounded-xl text-[10px] font-black uppercase tracking-widest text-text-primary"
                    >
                      <SlidersHorizontal size={14} className="text-brand-primary" />
                      Filters
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {filteredBreeds.map((breed) => (
                      <div key={breed.id} onClick={() => {
                          setSelectedBreedSlug(breed.slug);
                          setView('detail');
                          window.scrollTo(0, 0);
                      }} className="cursor-pointer">
                        <BreedCard breed={breed} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

               {/* Helpful Info Section Reworked Tone */}
               <section className="bg-surface-main py-24 md:py-32 border-y border-divider">
                 <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-24">
                    <div className="text-center space-y-6 md:space-y-8 max-w-3xl mx-auto px-4">
                      <div className="inline-block h-1.5 w-16 bg-brand-primary rounded-full mb-2" />
                      <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight leading-[0.95] text-text-primary">What you'll learn</h2>
                      <p className="text-text-secondary font-medium text-lg md:text-xl leading-relaxed">No fluff, just the important stuff you need to know to be a better dog parent.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                      {[
                        { title: "Money Decisions", desc: "Understand your dog's likely costs. From kibble to vet visits, we break it down.", icon: <ShieldCheck size={36} /> },
                        { title: "Health Watch", desc: "Know what to look out for. Simple guides on common breed health issues.", icon: <Brain size={36} /> },
                        { title: "Long & Happy Life", desc: "Tips on keeping them fit, playful, and by your side for as long as possible.", icon: <HeartPulse size={36} /> },
                        { title: "Training Fun", desc: "How they think and learn. Better ways to bond and train together.", icon: <BarChart3 size={36} /> },
                      ].map((cluster, i) => (
                        <div key={i} className="p-8 md:p-10 bg-surface-card border border-border-subtle rounded-[32px] space-y-6 md:space-y-8 hover:bg-surface-elevated hover:border-brand-primary transition-all group">
                           <div className="text-brand-primary group-hover:scale-110 transition-transform origin-left">{cluster.icon}</div>
                           <div className="space-y-3">
                             <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-text-primary">{cluster.title}</h3>
                             <p className="text-sm text-text-muted leading-relaxed font-bold">{cluster.desc}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </section>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-6 md:py-24"
            >
              <DogQuiz onComplete={handleQuizComplete} onBack={() => setView('home')} />
            </motion.div>
          )}

          {view === 'discovery-quiz' && (
            <motion.div 
              key="discovery-quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-6 md:py-24"
            >
              <BreedFinderQuiz onComplete={handleFinderComplete} onBack={() => setView('home')} />
            </motion.div>
          )}

          {view === 'match-results' && finderData && (
            <motion.div 
              key="match-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MatchResults 
                finderData={finderData} 
                onReset={() => setView('home')} 
                onSelectBreed={(slug) => {
                  setSelectedBreedSlug(slug);
                  setView('detail');
                  window.scrollTo(0, 0);
                }}
              />
            </motion.div>
          )}

          {view === 'custom' && quizData && (
            <motion.div 
              key="custom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CustomProfile 
                quizData={quizData} 
                onReset={() => setView('home')} 
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {view === 'detail' && selectedBreedData && (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="pt-4 md:pt-8"
            >
              <div className="max-w-7xl mx-auto px-4 mb-8">
                <button 
                  onClick={() => setView('home')}
                  className="flex items-center gap-3 text-[10px] font-black text-text-dim hover:text-brand-primary transition-colors uppercase tracking-[0.3em] group"
                >
                  <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={18} />
                  Back to search
                </button>
              </div>
              <BreedDetail 
                breed={selectedBreedData} 
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {view === 'methodology' && (
            <motion.div 
              key="methodology"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MethodologyPage onBack={() => setView('home')} />
            </motion.div>
          )}

          {view === 'editorial' && (
            <motion.div 
              key="editorial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EditorialPolicy onBack={() => setView('home')} />
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
              className="fixed inset-0 z-[60] bg-surface-bg/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 z-[65] bg-surface-main rounded-t-[32px] p-8 pb-12 max-h-[90vh] overflow-y-auto border-t border-border-subtle"
            >
              <FilterSection 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedTemperament={selectedTemperament}
                toggleTemperament={toggleTemperament}
                selectedOrigin={selectedOrigin}
                setSelectedOrigin={setSelectedOrigin}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                origins={origins}
                onClose={() => setIsFilterDrawerOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer onNavigate={setView} />
    </div>
  );
}
