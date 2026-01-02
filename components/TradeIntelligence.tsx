import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Globe, FileText, ChevronRight, Activity, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', nori: 14.2, kelp: 9.8, sarg: 7.1 },
  { name: 'Feb', nori: 15.5, kelp: 10.2, sarg: 6.8 },
  { name: 'Mar', nori: 15.1, kelp: 11.5, sarg: 7.5 },
  { name: 'Apr', nori: 16.8, kelp: 12.1, sarg: 8.2 },
  { name: 'May', nori: 17.2, kelp: 11.8, sarg: 8.5 },
  { name: 'Jun', nori: 18.5, kelp: 12.5, sarg: 9.1 },
];

const TradeIntelligence: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto space-y-16 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[9px] font-black uppercase tracking-widest border border-orange-100">
          <Zap size={12} /> Institutional Data Access
        </div>
        <h1 className="text-4xl md:text-6xl font-serif-institutional font-bold text-slate-900 tracking-tight leading-tight">
          Trade Intelligence Hub
        </h1>
        <p className="text-xl text-slate-500 font-serif-institutional italic max-w-2xl leading-relaxed">
          "Knowledge is the ultimate control. Access the data that moves the marine markets before the rest of the world sees it."
        </p>
      </header>

      {/* Market Pulse Chart */}
      <section className="bg-white border border-slate-200 rounded-[48px] p-12 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl font-serif-institutional font-bold text-slate-900 tracking-tight">Market Pulse</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">Historical Price Index (USD/KG) &bull; Q1-Q2 2024</p>
          </div>
          <div className="flex gap-8">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-600">
              <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" /> Pharmaceutical Grade
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-600">
              <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" /> Industrial Grade
            </div>
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorNori" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorKelp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} />
              <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)'}} />
              <Area type="monotone" dataKey="nori" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorNori)" />
              <Area type="monotone" dataKey="kelp" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorKelp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Supply/Demand Heatmap */}
        <section className="space-y-10">
          <h2 className="text-2xl font-serif-institutional font-bold text-slate-900 border-b border-slate-100 pb-4">
            Supply/Demand Heatmap
          </h2>
          <div className="bg-slate-900 rounded-3xl p-10 aspect-video relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 opacity-10 grayscale brightness-150">
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="World map" />
            </div>
            <div className="relative z-10 flex justify-between items-start">
               <span className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl border border-emerald-500/30 text-[9px] font-black uppercase tracking-widest">Supply Focus: Nordics</span>
               <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-xl border border-blue-500/30 text-[9px] font-black uppercase tracking-widest">Demand Spike: West Coast US</span>
            </div>
            <div className="relative z-10 flex justify-center items-center gap-12">
               <div className="h-10 w-10 rounded-full bg-emerald-500/40 animate-ping" />
               <div className="h-6 w-6 rounded-full bg-blue-500/40 animate-pulse" />
               <div className="h-8 w-8 rounded-full bg-emerald-500/40 animate-ping" />
            </div>
            <div className="relative z-10 text-[8px] font-black text-white/30 uppercase tracking-[0.5em] text-center">Global Node Matrix v4.0</div>
          </div>
        </section>

        {/* Expert Analysis */}
        <section className="space-y-10">
          <h2 className="text-2xl font-serif-institutional font-bold text-slate-900 border-b border-slate-100 pb-4">
            Expert Analysis
          </h2>
          <div className="space-y-6">
            {[
              { author: 'Dr. Marcus Thorne', role: 'Head of Marine Markets', snippet: 'Seasonal shifts in the Chilean Humboldt current are projected to drive kelp futures up by 14% this quarter.' },
              { author: 'Elena Rossi', role: 'Bioplastic Strategist', snippet: 'The new EU Regenerative Packaging directive is creating a massive supply gap for industrial-grade Saccharina.' },
            ].map((expert) => (
              <div key={expert.author} className="p-8 bg-white border border-slate-100 rounded-3xl space-y-4 hover:shadow-xl transition-all">
                <div className="flex justify-between items-center">
                   <p className="text-sm font-black text-slate-900">{expert.author}</p>
                   <span className="text-[9px] font-black uppercase tracking-widest text-orange-600">{expert.role}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-serif-institutional italic">"{expert.snippet}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quarterly Outlook CTA */}
      <section className="bg-slate-50 border border-slate-200 rounded-[48px] p-12 flex flex-col md:flex-row items-center justify-between gap-10 group hover:bg-white transition-all duration-700">
        <div className="flex items-center gap-10">
          <div className="h-24 w-24 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center text-slate-300 group-hover:text-emerald-600 transition-colors">
            <FileText size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-serif-institutional font-bold italic text-slate-900">The Q4 Marine Outlook</h3>
            <p className="text-sm text-slate-500 font-medium">Deep-dive technical report available only to verified ecosystem members.</p>
          </div>
        </div>
        <button className="px-12 py-6 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-emerald-600 transition-all flex items-center gap-4">
          Access Executive Intel <ChevronRight size={18} />
        </button>
      </section>
    </div>
  );
};

export default TradeIntelligence;