import React, { useState, useEffect } from 'react';
import { Clock, Globe, ShieldCheck } from 'lucide-react';

interface EnglishTimerProps {
  variant?: 'featured' | 'minimal';
  className?: string;
}

const EnglishTimer: React.FC<EnglishTimerProps> = ({ variant = 'minimal', className = "" }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  if (variant === 'featured') {
    return (
      <div className={`relative flex flex-col items-center justify-center p-12 md:p-24 overflow-hidden rounded-[64px] ${className}`}>
        {/* Maritime Radar / Sonar Pulse Animations */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="absolute w-[300px] h-[300px] border border-emerald-500 rounded-full animate-ping opacity-75" />
          <div className="absolute w-[500px] h-[500px] border border-emerald-400 rounded-full animate-pulse opacity-50" />
          <div className="absolute w-[700px] h-[700px] border border-emerald-300 rounded-full opacity-25" />
        </div>

        {/* Marine Chronometer Bezel Overlay */}
        <div className="absolute inset-0 animate-spin-extra-slow opacity-[0.07] pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-[90%] h-[90%] text-slate-900">
            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
            {[...Array(60)].map((_, i) => (
              <line 
                key={i} 
                x1="100" y1="10" x2="100" y2={i % 5 === 0 ? "20" : "15"} 
                stroke="currentColor" 
                strokeWidth={i % 5 === 0 ? "1.5" : "0.5"} 
                transform={`rotate(${i * 6} 100 100)`} 
              />
            ))}
          </svg>
        </div>

        {/* Chronometer Content */}
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-emerald-600/30" />
            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-emerald-600">Global Synchronicity</span>
            <div className="h-px w-12 bg-emerald-600/30" />
          </div>

          <div className="flex items-baseline justify-center gap-2 md:gap-6">
             <div className="flex flex-col items-center">
               <span className="text-7xl md:text-[160px] font-black text-slate-900 tracking-tighter tabular-nums leading-none">
                 {displayHours.toString().padStart(2, '0')}
               </span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Hours</span>
             </div>
             <span className="text-4xl md:text-8xl font-black text-emerald-600 animate-pulse leading-none mb-4">:</span>
             <div className="flex flex-col items-center">
               <span className="text-7xl md:text-[160px] font-black text-slate-900 tracking-tighter tabular-nums leading-none">
                 {minutes.toString().padStart(2, '0')}
               </span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Minutes</span>
             </div>
             <div className="flex flex-col items-start ml-4 md:ml-8 border-l border-slate-100 pl-6 md:pl-10">
               <div className="flex items-baseline gap-2">
                 <span className="text-3xl md:text-6xl font-black text-emerald-500 tabular-nums">
                   {seconds.toString().padStart(2, '0')}
                 </span>
                 <span className="text-xs md:text-lg font-black text-slate-400 uppercase tracking-widest">
                   {ampm}
                 </span>
               </div>
               <div className="mt-4 px-4 py-1.5 bg-slate-900 text-white rounded-xl flex items-center gap-2 shadow-xl border border-white/10">
                  <Globe size={12} className="text-emerald-400 animate-spin-slow" />
                  <span className="text-[9px] font-black uppercase tracking-widest">UTC SYNC ACTIVE</span>
               </div>
             </div>
          </div>

          <div className="mt-16 space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
              {new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(time)}
            </p>
            <div className="flex items-center justify-center gap-2 text-emerald-600/50">
               <ShieldCheck size={14} />
               <span className="text-[8px] font-black uppercase tracking-widest">Maritime Accredited Time Server</span>
            </div>
          </div>
        </div>
        
        <style>
          {`
            @keyframes spin-extra-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-spin-extra-slow {
              animation: spin-extra-slow 180s linear infinite;
            }
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
              animation: spin-slow 15s linear infinite;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl ${className}`}>
      <div className="flex flex-col items-end">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-black text-slate-900 tabular-nums">
            {displayHours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
          </span>
          <span className="text-xs font-bold text-slate-400 tabular-nums">
            {seconds.toString().padStart(2, '0')}
          </span>
        </div>
        <p className="text-[8px] font-black uppercase tracking-widest text-emerald-600">
          {ampm} SYSTEM TIME
        </p>
      </div>
      <div className="w-px h-8 bg-slate-100 mx-1" />
      <div className="text-right">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">MARITIME NODE</p>
        <p className="text-[10px] font-bold text-slate-600 whitespace-nowrap uppercase tracking-tighter">
          {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(time)}
        </p>
      </div>
    </div>
  );
};

export default EnglishTimer;
