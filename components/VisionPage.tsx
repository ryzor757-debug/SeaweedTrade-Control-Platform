import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Globe, 
  Droplets, 
  Target, 
  Zap, 
  Users,
  Anchor,
  ChevronRight
} from 'lucide-react';
import Logo from './Logo';

interface VisionPageProps {
  onBack: () => void;
}

const VisionPage: React.FC<VisionPageProps> = ({ onBack }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#022c22] text-white selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      
      {/* 1. Deepest Layer: Dark Ocean Floor Parallax */}
      <div 
        className="fixed inset-0 pointer-events-none -z-30 opacity-20 transition-transform duration-100 ease-linear"
        style={{ transform: `scale(1.2) translateY(${scrollY * 0.04}px)` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover blur-md grayscale"
          alt=""
        />
        <div className="absolute inset-0 bg-[#022c22]/80" />
      </div>

      {/* 2. Middle Layer: Floating Bubbles & Particles */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white/10 rounded-full blur-xl"
            style={{
              width: `${Math.random() * 60 + 30}px`,
              height: `${Math.random() * 60 + 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${scrollY * (Math.random() * -0.2 - 0.05)}px)`,
              opacity: 0.1 + Math.random() * 0.2
            }}
          />
        ))}
        {/* Floating Kelp Silhouette Simulation */}
        <div 
          className="absolute bottom-0 right-0 w-[200px] sm:w-[400px] h-[400px] sm:h-[800px] bg-black/40 blur-[100px] rounded-full"
          style={{ transform: `translateX(30%) translateY(${scrollY * -0.04}px)` }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 sm:px-6 md:px-12 py-6 md:py-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 transition-all active:scale-95 shadow-2xl"
        >
          <ArrowLeft size={16} className="md:w-[18px] md:h-[18px] group-hover:-translate-x-1 transition-transform" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Return</span>
        </button>
        <Logo size="sm" className="opacity-90 grayscale brightness-[10] scale-75 md:scale-100" />
        <div className="hidden lg:block text-[#C5B358] text-[9px] font-black uppercase tracking-[0.4em]">Strategic Directive v4.0</div>
      </nav>

      {/* Hero Header */}
      <section className="relative z-10 pt-20 sm:pt-32 pb-20 sm:pb-32 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12">
           Institutional Mission
        </div>
        <h1 
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[0.9] mb-8 md:mb-12 scroll-reveal"
          style={{ transform: `translateY(${scrollY * -0.08}px)`, opacity: 1 - (scrollY / 1200) }}
        >
          Redefining the <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">Horizon of Marine</span> <br className="hidden sm:block" />
          <span className="text-emerald-500 italic">Commerce.</span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed">
          The reader feels they are diving deeper into our company's mission as they navigate the regenerative transition.
        </p>
      </section>

      {/* Vision Pillars with Glassmorphism */}
      <section className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-white/5 border-y border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 relative">
          {[
            { title: 'Transparency', desc: 'Eliminating the "black box" of maritime sourcing with global ledger visibility.', icon: ShieldCheck, color: 'text-emerald-400' },
            { title: 'Scalability', desc: 'Standardizing seaweed trade to connect local harvesters to global industry nodes.', icon: Globe, color: 'text-teal-400' },
            { title: 'Integrity', desc: 'Prioritizing Blue Carbon initiatives where growth funds ocean restoration directly.', icon: Droplets, color: 'text-blue-400' }
          ].map((item, i) => (
            <div 
              key={i} 
              className="p-8 sm:p-12 glass rounded-[32px] sm:rounded-[64px] border border-white/10 group hover:border-emerald-500/50 transition-all duration-700"
              style={{ transform: window.innerWidth > 1024 ? `translateY(${scrollY * (0.015 * (i + 1))}px)` : 'none' }}
            >
              <div className={`h-12 w-12 sm:h-16 sm:w-16 bg-white/5 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-10 ${item.color} group-hover:bg-emerald-600 group-hover:text-white transition-all`}>
                <item.icon size={24} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-3xl font-black tracking-tight mb-4 sm:mb-6">{item.title}</h3>
              <p className="text-sm sm:text-lg text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="relative z-10 py-24 sm:py-40 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-24 gap-6 md:gap-8">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">Our North Star</h2>
            <p className="text-[#C5B358] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[8px] md:text-[10px]">The 2030 Implementation Matrix</p>
          </div>
          <Target size={48} className="text-emerald-500/30 float-slow hidden md:block" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {[
            { step: '01', title: 'Standardization', desc: 'Universal Grade-A quality benchmarks for the global industrial chain.', icon: Anchor },
            { step: '02', title: 'Automation', desc: 'AI-driven logistics reducing maritime carbon footprints by 30%.', icon: Zap },
            { step: '03', title: 'Inclusion', desc: 'Bringing 10k+ independent harvesters into the formal digital economy.', icon: Users },
          ].map((item, i) => (
            <div 
              key={i} 
              className="group relative p-8 sm:p-12 bg-white/5 rounded-[32px] sm:rounded-[48px] border border-white/10 hover:bg-[#043927] transition-all duration-1000 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 md:p-8 text-6xl md:text-8xl font-black text-white/5 group-hover:text-white/10">{item.step}</div>
              <div className="mb-6 md:mb-10 p-4 md:p-5 bg-white/5 rounded-xl md:rounded-2xl inline-block">
                <item.icon className="text-emerald-400 group-hover:text-white" size={24} />
              </div>
              <h4 className="text-xl md:text-3xl font-black mb-4 md:mb-6 tracking-tight">{item.title}</h4>
              <p className="text-sm md:text-lg text-slate-400 group-hover:text-emerald-50 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Quote Section */}
      <section className="relative z-10 py-24 sm:py-40 px-4 sm:px-6 md:px-12 bg-black/20 text-center">
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">
           <div className="text-6xl md:text-9xl font-black text-white/5 leading-none select-none h-12 md:h-16 opacity-30">"</div>
           <blockquote className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight italic text-emerald-50">
             "The seaweed industry is no longer about harvesting; it is about data, control, and trust. Our vision is the digital oxygen for the blue economy."
           </blockquote>
           <div className="flex flex-col items-center">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#C5B358] to-[#8a6d3b] mb-4 md:mb-6 shadow-2xl border-4 border-white/10" />
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#C5B358] mb-1 md:mb-2">Executive Protocol</p>
              <p className="text-base md:text-lg font-bold text-white/60">— Strategic Advisory Board</p>
           </div>
        </div>
      </section>

      <footer className="relative z-10 py-16 sm:py-32 px-4 sm:px-6 text-center border-t border-white/5">
        <button 
          onClick={onBack}
          className="w-full sm:w-auto px-10 md:px-16 py-4 md:py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl md:rounded-3xl font-black uppercase text-[10px] md:text-[12px] tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 md:gap-4 mx-auto group active:scale-95"
        >
          Access Ecosystem <ChevronRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
};

export default VisionPage;