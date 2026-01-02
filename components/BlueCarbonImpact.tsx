import React, { useState } from 'react';
import { Leaf, Map, FileText, Globe, Droplets, ArrowRight, Activity } from 'lucide-react';

const BlueCarbonImpact: React.FC = () => {
  const [tons, setTons] = useState(250);

  const co2 = (tons * 0.6).toFixed(1);
  const trees = Math.round(tons * 40);

  return (
    <div className="max-w-[1200px] mx-auto space-y-20 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
          <Leaf size={12} /> Environmental Asset Log
        </div>
        <h1 className="text-4xl md:text-6xl font-serif-institutional font-bold text-slate-900 tracking-tight leading-tight">
          Blue Carbon Impact Center
        </h1>
        <p className="text-xl text-slate-500 font-serif-institutional italic max-w-2xl leading-relaxed">
          "Your supply chain is your greatest climate asset. We don't just track tons; we track the healing of the ocean."
        </p>
      </header>

      {/* Sequestration Science */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-2xl font-serif-institutional font-bold text-slate-900 border-b border-slate-100 pb-4">
            Sequestration Science
          </h2>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Seaweed represents one of the most efficient natural carbon capture technologies on Earth. Through rapid photosynthesis, macroalgae absorbs dissolved CO2 directly from the water column, mitigating ocean acidification while sequestering carbon in biomass that is eventually processed or naturally sinks to the deep ocean floor.
          </p>
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
               <span className="text-3xl font-black text-emerald-600 tracking-tighter">30x</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Faster than land forests</span>
             </div>
             <div className="w-px h-10 bg-slate-200" />
             <div className="flex flex-col">
               <span className="text-3xl font-black text-emerald-600 tracking-tighter">Zero</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Freshwater Footprint</span>
             </div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 flex items-center justify-center aspect-video overflow-hidden grayscale">
           <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover rounded-2xl opacity-40" alt="Seaweed growth" />
        </div>
      </section>

      {/* Impact Calculator */}
      <section className="bg-white border border-slate-100 rounded-[48px] p-12 md:p-16 shadow-lg relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif-institutional font-bold text-slate-900 tracking-tight mb-2">Interactive Impact Calculator</h2>
              <p className="text-slate-500 font-medium">Model your regenerative impact based on planned trade volume.</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Projected Volume (Metric Tons)</span>
                <span className="text-4xl font-black text-emerald-600 tracking-tighter">{tons} t</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                step="50" 
                value={tons} 
                onChange={(e) => setTons(Number(e.target.value))}
                className="w-full h-2.5 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[9px] font-black text-slate-300 uppercase tracking-widest">
                <span>0 t</span>
                <span>1,000 t</span>
                <span>2,000 t</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-10 bg-[#F0FDF4] rounded-[40px] border border-emerald-100 space-y-4">
              <Leaf className="text-emerald-600" size={32} />
              <div>
                <p className="text-4xl font-black text-emerald-700 tracking-tighter">{co2} t</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/60">Net CO2 Sequestration</p>
              </div>
            </div>
            <div className="p-10 bg-[#EFF6FF] rounded-[40px] border border-blue-100 space-y-4">
              <Droplets className="text-blue-600" size={32} />
              <div>
                <p className="text-4xl font-black text-blue-700 tracking-tighter">{trees}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600/60">Tree Planting Equivalent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <section className="space-y-8">
          <h2 className="text-2xl font-serif-institutional font-bold text-slate-900">Traceability Map</h2>
          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Live Node Verification US-MAR-01</p>
            </div>
            
            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-2 w-0.5 h-[calc(100%-20px)] bg-slate-100" />
              {[
                { label: 'Harvest Source', loc: 'Sustainable Farm Alpha', date: 'Mar 10' },
                { label: 'Quality Verification', loc: 'SeaweedTrade Node 4', date: 'Mar 12' },
                { label: 'Port Dispatch', loc: 'Rotterdam Terminal', date: 'Mar 15' },
              ].map((step, i) => (
                <div key={step.label} className="flex gap-6 relative">
                  <div className="h-6 w-6 rounded-full border-4 border-white bg-emerald-500 shadow-md z-10" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{step.label}</p>
                    <p className="text-sm font-bold text-slate-800">{step.loc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-serif-institutional font-bold text-slate-900">ESG Reporting</h2>
          <div className="bg-slate-900 rounded-3xl p-10 text-white space-y-8 hover:shadow-2xl transition-all border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                <FileText size={120} />
             </div>
             <div className="space-y-4 relative z-10">
               <h4 className="text-2xl font-serif-institutional font-bold italic">Board-Ready Reports</h4>
               <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                 Generate automated, verified PDF reports on Scope-3 emissions reduction and restorative marine impact.
               </p>
             </div>
             <button className="relative z-10 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-emerald-400 group-hover:translate-x-2 transition-transform">
               Download Sample ESG PDF <ArrowRight size={16} />
             </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlueCarbonImpact;