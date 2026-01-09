import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Droplets, 
  Leaf, 
  Globe, 
  Factory, 
  Sprout, 
  Fuel,
  ChevronRight,
  Anchor,
  BarChart3,
  Scale
} from 'lucide-react';
import Logo from './Logo';

interface WhySeaweedPageProps {
  onBack: () => void;
  onJoin: () => void;
}

const WhySeaweedPage: React.FC<WhySeaweedPageProps> = ({ onBack, onJoin }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#011410] text-white selection:bg-[#C5B358]/30 selection:text-white">
      {/* Cinematic Dark Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-[600px] sm:w-[1200px] h-[600px] sm:h-[1200px] bg-emerald-900/10 rounded-full blur-[100px] sm:blur-[200px] translate-x-1/2 -translate-y-1/2" 
          style={{ transform: `translate(50%, -50%) translateY(${scrollY * 0.08}px)` }}
        />
        <div className="absolute inset-0 opacity-[0.1] mix-blend-screen bg-fixed grayscale pointer-events-none">
           <img 
            src="https://images.unsplash.com/photo-1516053353285-399f743fef88?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover scale-110 blur-sm"
            alt="Deep Sea Marine Vegetation"
           />
        </div>
        <div className="absolute inset-0 pointer-events-none maritime-grid opacity-[0.03]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#011410]/80 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 md:px-12 py-3 md:py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={onBack}
              className="p-2 sm:p-3 hover:bg-white/5 rounded-xl sm:rounded-2xl transition-colors text-white/40 hover:text-white"
            >
              <ArrowLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
            <Logo size="sm" className="grayscale brightness-[10] scale-75 md:scale-100 origin-left" />
          </div>
          <button 
            onClick={onJoin}
            className="bg-[#C5B358] hover:bg-[#d4c375] text-[#011410] px-4 sm:px-8 py-2 md:py-3 rounded-xl font-black text-[8px] sm:text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95"
          >
            Access <span className="hidden sm:inline">Platform</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 sm:pt-48 pb-16 sm:pb-32 px-4 sm:px-6 md:px-12 relative z-10 text-center">
        <div className="max-w-[1400px] mx-auto space-y-8 md:space-y-12">
          <div className="inline-flex items-center gap-2 md:gap-3 px-3.5 md:px-5 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 text-[#C5B358] text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <BarChart3 size={12} className="md:w-3.5 md:h-3.5" /> Investment Intelligence
          </div>
          <h1 
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[0.9] max-w-6xl mx-auto scroll-reveal"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          >
            Investing in the <br className="hidden sm:block" />
            Greatest <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[#C5B358] to-[#8a6d3b]">Carbon Sink</span> on Earth.
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-emerald-100/40 font-medium max-w-2xl mx-auto leading-relaxed">
            The Seaweed economy represents the "Industrial Gold" of the Blue Revolution. Scalability met with absolute planetary restoration.
          </p>
        </div>
      </header>

      {/* Industrial Scale Image Reveal Section */}
      <section className="py-16 sm:py-32 px-4 sm:px-6 md:px-12 relative z-10 bg-black/20 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
          <div className="space-y-10 md:space-y-16">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white">The Gold of the Ocean</h2>
              <div className="h-1 md:h-1.5 w-24 md:w-32 bg-[#C5B358]" />
              <p className="text-base sm:text-xl text-emerald-100/50 font-medium leading-relaxed pt-2 md:pt-6">
                Seaweed is no longer just a food product. It is the raw material for the next industrial era—replacing petroleum across three massive global markets.
              </p>
            </div>

            <div className="space-y-8 md:space-y-12">
              {[
                { title: 'Bio-Plastics', desc: '100% biodegradable feedstocks replacing fossil-based polymers at scale.', icon: Factory },
                { title: 'Agriculture', desc: 'Cutting methane emissions by 80% with verified seaweed additives.', icon: Sprout },
                { title: 'Bio-Fuel', desc: 'Zero freshwater energy production with superior energy density.', icon: Fuel }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 sm:gap-8 group">
                  <div className="flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#C5B358] group-hover:bg-[#C5B358] group-hover:text-[#011410] transition-all duration-500">
                    <item.icon size={24} className="sm:w-8 sm:h-8" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h4 className="text-lg sm:text-2xl font-black tracking-tight">{item.title}</h4>
                    <p className="text-xs sm:text-base text-emerald-100/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group mt-8 lg:mt-0">
            {/* Parallax Image Reveal */}
            <div 
              className="rounded-[32px] sm:rounded-[64px] overflow-hidden shadow-2xl border border-white/10 relative aspect-[4/5]"
              style={{ transform: window.innerWidth > 1024 ? `translateY(${Math.max(0, (scrollY - 800) * -0.05)}px)` : 'none' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=1200" 
                alt="Industrial seaweed data" 
                className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011410] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12">
                 <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#C5B358] mb-1 sm:mb-2">Yield Velocity</p>
                 <p className="text-2xl sm:text-4xl font-black tracking-tighter">Regenerative Growth</p>
              </div>
            </div>
            
            {/* Floating Metric Card */}
            <div 
              className="absolute -bottom-6 sm:-bottom-10 -left-6 sm:-left-10 bg-white text-[#011410] p-6 sm:p-10 rounded-2xl sm:rounded-[40px] shadow-2xl max-w-[180px] sm:max-w-[280px]"
              style={{ transform: window.innerWidth > 1024 ? `translateY(${scrollY * 0.04}px)` : 'none' }}
            >
              <p className="text-4xl sm:text-6xl font-black tracking-tighter text-[#C5B358] mb-1 sm:mb-2">30x</p>
              <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400 leading-tight">Seaweed grows 30x faster than land plants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 sm:py-40 px-4 sm:px-6 md:px-12 relative z-10">
        <div className="max-w-[1400px] mx-auto text-center space-y-16 md:space-y-24">
          <div className="space-y-3 md:space-y-6">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter">The Numbers Speak</h2>
            <p className="text-[#C5B358] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[10px] md:text-xs">Institutional Market Verification</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              { label: 'Market Opportunity', stat: '$30B+', sub: 'Projected global sector size by 2030.', icon: TrendingUp, color: 'text-emerald-400' },
              { label: 'Climate Efficiency', stat: '20%', sub: 'Higher carbon capture per acre than land forests.', icon: Leaf, color: 'text-[#C5B358]' },
              { label: 'Input Resilience', stat: 'Zero', sub: 'No fertilizers or fresh water required for scale.', icon: Scale, color: 'text-blue-400' }
            ].map((stat, i) => (
              <div key={i} className="p-8 sm:p-12 glass rounded-[32px] sm:rounded-[64px] border border-white/10 group hover:border-[#C5B358]/50 transition-all duration-700">
                <div className={`mx-auto h-16 w-16 sm:h-20 sm:w-20 bg-white/5 rounded-2xl sm:rounded-[32px] flex items-center justify-center mb-6 sm:mb-10 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} className="sm:w-9 sm:h-9" />
                </div>
                <p className="text-5xl sm:text-7xl font-black tracking-tighter mb-4 sm:mb-6">{stat.stat}</p>
                <h4 className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-2 sm:mb-3">{stat.label}</h4>
                <p className="text-sm sm:text-base font-medium text-emerald-100/40 leading-relaxed">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="py-24 sm:py-40 px-4 sm:px-6 md:px-12 text-center border-t border-white/5 relative z-10 bg-[#011410]">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none maritime-grid" />
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16 relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter text-white">The Future is Marine.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <button 
              onClick={onJoin}
              className="w-full sm:w-auto px-10 md:px-16 py-4 sm:py-7 bg-[#C5B358] hover:bg-[#d4c375] text-[#011410] rounded-2xl md:rounded-3xl font-black uppercase text-[10px] md:text-[12px] tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 md:gap-4 group active:scale-95"
            >
              Access the Protocol <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onBack}
              className="w-full sm:w-auto px-10 md:px-16 py-4 sm:py-7 bg-white/5 border border-white/10 text-white rounded-2xl md:rounded-3xl font-black uppercase text-[10px] md:text-[12px] tracking-widest hover:bg-white/10 transition-all active:scale-95"
            >
              Return Home
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhySeaweedPage;