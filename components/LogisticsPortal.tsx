
import React from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Package, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Order } from '../types';

interface LogisticsPortalProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: any) => void;
}

const LogisticsPortal: React.FC<LogisticsPortalProps> = ({ orders, onUpdateStatus }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logistics Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Transport Pipeline</h2>
            <div className="flex gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <span className="text-blue-600">Active</span> / <span>Historical</span>
            </div>
          </div>

          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Order #{order.id}</h4>
                    <p className="text-xs text-slate-400">Consignment ready for dispatch</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Origin</span>
                    <span className="text-sm font-semibold flex items-center gap-1">
                      <MapPin size={12} className="text-emerald-500" /> Coastal Farm Hub
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Destination</span>
                    <span className="text-sm font-semibold flex items-center gap-1">
                      <Navigation size={12} className="text-blue-500" /> Global Processing Facility
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Quantity</span>
                    <span className="text-sm font-semibold">{order.amount} kg Net</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-end gap-3 min-w-[150px]">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tighter
                  ${order.status === 'PAID' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                  {order.status}
                </span>
                <button 
                  onClick={() => onUpdateStatus(order.id, 'SHIPPED')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95"
                >
                  Confirm Shipment
                </button>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-100">
               <Truck size={48} className="mx-auto text-slate-200 mb-4" />
               <p className="text-slate-400">No shipments currently scheduled.</p>
            </div>
          )}
        </div>

        {/* Fleet & Tracking */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-[40px] shadow-xl">
             <div className="flex items-center justify-between mb-6">
               <h3 className="font-bold flex items-center gap-2">
                 <ShieldCheck className="text-emerald-400" size={20} />
                 Fleet Status
               </h3>
               <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Live</span>
             </div>
             
             <div className="space-y-4">
               {[
                 { id: 'V-091', label: 'Heavy Duty Trailer', status: 'In Transit', progress: 65 },
                 { id: 'V-102', label: 'Refrigerated Unit', status: 'Loading', progress: 10 },
                 { id: 'V-044', label: 'Ocean Freight', status: 'En Route', progress: 40 },
               ].map((v) => (
                 <div key={v.id} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold">{v.id}</p>
                        <p className="text-[10px] text-slate-400">{v.label}</p>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">{v.status}</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{width: `${v.progress}%`}}></div>
                    </div>
                 </div>
               ))}
             </div>

             <button className="mt-8 w-full py-4 bg-white text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
               Open Fleet Manager <ChevronRight size={16} />
             </button>
          </div>

          <div className="bg-white p-6 rounded-[40px] border border-slate-100">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800">
              <MapPin size={18} className="text-orange-500" />
              Recent Waybills
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 border border-slate-100">
                      <ExternalLink size={14} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">WB-4920{i}</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsPortal;
