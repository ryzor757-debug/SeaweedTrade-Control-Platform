import React from 'react';
import { 
  LayoutDashboard, 
  Waves, 
  ShoppingCart, 
  Truck, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
  Home,
  X,
  Linkedin,
  Instagram,
  LifeBuoy,
  Info,
  TrendingUp,
  BookOpen,
  Lock,
  Leaf,
  LineChart
} from 'lucide-react';
import { UserRole } from '../types.ts';
import Logo from './Logo.tsx';

// Custom X (Twitter) Logo for brand accuracy
const XLogo = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
  </svg>
);

interface SidebarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isOpen: boolean;
  onClose: () => void;
  setView: (view: 'landing' | 'app' | 'vision' | 'support' | 'about' | 'why-seaweed' | 'quality' | 'escrow' | 'carbon' | 'intel') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, setRole, isOpen, onClose, setView }) => {
  const navItems = [
    { id: UserRole.ADMIN, label: 'Control Center', Icon: LayoutDashboard },
    { id: UserRole.FARMER, label: 'Farmer Portal', Icon: Waves },
    { id: UserRole.BUYER, label: 'Buyer & Org', Icon: ShoppingCart },
    { id: UserRole.LOGISTICS, label: 'Logistics', Icon: Truck },
  ];

  const intelItems = [
    { id: 'quality', label: 'Quality Ledger', Icon: BookOpen },
    { id: 'escrow', label: 'Financial Security', Icon: Lock },
    { id: 'carbon', label: 'Carbon Impact', Icon: Leaf },
    { id: 'intel', label: 'Trade Intelligence', Icon: LineChart },
  ];

  return (
    <>
      {/* Mobile Overlay/Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside 
        className={`fixed top-0 left-0 h-full bg-[#fcfdfe] text-slate-700 w-64 transform transition-transform duration-500 ease-in-out z-50 flex flex-col border-r border-slate-100 shadow-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-8 pb-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="cursor-pointer group px-1" onClick={() => { setView('landing'); onClose(); }}>
              <Logo size="sm" className="transition-transform group-hover:scale-105" />
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-900 transition-colors">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 pl-2">Navigation</p>
            
            <button
              onClick={() => { setView('landing'); onClose(); }}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 text-slate-500 hover:text-slate-900 hover:bg-slate-50 group"
            >
              <Home size={16} className="text-slate-400 group-hover:text-emerald-600" />
              <span className="font-bold text-[11px]">Return Home</span>
            </button>

            <div className="pt-6">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 pl-2">Operations</p>
               <div className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setView('app');
                        setRole(item.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 group
                      ${role === item.id 
                        ? 'bg-emerald-600 text-white shadow-lg' 
                        : 'hover:bg-slate-50 text-slate-500 hover:text-slate-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${role === item.id ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'}`}>
                          <item.Icon size={16} />
                        </span>
                        <span className="font-bold text-[11px]">{item.label}</span>
                      </div>
                    </button>
                  ))}
               </div>
            </div>

            <div className="pt-6">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 pl-2">Trust & Intelligence</p>
               <div className="space-y-1">
                  {intelItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setView(item.id as any);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-slate-500 hover:text-slate-900 hover:bg-slate-50 group"
                    >
                      <item.Icon size={16} className="text-slate-400 group-hover:text-emerald-600" />
                      <span className="font-bold text-[11px]">{item.label}</span>
                    </button>
                  ))}
               </div>
            </div>
          </nav>
        </div>

        <div className="p-8 pt-0 space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative overflow-hidden group">
            <div className="flex items-center gap-2 text-emerald-600 mb-3">
              <ShieldCheck size={12} />
              <span className="text-[8px] font-black uppercase tracking-wider">Protocol Security</span>
            </div>
            <div className="flex gap-2">
              {[Linkedin, XLogo, Instagram].map((Social, i) => (
                <a key={i} href="#" className="h-8 w-8 rounded-lg bg-white hover:bg-emerald-600 hover:text-white flex items-center justify-center text-slate-400 border border-slate-100 transition-all shadow-sm">
                  <Social size={12} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-600 transition-all cursor-pointer rounded-xl hover:bg-rose-50 border border-transparent">
            <LogOut size={16} />
            <span className="font-bold text-xs">Sign Out</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;