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
  Home
} from 'lucide-react';
import { UserRole, HarvestBatch, Order } from './types';
import FarmerPortal from './components/FarmerPortal';
import BuyerPortal from './components/BuyerPortal';
import LogisticsPortal from './components/LogisticsPortal';
import AdminDashboard from './components/AdminDashboard';
import Sidebar from './components/Sidebar';
import Logo from './components/Logo';
import { getMarketOverview } from './geminiService';

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
        <nav className="fixed top-0 w-full z-50 glass px-4 md:px-6 lg:px-12 py-4 lg:py-6 border-b border-slate-100">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => setView('landing')}>
              <Logo className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110" />
              <div className="flex flex-col -space-y-1">
                <span className="text-lg md:text-xl lg:text-2xl font-black tracking-tighter text-slate-900 uppercase">SeaweedTrade</span>
                <span className="text-[8px] md:text-[10px] font-bold text-emerald-600 tracking-widest uppercase">Global Ledger</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <a href="#vision" className="hover:text-emerald-600 transition-colors">Our Vision</a>
              <a href="#stats" className="hover:text-emerald-600 transition-colors">Ecosystem Stats</a>
              <a href="#network" className="hover:text-emerald-600 transition-colors">Global Network</a>
            </div>

            <button 
              onClick={() => setView('app')}
              className="bg-slate-900 text-white px-5 md:px-8 py-2.5 md:py-4 rounded-xl md:rounded-[20px] font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-200 transition-all flex items-center gap-2 md:gap-3 shadow-lg"
            >
              Access <span className="hidden sm:inline">Platform</span> <ArrowRight size={14} />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 lg:px-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 md:w-[800px] h-64 md:h-[800px] bg-emerald-100/30 blur-[60px] md:blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 -z-10"></div>
          
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-8 md:space-y-12 animate-in slide-in-from-left duration-1000">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-emerald-50 text-emerald-700 text-[8px] md:text-[10px] font-black border border-emerald-100 uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-sm">
                  <Anchor size={12} className="md:w-3.5 md:h-3.5" /> Decentralized Marine Commerce
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-[110px] font-black text-slate-900 leading-[1.1] lg:leading-[0.9] tracking-tighter">
                  Harmonizing <span className="text-emerald-600">Oceans</span> & Global Trade.
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                  SeaweedTrade is the world's first AI-governed ecosystem for the blue economy. We connect regenerative harvesters to global industry with absolute transparency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4">
                  <button 
                    onClick={() => setView('app')}
                    className="group relative px-8 md:px-12 py-5 md:py-7 bg-emerald-600 text-white rounded-2xl md:rounded-[32px] font-black uppercase text-[10px] md:text-[11px] tracking-widest shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] hover:bg-emerald-700 transition-all text-center"
                  >
                    Start Harvesting Data
                  </button>
                  <button className="px-8 md:px-12 py-5 md:py-7 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl md:rounded-[32px] font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:border-emerald-600 transition-all flex items-center justify-center gap-3 group">
                    View Network <Globe size={18} className="group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5 relative animate-in zoom-in duration-1000 mt-12 lg:mt-0">
                <div className="relative z-10 p-2 md:p-4 bg-white rounded-[40px] md:rounded-[80px] shadow-2xl transition-transform duration-700">
                   <img 
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200" 
                    alt="Marine Kelp Forest" 
                    className="rounded-[30px] md:rounded-[64px] object-cover h-[350px] md:h-[550px] w-full"
                  />
                  <div className="absolute -bottom-6 md:-bottom-10 -left-6 md:-left-10 bg-slate-900 text-white p-6 md:p-10 rounded-3xl md:rounded-[48px] shadow-2xl border-4 md:border-[8px] border-white max-w-[180px] md:max-w-[280px]">
                    <p className="text-2xl md:text-4xl font-black text-emerald-400 mb-1">98.4%</p>
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Carbon Efficiency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-16 md:py-24 bg-slate-50 border-y border-slate-100 px-4 md:px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: 'Network Nodes', val: '14,209', icon: Globe, color: 'text-emerald-600' },
                { label: 'Annual Trade', val: '$2.8B', icon: Activity, color: 'text-blue-600' },
                { label: 'Carbon Credits', val: '8.4M t', icon: Droplets, color: 'text-teal-600' },
                { label: 'Communities', val: '412', icon: Heart, color: 'text-rose-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[48px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                  <div className={`${stat.color} mb-6 p-4 bg-slate-50 rounded-2xl md:rounded-3xl inline-block`}>
                    <stat.icon size={28} />
                  </div>
                  <p className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">{stat.val}</p>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="py-20 md:py-32 px-4 md:px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 md:mb-8">The Triple Bottom Line</h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">We don't just facilitate trade; we regenerate ecosystems, empower coastal families, and secure global supply chains.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { title: 'Environment', desc: 'Active ocean reforestation through sustainable seaweed farming practices verified by satellite telemetry.', icon: Droplets, color: 'bg-blue-50 text-blue-600' },
                { title: 'Social Impact', desc: 'Direct liquidity for coastal harvesters, removing predatory middlemen and ensuring fair wage protocols.', icon: Heart, color: 'bg-rose-50 text-rose-600' },
                { title: 'Economic Integrity', desc: 'Fractionalized trade ownership and AI-driven quality validation for pharmaceutical and food grade markets.', icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-600' },
              ].map((item, i) => (
                <div key={i} className="relative p-8 md:p-12 bg-white rounded-[40px] md:rounded-[64px] border border-slate-100 hover:border-emerald-200 transition-all group">
                  <div className={`h-16 w-16 md:h-20 md:w-20 ${item.color} rounded-2xl md:rounded-[28px] flex items-center justify-center mb-8 md:mb-10 transition-transform`}>
                    <item.icon size={32} className="md:w-10 md:h-10" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 md:mb-6">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-white py-20 md:py-32 px-4 md:px-6 lg:px-12 border-t border-slate-100">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
            <div className="sm:col-span-2 space-y-6 md:space-y-8">
              <div className="flex items-center gap-3">
                <Logo className="w-10 h-10 md:w-12 md:h-12" />
                <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">SeaweedTrade</span>
              </div>
              <p className="text-slate-400 font-medium max-w-sm text-sm">
                Redefining global marine trade through decentralized ledger technology and neural quality validation.
              </p>
              <div className="flex gap-4">
                {[Globe, Activity, ShieldCheck].map((I, i) => (
                  <div key={i} className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer border border-slate-100 shadow-sm">
                    <I size={18} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6 md:mb-8">Ecosystem</h4>
              <ul className="space-y-3 md:space-y-4 text-slate-500 font-bold text-xs md:text-sm">
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Farmer Portals</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Buyer Markets</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Logistics Mesh</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Admin Console</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6 md:mb-8">Resources</h4>
              <ul className="space-y-3 md:space-y-4 text-slate-500 font-bold text-xs md:text-sm">
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">API Documentation</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Carbon Protocol</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Global Impact</li>
                <li className="hover:text-emerald-600 cursor-pointer transition-colors">Legal Framework</li>
              </ul>
            </div>
          </div>
          <div className="max-w-[1600px] mx-auto mt-20 md:mt-32 pt-10 md:pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">© 2024 SEAWEEDTRADE PROTOCOL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 md:gap-10 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
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
      <main className={`flex-1 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'} p-4 sm:p-6 md:p-8 lg:p-12 pb-32 w-full overflow-x-hidden`}>
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-16 gap-6 md:gap-8">
          <div className="flex items-center gap-4 md:gap-6">
            <button 
               onClick={toggleSidebar}
               className="lg:hidden p-3 bg-white shadow-sm border border-slate-100 rounded-xl text-slate-600 hover:text-emerald-600"
            >
              <Menu size={20} />
            </button>
            <button 
               onClick={() => setView('landing')}
               className="p-4 md:p-5 bg-white shadow-sm hover:shadow-lg border border-slate-100 rounded-2xl md:rounded-[24px] text-slate-400 hover:text-emerald-600 transition-all group"
               title="Back to Home Page"
            >
              <Home size={18} className="md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
            </button>
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8 md:w-10 md:h-10 hidden sm:block" />
              <div>
                <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2 md:gap-3">
                  <span className="text-emerald-600">Marine</span> Ledger
                </h1>
                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.4em] mt-1 md:mt-2">
                  Node ID: US-WEST-MAR-01 &bull; {role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden lg:flex items-center gap-4 px-6 py-3 bg-white rounded-[24px] border border-slate-100 shadow-sm">
              <Search size={18} className="text-slate-300" />
              <input type="text" placeholder="Search Ledger..." className="bg-transparent text-xs font-bold outline-none w-32 xl:w-48" />
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-[18px] md:rounded-[28px] bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xl shadow-emerald-200 cursor-pointer hover:scale-105 transition-transform">
                <UserCircle size={28} className="md:w-8 md:h-8" />
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
        <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto">
           <div className="glass px-4 sm:px-8 py-4 sm:py-5 rounded-[28px] sm:rounded-[40px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white/40 flex items-center justify-between sm:justify-start gap-4 sm:gap-10">
              <button 
                onClick={() => setView('landing')}
                className="flex flex-col items-center gap-1 transition-all duration-300 text-slate-400 hover:text-emerald-600"
              >
                <Home size={18} className="sm:w-5 sm:h-5" />
                <span className="text-[8px] font-black uppercase tracking-widest hidden sm:inline">Home</span>
              </button>
              <div className="hidden sm:block w-px h-8 bg-slate-200/50"></div>
              {[
                { r: UserRole.ADMIN, i: LayoutDashboard, l: 'Admin' },
                { r: UserRole.FARMER, i: Waves, l: 'Farmer' },
                { r: UserRole.BUYER, i: ShoppingCart, l: 'Buyer' },
                { r: UserRole.LOGISTICS, i: Truck, l: 'Logistics' },
              ].map((btn) => (
                <button 
                  key={btn.r}
                  onClick={() => setRole(btn.r)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${role === btn.r ? 'text-emerald-600 scale-110 sm:scale-110' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <btn.i size={18} className="sm:w-5 sm:h-5" strokeWidth={role === btn.r ? 3 : 2} />
                  <span className="text-[8px] font-black uppercase tracking-widest hidden sm:inline">{btn.l}</span>
                </button>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;