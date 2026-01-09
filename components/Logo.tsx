import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  const configs = {
    sm: { iconSize: 28, textWidth: 150, height: 40, fontSize: "24px", iconGap: "gap-2" },
    md: { iconSize: 42, textWidth: 240, height: 60, fontSize: "36px", iconGap: "gap-3" },
    lg: { iconSize: 60, textWidth: 320, height: 90, fontSize: "48px", iconGap: "gap-5" }
  };

  const cfg = configs[size];

  return (
    <div className={`flex items-center group/logo ${cfg.iconGap} ${className} transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]`}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
          
          @keyframes seaweed-flow {
            0%, 100% { transform: scaleY(1) skewX(0deg); }
            50% { transform: scaleY(1.05) skewX(4deg); }
          }
          
          .animate-flow {
            animation: seaweed-flow 3s ease-in-out infinite;
            transform-origin: bottom center;
          }
          
          .logo-text {
            font-family: 'Pacifico', cursive;
            background: linear-gradient(135deg, #022c22 0%, #059669 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            transition: all 0.5s ease;
          }

          .dark .logo-text {
            background: linear-gradient(135deg, #ecfdf5 0%, #10b981 100%);
            -webkit-background-clip: text;
            background-clip: text;
          }

          .group-hover\\/logo .logo-text {
            transform: skewX(-2deg);
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
          }
        `}
      </style>
      
      {/* Refined Flowing Icon */}
      <div className="flex-shrink-0 relative" style={{ width: cfg.iconSize, height: cfg.iconSize }}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="goldGradientLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C5B358" />
              <stop offset="100%" stopColor="#8a6d3b" />
            </linearGradient>
          </defs>
          
          {/* Main Flowing Blade */}
          <path
            d="M50 90C50 90 70 65 70 40C70 15 50 10 50 10C50 10 30 15 30 40C30 65 50 90 50 90Z"
            fill="url(#leafGradient)"
            className="animate-flow"
            opacity="0.9"
          />
          
          {/* Accent Tendril */}
          <path
            d="M50 90C50 90 35 75 35 55C35 40 45 35 50 35"
            stroke="url(#goldGradientLogo)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-flow"
            style={{ animationDelay: '-1.5s' }}
          />
          
          {/* Grounding Pearl */}
          <circle cx="50" cy="90" r="5" fill="url(#goldGradientLogo)" />
        </svg>
      </div>

      {/* Script Wordmark */}
      <div className="flex flex-col items-start justify-center" style={{ height: cfg.height }}>
        <span 
          className="logo-text whitespace-nowrap leading-none select-none"
          style={{ fontSize: cfg.fontSize }}
        >
          SeaweedTrade
        </span>
        
        {/* Elegant Tapered Underline */}
        <div className="w-full h-[2px] mt-1 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5B358] to-transparent opacity-60 group-hover/logo:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </div>
  );
};

export default Logo;