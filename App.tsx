import React, { useState, useEffect } from 'react';
import { 
  Waves, 
  UserCircle, 
  Menu,
  Activity,
  Globe,
  ArrowRight,
  Anchor,
  Droplets,
  Heart,
  Home,
  Facebook,
  Linkedin,
  Instagram,
  ChevronRight,
  Lock,
  Leaf,
  LineChart,
  Moon,
  Sun,
  ShieldCheck,
  Zap,
  TrendingUp,
  BarChart3,
  ShoppingCart,
  Building2
} from 'lucide-react';
import { UserRole, HarvestBatch, Order } from './types';
import FarmerPortal from './components/FarmerPortal';
import BuyerPortal from './components/BuyerPortal';
import LogisticsPortal from './components/LogisticsPortal';
import AdminDashboard from './components/AdminDashboard';
import Sidebar from './components/Sidebar';
import Logo from './components/Logo';
import ContactSection from './components/ContactSection';
import ChatWidget from './components/ChatWidget';
import VisionPage from './components/VisionPage';
import SupportPage from './components/SupportPage';
import AboutPage from './components/AboutPage';
import WhySeaweedPage from './components/WhySeaweedPage';
import QualityLedger from './components/QualityLedger';
import EscrowSecurity from './components/EscrowSecurity';
import BlueCarbonImpact from './components/BlueCarbonImpact';
import TradeIntelligence from './components/TradeIntelligence';
import EnglishTimer from './components/EnglishTimer';

const XLogo = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
  </svg>
);

const SeaweedThemeBackground: React.FC = () => (
  <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden dark:opacity-40 transition-opacity duration-700">
    <div className="absolute top-0 left-0 w-full max-w-[900px] h-[200px] md:h-[300px] opacity-[0.22]">
      <svg viewBox="0 0 900 250" className="w-full h-full" preserveAspectRatio="xMinYMin meet">
        <defs>
          <linearGradient id="vividWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="highContrastGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>
        <g stroke="url(#vividWaveGradient)" fill="none" strokeLinecap="round">
          <path d="M-50 40 Q 100 0, 250 80 T 550 40 T 850 100" strokeWidth="3" opacity="0.8" />
          <path d="M-50 60 Q 150 110, 300 30 T 650 120 T 950 40" strokeWidth="4.5" opacity="0.5" />
        </g>
        <g stroke="#022c22" fill="none" strokeLinecap="round">
          <path d="M40 -10 C 60 40, 20 80, 50 150" strokeWidth="6" opacity="0.85" />
          <path d="M80 -15 C 110 30, 70 90, 100 170" strokeWidth="5" opacity="0.65" />
        </g>
        <g fill="url(#highContrastGold)">
          <path d="M45 60 Q 70 50, 85 70 Q 65 85, 45 75 Z" opacity="0.8" />
          <path d="M105 110 Q 130 100, 145 120 Q 125 135, 105 125 Z" opacity="0.6" />
        </g>
      </svg>
    </div>
  </div>
);

