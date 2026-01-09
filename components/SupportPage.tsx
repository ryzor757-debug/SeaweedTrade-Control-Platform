import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Wrench, 
  Handshake, 
  Ship, 
  Search, 
  FileText, 
  HelpCircle, 
  Globe, 
  Clock, 
  Upload, 
  ShieldAlert,
  ChevronRight,
  LifeBuoy,
  PhoneCall,
  Lock
} from 'lucide-react';
import Logo from './Logo';

interface SupportPageProps {
  onBack: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onBack }) => {
  const [urgency, setUrgency] = useState('Standard');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f3f9f7] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 relative">
      <div className="fixed inset-0 pointer-events-none -z-10 seaweed-texture opacity-30" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100 px-6 md:px-12 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-emerald-600"
            >
              <ArrowLeft size={20} />
            </button>
            <Logo size="sm" />
          </div>
          <div className="hidden md:flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50/50 px-4 py-1.5 rounded-full border border-emerald-100">
            <LifeBuoy size={12} /> Global Support Desk v4.2
          </div>
        </div>
      </nav>

      {/* 1. Header: The "Peace of Mind" Promise */}
      <header className="pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-[1600px] mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#043927] mb-6">
            Expert Support for <br className="hidden md:block" /> Global Operations.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Our dedicated trade specialists are on standby to ensure your supply chain remains uninterrupted and your marine assets remain secure.
          </p>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 space-y-24 relative z-10">
        
        {/* 2. Three Tiers of Support */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: 'tech',
              icon: Wrench,
              title: 'Technical Support',
              desc: 'For dashboard issues, API integrations, or account access anomalies.',
              response: 'Under 2 hours',
              cta: 'Open Tech Ticket'
            },
            {
              id: 'trade',
              icon: Ship,
              title: 'Trade & Logistics',
              desc: 'Escrow inquiries, shipping delays, or quality dispute mediation.',
              response: 'Real-time (Market Hours)',
              cta: 'Speak to a Trade Officer',
              featured: true
            },
            {
              id: 'partner',
              icon: Handshake,
              title: 'Partner Success',
              desc: 'For new enterprise onboarding or scaling your total supply volume.',
              response: 'Same-day consultation',
              cta: 'Schedule a Call'
            }
          ].map((tier) => (
            <div 
              key={tier.id}
              className={`p-10 rounded-[40px] border transition-all duration-500 ${tier.featured ? 'bg-[#043927] text-white border-[#043927] shadow-2xl shadow-emerald-900/20' : 'glass border-slate-100 hover:shadow-xl'}`}
            >
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-8 ${tier.featured ? 'bg-white/10 text-emerald-400' : 'bg-emerald-50 text-[#043927]'}`}>
                <tier.icon size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{tier.title}</h3>
              <p className={`mb-8 font-medium leading-relaxed ${tier.featured ? 'text-emerald-100/70' : 'text-slate-500'}`}>
                {tier.desc}
              </p>
              <div className="flex flex-col gap-6 mt-auto">
                <div>
                  <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${tier.featured ? 'text-emerald-400' : 'text-slate-400'}`}>Target Response</p>
                  <p className="text-sm font-bold">{tier.response}</p>
                </div>
                <button className={`w-full py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${tier.featured ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20' : 'bg-[#043927] hover:bg-emerald-900 text-white shadow-lg shadow-slate-200'}`}>
                  {tier.cta} <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* 3. The "Control Center" Contact Form */}
        <section className="glass rounded-[64px] border border-slate-100 overflow-hidden shadow-sm flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-8 md:p-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[#043927]">Initiate Support Protocol</h2>
              <p className="text-slate-500 font-medium">Please provide your trade parameters for priority routing.</p>
            </div>
            
            {formStatus === 'success' ? (
              <div className="py-20 text-center bg-emerald-50 rounded-[40px] border border-emerald-100 animate-in zoom-in duration-500">
                <ShieldAlert className="mx-auto text-emerald-600 mb-6" size={48} />
                <h4 className="text-xl font-black text-slate-900 mb-2">Ticket #TR-99214 Open</h4>
                <p className="text-slate-500 font-medium px-8">Our trade desk has received your transmission. Stay on standby.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-8 text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:underline">New Request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Trade ID Reference</label>
                    <input type="text" placeholder="e.g. TR-8821" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all font-bold text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Urgency Level</label>
                    <select 
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all font-bold text-sm appearance-none"
                    >
                      <option>Low - Routine Inquiry</option>
                      <option>Standard - Normal Ops</option>
                      <option>Critical - Trade Halt</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Documentation (BOL / Quality Certs)</label>
                  <div className="w-full p-8 rounded-2xl bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 group hover:border-emerald-600 cursor-pointer transition-all">
                    <Upload className="text-slate-300 group-hover:text-emerald-600 transition-colors" size={24} />
                    <p className="text-xs font-bold text-slate-400">Drag & drop files or click to upload</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Case Context</label>
                  <textarea rows={4} placeholder="Describe the operational anomaly..." className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all font-medium text-sm resize-none"></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full py-5 bg-[#043927] text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl hover:shadow-emerald-900/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  {formStatus === 'sending' ? 'Transmitting Data...' : 'Submit Support Transmission'}
                </button>
              </form>
            )}
          </div>
          <div className="lg:w-1/2 bg-[#043927] p-8 md:p-16 flex flex-col justify-center text-white relative">
            <div className="absolute inset-0 opacity-10">
              <Globe className="w-full h-full -translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="relative z-10 space-y-10">
              <h3 className="text-2xl font-black tracking-tight">Global Trade Presence</h3>
              <div className="space-y-8">
                {[
                  { region: 'EMEA Region', loc: 'Europe / Africa', phone: '+47 21 00 00 00', hours: '08:00 - 17:00 CET' },
                  { region: 'APAC Region', loc: 'Asia / Pacific', phone: '+65 6712 0000', hours: '08:00 - 17:00 SGT' },
                  { region: 'Americas', loc: 'North & South America', phone: '+1 212 555 0199', hours: '08:00 - 17:00 EST' }
                ].map((zone) => (
                  <div key={zone.region} className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">{zone.region}</p>
                      <p className="text-lg font-bold">{zone.phone}</p>
                      <p className="text-xs text-white/50 font-medium">{zone.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Premium "Self-Service" Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black tracking-tighter text-[#043927]">Self-Service Resources</h2>
            <p className="text-slate-500 font-medium">Accelerate your operations with our verified documentation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Knowledge Base', desc: 'Understanding our Escrow Protocols and quality disputes.', icon: HelpCircle },
              { title: 'Documentation', desc: 'Full API Documentation for Enterprise Logistics integrations.', icon: FileText },
              { title: 'FAQ Hub', desc: 'What happens if a shipment fails quality inspection?', icon: Search }
            ].map((box) => (
              <div key={box.title} className="glass p-10 rounded-[40px] border border-slate-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-slate-100 transition-all group">
                <div className="h-12 w-12 bg-emerald-50 text-[#043927] rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <box.icon size={24} />
                </div>
                <h4 className="text-xl font-black mb-4">{box.title}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">{box.desc}</p>
                <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Explore Resource <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 md:px-12 border-t border-slate-100 text-center relative z-10">
        <div className="max-w-[800px] mx-auto glass p-10 rounded-[40px] border border-slate-100">
          <div className="flex items-center justify-center gap-3 text-emerald-600 mb-4">
            <Lock size={16} />
            <p className="text-[10px] font-black uppercase tracking-widest">Enterprise Priority Line</p>
          </div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            <span className="font-black text-[#043927]">Priority Support:</span> Enterprise Platinum members have a dedicated 24/7 direct-dial line for instantaneous assistance. Please log in to your Control Dashboard to view your private support credentials.
          </p>
          <button className="mt-8 px-8 py-3 bg-[#043927] text-white rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-emerald-900 transition-all flex items-center gap-2 mx-auto">
            <PhoneCall size={14} /> Access Direct Line
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SupportPage;