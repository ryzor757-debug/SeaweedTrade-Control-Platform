import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  FileText,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { HarvestBatch, Order } from '../types';
import { getMarketOverview } from '../geminiService';

const data = [
  { name: 'Jan', value: 4000, trade: 2400 },
  { name: 'Feb', value: 3000, trade: 1398 },
  { name: 'Mar', value: 2000, trade: 9800 },
  { name: 'Apr', value: 2780, trade: 3908 },
  { name: 'May', value: 1890, trade: 4800 },
  { name: 'Jun', value: 2390, trade: 3800 },
];

interface AdminDashboardProps {
  batches: HarvestBatch[];
  orders: Order[];
  setBatches: React.Dispatch<React.SetStateAction<HarvestBatch[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ batches, orders, setBatches }) => {
  const [aiInsight, setAiInsight] = useState("Analyzing market trends...");

  useEffect(() => {
    getMarketOverview().then(setAiInsight);
  }, []);

  const approveBatch = (id: string) => {
    setBatches(prev => prev.map(b => b.id === id ? { ...b, status: 'APPROVED', qualityGrade: 'A', price: 12.5 } : b));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Main */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[32px] sm:rounded-[40px] shadow-sm border border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-emerald-500" />
              Trade Volume Dynamics
            </h2>
            <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
              +14.2% Monthly Growth
            </div>
          </div>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px'}}
                />
                <Area type="monotone" dataKey="trade" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="bg-emerald-900 text-emerald-50 p-6 md:p-8 rounded-[32px] sm:rounded-[40px] shadow-xl relative overflow-hidden flex flex-col min-h-[350px]">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles size={120} />
          </div>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-emerald-400" size={20} />
            <h3 className="font-bold text-lg">Market Intel</h3>
          </div>
          <div className="flex-1 overflow-y-auto text-xs sm:text-sm leading-relaxed space-y-4 pr-2 custom-scrollbar">
            <p className="bg-white/10 p-5 rounded-2xl italic border border-white/5 font-medium leading-relaxed">
              "{aiInsight.slice(0, 350)}..."
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                <span>Confidence Factor</span>
                <span className="text-emerald-400">98.2%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full">
                <div className="bg-emerald-400 h-full w-[98%] rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all shadow-lg active:scale-95">
            Full Analysis
          </button>
        </div>
      </div>

      {/* Pending Controls Table */}
      <div className="bg-white rounded-[32px] sm:rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Clock className="text-orange-500" />
            Queued Approvals
          </h2>
          <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-colors">Audit All</button>
        </div>
        
        {/* Table Safe Wrapper */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Node / ID</th>
                <th className="px-8 py-5">Origin</th>
                <th className="px-8 py-5">Species</th>
                <th className="px-8 py-5">Mass</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {batches.filter(b => b.status === 'PENDING').map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 font-mono text-xs font-bold text-slate-400 group-hover:text-slate-900">#{batch.id.slice(0, 8)}</td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600">{batch.farmerId}</td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-700">{batch.species}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-900">{batch.weight} kg</td>
                  <td className="px-8 py-5 text-xs font-medium text-slate-400 uppercase tracking-tighter">{batch.harvestDate}</td>
                  <td className="px-8 py-5">
                    <button 
                      onClick={() => approveBatch(batch.id)}
                      className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95"
                    >
                      <CheckCircle2 size={12} /> Validate
                    </button>
                  </td>
                </tr>
              ))}
              {batches.filter(b => b.status === 'PENDING').length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={32} className="text-slate-200" />
                      </div>
                      <p className="font-bold text-sm tracking-tight uppercase tracking-widest text-slate-300">Queue Purged & Validated</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;