const ScrollProgressBar: React.FC<{ progress: number; position?: 'top' | 'bottom' }> = ({ progress, position = 'top' }) => (
  <div className={`absolute ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 w-full h-[2px] z-[60] pointer-events-none overflow-hidden`}>
    <div 
      className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app' | 'vision' | 'support' | 'about' | 'why-seaweed' | 'quality' | 'escrow' | 'carbon' | 'intel'>('landing');
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  // Default to true for desktop dashboard view, false otherwise
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
       return window.innerWidth > 1024;
    }
    return false;
  });
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  const [batches, setBatches] = useState<HarvestBatch[]>([
    { id: 'batch-001', farmerId: 'F1', species: 'Saccharina latissima', weight: 450, harvestDate: '2024-03-01', status: 'PENDING' },
    { id: 'batch-002', farmerId: 'F2', species: 'Palmaria palmata', weight: 200, harvestDate: '2024-02-28', status: 'APPROVED', qualityGrade: 'A', price: 15 },
    { id: 'batch-003', farmerId: 'F1', species: 'Porphyra umbilicalis', weight: 120, harvestDate: '2024-03-05', status: 'SOLD', qualityGrade: 'AAA', price: 45 },
    { id: 'batch-004', farmerId: 'F3', species: 'Ulva lactuca', weight: 310, harvestDate: '2024-03-08', status: 'APPROVED', qualityGrade: 'B+', price: 12 },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: 'order-001', batchId: 'batch-003', buyerId: 'BUYER1', amount: 120, status: 'PAID', date: '2024-03-06' },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(currentScroll);
      if (scrollHeight > 0) setScrollProgress((currentScroll / scrollHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const renderTheme = () => <SeaweedThemeBackground />;

  if (view === 'vision') return <><VisionPage onBack={() => setView('landing')} />{renderTheme()}</>;
  if (view === 'support') return <><SupportPage onBack={() => setView('landing')} />{renderTheme()}</>;
  if (view === 'about') return <><AboutPage onBack={() => setView('landing')} onJoin={() => setView('app')} onViewVision={() => setView('vision')} />{renderTheme()}</>;
  if (view === 'why-seaweed') return <><WhySeaweedPage onBack={() => setView('landing')} onJoin={() => setView('app')} />{renderTheme()}</>;

  const ThemeToggle = () => (
    <button 
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2.5 rounded-xl bg-slate-100 dark:bg-emerald-900/40 text-slate-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all border border-slate-200 dark:border-emerald-500/20 active:scale-95 z-[70]"
      title={isDarkMode ? "Light Mode" : "Deep Sea Mode"}
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-[#F9FBFB] dark:bg-[#011410] text-slate-900 dark:text-emerald-50 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden relative transition-colors duration-500">
        <Sidebar 
          role={role} 
          setRole={setRole} 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          setView={setView} 
        />
        <SeaweedThemeBackground />
        <ChatWidget />
        <div className="fixed inset-0 pointer-events-none -z-10 opacity-60 dark:opacity-20 transition-all duration-700" 
          style={{ background: isDarkMode ? 'radial-gradient(circle at top right, #043927 0%, #011410 100%)' : 'linear-gradient(to bottom, #F0F4F2 0%, #F9FBFB 30%, #FFFFFF 100%)' }} />
        <div className="fixed inset-0 pointer-events-none -z-10 maritime-grid opacity-30 dark:opacity-10" />

        <div className="relative z-20">
          <div className="fixed top-0 w-full z-50">
            <nav className="glass dark:bg-emerald-950/80 dark:border-emerald-900/40 px-4 md:px-12 py-3 border-b border-[#E1E8E5] relative transition-all duration-500">
              <ScrollProgressBar progress={scrollProgress} position="bottom" />
              <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                <div className="flex items-center group cursor-pointer pr-4" onClick={() => setView('landing')}>
                  <Logo size="sm" className="scale-[0.65] xs:scale-75 md:scale-100 origin-left transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 dark:brightness-125" />
                </div>
                
                <div className="hidden lg:flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-emerald-400/60">
                  <button onClick={() => setView('about')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About Us</button>
                  <button onClick={() => setView('why-seaweed')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Why Seaweed?</button>
                  <button onClick={() => setView('vision')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Our Vision</button>
                  <button onClick={() => setView('support')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact Support</button>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <ThemeToggle />
                  <button 
                    onClick={() => setView('app')}
                    className="bg-[#043927] dark:bg-emerald-600 text-white px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-lg"
                  >
                    <span className="hidden xs:inline">Access</span> <span className="hidden sm:inline">Platform</span> <ArrowRight size={14} className="xs:w-3 xs:h-3" />
                  </button>
                  {/* Fixed Hamburger Trigger for All Screens */}
                  <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-emerald-950 text-slate-900 dark:text-emerald-400 border border-slate-200 dark:border-emerald-800/40 active:scale-95 transition-transform"
                    aria-label="Toggle Menu"
                  >
                    <Menu size={20} />
                  </button>
                </div>
              </div>
            </nav>
          </div>

          <section className="relative pt-32 sm:pt-40 md:pt-56 pb-16 md:pb-40 px-4 sm:px-6 md:px-12 overflow-hidden">
            <div className="max-w-[1600px] mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-7 space-y-6 md:space-y-8 animate-in slide-in-from-left duration-1000">
                  <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[8px] md:text-[9px] font-black border border-[#E1E8E5] dark:border-emerald-800/40 uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-sm">
                    <Anchor size={12} /> Decentralized Marine Commerce
                  </div>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] md:leading-[1] tracking-tighter transition-colors duration-500">
                    Harmonizing <span className="text-emerald-600 dark:text-emerald-400">Oceans</span> <br className="hidden sm:block" /> & Global Trade.
                  </h1>
                  <p className="text-base md:text-lg text-slate-500 dark:text-emerald-100/60 font-medium leading-relaxed max-w-xl transition-colors duration-500">
                    SeaweedTrade is an AI-governed ecosystem for the blue economy. Connectivity, transparency, and regenerative commerce standardized for institutional growth.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-5 pt-4">
                    <button onClick={() => setView('app')} className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#043927] dark:bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest shadow-xl hover:bg-emerald-800 transition-all text-center">
                      Start Harvesting Data
                    </button>
                    <button onClick={() => setView('why-seaweed')} className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white dark:bg-emerald-950/40 border-2 border-[#E1E8E5] dark:border-emerald-800/40 text-slate-900 dark:text-emerald-400 rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:border-emerald-600 transition-all flex items-center justify-center gap-3">
                      Why Seaweed? <Globe size={18} />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                  <div className="relative z-10 p-3 sm:p-4 bg-white dark:bg-emerald-950/20 rounded-[40px] sm:rounded-[60px] shadow-2xl overflow-hidden border border-[#E1E8E5] dark:border-emerald-800/20 transition-colors duration-500" style={{ transform: `translateY(${scrollY * -0.03}px)` }}>
                    <div className="absolute inset-0 maritime-grid opacity-10 pointer-events-none" />
                    <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200" alt="Marine Kelp" className="rounded-[30px] sm:rounded-[52px] object-cover h-[300px] sm:h-[400px] md:h-[500px] w-full grayscale-[20%] dark:grayscale-[10%] group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 bg-slate-900 dark:bg-emerald-900 text-white p-4 sm:p-6 rounded-2xl sm:rounded-[32px] shadow-2xl border-4 sm:border-[6px] border-white dark:border-emerald-950 max-w-[140px] sm:max-w-[200px] transition-colors duration-500">
                      <p className="text-xl sm:text-2xl font-black text-emerald-400 mb-0.5">98.4%</p>
                      <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-emerald-100/50">Carbon Efficiency</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 md:py-24 bg-white dark:bg-[#022c22] border-y border-[#E1E8E5] dark:border-emerald-900/40 px-4 sm:px-6 relative transition-colors duration-500">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: 'Network Nodes', val: '14,209', icon: Globe, color: 'text-emerald-600 dark:text-emerald-400' },
                { label: 'Annual Trade', val: '$2.8B', icon: Activity, color: 'text-blue-600 dark:text-blue-400' },
                { label: 'Carbon Credits', val: '8.4M t', icon: Droplets, color: 'text-teal-600 dark:text-teal-400' },
                { label: 'Communities', val: '412', icon: Heart, color: 'text-rose-600 dark:text-rose-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#F9FBFB] dark:bg-emerald-950/20 p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-[#E1E8E5] dark:border-emerald-800/40 group hover:border-emerald-600 dark:hover:border-emerald-400 transition-all relative overflow-hidden duration-500">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] maritime-grid w-full h-full -z-0" />
                  <div className={`${stat.color} mb-4 sm:mb-6 p-2.5 sm:p-3 bg-white dark:bg-emerald-900/40 border border-[#E1E8E5] dark:border-emerald-800/40 rounded-xl sm:rounded-2xl inline-block relative z-10 transition-colors duration-500`}>
                    <stat.icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-1.5 relative z-10 transition-colors duration-500">{stat.val}</p>
                  <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-emerald-400/60 relative z-10 transition-colors duration-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <ContactSection />

          {/* Global Synchronicity Timer Section (Institutional Featured Timer) */}
          <section className="py-24 px-4 sm:px-6 md:px-12 bg-[#F9FBFB] dark:bg-[#011410] relative overflow-hidden transition-colors duration-500">
            <div className="max-w-[1600px] mx-auto">
              <div className="bg-white dark:bg-emerald-950/20 rounded-[64px] border border-[#E1E8E5] dark:border-emerald-900/40 shadow-sm overflow-hidden relative transition-colors duration-500">
                <div className="absolute inset-0 maritime-grid opacity-10 pointer-events-none" />
                <EnglishTimer variant="featured" className="bg-gradient-to-b from-white to-slate-50 dark:from-emerald-950/40 dark:to-black/40" />
              </div>
            </div>
          </section>

          {/* Main Call to Action Grid Section */}
          <section className="py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-[#022c22] border-t border-[#E1E8E5] dark:border-emerald-900/40 relative overflow-hidden transition-colors duration-500">
            <div className="max-w-[1600px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Enterprise Access */}
                <div 
                  onClick={() => setView('support')}
                  className="bg-[#F9FBFB] dark:bg-emerald-950/40 p-10 rounded-[48px] border border-slate-100 dark:border-emerald-800/40 hover:border-emerald-600 dark:hover:border-emerald-400 transition-all group cursor-pointer shadow-sm hover:shadow-2xl duration-500"
                >
                  <div className="h-16 w-16 bg-white dark:bg-emerald-900/40 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 shadow-sm group-hover:scale-110 transition-transform">
                    <Building2 size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Request Enterprise Access</h3>
                  <p className="text-slate-500 dark:text-emerald-100/60 font-medium mb-8 leading-relaxed">
                    Institutional-grade connectivity for high-volume traders and logistics fleets.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Start Trading Today */}
                <div 
                  onClick={() => setView('app')}
                  className="bg-[#043927] p-10 rounded-[48px] border border-emerald-800/40 text-white hover:bg-emerald-800 transition-all group cursor-pointer shadow-xl hover:shadow-2xl duration-500"
                >
                  <div className="h-16 w-16 bg-white/10 rounded-3xl flex items-center justify-center text-emerald-400 mb-8 shadow-sm group-hover:scale-110 transition-transform">
                    <ShoppingCart size={32} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight mb-4">Start Trading Today</h3>
                  <p className="text-emerald-100/60 font-medium mb-8 leading-relaxed">
                    Deploy smart contracts immediately and access our verified carbon-negative inventory.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Market Intelligence */}
                <div 
                  onClick={() => setView('intel')}
                  className="bg-[#F9FBFB] dark:bg-emerald-950/40 p-10 rounded-[48px] border border-slate-100 dark:border-emerald-800/40 hover:border-emerald-600 dark:hover:border-emerald-400 transition-all group cursor-pointer shadow-sm hover:shadow-2xl duration-500"
                >
                  <div className="h-16 w-16 bg-white dark:bg-emerald-900/40 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 shadow-sm group-hover:scale-110 transition-transform">
                    <BarChart3 size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Access Market Intelligence</h3>
                  <p className="text-slate-500 dark:text-emerald-100/60 font-medium mb-8 leading-relaxed">
                    Harness real-time telemetry and neural forecasting for the global seaweed market.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    View Data <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="bg-[#043927] dark:bg-black text-white py-24 px-4 sm:px-6 md:px-12 border-t border-emerald-900 dark:border-emerald-900/40 relative overflow-hidden transition-colors duration-500">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 relative z-10">
              <div className="sm:col-span-2 space-y-8">
                <Logo size="sm" className="grayscale brightness-[10] !justify-start scale-90 origin-left" />
                <p className="text-emerald-100/60 font-medium max-w-sm text-sm md:text-base leading-relaxed">
                  Redefining the global marine supply chain with decentralization, trust, and neural quality validation.
                </p>
                <div className="flex items-center gap-4">
                  {[Linkedin, XLogo, Instagram, Facebook].map((Icon, i) => (
                    <a key={i} href="#" className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C5B358] hover:text-white transition-all">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Responsive Footer Navigation Columns */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Company</h4>
                <div className="flex flex-col gap-3 text-sm text-emerald-100/60 font-medium">
                  <button onClick={() => setView('about')} className="text-left hover:text-white transition-colors">About Protocol</button>
                  <button onClick={() => setView('why-seaweed')} className="text-left hover:text-white transition-colors">Why Seaweed?</button>
                  <button onClick={() => setView('vision')} className="text-left hover:text-white transition-colors">Our Vision</button>
                  <button onClick={() => setView('support')} className="text-left hover:text-white transition-colors">Contact Support</button>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Ecosystem</h4>
                <div className="flex flex-col gap-3 text-sm text-emerald-100/60 font-medium">
                  <button onClick={() => setView('intel')} className="text-left hover:text-white transition-colors">Market Intelligence</button>
                  <button onClick={() => setView('carbon')} className="text-left hover:text-white transition-colors">Carbon Tracking</button>
                  <button onClick={() => setView('quality')} className="text-left hover:text-white transition-colors">Quality Ledger</button>
                  <button onClick={() => setView('escrow')} className="text-left hover:text-white transition-colors">Escrow Security</button>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Resources</h4>
                <div className="flex flex-col gap-3 text-sm text-emerald-100/60 font-medium">
                  <button className="text-left hover:text-white transition-colors">Technical Docs</button>
                  <button className="text-left hover:text-white transition-colors">Marine Standards</button>
                  <button className="text-left hover:text-white transition-colors">Privacy Policy</button>
                  <button className="text-left hover:text-white transition-colors">Terms of Service</button>
                </div>
              </div>
            </div>
            
            <div className="max-w-[1600px] mx-auto mt-20 pt-10 border-t border-emerald-900/50 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-100/30 text-center md:text-left">
                © 2024 SEAWEEDTRADE PROTOCOL. MARITIME ACCREDITED NODE US-MAR-01.
              </p>
              <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-100/30">
                <span>V4.2.0 SECURED</span>
                <ShieldCheck size={14} className="text-emerald-500" />
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F9FBFB] dark:bg-[#011410] text-slate-900 dark:text-emerald-50 transition-colors duration-500 relative">
      <SeaweedThemeBackground />
      <div className="relative z-20 flex w-full">
        <Sidebar 
          role={role} 
          setRole={setRole} 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          setView={setView} 
        />
        <main className={`flex-1 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'} p-4 sm:p-6 md:p-10 pb-32 w-full overflow-x-hidden`}>
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-6 md:gap-8 relative">
            <ScrollProgressBar progress={scrollProgress} position="top" />
            <div className="flex items-center gap-4 md:gap-6">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="p-3 bg-white dark:bg-emerald-950/40 border border-[#E1E8E5] dark:border-emerald-800/40 rounded-xl text-slate-900 dark:text-emerald-400 hover:text-emerald-600 transition-all shadow-sm"
              >
                <Menu size={22} />
              </button>
              <button onClick={() => setView('landing')} className="p-3 sm:p-4 bg-white dark:bg-emerald-950/40 border border-[#E1E8E5] dark:border-emerald-800/40 rounded-xl sm:rounded-2xl text-slate-400 dark:text-emerald-400 hover:text-emerald-600 shadow-sm hover:shadow-lg transition-all">
                <Home size={18} />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">System Control</h1>
                <p className="text-[8px] sm:text-[10px] font-black text-slate-400 dark:text-emerald-400/60 uppercase tracking-widest mt-0.5">Maritime Registry & bull; Node US-MAR-01</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <ThemeToggle />
               <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-[#043927] dark:bg-emerald-600 text-white flex items-center justify-center shadow-xl self-end md:self-auto">
                 <UserCircle size={22} className="sm:w-6 sm:h-6" />
               </div>
            </div>
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {view === 'quality' && <QualityLedger />}
            {view === 'escrow' && <EscrowSecurity />}
            {view === 'carbon' && <BlueCarbonImpact />}
            {view === 'intel' && <TradeIntelligence />}
            {view === 'app' && (
              <>
                {role === UserRole.ADMIN && <AdminDashboard batches={batches} orders={orders} setBatches={setBatches} />}
                {role === UserRole.FARMER && <FarmerPortal batches={batches.filter(b => b.farmerId === 'F1')} onNewBatch={(b) => setBatches(prev => [...prev, { ...b, id: Math.random().toString(), farmerId: 'F1' } as any])} />}
                {role === UserRole.BUYER && <BuyerPortal availableBatches={batches.filter(b => b.status === 'APPROVED')} onBuy={(id) => {
                  setBatches(prev => prev.map(b => b.id === id ? { ...b, status: 'SOLD' } : b));
                  setOrders(prev => [...prev, {
                    id: `order-${Math.random().toString(36).substr(2, 9)}`,
                    batchId: id,
                    buyerId: 'CURRENT_BUYER',
                    amount: batches.find(b => b.id === id)?.weight || 0,
                    status: 'PAID',
                    date: new Date().toISOString().split('T')[0]
                  }]);
                }} />}
                {role === UserRole.LOGISTICS && <LogisticsPortal orders={orders.filter(o => o.status === 'PAID')} onUpdateStatus={(id, s) => {
                  setOrders(prev => prev.map(o => o.id === id ? { ...o, status: s } : o));
                }} />}
              </>
            )}
          </div>

          <div className="mt-20 border-t border-slate-100 dark:border-emerald-900/20 pt-10">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between">
               <div className="flex flex-col">
                  <p className="text-[10px] font-black text-slate-400 dark:text-emerald-400/40 uppercase tracking-widest">Active Session Hub</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Primary Exchange Node & bull; GMT Sync</p>
               </div>
               <EnglishTimer variant="minimal" className="bg-white dark:bg-emerald-950/40 border-slate-100 dark:border-emerald-900/40 transition-colors duration-500" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;