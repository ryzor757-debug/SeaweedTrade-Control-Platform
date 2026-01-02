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
  Instagram
} from 'lucide-react';
import { UserRole, HarvestBatch, Order } from './types';
import FarmerPortal from './components/FarmerPortal';
import BuyerPortal from './components/BuyerPortal';
import LogisticsPortal from './components/LogisticsPortal';
import AdminDashboard from './components/AdminDashboard';
import Sidebar from './components/Sidebar';
import Logo from './components/Logo';
import { getMarketOverview } from './geminiService';

// Custom X (Twitter) Logo for a more premium, accurate brand representation
const XLogo = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
  </svg>
);

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed for mobile/tablet
  const [marketInsight, setMarketInsight] = useState("");
  
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

  // Handle sidebar default state based on screen size
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

  useEffect(() => {
    getMarketOverview().then(insight => setMarketInsight(String(insight || "")));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
        {/* Universal Navigation Bar */}
        <nav className="fixed top-0 w-full z-50 glass px-4 md:px-6 lg:px-12 py-3 lg:py-2 border-b border-slate-100">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <div className="flex items-center group cursor-pointer" onClick={() => setView('landing')}>
              <Logo size="sm" className="transition-transform duration-300 group-hover:scale-105" />
            </div>
            
            <div className="hidden lg:flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
              <a href="#vision" className="hover:text-emerald-600 transition-colors">Our Vision</a>
              <a href="#stats" className="hover:text-emerald-600 transition-colors">Ecosystem Stats</a>
              <a href="#network" className="hover:text-emerald-600 transition-colors">Global Network</a>
            </div>

            <button 
              onClick={() => setView('app')}
              className="bg-slate-900 text-white px-5 md:px-7 py-2 md:py-3.5 rounded-xl md:rounded-[18px] font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-200 transition-all flex items-center gap-2 md:gap-3 shadow-lg"
            >
              Access <span className="hidden sm:inline">Platform</span> <ArrowRight size={14} />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 md:pt-44 pb-16 md:pb-28 px-4 md:px-6 lg:px-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 md:w-[800px] h-64 md:h-[800px] bg-emerald-100/30 blur-[60px] md:blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 -z-10"></div>
          
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6 md:space-y-8 animate-in slide-in-from-left duration-1000">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[8px] md:text-[9px] font-black border border-emerald-100 uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-sm">
                  <Anchor size={12} className="md:w-3 md:h-3" /> Decentralized Marine Commerce
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.15] tracking-tighter">
                  Harmonizing <span className="text-emerald-600">Oceans</span> <br className="hidden md:block"/> & Global Trade.
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                  SeaweedTrade is the world's first AI-governed ecosystem for the blue economy. We connect regenerative harvesters to global industry with absolute transparency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-5 pt-4">
                  <button 
                    onClick={() => setView('app')}
                    className="group relative px-6 md:px-8 py-3.5 md:py-4.5 bg-emerald-600 text-white rounded-xl md:rounded-[20px] font-black uppercase text-[10px] md:text-[11px] tracking-widest shadow-lg hover:bg-emerald-700 transition-all text-center"
                  >
                    Start Harvesting Data
                  </button>
                  <button className="px-6 md:px-8 py-3.5 md:py-4.5 bg-white border-2 border-slate-100 text-slate-900 rounded-xl md:rounded-[20px] font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:border-emerald-600 transition-all flex items-center justify-center gap-3 group">
                    View Network <Globe size={18} className="group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5 relative animate-in zoom-in duration-1000 mt-12 lg:mt-0">
                <div className="relative z-10 p-2 md:p-3 bg-white rounded-[40px] md:rounded-[60px] shadow-2xl transition-transform duration-700">
                   <img 
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200" 
                    alt="Marine Kelp Forest" 
                    className="rounded-[30px] md:rounded-[52px] object-cover h-[300px] md:h-[400px] w-full"
                  />
                  <div className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 bg-slate-900 text-white p-4 md:p-6 rounded-2xl md:rounded-[32px] shadow-2xl border-4 md:border-[6px] border-white max-w-[140px] md:max-w-[200px]">
                    <p className="text-lg md:text-2xl font-black text-emerald-400 mb-0.5">98.4%</p>
                    <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-400">Carbon Efficiency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-12 md:py-16 bg-slate-50 border-y border-slate-100 px-4 md:px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: 'Network Nodes', val: '14,209', icon: Globe, color: 'text-emerald-600' },
                { label: 'Annual Trade', val: '$2.8B', icon: Activity, color: 'text-blue-600' },
                { label: 'Carbon Credits', val: '8.4M t', icon: Droplets, color: 'text-teal-600' },
                { label: 'Communities', val: '412', icon: Heart, color: 'text-rose-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                  <div className={`${stat.color} mb-4 p-2.5 bg-slate-50 rounded-xl md:rounded-2xl inline-block`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter mb-1.5">{stat.val}</p>
                  <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="py-16 md:py-20 px-4 md:px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4 md:mb-5">The Triple Bottom Line</h2>
              <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">We don't just facilitate trade; we regenerate ecosystems, empower coastal families, and secure global supply chains.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {[
                { title: 'Environment', desc: 'Active ocean reforestation through sustainable seaweed farming practices verified by satellite telemetry.', icon: Droplets, color: 'bg-blue-50 text-blue-600' },
                { title: 'Social Impact', desc: 'Direct liquidity for coastal harvesters, removing predatory middlemen and ensuring fair wage protocols.', icon: Heart, color: 'bg-rose-50 text-rose-600' },
                { title: 'Economic Integrity', desc: 'Fractionalized trade ownership and AI-driven quality validation for pharmaceutical and food grade markets.', icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-600' },
              ].map((item, i) => (
                <div key={i} className="relative p-7 md:p-8 bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 hover:border-emerald-200 transition-all group">
                  <div className={`h-12 w-12 md:h-14 md:w-14 ${item.color} rounded-xl md:rounded-[20px] flex items-center justify-center mb-6 md:mb-7 transition-transform`}>
                    <item.icon size={24} className="md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-base md:text-lg font-black text-slate-900 mb-3 md:mb-4">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-xs md:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-white py-16 md:py-20 px-4 md:px-6 lg:px-12 border-t border-slate-100">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            <div className="sm:col-span-2 space-y-6">
              <Logo size="sm" className="!justify-start" />
              <p className="text-slate-400 font-medium max-w-sm text-xs md:text-sm leading-relaxed">
                Redefining global marine trade through decentralized ledger technology and neural quality validation.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Linkedin, color: 'hover:bg-[#0077b5]', label: 'LinkedIn' },
                  { Icon: XLogo, color: 'hover:bg-[#000000]', label: 'X' },
                  { Icon: Instagram, color: 'hover:bg-[#E1306C]', label: 'Instagram' },
                  { Icon: Facebook, color: 'hover:bg-[#1877F2]', label: 'Facebook' },
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    aria-label={social.label}
                    className={`h-9 w-9 rounded-[12px] bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 ${social.color}`}
                  >
                    <social.Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-900 mb-5 md:mb-6">Ecosystem</h4>
              <ul className="space-y-2 md:space-y-3 text-slate-500 font-bold text-[11px] md:text-xs">
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Farmer Portals</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Buyer Markets</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Logistics Mesh</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Admin Console</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-900 mb-5 md:mb-6">Resources</h4>
              <ul className="space-y-2 md:space-y-3 text-slate-500 font-bold text-[11px] md:text-xs">
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">API Documentation</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Carbon Protocol</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Global Impact</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Legal Framework</li>
              </ul>
            </div>
          </div>
          <div className="max-w-[1600px] mx-auto mt-16 md:mt-20 pt-8 md:pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">© 2024 SEAWEEDTRADE PROTOCOL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 md:gap-10 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">
              <span className="hover:text-slate-900 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-900 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fcfdfe] text-slate-900">
      <Sidebar 
        role={role} 
        setRole={setRole} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        setView={setView}
      />

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'} p-4 sm:p-6 md:p-8 lg:p-10 pb-32 w-full overflow-x-hidden`}>
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-6 md:gap-8">
          <div className="flex items-center gap-4 md:gap-6">
            <button 
               onClick={toggleSidebar}
               className="lg:hidden p-3 bg-white shadow-sm border border-slate-100 rounded-xl text-slate-600 hover:text-emerald-600"
            >
              <Menu size={18} />
            </button>
            <button 
               onClick={() => setView('landing')}
               className="p-3 md:p-3.5 bg-white shadow-sm hover:shadow-lg border border-slate-100 rounded-xl md:rounded-[18px] text-slate-400 hover:text-emerald-600 transition-all group"
               title="Back to Home Page"
            >
              <Home size={16} className="md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
            </button>
            <div className="flex items-center gap-3">
              <Logo size="sm" className="hidden sm:flex" />
              <div className="h-8 w-px bg-slate-100 mx-2 hidden sm:block"></div>
              <div>
                <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span className="text-emerald-600">Marine</span> Ledger
                </h1>
                <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">
                  Node ID: US-WEST-MAR-01 & bull; {role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
              <Search size={14} className="text-slate-300" />
              <input type="text" placeholder="Search Ledger..." className="bg-transparent text-[10px] font-bold outline-none w-24 xl:w-36" />
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-9 w-9 md:h-11 md:w-11 rounded-xl md:rounded-[16px] bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xl shadow-emerald-200 cursor-pointer hover:scale-105 transition-transform">
                <UserCircle size={22} className="md:w-5 md:h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-full overflow-x-hidden">
          {role === UserRole.ADMIN && (
            <AdminDashboard 
              batches={batches} 
              orders={orders} 
              setBatches={setBatches} 
            />
          )}
          {role === UserRole.FARMER && (
            <FarmerPortal 
              batches={batches.filter(b => b.farmerId === 'F1')} 
              onNewBatch={(b) => setBatches(prev => [...prev, { ...b, id: Math.random().toString(), farmerId: 'F1' } as any])}
            />
          )}
          {role === UserRole.BUYER && (
            <BuyerPortal 
              availableBatches={batches.filter(b => b.status === 'APPROVED')} 
              onBuy={(batchId) => {
                const newOrder: Order = {
                  id: `O${Date.now()}`,
                  batchId,
                  buyerId: 'B1',
                  amount: batches.find(b => b.id === batchId)?.weight || 0,
                  status: 'PENDING',
                  date: new Date().toISOString()
                };
                setOrders(prev => [...prev, newOrder]);
              }}
            />
          )}
          {role === UserRole.LOGISTICS && (
            <LogisticsPortal 
              orders={orders.filter(o => o.status === 'PAID')} 
              onUpdateStatus={(orderId, status) => {
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
              }}
            />
          )}
        </div>

        {/* Responsive Command Bar */}
        <div className="fixed bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto">
           <div className="glass px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl sm:rounded-[28px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] border border-white/40 flex items-center justify-between sm:justify-start gap-4 sm:gap-6">
              <button 
                onClick={() => setView('landing')}
                className="flex flex-col items-center gap-1 transition-all duration-300 text-slate-400 hover:text-emerald-600"
              >
                <Home size={16} className="sm:w-4 sm:h-4" />
                <span className="text-[7px] font-black uppercase tracking-widest hidden sm:inline">Home</span>
              </button>
              <div className="hidden sm:block w-px h-5 bg-slate-200/50"></div>
              {[
                { r: UserRole.ADMIN, i: LayoutDashboard, l: 'Admin' },
                { r: UserRole.FARMER, i: Waves, l: 'Farmer' },
                { r: UserRole.BUYER, i: ShoppingCart, l: 'Buyer' },
                { r: UserRole.LOGISTICS, i: Truck, l: 'Logistics' },
              ].map((btn) => (
                <button 
                  key={btn.r}
                  onClick={() => setRole(btn.r)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${role === btn.r ? 'text-emerald-600 scale-105 sm:scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <btn.i size={16} className="sm:w-4 sm:h-4" strokeWidth={role === btn.r ? 3 : 2} />
                  <span className="text-[7px] font-black uppercase tracking-widest hidden sm:inline">{btn.l}</span>
                </button>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;