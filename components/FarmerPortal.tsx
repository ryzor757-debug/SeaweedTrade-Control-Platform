import React, { useState, useMemo } from 'react';
import { 
  PlusCircle, 
  Leaf, 
  ArrowRight, 
  ArrowLeft,
  Clock,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Calendar,
  Layers,
  Sparkles,
  X
} from 'lucide-react';
import { HarvestBatch } from '../types';
import { analyzeHarvest } from '../geminiService';

interface FarmerPortalProps {
  batches: HarvestBatch[];
  onNewBatch: (batch: Partial<HarvestBatch>) => void;
}

const ITEMS_PER_PAGE = 6;

const FarmerPortal: React.FC<FarmerPortalProps> = ({ batches, onNewBatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    species: '',
    weight: 0,
    description: ''
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  // History State
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'weight' | 'grade'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting and Filtering Logic
  const processedBatches = useMemo(() => {
    let result = batches.filter(b => 
      b.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.harvestDate).getTime() - new Date(b.harvestDate).getTime();
      } else if (sortBy === 'weight') {
        comparison = a.weight - b.weight;
      } else if (sortBy === 'grade') {
        comparison = (a.qualityGrade || '').localeCompare(b.qualityGrade || '');
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [batches, searchTerm, sortBy, sortOrder]);

  const totalPages = Math.ceil(processedBatches.length / ITEMS_PER_PAGE);
  const paginatedBatches = processedBatches.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNext = async () => {
    if (step === 1) {
      if (!formData.species || formData.weight <= 0) return;
      setStep(2);
    } else if (step === 2) {
      if (!formData.description) return;
      setAnalyzing(true);
      const result = await analyzeHarvest(formData.description);
      setAiAnalysis(result);
      setAnalyzing(false);
      setStep(3);
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewBatch({
      species: formData.species,
      weight: formData.weight,
      harvestDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      qualityGrade: aiAnalysis?.grade || 'N/A'
    });
    resetForm();
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setStep(1);
    setFormData({ species: '', weight: 0, description: '' });
    setAiAnalysis(null);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Header & Primary Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 bg-white p-6 sm:p-8 rounded-3xl sm:rounded-[40px] shadow-sm border border-slate-100">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Farmer Ecosystem</h2>
          <p className="text-slate-500 font-medium text-sm sm:text-base">Optimize your marine output</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
             <Layers size={14} /> Node: US-NW-812
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 hover:bg-emerald-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl sm:rounded-[24px] font-black uppercase text-[10px] sm:text-xs tracking-widest shadow-xl transition-all group"
          >
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            New Harvest
          </button>
        </div>
      </div>

      {/* History Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-full md:max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search batches..."
              className="w-full pl-14 pr-6 py-3.5 sm:py-4 rounded-2xl sm:rounded-[24px] bg-white border border-slate-100 shadow-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-sm"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl sm:rounded-[24px] border border-slate-100 shadow-sm">
            <select 
              className="bg-transparent pl-4 pr-8 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest outline-none appearance-none cursor-pointer flex-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="date">Sort: Date</option>
              <option value="weight">Sort: Mass</option>
              <option value="grade">Sort: Grade</option>
            </select>
            <button 
              onClick={toggleSortOrder}
              className="p-2 sm:p-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-emerald-600"
            >
              <ArrowUpDown size={16} />
            </button>
          </div>
        </div>
        <div className="hidden lg:block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          {processedBatches.length} Entries
        </div>
      </div>

      {/* History Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {paginatedBatches.map((batch) => (
          <div key={batch.id} className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500">
            <div className="flex items-start justify-between mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-emerald-50 rounded-2xl group-hover:scale-105 transition-transform">
                <Leaf className="text-emerald-600 w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col items-end gap-2 text-right">
                <span className={`text-[8px] sm:text-[9px] font-black px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-widest border
                  ${batch.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                    batch.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    'bg-blue-50 text-blue-700 border-blue-100'}`}>
                  {batch.status}
                </span>
                <span className="text-[9px] font-mono text-slate-400">#{batch.id.slice(0, 8)}</span>
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight">{batch.species}</h3>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-100">
                <p className="text-[8px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Weight</p>
                <p className="font-black text-slate-900 text-lg sm:text-xl">{batch.weight} <span className="text-[10px] font-medium text-slate-400">kg</span></p>
              </div>
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-100">
                <p className="text-[8px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">AI Grade</p>
                <p className="font-black text-emerald-600 text-lg sm:text-2xl">{batch.qualityGrade || '---'}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 sm:pt-6 border-t border-slate-100 gap-4">
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <Calendar size={12} /> {batch.harvestDate}
              </div>
              <button className="flex items-center justify-center gap-1.5 text-slate-900 font-black text-[10px] uppercase tracking-widest hover:text-emerald-600 transition-colors">
                Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}

        {processedBatches.length === 0 && (
          <div className="col-span-full py-20 sm:py-32 text-center bg-white rounded-[40px] sm:rounded-[64px] border-2 border-dashed border-slate-100">
             <Clock size={48} className="mx-auto text-slate-100 mb-4" />
             <h3 className="text-xl font-black text-slate-300">No Records Found</h3>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-6 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-[32px] border border-slate-100 shadow-sm gap-4">
           <button 
             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
             disabled={currentPage === 1}
             className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30"
           >
             <ArrowLeft size={14} /> Prev
           </button>
           
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
             Page <span className="text-slate-900">{currentPage}</span> / {totalPages}
           </span>

           <button 
             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
             disabled={currentPage === totalPages}
             className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30"
           >
             Next <ArrowRight size={14} />
           </button>
        </div>
      )}

      {/* Harvest Wizard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-3xl sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 sm:px-12 pt-8 sm:pt-10 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3 sm:gap-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2 sm:gap-4">
                    <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm border-2
                      ${step >= s ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>
                      {s}
                    </div>
                    {s < 3 && <div className={`w-4 sm:w-8 h-1 rounded-full ${step > s ? 'bg-slate-900' : 'bg-slate-50'}`} />}
                  </div>
                ))}
              </div>
              <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 sm:p-12 overflow-y-auto flex-1">
              {step === 1 && (
                <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-right duration-300">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Logistics Deck</h3>
                    <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Origin verification and parameters.</p>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 sm:mb-3">Taxonomy</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Saccharina latissima"
                        className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 outline-none font-bold"
                        value={formData.species}
                        onChange={e => setFormData({ ...formData, species: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 sm:mb-3">Payload (KG)</label>
                      <input 
                        type="number" 
                        className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 outline-none font-black text-lg sm:text-xl"
                        value={formData.weight}
                        onChange={e => setFormData({ ...formData, weight: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-right duration-300">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Qualitative Lens</h3>
                    <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Metadata for neural grading engine.</p>
                  </div>
                  <div>
                    <label className="block text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 sm:mb-3">Condition Description</label>
                    <textarea 
                      rows={5}
                      placeholder="Observed rich olive hue, firm texture..."
                      className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 outline-none font-medium resize-none text-sm sm:text-base leading-relaxed"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-right duration-300">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Validation Report</h3>
                    <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Synthesized metadata analysis.</p>
                  </div>
                  {analyzing ? (
                    <div className="flex flex-col items-center py-10 sm:py-16 gap-4 sm:gap-6">
                      <div className="h-16 w-16 sm:h-20 sm:w-20 border-[4px] sm:border-[6px] border-emerald-50 border-t-emerald-600 rounded-full animate-spin"></div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Neural Handshake...</p>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="p-6 sm:p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
                        <p className="text-[9px] font-black uppercase tracking-widest text-emerald-800 mb-2">Quality Grade</p>
                        <p className="text-5xl sm:text-6xl font-black text-emerald-600 tracking-tighter">{aiAnalysis.grade}</p>
                      </div>
                      <div className="p-6 sm:p-8 bg-slate-900 rounded-3xl border border-slate-800">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Market Value / KG</p>
                        <p className="text-3xl sm:text-4xl font-black text-white">${aiAnalysis.estimatedValuePerKg}</p>
                      </div>
                      <div className="sm:col-span-2 p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-100">
                         <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Reasoning</p>
                         <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed italic">
                           "{aiAnalysis.reasoning}"
                         </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-12 bg-white border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <button 
                onClick={step === 1 ? resetForm : handlePrev}
                className="w-full sm:w-auto px-6 py-4 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> {step === 1 ? 'Discard' : 'Back'}
              </button>
              <button 
                onClick={step === 3 ? handleSubmit : handleNext}
                className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl sm:rounded-3xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 shadow-xl"
              >
                {step === 3 ? 'Finalize Entry' : 'Continue'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerPortal;