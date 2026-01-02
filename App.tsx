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
  LineChart
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
import { getMarketOverview } from './geminiService';

const XLogo = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
  </svg>
);

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app' | 'vision' | 'support' | 'about' | 'why-seaweed' | 'quality' | 'escrow' | 'carbon' | 'intel'>('landing');
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [batches, setBatches] = useState<HarvestBatch[]>([
    { id: '1', farmerId: 'F1', species: 'Nori', weight: 500, harvestDate: '2024-03-10', status: 'APPROVED', price: 15.5, qualityGrade: 'A' },
    { id: '2', farmerId: 'F2', species: 'Kelp', weight: 1200, harvestDate: '2024-03-12', status: 'PENDING' },
    { id: '3', farmerId: 'F3', species: 'Sargassum', weight: 800, harvestDate: '2024-03-14', status: 'APPROVED', price: 10.2, qualityGrade: 'B+' },
    { id: '4', farmerId: 'F4', species: 'Irish Moss', weight: 300, harvestDate: '2024-03-15', status: 'APPROVED', price: 22.0, qualityGrade: 'A+' },
    { id: '5', farmerId: 'F5', species: 'Wakame', weight: 650, harvestDate: '2024-03-16', status: 'APPROVED', price: 18.4, qualityGrade: 'A' },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: 'O1', batchId: '1', buyerId: 'B1', amount: 500, status: 'PAID', date: '2024-03-15' },
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (view === 'vision') return <VisionPage onBack={() => setView('landing')} />;
  if (view === 'support') return <SupportPage onBack={() => setView('landing')} />;
  if (view === 'about') return <AboutPage onBack={() => setView('landing')} onJoin={() => setView('app')} onViewVision={() => setView('vision')} />;
  if (view === 'why-seaweed') return <WhySeaweedPage onBack={() => setView('landing')} onJoin={() => setView('app')} />;

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-[#F9FBFB] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
        <ChatWidget />
        
        <div className="fixed inset-0 pointer-events-none -z-10 opacity-60" 
          style={{ background: 'linear-gradient(to bottom, #F0F4F2 0%, #F9FBFB 30%, #FFFFFF 100%)' }} />
        
        <div className="fixed inset-0 pointer-events-none -z-10 maritime-grid opacity-30" />

        <div className="fixed top-0 w-full z-50">
          <nav className="glass px-4 md:px-12 py-3 border-b border-[#E1E8E5]">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
              <div className="flex items-center group cursor-pointer" onClick={() => setView('landing')}>
                <Logo size="sm" className="scale-75 md:scale-100 origin-left transition-transform duration-300 group-hover:scale-105" />
              </div>
              
              <div className="hidden lg:flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                <button onClick={() => setView('about')} className="hover:text-emerald-600 transition-colors">About Us</button>
                <button onClick={() => setView('why-seaweed')} className="hover:text-emerald-600 transition-colors">Why Seaweed?</button>
                <button onClick={() => setView('vision')} className="hover:text-emerald-600 transition-colors">Our Vision</button>
                <button onClick={() => setView('support')} className="hover:text-emerald-600 transition-colors">Contact Support</button>
              </div>

              <button 
                onClick={() => setView('app')}
                className="bg-[#043927] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2 md:gap-3 shadow-lg"
              >
                Access <span className="hidden sm:inline">Platform</span> <ArrowRight size={14} />
              </button>
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
                   <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200" alt="Marine Kelp" className="rounded-[30px] sm:rounded-[52px] object-cover h-[300px] sm:h-[400px] md:h-[500px] w-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
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

        {/* Dynamic CTA Board before Footer */}
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
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F9FBFB] text-slate-900">
      <Sidebar role={role} setRole={setRole} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} setView={setView} />
      <main className={`flex-1 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'} p-4 sm:p-6 md:p-10 pb-32 w-full overflow-x-hidden`}>
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-6 md:gap-8">
           <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3 bg-white border border-[#E1E8E5] rounded-xl text-slate-400 hover:text-[#043927] shadow-sm">
              <Menu size={18} />
            </button>
            <button onClick={() => setView('landing')} className="p-3 sm:p-4 bg-white border border-[#E1E8E5] rounded-xl sm:rounded-2xl text-slate-400 hover:text-[#043927] shadow-sm hover:shadow-lg transition-all">
              <Home size={18} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">System Control</h1>
              <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Maritime Registry &bull; Node US-MAR-01</p>
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
              {role === UserRole.BUYER && <BuyerPortal availableBatches={batches.filter(b => b.status === 'APPROVED')} onBuy={(id) => {}} />}
              {role === UserRole.LOGISTICS && <LogisticsPortal orders={orders.filter(o => o.status === 'PAID')} onUpdateStatus={(id, s) => {}} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;