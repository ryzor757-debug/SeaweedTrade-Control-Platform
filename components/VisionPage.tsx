import React from 'react';
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
  return (
    <div className="min-h-screen bg-[#022c22] text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Cinematic Background Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-teal-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Premium Header */}
      <nav className="relative z-50 px-6 md:px-12 py-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 transition-all active:scale-95"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return</span>
        </button>
        <div className="cursor-pointer" onClick={onBack}>
          <Logo size="sm" className="opacity-90 grayscale brightness-200" />
        </div>
        <div className="hidden md:block h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </nav>

      {/* 1. Hero Header */}
      <section className="relative z-10 pt-16 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-[0.4em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Strategic Directive 2030
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Redefining the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">Horizon of Marine</span> <br />
          <span className="text-emerald-500 italic">Commerce.</span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
          We envision a world where the ocean’s most sustainable resource is backed by the world’s most sophisticated trade infrastructure.
        </p>
      </section>

      {/* 2. Core Vision Pillars */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-white/5 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="space-y-6">
            <div className="h-14 w-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Absolute Transparency</h3>
            <p className="text-slate-400 leading-relaxed font-medium">
              We aim to eliminate the "black box" of maritime sourcing. Every ton of seaweed traded is tracked, verified, and visible through our Control Dashboard.
            </p>
          </div>
          <div className="space-y-6">
            <div className="h-14 w-14 bg-teal-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Globe size={28} />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Global Scalability</h3>
            <p className="text-slate-400 leading-relaxed font-medium">
              Our vision is to standardize seaweed trade globally, allowing a farmer in Southeast Asia to connect with a bio-refinery in Europe as seamlessly as a local transaction.
            </p>
          </div>
          <div className="space-y-6">
            <div className="h-14 w-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Droplets size={28} />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Ecological Integrity</h3>
            <p className="text-slate-400 leading-relaxed font-medium">
              We believe trade must be a force for good. Our platform prioritizes "Blue Carbon" initiatives, ensuring that market growth directly funds ocean restoration.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 2030 Roadmap */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Our North Star</h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">The 2030 Implementation Matrix</p>
          </div>
          <div className="h-px flex-1 bg-white/10 mx-10 hidden md:block" />
          <Target size={48} className="text-emerald-500/40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              step: '01', 
              title: 'Standardization', 
              desc: 'Establishing the first universal "Grade-A" quality benchmark for industrial seaweed.',
              icon: Anchor
            },
            { 
              step: '02', 
              title: 'Automation', 
              desc: 'Implementing AI-driven logistics to reduce the carbon footprint of seaweed transport by 30%.',
              icon: Zap
            },
            { 
              step: '03', 
              title: 'Inclusion', 
              desc: 'Bringing 10,000+ independent seaweed harvesters into the formal digital economy by 2030.',
              icon: Users
            },
          ].map((item, i) => (
            <div key={i} className="group relative p-10 bg-white/5 rounded-[40px] border border-white/10 hover:bg-emerald-600 transition-all duration-700">
              <div className="text-6xl font-black text-white/5 group-hover:text-white/10 absolute top-8 right-10 transition-colors">
                {item.step}
              </div>
              <div className="mb-8 p-4 bg-white/5 rounded-2xl inline-block group-hover:bg-white/20">
                <item.icon className="text-emerald-400 group-hover:text-white" size={24} />
              </div>
              <h4 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h4>
              <p className="text-slate-400 group-hover:text-emerald-50 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Personal Message */}
      <section className="relative z-10 py-32 px-6 md:px-12 bg-white/5 overflow-hidden">
        <div className="max-w-[1000px] mx-auto text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-white/5 leading-none select-none">
            "
          </div>
          <blockquote className="text-2xl md:text-4xl font-black tracking-tight leading-snug mb-12 italic">
            "The seaweed industry is at a tipping point. It is no longer just about harvesting; it is about control, data, and trust. Our vision is to provide the digital oxygen that allows this industry to breathe and grow into a multi-billion dollar pillar of the global economy."
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 mb-4 shadow-xl" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-1">Execution Protocol</p>
            <p className="text-sm font-bold text-white/60">— The SeaweedTrade Executive Team</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="relative z-10 py-24 px-6 md:px-12 text-center border-t border-white/5">
        <h3 className="text-2xl font-black tracking-tight mb-8">Ready to join the regenerative era?</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={onBack}
            className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl shadow-emerald-900 transition-all flex items-center gap-3 group"
          >
            Access Ecosystem <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default VisionPage;