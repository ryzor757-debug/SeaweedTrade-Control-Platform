import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  const configs = {
    sm: { iconSize: 32, textWidth: 140, totalWidth: 180, height: 45, fontSize: "28px", iconGap: "gap-2" },
    md: { iconSize: 48, textWidth: 220, totalWidth: 280, height: 70, fontSize: "42px", iconGap: "gap-4" },
    lg: { iconSize: 64, textWidth: 340, totalWidth: 420, height: 110, fontSize: "60px", iconGap: "gap-6" }
  };

  const cfg = configs[size];

  return (
    <div className={`flex items-center ${cfg.iconGap} ${className}`}>
      {/* Premium Graphical Icon (Placed Before/Aside) */}
      <div className="flex-shrink-0 relative" style={{ width: cfg.iconSize, height: cfg.iconSize }}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Elegant Seaweed Blades */}
          <path
            d="M50 85C50 85 75 60 75 35C75 10 50 15 50 15"
            stroke="#3d5a2a"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M35 80C35 80 15 65 15 45C15 25 35 30 35 30"
            stroke="#3d5a2a"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M65 75C65 75 85 55 85 40"
            stroke="#3d5a2a"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.4"
          />
          {/* Gold Value Accent */}
          <circle cx="50" cy="85" r="6" fill="url(#goldGradient)" />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8a6d3b" />
              <stop offset="50%" stopColor="#c5a059" />
              <stop offset="100%" stopColor="#8a6d3b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Stylized Wordmark with Swirls */}
      <div className="flex flex-col items-center justify-center overflow-visible" style={{ width: cfg.textWidth, height: cfg.height }}>
        <svg
          viewBox="0 0 300 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm overflow-visible"
        >
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d5a2a" />
              <stop offset="100%" stopColor="#2a3d1c" />
            </linearGradient>
            
            <filter id="innerShadow">
              <feOffset dx="0" dy="1" />
              <feGaussianBlur stdDeviation="0.5" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="0.2" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>

          {/* Text "SEAWEEDTRADE" */}
          <text
            x="150"
            y="65"
            textAnchor="middle"
            style={{
              fill: "url(#textGradient)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 900,
              fontSize: "42px",
              letterSpacing: "-0.05em",
              filter: "url(#innerShadow)"
            }}
          >
            SEAWEEDTRADE
          </text>

          {/* Organic Swirls / Seaweed Tendrils */}
          <g stroke="#7fb069" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <path 
              d="M85 55 C 75 40, 95 25, 110 35 C 100 30, 95 45, 115 50" 
              className="animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            <circle cx="110" cy="32" r="1.5" fill="#7fb069" />
            
            <path 
              d="M165 80 C 155 50, 180 0, 195 25 C 205 45, 175 60, 160 30" 
              className="animate-pulse"
              style={{ animationDuration: '6s' }}
            />
            <path 
              d="M185 75 C 195 95, 215 75, 205 60" 
            />
          </g>
          
          {/* Subtle Golden Underline for Wordmark Unity */}
          <rect x="20" y="80" width="260" height="2" fill="url(#goldGradient)" rx="1" />
        </svg>
      </div>
    </div>
  );
};

export default Logo;