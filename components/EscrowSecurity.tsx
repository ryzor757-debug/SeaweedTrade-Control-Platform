import React from 'react';
import { Lock, CreditCard, Ship, FileCheck, Landmark, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';

const EscrowSecurity: React.FC = () => {
  const steps = [
    { id: '1', title: 'Agreement', desc: 'Terms are locked via Smart Contract.', icon: Landmark },
    { id: '2', title: 'Funding', desc: 'Buyer deposits into Escrow.', icon: CreditCard },
    { id: '3', title: 'Transit', desc: 'Live tracking active on platform.', icon: Ship },
    { id: '4', title: 'Verification', desc: 'Documents (BOL) are validated.', icon: FileCheck },
    { id: '5', title: 'Settlement', desc: 'Instant fund release to seller.', icon: ShieldCheck },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-20 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[9px] font-black uppercase tracking-widest border border-blue-100">
          <Lock size={12} /> Institutional Fiscal Control
        </div>
        <h1 className="text-4xl md:text-6xl font-serif-institutional font-bold text-slate-900 tracking-tight leading-tight">
          Financial Security & Escrow
        </h1>
        <p className="text-xl text-slate-500 font-serif-institutional italic max-w-2xl leading-relaxed">
          "Trade with the confidence of a central bank. Our escrow system ensures that no capital is moved until every contractual obligation is met."
        </p>
      </header>

      {/* The Digital Handshake Workflow */}
      <section className="space-y-16">
        <h2 className="text-2xl font-serif-institutional font-bold text-slate-900 border-b border-slate-100 pb-4">
          The "Digital Handshake" Workflow
        </h2>
        <div className="relative flex flex-col md:flex-row items-start justify-between gap-12 md:gap-4">
          {/* Horizontal Line Connector */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10" />
          
          {steps.map((step, idx) => (
            <div key={step.id} className="flex-1 text-center space-y-6 group">
              <div className="mx-auto w-24 h-24 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-300 group-hover:border-blue-500 group-hover:text-blue-500 group-hover:shadow-xl transition-all duration-500">
                <step.icon size={36} />
              </div>
              <div className="space-y-2 px-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">{step.title}</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <section className="p-12 bg-white border border-slate-100 rounded-3xl space-y-8">
          <h2 className="text-2xl font-serif-institutional font-bold text-slate-900 flex items-center gap-3">
            <HelpCircle className="text-orange-500" size={24} />
            Dispute Mediation
          </h2>
          <p className="text-base text-slate-500 font-medium leading-relaxed">
            Our platform acts as a neutral "Judge" if a shipment is contested. In the event of a quality discrepancy or logistics failure, funds are held in a secure vault while our maritime legal team reviews the lab verification and telemetry logs.
          </p>
          <ul className="space-y-4">
            {['Multi-signature fund release', 'Verified 3rd-party lab arbitration', 'Standardized maritime dispute logs'].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-400" /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-12 bg-[#F8FAFC] border border-slate-200 rounded-3xl space-y-8">
          <h2 className="text-2xl font-serif-institutional font-bold text-slate-900 flex items-center gap-3">
            <ShieldCheck className="text-emerald-500" size={24} />
            Currency & Compliance
          </h2>
          <p className="text-base text-slate-500 font-medium leading-relaxed">
            Every transaction adheres to strict AML (Anti-Money Laundering) and KYC (Know Your Customer) protocols. We provide institutional-grade reporting for tax and compliance audits.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            {['AML/KYC Ready', 'Swift/BIC Support', 'Tax Audit Trail', 'GDPR Encrypted'].map((tag) => (
              <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      <footer className="py-16 text-center border-t border-slate-100">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10 italic">Global Liquidity Partners</p>
        <div className="flex flex-wrap justify-center gap-16 grayscale opacity-30 text-2xl font-serif-institutional font-bold">
          <span>HSBC Maritime</span>
          <span>Standard Chartered</span>
          <span>Nordea Trade</span>
        </div>
      </footer>
    </div>
  );
};

export default EscrowSecurity;