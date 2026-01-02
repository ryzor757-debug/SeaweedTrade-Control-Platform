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
import Logo from './Logo';

interface AboutPageProps {
  onBack: () => void;
  onJoin: () => void;
  onViewVision: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onJoin, onViewVision }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#333333] selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-12 py-3 md:py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-[#043927]"
            >
              <ArrowLeft size={18} />
            </button>
            <Logo size="sm" className="scale-90 md:scale-100 origin-left" />
          </div>
          <button 
            onClick={onJoin}
            className="bg-[#043927] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg active:scale-95"
          >
            Join Platform
          </button>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <header className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 relative overflow-hidden bg-slate-50">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 md:space-y-8 animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] border border-emerald-100">
              <Anchor size={12} /> Institutional Grade Infrastructure
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#043927] leading-[1.1]">
              The Intersection of <br className="hidden sm:block" /> 
              Marine Biology and <br className="hidden sm:block" /> 
              <span className="text-emerald-600">Global Finance.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
              SeaweedTrade Control Platform is the premier digital infrastructure designed to standardize, secure, and scale the global seaweed market.
            </p>
          </div>
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="w-full aspect-square bg-white rounded-[64px] shadow-2xl border border-slate-100 flex items-center justify-center p-12">
               <div className="relative">
                 <Microscope size={120} className="text-emerald-100 absolute -top-12 -left-12 rotate-12" />
                 <TrendingUp size={160} className="text-[#043927]" />
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Our Story: "The Blue Revolution" */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl relative aspect-[4/5] md:aspect-[3/2] lg:aspect-auto lg:h-[600px] bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1200" 
                alt="Blue Revolution Imagery" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#043927]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Established 2021</p>
                <p className="text-xl md:text-2xl font-black">Maritime Innovation Hub</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[#043927]">The Blue Revolution</h2>
            <div className="space-y-4 md:space-y-6 text-slate-600 text-sm md:text-lg leading-relaxed font-medium">
              <p>
                The seaweed industry has long been fragmented, operating on legacy systems and handshake deals that lacked data-backed security. We saw a gap between the immense potential of the "Blue Economy" and the reality of high-risk international trade.
              </p>
              <p>
                Founded in 2021, SeaweedTrade was built by a coalition of maritime logisticians, environmental scientists, and fintech engineers. Our goal was simple: to create a Control Platform that gives traders the same level of precision and transparency found in traditional commodities like gold or oil.
              </p>
            </div>
            <div className="pt-2 md:pt-4">
              <div className="h-px w-20 md:w-24 bg-emerald-600 mb-4 md:mb-6" />
              <p className="text-[10px] md:text-sm font-black text-[#043927] uppercase tracking-widest">Bridging Ecosystems & Markets</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The "Platform Pillars" */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-900 text-white rounded-[40px] md:rounded-[64px] mx-4 md:mx-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-emerald-500/10 rounded-full blur-[80px] md:blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-[1600px] mx-auto space-y-12 md:space-y-20">
          <div className="text-center space-y-4">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Our Core Architecture</p>
            <h2 className="text-2xl md:text-5xl font-black tracking-tighter">What Defines Us</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { title: 'Precision Intelligence', desc: 'Real-time data on biomass quality, moisture content, and carbon sequestration metrics.', icon: Microscope },
              { title: 'Trade Security', desc: 'Proprietary Escrow and Smart-Contract systems eliminate counterparty risk in international waters.', icon: ShieldCheck },
              { title: 'Sustainability Verified', desc: 'Every seller undergoes a rigorous audit to ensure their harvest supports ocean health.', icon: Leaf },
              { title: 'Operational Excellence', desc: 'Manage logistics with 99.9% uptime, from the farm gate to the global factory gate.', icon: Activity }
            ].map((pillar) => (
              <div key={pillar.title} className="space-y-4 md:space-y-6 group">
                <div className="h-14 w-14 md:h-16 md:w-16 bg-white/5 border border-white/10 rounded-[20px] md:rounded-[24px] flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                  <pillar.icon size={28} />
                </div>
                <h4 className="text-lg md:text-xl font-black tracking-tight">{pillar.title}</h4>
                <p className="text-slate-400 leading-relaxed text-xs md:text-sm font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Who We Serve */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {[
            { 
              who: 'For Producers', 
              desc: 'We provide a gateway to global premium buyers, ensuring fair pricing and guaranteed payments via automated trade settlements.',
              image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800'
            },
            { 
              who: 'For Industrial Buyers', 
              desc: 'We offer a single source of truth for high-volume sourcing, with standardized quality grades and multi-node logistical tracking.',
              image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
            },
            { 
              who: 'For Investors', 
              desc: 'We provide the data and transparency required to invest in seaweed as a serious, scalable commodity with ESG-compliant audits.',
              image: 'https://images.unsplash.com/photo-1611974714024-4607a507e6f7?auto=format&fit=crop&q=80&w=800'
            }
          ].map((card) => (
            <div key={card.who} className="space-y-6 md:space-y-8 flex flex-col group">
              <div className="rounded-[32px] md:rounded-[40px] overflow-hidden aspect-[4/3] shadow-lg group-hover:shadow-2xl transition-all duration-700 bg-slate-100">
                <img src={card.image} alt={card.who} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-xl md:text-2xl font-black text-[#043927] tracking-tight">{card.who}</h3>
                <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Our Global Footprint */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8 md:space-y-10">
            <div className="space-y-3 md:space-y-4">
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Global Infrastructure</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#043927]">Local Impact. <br /> Global Reach.</h2>
            </div>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              With representative offices in the world's most vital maritime corridors, we ensure that while the trade is digital, the support and accountability are physical.
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {['Norway', 'Indonesia', 'Chile', 'Maine'].map(loc => (
                <div key={loc} className="flex items-center gap-2 md:gap-3">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-800">{loc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#022c22] rounded-[40px] md:rounded-[64px] p-6 md:p-12 aspect-[4/3] md:aspect-video flex items-center justify-center relative overflow-hidden shadow-2xl">
               <Globe className="text-white/5 absolute w-full h-full -translate-x-1/2 translate-y-1/2" />
               <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="w-full h-full border border-white/10 rounded-full flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border border-white/5 rounded-full flex items-center justify-center">
                       <Globe size={80} className="text-emerald-500 opacity-20 md:w-[120px] md:h-[120px]" />
                    </div>
                  </div>
                  <div className="absolute top-1/4 left-1/3 h-3 w-3 md:h-4 md:w-4 bg-emerald-400 rounded-full blur-sm animate-pulse" />
                  <div className="absolute top-1/2 right-1/4 h-2 w-2 md:h-3 md:w-3 bg-emerald-400 rounded-full blur-sm animate-pulse" />
                  <div className="absolute bottom-1/3 left-1/2 h-4 w-4 md:h-5 md:w-5 bg-emerald-400 rounded-full blur-sm animate-pulse" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Closing CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 text-center bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-[#043927]">Ready to take control?</h2>
            <p className="text-base md:text-xl text-slate-500 font-medium">Join the most trusted network in the seaweed industry today.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button 
              onClick={onJoin}
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#043927] hover:bg-emerald-800 text-white rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest shadow-2xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Join the Platform <ArrowRight size={18} />
            </button>
            <button 
              onClick={onViewVision}
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white border-2 border-[#043927] text-[#043927] rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              View Our Vision <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="py-8 md:py-12 px-6 border-t border-slate-50 text-center">
        <Logo size="sm" className="mx-auto mb-4 md:mb-6 opacity-30 grayscale scale-75 md:scale-100" />
        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">© 2024 SEAWEEDTRADE PROTOCOL. MARITIME ACCREDITED.</p>
      </footer>
    </div>
  );
};

export default AboutPage;