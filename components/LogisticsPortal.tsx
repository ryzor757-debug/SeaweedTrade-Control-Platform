
import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Package, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  History,
  Archive,
  FileText
} from 'lucide-react';
import { Order } from '../types';

interface LogisticsPortalProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: any) => void;
}

const LogisticsPortal: React.FC<LogisticsPortalProps> = ({ orders, onUpdateStatus }) => {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  // Mock historical data for demonstration
  const historicalOrders = [
    { id: 'O-HIST-001', waybill: 'WB-7721-09', date: '2024-02-12', destination: 'Oslo Biotech Unit', amount: 1200, confirmation: 'Digital Sig: A. Jensen' },
    { id: 'O-HIST-002', waybill: 'WB-8812-44', date: '2024-02-15', destination: 'Tokyo Health Corp', amount: 850, confirmation: 'Digital Sig: S. Tanaka' },
    { id: 'O-HIST-003', waybill: 'WB-9901-12', date: '2024-02-18', destination: 'SF Bio-Lab 7', amount: 450, confirmation: 'Digital Sig: M. Chen' },
  ];

  const activeOrders = orders.filter(o => o.status !== 'DELIVERED');

  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Logistics Feed & History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Transport Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Navigation className="text-blue-500" size={24} />
                Transport Pipeline
              </h2>
              <div className="px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                {activeOrders.length} Active Nodes
              </div>
            </div>

            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <Package size={22} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">Order #{order.id}</h4>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Consignment ID: USW-{order.id.slice(-4)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-5 bg-slate-50 rounded-[24px]">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Origin Point</span>
                      <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <MapPin size={14} className="text-emerald-500" /> Marine Hub 01
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Destination</span>
                      <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Navigation size={14} className="text-blue-500" /> Global Processing
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Net Payload</span>
                      <span className="text-sm font-black text-slate-900">{order.amount} <span className="text-[10px] font-medium text-slate-400">kg</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-stretch md:items-end gap-3 min-w-[180px]">
                  <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-center
                    ${order.status === 'PAID' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                    Status: {order.status}
                  </span>
                  <button 
                    onClick={() => onUpdateStatus(order.id, 'SHIPPED')}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                  >
                    Confirm Dispatch <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}

            {activeOrders.length === 0 && (
              <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100">
                 <Truck size={48} className="mx-auto text-slate-100 mb-4" />
                 <p className="text-slate-300 font-black uppercase tracking-[0.2em] text-sm">No active shipments in pipeline</p>
              </div>
            )}
          </section>

          {/* Collapsible History Section */}
          <section className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <button 
              onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
              className="w-full px-8 py-8 flex items-center justify-between hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 rounded-2xl text-slate-500 group-hover:text-emerald-600 transition-colors">
                  <Archive size={22} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Delivery Archives</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Historical Waybills & Logs</p>
                </div>
              </div>
              <div className={`p-2 rounded-full border border-slate-100 transition-transform duration-500 ${isHistoryExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="text-slate-400" />
              </div>
            </button>

            <div className={`transition-all duration-700 ease-in-out ${isHistoryExpanded ? 'max-h-[1000px] opacity-100 border-t border-slate-50' : 'max-h-0 opacity-0'}`}>
              <div className="p-8 space-y-4">
                {historicalOrders.map((hist) => (
                  <div key={hist.id} className="p-6 bg-slate-50/50 border border-slate-100 rounded-3xl group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{hist.waybill}</p>
                          <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                            <History size={10} /> Delivered {hist.date}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 flex-1 max-w-md">
                        <div className="bg-white/50 px-4 py-2 rounded-xl">
                          <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Route End</p>
                          <p className="text-xs font-bold text-slate-700 truncate">{hist.destination}</p>
                        </div>
                        <div className="bg-white/50 px-4 py-2 rounded-xl">
                          <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Confirmation</p>
                          <p className="text-[10px] font-mono text-emerald-600 font-black truncate">{hist.confirmation}</p>
                        </div>
                      </div>

                      <button className="flex items-center justify-center p-3 bg-white hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl border border-slate-100 transition-all shadow-sm">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-slate-900 transition-colors mt-4">
                  Request Full Global Audit Log
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Fleet & Tracking Column */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-[48px] shadow-2xl relative overflow-hidden">
             <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
                <Truck size={200} />
             </div>
             <div className="relative z-10 flex items-center justify-between mb-10">
               <h3 className="text-xl font-black flex items-center gap-3">
                 <ShieldCheck className="text-emerald-400" size={24} />
                 Live Fleet
               </h3>
               <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/30">
                 <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Grid Active
               </span>
             </div>
             
             <div className="space-y-5">
               {[
                 { id: 'V-091', label: 'Heavy Duty Unit', status: 'In Transit', progress: 65, color: 'bg-emerald-500' },
                 { id: 'V-102', label: 'Cold-Chain Unit', status: 'Loading', progress: 10, color: 'bg-blue-400' },
                 { id: 'V-044', label: 'Marine Carrier', status: 'En Route', progress: 40, color: 'bg-teal-400' },
               ].map((v) => (
                 <div key={v.id} className="p-5 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-xs font-black tracking-widest">{v.id}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{v.label}</p>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">{v.status}</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${v.color}`} style={{width: `${v.progress}%`}}></div>
                    </div>
                 </div>
               ))}
             </div>

             <button className="relative z-10 mt-10 w-full py-5 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-[24px] hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/20">
               Fleet Operations Manager <ChevronRight size={16} />
             </button>
          </div>

          <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3">
              <MapPin size={22} className="text-orange-500" />
              Recent Waybills
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-all cursor-pointer border border-transparent hover:border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100 group-hover:scale-105 transition-transform">
                      <ExternalLink size={16} />
                    </div>
                    <span className="text-xs font-black text-slate-700">DOC-WB-90{i}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">
              Manage Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsPortal;
