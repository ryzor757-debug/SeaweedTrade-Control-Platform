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
  ArrowRight
} from 'lucide-react';
import { HarvestBatch } from '../types';

interface BuyerPortalProps {
  availableBatches: HarvestBatch[];
  onBuy: (batchId: string) => void;
}

const ITEMS_PER_PAGE = 4;

const BuyerPortal: React.FC<BuyerPortalProps> = ({ availableBatches, onBuy }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
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

  const handlePurchase = (id: string) => {
    onBuy(id);
    setShowPaymentSuccess(true);
    setTimeout(() => setShowPaymentSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Verified Inventory</h2>
          <p className="text-slate-500 font-medium">Certified carbon-negative seaweed supply</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Filter by species..."
              className="pl-12 pr-6 py-4 rounded-[24px] bg-white border border-slate-100 shadow-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all w-72 font-medium"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="p-4 bg-white border border-slate-100 rounded-[24px] shadow-sm hover:bg-slate-50 transition-colors">
            <Filter size={20} className="text-slate-600" />
          </button>
        </div>
      </div>

      {showPaymentSuccess && (
        <div className="bg-emerald-600 text-white p-6 rounded-[32px] flex items-center justify-between shadow-xl shadow-emerald-100 animate-in slide-in-from-top-4 duration-500">
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
          <div key={batch.id} className="bg-white rounded-[48px] overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700 hover:-translate-y-2">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${batch.id}/600/400`} 
                alt={batch.species} 
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-800 shadow-lg">
                Grade {batch.qualityGrade}
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black text-slate-900">{batch.species}</h3>
                <span className="text-lg font-black text-orange-600">${batch.price} <span className="text-[10px] text-slate-400">/kg</span></span>
              </div>
              
              <div className="space-y-3 mb-8 bg-slate-50/50 p-4 rounded-3xl">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-slate-400">Available</span>
                  <span className="text-slate-800">{batch.weight} kg</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-slate-400">Harvest</span>
                  <span className="text-slate-800">{batch.harvestDate}</span>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <button 
                  onClick={() => handlePurchase(batch.id)}
                  className="w-full flex items-center justify-center gap-2 py-5 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-[24px] transition-all active:scale-95 shadow-xl shadow-slate-200 group/btn"
                >
                  <ShoppingCart size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  Acquire Batch
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  <PackageCheck size={14} className="text-emerald-500" /> Marine Insurance Active
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white rounded-[64px] border-4 border-dashed border-slate-50">
            <AlertCircle size={64} className="mx-auto text-slate-100 mb-6" />
            <h3 className="text-2xl font-black text-slate-300">No Inventory Found</h3>
            <p className="text-slate-300 font-bold uppercase tracking-widest text-sm">Expand search protocols</p>
          </div>
        )}
      </div>

      {/* Premium Navigation Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center pt-12 pb-6 gap-6">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-5 bg-white border border-slate-100 rounded-full shadow-sm hover:bg-slate-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-2xl font-black text-sm transition-all duration-500
                  ${currentPage === i + 1 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-110' 
                    : 'bg-white text-slate-400 hover:text-slate-900 border border-slate-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-5 bg-white border border-slate-100 rounded-full shadow-sm hover:bg-slate-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
      
      <div className="text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
          Page {currentPage} of {totalPages} &bull; {filtered.length} units detected
        </p>
      </div>
    </div>
  );
};

export default BuyerPortal;