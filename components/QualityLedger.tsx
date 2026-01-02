import React from 'react';
import { ShieldCheck, CheckCircle2, FlaskConical, Award, BookOpen } from 'lucide-react';

const QualityLedger: React.FC = () => {
  const grades = [
    { grade: 'Grade AAA', industry: 'Pharmaceutical & Cosmetic', moisture: '< 10%', ash: '< 5%', purity: '99.9%', use: 'High-end extract, Alginate purity focus' },
    { grade: 'Grade AA', industry: 'Human Consumption / Food', moisture: '< 15%', ash: '< 12%', purity: '98.5%', use: 'Direct food application, Wakame, Nori' },
    { grade: 'Grade A', industry: 'Industrial / Agriculture', moisture: '< 22%', ash: '< 25%', purity: '95.0%', use: 'Regenerative Fertilizer, Bioplastics' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-16 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
          <Award size={12} /> Standard v4.2 Verification
        </div>
        <h1 className="text-4xl md:text-6xl font-serif-institutional font-bold text-slate-900 tracking-tight leading-tight">
          Quality & Standards Ledger
        </h1>
        <p className="text-xl text-slate-500 font-serif-institutional italic max-w-2xl leading-relaxed">
          "In a market historically defined by inconsistency, we provide the benchmark. Our multi-stage verification ensures that what you see on the dashboard is exactly what arrives at your port."
        </p>
      </header>

      {/* Grading Matrix */}
      <section className="space-y-8">
        <h2 className="text-2xl font-serif-institutional font-bold text-slate-900 border-b border-slate-100 pb-4">
          The Grading Matrix
        </h2>
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-6">Grade Class</th>
                <th className="px-8 py-6">Primary Sector</th>
                <th className="px-8 py-6">Moisture</th>
                <th className="px-8 py-6">Ash Content</th>
                <th className="px-8 py-6">Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {grades.map((g) => (
                <tr key={g.grade} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-bold text-slate-900">{g.grade}</span>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-600">{g.industry}</td>
                  <td className="px-8 py-6 text-sm font-bold text-emerald-600">{g.moisture}</td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-500">{g.ash}</td>
                  <td className="px-8 py-6 text-xs text-slate-400 font-medium">{g.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Testing Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <section className="space-y-8">
          <h2 className="text-2xl font-serif-institutional font-bold text-slate-900">
            Testing Protocols
          </h2>
          <div className="space-y-6">
            {[
              { label: 'Moisture Content', val: 'Verified via vacuum desiccation at 105°C to ensure < 15% shelf stability.' },
              { label: 'Ash & Mineral', val: 'Total mineral content analysis per lot for nutrient density verification.' },
              { label: 'Heavy Metal Screening', val: 'ICP-MS screening for Cadmium, Lead, and Arsenic levels.' },
              { label: 'Iodine Stability', val: 'Standardized titration for pharmaceutical-grade consistency.' },
            ].map((p) => (
              <div key={p.label} className="flex gap-4 group">
                <div className="mt-1 h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={12} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-900 mb-1">{p.label}</p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{p.val}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="bg-[#043927] rounded-3xl p-12 text-white flex flex-col items-center text-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
              <ShieldCheck size={160} />
            </div>
            <div className="h-24 w-24 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <ShieldCheck size={48} className="text-emerald-400" />
            </div>
            <div className="space-y-4 relative z-10">
              <h3 className="text-3xl font-serif-institutional font-bold italic">The SeaweedTrade Seal</h3>
              <p className="text-emerald-100/60 text-base leading-relaxed max-w-xs mx-auto">
                "Verified by SeaweedTrade" denotes a shipment that has passed all 14 neural and laboratory telemetry checkpoints.
              </p>
            </div>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[9px] font-black uppercase tracking-widest">3rd Party Verified</div>
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[9px] font-black uppercase tracking-widest">ISO 22000 Ready</div>
            </div>
          </div>
        </section>
      </div>

      <section className="py-16 border-y border-slate-100 text-center space-y-10">
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Official Laboratory Accreditation</p>
         <div className="flex flex-wrap items-center justify-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-2xl font-serif-institutional font-bold italic tracking-tighter">Eurofins Maritime</span>
            <span className="text-2xl font-serif-institutional font-bold italic tracking-tighter">SGS Global</span>
            <span className="text-2xl font-serif-institutional font-bold italic tracking-tighter">Bureau Veritas</span>
            <span className="text-2xl font-serif-institutional font-bold italic tracking-tighter">Intertek Blue</span>
         </div>
      </section>
    </div>
  );
};

export default QualityLedger;