import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  PackageCheck,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Handshake,
  Zap,
  X,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { HarvestBatch } from '../types';

interface BuyerPortalProps {
  availableBatches: HarvestBatch[];
  onBuy: (batchId: string) => void;
}

const ITEMS_PER_PAGE = 4;

const TrustSignal: React.FC<{ icon: React.ReactNode; label: string; className?: string }> = ({ icon, label, className = "" }) => (
  <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-emerald-950/80 backdrop-blur shadow-sm border border-emerald-100/50 dark:border-emerald-500/20 text-[7px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 ${className}`} title={label}>
    {icon}
    <span>{label}</span>
  </div>
);

const BuyerPortal: React.FC<BuyerPortalProps> = ({ availableBatches, onBuy }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [confirmingBatch, setConfirmingBatch] = useState<HarvestBatch | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return availableBatches.filter(b => 
      b.species.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableBatches, searchTerm]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const handlePurchaseConfirm = () => {
    if (confirmingBatch) {
      onBuy(confirmingBatch.id);
      setConfirmingBatch(null);
      setShowPaymentSuccess(true);
      setTimeout(() => setShowPaymentSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Verified Inventory</h2>
          <p className="text-slate-500 dark:text-emerald-100/60 font-medium">Certified carbon-negative seaweed supply</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-emerald-800 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Filter by species..."
              className="pl-12 pr-6 py-4 rounded-[24px] bg-white dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-800/40 shadow-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all w-72 font-medium dark:text-white"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="p-4 bg-white dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-800/40 rounded-[24px] shadow-sm hover:bg-slate-50 dark:hover:bg-emerald-900 transition-colors">
            <Filter size={20} className="text-slate-600 dark:text-emerald-400" />
          </button>
        </div>
      </div>

      {showPaymentSuccess && (
        <div className="bg-emerald-600 text-white p-6 rounded-[32px] flex items-center justify-between shadow-xl shadow-emerald-100 dark:shadow-none animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4">
            <CheckCircle2 size={24} />
            <div>
              <p className="font-black text-lg">Transaction Executed</p>
              <p className="text-xs text-emerald-100">Smart contract deployment confirmed. Logistics notified.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginatedItems.map((batch) => (
          <div key={batch.id} className="bg-white dark:bg-emerald-900/20 rounded-[48px] overflow-hidden shadow-sm border border-slate-100 dark:border-emerald-800/40 flex flex-col group hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-emerald-950/50 transition-all duration-700 hover:-translate-y-2">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${batch.id}/600/400`} 
                alt={batch.species} 
                className="w-full h-full object-cover grayscale-[30%] dark:grayscale-[15%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              
              {/* Trust Signals Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <TrustSignal icon={<Leaf size={8} />} label="Organic" />
                <TrustSignal icon={<Handshake size={8} />} label="Fair Trade" />
                <TrustSignal icon={<Zap size={8} />} label="CO2 Neutral" />
              </div>

              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-emerald-950/80 backdrop-blur px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400 shadow-lg border border-emerald-100/50 dark:border-emerald-800/20">
                Grade {batch.qualityGrade}
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{batch.species}</h3>
                <span className="text-lg font-black text-orange-600 dark:text-orange-400 whitespace-nowrap ml-2">${batch.price} <span className="text-[10px] text-slate-400 dark:text-emerald-400/40">/kg</span></span>
              </div>
              
              <div className="space-y-3 mb-8 bg-slate-50/50 dark:bg-emerald-950/30 p-5 rounded-3xl border border-slate-100 dark:border-emerald-800/20">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-slate-400 dark:text-emerald-400/40">Available</span>
                  <span className="text-slate-800 dark:text-emerald-100">{batch.weight} kg</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-slate-400 dark:text-emerald-400/40">Harvest</span>
                  <span className="text-slate-800 dark:text-emerald-100">{batch.harvestDate}</span>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <button 
                  onClick={() => setConfirmingBatch(batch)}
                  className="w-full flex items-center justify-center gap-2 py-5 bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-black rounded-[24px] transition-all duration-300 active:scale-95 hover:scale-[1.03] shadow-xl hover:shadow-2xl hover:shadow-emerald-200/50 dark:hover:shadow-emerald-900/50 shadow-slate-200 dark:shadow-none group/btn"
                >
                  <ShoppingCart size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  Buy Now
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 dark:text-emerald-400/40 font-black uppercase tracking-widest">
                  <PackageCheck size={14} className="text-emerald-500" /> Marine Insurance Active
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white dark:bg-emerald-950/20 rounded-[64px] border-4 border-dashed border-slate-50 dark:border-emerald-900/40">
            <AlertCircle size={64} className="mx-auto text-slate-100 dark:text-emerald-900/40 mb-6" />
            <h3 className="text-2xl font-black text-slate-300 dark:text-emerald-800">No Inventory Found</h3>
            <p className="text-slate-300 dark:text-emerald-800 font-bold uppercase tracking-widest text-sm">Expand search protocols</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center pt-12 pb-6 gap-6">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-5 bg-white dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-800/40 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-emerald-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform dark:text-emerald-400" />
          </button>
          
          <div className="flex items-center gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-2xl font-black text-sm transition-all duration-500
                  ${currentPage === i + 1 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none scale-110' 
                    : 'bg-white dark:bg-emerald-950/40 text-slate-400 dark:text-emerald-800 hover:text-slate-900 dark:hover:text-emerald-400 border border-slate-100 dark:border-emerald-800/40'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-5 bg-white dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-800/40 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-emerald-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform dark:text-emerald-400" />
          </button>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-[10px] font-black text-slate-400 dark:text-emerald-800 uppercase tracking-[0.4em]">
          Page {currentPage} of {totalPages} &bull; {filtered.length} units detected
        </p>
      </div>

      {/* Purchase Confirmation Dialog */}
      {confirmingBatch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-emerald-950 w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-emerald-800/40">
            <div className="p-8 sm:p-12 space-y-8">
              <div className="flex items-center justify-between">
                <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-900/40 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={32} />
                </div>
                <button 
                  onClick={() => setConfirmingBatch(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors text-slate-400"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Confirm Secure Purchase</h3>
                <p className="text-slate-500 dark:text-emerald-100/60 font-medium">You are about to initiate a smart contract for the following seaweed batch inventory.</p>
              </div>

              <div className="bg-slate-50 dark:bg-emerald-900/20 rounded-[32px] p-8 border border-slate-100 dark:border-emerald-800/20 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-white dark:bg-emerald-800 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                      <Leaf size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 dark:text-emerald-500 uppercase tracking-widest">Species</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">{confirmingBatch.species}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-400 dark:text-emerald-500 uppercase tracking-widest">Quality</p>
                    <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-tight">Grade {confirmingBatch.qualityGrade}</p>
                  </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-emerald-800/40" />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-400 dark:text-emerald-500 uppercase tracking-widest">Total Weight</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white">{confirmingBatch.weight} kg</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs font-black text-slate-400 dark:text-emerald-500 uppercase tracking-widest">Total Value</p>
                    <p className="text-2xl font-black text-orange-600 dark:text-orange-400 leading-tight">
                      ${((confirmingBatch.price || 0) * confirmingBatch.weight).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => setConfirmingBatch(null)}
                  className="flex-1 py-5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-emerald-100/60 rounded-[24px] font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Discard Request
                </button>
                <button 
                  onClick={handlePurchaseConfirm}
                  className="flex-1 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  Verify & Pay <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerPortal;