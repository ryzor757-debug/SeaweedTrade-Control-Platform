
import React, { useState, useEffect } from 'react';
import { 
  Waves, 
  UserCircle, 
  ShoppingCart, 
  Truck, 
  ShieldCheck,
  Menu,
  X,
  Activity,
  Globe,
  ArrowRight,
  Zap,
  BarChart2,
  LayoutDashboard,
  Search,
  Anchor,
  Droplets,
  Heart,
  Home,
  Facebook,
  Linkedin,
  Instagram,
  ChevronRight,
  Clock,
  BookOpen,
  Lock,
  Leaf,
  LineChart,
  Sparkles
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
import { getMarketOverview } from './geminiService';

const XLogo = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
  </svg>
);

/**
 * SeaweedThemeBackground
 * High-contrast horizontal ribbon watermark for the top-left corner.
 * Vivid Emerald, Deep Forest Green, Burnished Gold, and Electric Cyan.
 * Purely decorative, no text, pointer-events-none.
 */
const SeaweedThemeBackground: React.FC = () => (
  <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
    {/* Top-Left Locked Horizontal Ribbon */}
    <div className="absolute top-0 left-0 w-full max-w-[900px] h-[200px] md:h-[300px] opacity-[0.22]">
      <svg viewBox="0 0 900 250" className="w-full h-full" preserveAspectRatio="xMinYMin meet">
        <defs>
          <linearGradient id="vividWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" /> {/* Rich Emerald */}
            <stop offset="50%" stopColor="#0d9488" /> {/* Saturated Teal */}
            <stop offset="100%" stopColor="#0369a1" /> {/* Deep Sea Blue */}
          </linearGradient>
          <linearGradient id="highContrastGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" /> {/* Bright Metallic Gold */}
            <stop offset="100%" stopColor="#78350f" /> {/* Deep Amber Shadow */}
          </linearGradient>
        </defs>

        {/* Structural Flowing Lines (Enhanced Gradient) */}
        <g stroke="url(#vividWaveGradient)" fill="none" strokeLinecap="round">
          <path d="M-50 40 Q 100 0, 250 80 T 550 40 T 850 100" strokeWidth="3" opacity="0.8" />
          <path d="M-50 60 Q 150 110, 300 30 T 650 120 T 950 40" strokeWidth="4.5" opacity="0.5" />
          <path d="M-50 90 Q 200 160, 400 60 T 750 140 T 1000 80" strokeWidth="2" opacity="0.4" />
        </g>

        {/* Seaweed Fronds (Ultra Deep Forest Green) */}
        <g stroke="#022c22" fill="none" strokeLinecap="round">
          <path d="M40 -10 C 60 40, 20 80, 50 150" strokeWidth="6" opacity="0.85" />
          <path d="M80 -15 C 110 30, 70 90, 100 170" strokeWidth="5" opacity="0.65" />
          <path d="M130 -10 C 150 50, 120 100, 140 180" strokeWidth="4" opacity="0.45" />
          <path d="M200 -20 C 230 40, 190 80, 210 140" strokeWidth="3" opacity="0.25" />
        </g>

        {/* Leaf Accents (Metallic Burnished Gold) */}
        <g fill="url(#highContrastGold)">
          <path d="M45 60 Q 70 50, 85 70 Q 65 85, 45 75 Z" opacity="0.8" />
          <path d="M105 110 Q 130 100, 145 120 Q 125 135, 105 125 Z" opacity="0.6" />
          <path d="M230 75 Q 260 65, 275 85 Q 250 100, 230 90 Z" opacity="0.4" />
          <path d="M400 45 Q 430 35, 445 55 Q 420 70, 400 60 Z" opacity="0.2" />
        </g>

        {/* Electric Cyan Bubble Nodes */}
        <g fill="#06b6d4">
          <circle cx="320" cy="50" r="4.5" opacity="0.6" />
          <circle cx="500" cy="85" r="6" opacity="0.5" />
          <circle cx="620" cy="40" r="3" opacity="0.7" />
          <circle cx="750" cy="110" r="5.5" opacity="0.3" />
        </g>
      </svg>
    </div>
  </div>
);

/**
 * ScrollProgressBar
 * Thin horizontal line to be placed at the top or bottom of a header.
 */
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Fix: Added missing state for batches and orders to resolve "Cannot find name" errors.
  const [batches, setBatches] = useState<HarvestBatch[]>([
    { id: 'batch-001', farmerId: 'F1', species: 'Saccharina latissima', weight: 450, harvestDate: '2024-03-01', status: 'PENDING' },
    { id: 'batch-002', farmerId: 'F2', species: 'Palmaria palmata', weight: 200, harvestDate: '2024-02-28', status: 'APPROVED', qualityGrade: 'A', price: 15 },
    { id: 'batch-003', farmerId: 'F1', species: 'Porphyra umbilicalis', weight: 120, harvestDate: '2024-03-05', status: 'SOLD', qualityGrade: 'AAA', price: 45 },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: 'order-001', batchId: 'batch-003', buyerId: 'BUYER1', amount: 120, status: 'PAID', date: '2024-03-06' },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setScrollY(currentScroll);
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to catch initial position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]); // Recalculate on view changes since page height might change

  // Persistent Theme Rendering
  const renderTheme = () => <SeaweedThemeBackground />;

  if (view === 'vision') return <><VisionPage onBack={() => setView('landing')} />{renderTheme()}</>;
  if (view === 'support') return <><SupportPage onBack={() => setView('landing')} />{renderTheme()}</>;
  if (view === 'about') return <><AboutPage onBack={() => setView('landing')} onJoin={() => setView('app')} onViewVision={() => setView('vision')} />{renderTheme()}</>;
  if (view === 'why-seaweed') return <><WhySeaweedPage onBack={() => setView('landing')} onJoin={() => setView('app')} />{renderTheme()}</>;

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-[#F9FBFB] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden relative">
        <SeaweedThemeBackground />
        <ChatWidget />
        
        <div className="fixed inset-0 pointer-events-none -z-10 opacity-60" 
          style={{ background: 'linear-gradient(to bottom, #F0F4F2 0%, #F9FBFB 30%, #FFFFFF 100%)' }} />
        
        <div className="fixed inset-0 pointer-events-none -z-10 maritime-grid opacity-30" />

        <div className="relative z-20">
          <div className="fixed top-0 w-full z-50">
            <nav className="glass px-4 md:px-12 py-3 border-b border-[#E1E8E5] relative">
              <ScrollProgressBar progress={scrollProgress} position="bottom" />
              <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                <div className="flex items-center group cursor-pointer" onClick={() => setView('landing')}>
                  <Logo size="sm" className="scale-75 md:scale-100 origin-left transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110" />
                </div>
                
                <div className="hidden lg:flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <button onClick={() => setView('about')} className="hover:text-emerald-600 transition-colors">About Us</button>
                  <button onClick={() => setView('why-seaweed')} className="hover:text-emerald-600 transition-colors">Why Seaweed?</button>
                  <button onClick={() => setView('vision')} className="hover:text-emerald-600 transition-colors">Our Vision</button>
                  <button onClick={() => setView('support')} className="hover:text-emerald-600 transition-colors">Contact Support</button>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setView('app')}
                    className="bg-[#043927] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2 md:gap-3 shadow-lg"
                  >
                    Access <span className="hidden sm:inline">Platform</span> <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </nav>
          </div>

          <section className="relative pt-32 sm:pt-40 md:pt-56 pb-16 md:pb-40 px-4 sm:px-6 md:px-12 overflow-hidden">
            <div 
              className="absolute top-0 right-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-emerald-100/20 blur-[100px] sm:blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 -z-0"
              style={{ transform: `translate(25%, -50%) translateY(${scrollY * 0.08}px)` }}
            />
            
            <div className="max-w-[1600px] mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-7 space-y-6 md:space-y-8 animate-in slide-in-from-left duration-1000">
                  <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[8px] md:text-[9px] font-black border border-[#E1E8E5] uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-sm">
                    <Anchor size={12} /> Decentralized Marine Commerce
                  </div>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] md:leading-[1] tracking-tighter">
                    Harmonizing <span className="text-emerald-600">Oceans</span> <br className="hidden sm:block" /> & Global Trade.
                  </h1>
                  <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                    SeaweedTrade is an AI-governed ecosystem for the blue economy. Connectivity, transparency, and regenerative commerce standardized for institutional growth.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-5 pt-4">
                    <button onClick={() => setView('app')} className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#043927] text-white rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest shadow-xl hover:bg-emerald-800 transition-all text-center">
                      Start Harvesting Data
                    </button>
                    <button onClick={() => setView('why-seaweed')} className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white border-2 border-[#E1E8E5] text-slate-900 rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:border-emerald-600 transition-all flex items-center justify-center gap-3">
                      Why Seaweed? <Globe size={18} />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                  <div className="relative z-10 p-3 sm:p-4 bg-white rounded-[40px] sm:rounded-[60px] shadow-2xl overflow-hidden border border-[#E1E8E5]" style={{ transform: `translateY(${scrollY * -0.03}px)` }}>
                    <div className="absolute inset-0 maritime-grid opacity-10 pointer-events-none" />
                    <div className="relative">
                       <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200" alt="Marine Kelp" className="rounded-[30px] sm:rounded-[52px] object-cover h-[300px] sm:h-[400px] md:h-[500px] w-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 bg-slate-900 text-white p-4 sm:p-6 rounded-2xl sm:rounded-[32px] shadow-2xl border-4 sm:border-[6px] border-white max-w-[140px] sm:max-w-[200px]">
                      <p className="text-xl sm:text-2xl font-black text-emerald-400 mb-0.5">98.4%</p>
                      <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-slate-400">Carbon Efficiency</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 md:py-24 bg-white border-y border-[#E1E8E5] px-4 sm:px-6 relative">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: 'Network Nodes', val: '14,209', icon: Globe, color: 'text-emerald-600' },
                { label: 'Annual Trade', val: '$2.8B', icon: Activity, color: 'text-blue-600' },
                { label: 'Carbon Credits', val: '8.4M t', icon: Droplets, color: 'text-teal-600' },
                { label: 'Communities', val: '412', icon: Heart, color: 'text-rose-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#F9FBFB] p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-[#E1E8E5] group hover:border-emerald-600 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] maritime-grid w-full h-full -z-0" />
                  <div className={`${stat.color} mb-4 sm:mb-6 p-2.5 sm:p-3 bg-white border border-[#E1E8E5] rounded-xl sm:rounded-2xl inline-block relative z-10`}>
                    <stat.icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-1.5 relative z-10">{stat.val}</p>
                  <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 relative z-10">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-24 px-6 md:px-12 bg-white">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="bg-[#F8FAFC] p-12 rounded-[48px] border border-slate-100 flex flex-col justify-between group hover:border-emerald-600 transition-all duration-500">
                <div className="space-y-6">
                  <Lock className="text-emerald-600" size={32} />
                  <h3 className="text-2xl font-serif-institutional font-bold text-slate-900">Ready to Secure Your Supply Chain?</h3>
                  <p className="text-sm text-slate-500 font-medium">Join the world's most trusted seaweed trade network for big corporations.</p>
                </div>
                <button onClick={() => setView('app')} className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[9px] tracking-widest flex items-center justify-center gap-3 group-hover:bg-emerald-600 transition-all">
                  Request Enterprise Access <ArrowRight size={14} />
                </button>
              </div>
              
              <div className="bg-[#F0FDF4] p-12 rounded-[48px] border border-emerald-100 flex flex-col justify-between group hover:bg-[#043927] hover:text-white transition-all duration-500">
                <div className="space-y-6">
                  <Waves className="text-emerald-600 group-hover:text-emerald-400" size={32} />
                  <h3 className="text-2xl font-serif-institutional font-bold">Scale Your Harvest to Global Markets.</h3>
                  <p className="text-sm opacity-60 font-medium">Get verified and reach premium international buyers at scale.</p>
                </div>
                <button onClick={() => setView('app')} className="mt-10 px-8 py-4 bg-emerald-600 text-white rounded-xl font-black uppercase text-[9px] tracking-widest flex items-center justify-center gap-3">
                  Start Trading Today <ArrowRight size={14} />
                </button>
              </div>

              <div className="bg-[#FFF7ED] p-12 rounded-[48px] border border-orange-100 flex flex-col justify-between group hover:border-orange-500 transition-all duration-500">
                <div className="space-y-6">
                  <LineChart className="text-orange-500" size={32} />
                  <h3 className="text-2xl font-serif-institutional font-bold text-slate-900">Don’t Trade in the Dark.</h3>
                  <p className="text-sm text-slate-500 font-medium">Receive our quarterly maritime outlook and price trends automatically.</p>
                </div>
                <button onClick={() => setView('intel')} className="mt-10 px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-xl font-black uppercase text-[9px] tracking-widest flex items-center justify-center gap-3 hover:bg-slate-900 hover:text-white transition-all">
                  Access Market Intelligence <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </section>

          <ContactSection />

          {/* Global Synchronicity Timer Section (Institutional Featured Timer) */}
          <section className="py-24 px-4 sm:px-6 md:px-12 bg-[#F9FBFB] relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
              <div className="bg-white rounded-[64px] border border-[#E1E8E5] shadow-sm overflow-hidden relative">
                <div className="absolute inset-0 maritime-grid opacity-10 pointer-events-none" />
                <EnglishTimer variant="featured" className="bg-gradient-to-b from-white to-slate-50" />
              </div>
            </div>
          </section>

          <footer className="bg-[#043927] text-white py-24 px-4 sm:px-6 md:px-12 border-t border-emerald-900 relative overflow-hidden">
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
              <div>
                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Navigation</h4>
                <ul className="space-y-4 text-emerald-100/80 font-bold text-sm">
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('about')}>About SeaweedTrade</li>
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('why-seaweed')}>The Strategic Pitch</li>
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('vision')}>Mission Directive</li>
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('quality')}>Quality Standards</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Support</h4>
                <ul className="space-y-4 text-emerald-100/80 font-bold text-sm">
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('escrow')}>Escrow Security</li>
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('carbon')}>Carbon Assets</li>
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('intel')}>Market Intel</li>
                  <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('support')}>Global Support</li>
                </ul>
              </div>
            </div>
            <div className="max-w-[1600px] mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 text-[10px] font-black uppercase tracking-widest text-emerald-100/30">
              <p>© 2024 SEAWEEDTRADE PROTOCOL. MARITIME ACCREDITED.</p>
              <div className="flex gap-10">
                <span className="hover:text-white cursor-pointer">Privacy</span>
                <span className="hover:text-white cursor-pointer">Compliance</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F9FBFB] text-slate-900 relative">
      <SeaweedThemeBackground />
      <div className="relative z-20 flex w-full">
        <Sidebar role={role} setRole={setRole} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} setView={setView} />
        <main className={`flex-1 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'} p-4 sm:p-6 md:p-10 pb-32 w-full overflow-x-hidden`}>
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-6 md:gap-8 relative">
            <ScrollProgressBar progress={scrollProgress} position="top" />
            <div className="flex items-center gap-4 md:gap-6">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3 bg-white border border-[#E1E8E5] rounded-xl text-slate-400 hover:text-[#043927] shadow-sm">
                <Menu size={18} />
              </button>
              <button onClick={() => setView('landing')} className="p-3 sm:p-4 bg-white border border-[#E1E8E5] rounded-xl sm:rounded-2xl text-slate-400 hover:text-[#043927] shadow-sm hover:shadow-lg transition-all">
                <Home size={18} />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">System Control</h1>
                <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Maritime Registry & bull; Node US-MAR-01</p>
              </div>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-[#043927] text-white flex items-center justify-center shadow-xl self-end md:self-auto">
              <UserCircle size={22} className="sm:w-6 sm:h-6" />
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

          {/* Internal Dashboard Footer Timer */}
          <div className="mt-20 border-t border-slate-100 pt-10">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between">
               <div className="flex flex-col">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Session Hub</p>
                  <p className="text-xs font-bold text-slate-900">Primary Exchange Node &bull; GMT Sync</p>
               </div>
               <EnglishTimer variant="minimal" className="bg-white border-slate-100" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
