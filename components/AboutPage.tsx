import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Microscope, 
  TrendingUp, 
  ShieldCheck, 
  Leaf, 
  Activity, 
  Globe, 
  Users, 
  ChevronRight,
  Anchor
} from 'lucide-react';
import Logo from './Logo.tsx';

interface AboutPageProps {
  onBack: () => void;
  onJoin: () => void;
  onViewVision: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onJoin, onViewVision }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F9FBFB] text-[#333333] selection:bg-emerald-100 selection:text-emerald-900 relative">
      {/* Background Gradient Strategy: Seafoam to White */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-b from-[#F0F4F2] via-white to-white opacity-80" />
      
      {/* Maritime Technical Grid */}
      <div className="fixed inset-0 pointer-events-none -z-10 maritime-grid opacity-30" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-[#E1E8E5] px-4 sm:px-6 md:px-12 py-3 md:py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-[#043927]"
            >
              <ArrowLeft size={18} />
            </button>
            <Logo size="sm" className="scale-75 sm:scale-90 md:scale-100 origin-left" />
          </div>
          <button 
            onClick={onJoin}
            className="bg-[#043927] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg active:scale-95"
          >
            Join Platform
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-28 sm:pt-40 md:pt-56 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="lg:col-span-8 space-y-6 md:space-y-8 animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 md:gap-3 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] border border-[#E1E8E5]">
              <Anchor size={12} /> Institutional Infrastructure
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-[#043927] leading-[1.1] md:leading-[1]">
              The Convergence of <br className="hidden sm:block" />
              <span className="text-emerald-600">Marine Biology</span> <br className="hidden sm:block" />
              & Global Markets.
            </h1>
            <p className="text-base sm:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
              Standardizing, securing, and scaling the blue economy through a verified digital control flow.
            </p>
          </div>
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="w-full aspect-square bg-white rounded-[64px] shadow-2xl border border-[#E1E8E5] flex items-center justify-center p-16 relative overflow-hidden group">
               <div className="absolute inset-0 maritime-grid opacity-10 group-hover:opacity-20 transition-opacity" />
               <div className="relative">
                 <Microscope size={120} className="text-emerald-100 absolute -top-12 -left-12 rotate-12" />
                 <TrendingUp size={160} className="text-[#043927]" />
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Story Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="rounded-[32px] sm:rounded-[64px] overflow-hidden shadow-2xl relative aspect-[4/3] sm:aspect-video lg:aspect-[4/5] bg-slate-100 border border-[#E1E8E5]">
              <img 
                src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1200" 
                alt="Maritime Operations" 
                className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#043927]/60 to-transparent" />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8 md:space-y-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#043927]">The Blue Revolution</h2>
            <div className="space-y-4 md:space-y-6 text-slate-600 text-sm sm:text-lg leading-relaxed font-medium">
              <p>
                Founded on the principle that the ocean's most valuable resource shouldn't be traded in a "black box." We connect harvesters directly to global industrial chains with absolute telemetry.
              </p>
              <p>
                Our platform integrates maritime logistics with neural quality grading to provide a "single source of truth" for the seaweed trade.
              </p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 pt-2 md:pt-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-[#F0F4F2] border border-[#E1E8E5] rounded-xl sm:rounded-2xl flex items-center justify-center text-[#C5B358]">
                <Anchor size={24} className="sm:w-7 sm:h-7" />
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] font-black text-[#043927] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1">Standard v4.2</p>
                <p className="text-xs sm:text-sm font-bold text-slate-400">Maritime-Accredited Ledger</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#043927] text-white rounded-[32px] sm:rounded-[64px] mx-4 md:mx-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-emerald-400/10 rounded-full blur-[80px] sm:blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-[1600px] mx-auto space-y-12 md:space-y-20">
          <div className="text-center space-y-3 md:space-y-4">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Architecture</p>
            <h2 className="text-2xl md:text-5xl font-black tracking-tighter">Verified Protocol</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { title: 'Intelligence', desc: 'Real-time biomass quality metrics through satellite telemetry.', icon: Microscope },
              { title: 'Escrow', desc: 'Secure smart-contract payments eliminate counterparty risk.', icon: ShieldCheck },
              { title: 'Audit', desc: 'Verified carbon sequestration and regenerative impact data.', icon: Leaf },
              { title: 'Operations', desc: 'End-to-end logistics with absolute moisture and quality control.', icon: Activity }
            ].map((pillar) => (
              <div key={pillar.title} className="space-y-4 md:space-y-6 group">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-white/5 border border-white/10 rounded-xl sm:rounded-[24px] flex items-center justify-center text-emerald-400 group-hover:bg-[#C5B358] group-hover:text-white transition-all duration-500">
                  <pillar.icon size={22} className="sm:w-7 sm:h-7" />
                </div>
                <h4 className="text-lg sm:text-xl font-black tracking-tight">{pillar.title}</h4>
                <p className="text-emerald-100/60 leading-relaxed text-xs sm:text-sm font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
          {[
            { who: 'Producers', desc: 'Gateway to premium global buyers and fair pricing.', image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800' },
            { who: 'Industrial', desc: 'Volume sourcing with standardized quality grades.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' },
            { who: 'Investors', desc: 'Scalable ESG-compliant commodity asset deep data.', image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e78a?auto=format&fit=crop&q=80&w=800' }
          ].map((card) => (
            <div key={card.who} className="space-y-6 md:space-y-8 group">
              <div className="rounded-[32px] sm:rounded-[48px] overflow-hidden aspect-[4/3] shadow-lg group-hover:shadow-2xl transition-all duration-700 bg-white border border-[#E1E8E5]">
                <img src={card.image} alt={card.who} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-xl sm:text-2xl font-black text-[#043927]">{card.who}</h3>
                <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Closing CTA */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 text-center bg-white border-t border-[#E1E8E5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] maritime-grid" />
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-[#043927]">Ready for control?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button onClick={onJoin} className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#043927] text-white rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest shadow-2xl hover:bg-emerald-800 transition-all flex items-center justify-center gap-3">
              Join the Platform <ArrowRight size={18} />
            </button>
            <button onClick={onViewVision} className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white border-2 border-[#043927] text-[#043927] rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:bg-slate-50 transition-all">
              View Vision
            </button>
          </div>
        </div>
      </section>

      <footer className="py-10 md:py-12 px-6 border-t border-[#E1E8E5] text-center bg-[#F9FBFB]">
        <Logo size="sm" className="mx-auto mb-4 md:mb-6 opacity-30 grayscale scale-75 md:scale-100" />
        <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 text-center">© 2024 SEAWEEDTRADE PROTOCOL. MARITIME ACCREDITED.</p>
      </footer>
    </div>
  );
};

export default AboutPage;