import React, { useState, useEffect } from 'react';

interface BanglaTimerProps {
  variant?: 'featured' | 'minimal';
  className?: string;
}

const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

const toBangla = (num: number | string): string => {
  return num.toString().split('').map(digit => {
    const d = parseInt(digit);
    return isNaN(d) ? digit : banglaDigits[d];
  }).join('');
};

const BanglaTimer: React.FC<BanglaTimerProps> = ({ variant = 'minimal', className = "" }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'অপরাহ্ণ' : 'পূর্বাহ্ণ';
  const displayHours = hours % 12 || 12;

  if (variant === 'featured') {
    return (
      <div className={`relative flex flex-col items-center justify-center p-8 ${className}`}>
        {/* Animated Alpona Border */}
        <div className="absolute inset-0 animate-spin-slow opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-600">
            <path
              id="alpona-path"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              d="M100,20 A80,80 0 1,1 99.9,20"
              strokeDasharray="10 5"
            />
            {/* Procedural Alpona Petals */}
            {[...Array(12)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                <path
                  d="M100,20 Q110,40 100,60 Q90,40 100,20"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle cx="100" cy="15" r="2" fill="#C5B358" />
              </g>
            ))}
          </svg>
        </div>

        {/* Clock Content */}
        <div className="relative z-10 text-center space-y-1">
          <div className="flex items-baseline justify-center gap-1">
             <span className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
               {toBangla(displayHours)}:{toBangla(minutes.toString().padStart(2, '0'))}
             </span>
             <span className="text-sm md:text-lg font-black text-emerald-600 animate-pulse">:</span>
             <span className="text-2xl md:text-3xl font-bold text-slate-400">
               {toBangla(seconds.toString().padStart(2, '0'))}
             </span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-emerald-700">
              {ampm}
            </p>
            <div className="mt-2 px-4 py-1 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
               <p className="text-[9px] md:text-[10px] font-bold text-slate-600">
                 {toBangla(time.getDate())} {new Intl.DateTimeFormat('bn-BD', { month: 'long' }).format(time)}
               </p>
            </div>
          </div>
        </div>
        
        <style>
          {`
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
              animation: spin-slow 20s linear infinite;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur border border-slate-100 rounded-2xl shadow-sm ${className}`}>
      <div className="flex flex-col items-end">
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-black text-slate-900">
            {toBangla(displayHours)}:{toBangla(minutes.toString().padStart(2, '0'))}
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            {toBangla(seconds.toString().padStart(2, '0'))}
          </span>
        </div>
        <p className="text-[7px] font-black uppercase tracking-widest text-emerald-600">
          {ampm}
        </p>
      </div>
      <div className="w-px h-6 bg-slate-100" />
      <div className="text-right">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">ঢাকা হাব</p>
        <p className="text-[9px] font-bold text-slate-600 whitespace-nowrap">
          {toBangla(time.getDate())} {new Intl.DateTimeFormat('bn-BD', { month: 'short' }).format(time)}
        </p>
      </div>
    </div>
  );
};

export default BanglaTimer;
