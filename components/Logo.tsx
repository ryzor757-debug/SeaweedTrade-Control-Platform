import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main Circle Border */}
        <circle cx="50" cy="50" r="46" stroke="#489b42" strokeWidth="6" />
        
        {/* The Blue Hand */}
        <path 
          d="M20 68C20 68 28 62 35 60C42 58 55 58 65 62C75 66 76 63 76 63C76 63 72 75 62 82C52 89 38 89 28 85C18 81 20 68 20 68Z" 
          fill="#1e4e8c" 
        />
        <path 
          d="M20 68C23 75 30 80 40 82C50 84 65 82 72 75" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        
        {/* Seaweed Leaves */}
        <path d="M38 58C36 45 32 35 34 15C34 15 42 25 44 40C46 55 42 60 42 60" fill="#91cc44" />
        <path d="M52 58C50 48 48 38 52 28C52 28 58 35 60 48C62 61 55 60 55 60" fill="#75ba3d" />
        <path d="M64 56C64 48 68 42 70 38C70 38 72 45 70 52C68 59 64 58 64 58" fill="#489b42" />
        
        {/* The Growth Arrow */}
        <path 
          d="M38 55C45 40 55 25 75 12" 
          stroke="#489b42" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        <path 
          d="M68 12L78 8L78 22" 
          fill="#489b42" 
        />
      </svg>
    </div>
  );
};

export default Logo;