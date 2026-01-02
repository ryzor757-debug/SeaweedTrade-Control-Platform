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
  Instagram
} from 'lucide-react';
import { UserRole } from '../types';
import Logo from './Logo';

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
  setView: (view: 'landing' | 'app') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, setRole, isOpen, onClose, setView }) => {
  const navItems = [
    { id: UserRole.ADMIN, label: 'Control Center', Icon: LayoutDashboard },
    { id: UserRole.FARMER, label: 'Farmer Portal', Icon: Waves },
    { id: UserRole.BUYER, label: 'Buyer & Org', Icon: ShoppingCart },
    { id: UserRole.LOGISTICS, label: 'Logistics', Icon: Truck },
  ];

  return (
    <>
      {/* Mobile Overlay/Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside 
        className={`fixed top-0 left-0 h-full bg-[#022c22] text-slate-300 w-64 transform transition-transform duration-500 ease-in-out z-50 flex flex-col border-r border-white/5 shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-8 pb-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3 text-white cursor-pointer group" onClick={() => { setView('landing'); onClose(); }}>
              <Logo className="w-8 h-8 md:w-10 md:h-10" />
              <span className="font-extrabold text-xl tracking-tighter uppercase">SeaweedTrade</span>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-3">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 pl-2">Navigation</p>
            
            <button
              onClick={() => {
                setView('landing');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-slate-400 hover:text-slate-200 hover:bg-white/5 group"
            >
              <Home size={18} className="text-slate-500 group-hover:text-emerald-400" />
              <span className="font-bold text-sm">Return Home</span>
            </button>

            <div className="pt-6">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 pl-2">Operations</p>
               <div className="space-y-1.5">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setRole(item.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group
                      ${role === item.id 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                        : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${role === item.id ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'}`}>
                          <item.Icon size={18} />
                        </span>
                        <span className="font-bold text-sm">{item.label}</span>
                      </div>
                      {role === item.id && <ChevronRight size={14} />}
                    </button>
                  ))}
               </div>
            </div>
          </nav>
        </div>

        <div className="p-8 pt-0 space-y-6">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <ShieldCheck size={14} />
              <span className="text-[8px] font-black uppercase tracking-wider">Protocol Security</span>
            </div>
            <div className="flex gap-2">
              {/* Fix: Wrap icon components in objects to fix JSX type inference issues in the map function */}
              {[
                { Icon: Linkedin },
                { Icon: XLogo },
                { Icon: Instagram }
              ].map((social, i) => (
                <a key={i} href="#" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-emerald-600/20 flex items-center justify-center text-slate-500 hover:text-emerald-400 border border-white/5 transition-all">
                  <social.Icon size={14} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white transition-all cursor-pointer rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5">
            <LogOut size={18} />
            <span className="font-bold text-sm">Sign Out</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;