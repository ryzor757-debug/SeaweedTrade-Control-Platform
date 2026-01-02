
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
  X,
  LayoutGrid,
  List as ListIcon,
  CheckCircle2,
  AlertCircle,
  PackageCheck
} from 'lucide-react';
import { HarvestBatch } from '../types.ts';
import { analyzeHarvest } from '../geminiService.ts';

const ITEMS_PER_PAGE = 6;

// Added FarmerPortalProps interface to fix "Cannot find name 'FarmerPortalProps'" error on line 27
interface FarmerPortalProps {
  batches: HarvestBatch[];
  onNewBatch: (batch: Partial<HarvestBatch>) => void;
}

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
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'SOLD'>('ALL');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'weight' | 'grade'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting and Filtering Logic
  const processedBatches = useMemo(() => {
    let result = batches.filter(b => {
      const matchesSearch = b.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            b.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

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
  }, [batches, searchTerm, statusFilter, sortBy, sortOrder]);

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
    <div className="space-y-6 sm:space-y-8">
      {/* Header & Primary Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 bg-white p-6 sm:p-7 rounded-2xl sm:rounded-[32px] shadow-sm border border-slate-100">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Farmer Ecosystem</h2>
          <p className="text-slate-400 font-medium text-xs sm:text-sm">Optimize your marine output</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[9px] font-black uppercase tracking-widest border border-emerald-100">
             <Layers size={12} /> Node: US-NW-812
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-emerald-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-[20px] font-black uppercase text-[9px] sm:text-[11px] tracking-widest shadow-xl transition-all group"
          >
            <PlusCircle size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            New Harvest
          </button>
        </div>
      </div>

      {/* History Control Center */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-full md:max-w-md group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search batches..."
                className="w-full pl-12 pr-6 py-3 sm:py-3.5 rounded-xl sm:rounded-[18px] bg-white border border-slate-100 shadow-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-[13px]"
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
            
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl sm:rounded-[18px] border border-slate-100 shadow-sm">
              <button 
                onClick={() => setViewType('grid')}
                className={`p-2 rounded-lg transition-all ${viewType === 'grid' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewType('list')}
                className={`p-2 rounded-lg transition-all ${viewType === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <ListIcon size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl sm:rounded-[18px] border border-slate-100 shadow-sm">
            <select 
              className="bg-transparent pl-3 pr-7 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer flex-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="date">Sort: Date</option>
              <option value="weight">Sort: Mass</option>
              <option value="grade">Sort: Grade</option>
            </select>
            <button 
              onClick={toggleSortOrder}
              className="p-1.5 sm:p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 hover:text-emerald-600"
            >
              <ArrowUpDown size={14} />
            </button>
          </div>
        </div>

        {/* Status Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(['ALL', 'PENDING', 'APPROVED', 'SOLD'] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
              className={`whitespace-nowrap px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all
                ${statusFilter === s 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* History Display */}
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in duration-500">
          {paginatedBatches.map((batch) => (
            <div key={batch.id} className="bg-white p-6 sm:p-7 rounded-[28px] sm:rounded-[36px] shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500">
              <div className="flex items-start justify-between mb-5 sm:mb-6">
                <div className="p-2.5 sm:p-3 bg-emerald-50 rounded-xl group-hover:scale-105 transition-transform">
                  <Leaf className="text-emerald-600 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex flex-col items-end gap-1.5 text-right">
                  <span className={`text-[7px] sm:text-[8px] font-black px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-widest border
                    ${batch.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                      batch.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-blue-50 text-blue-700 border-blue-100'}`}>
                    {batch.status}
                  </span>
                  <span className="text-[8px] font-mono text-slate-400">#{batch.id.slice(0, 8)}</span>
                </div>
              </div>
              
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 sm:mb-5 leading-tight">{batch.species}</h3>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100">
                  <p className="text-[7px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Weight</p>
                  <p className="font-black text-slate-900 text-base sm:text-lg">{batch.weight} <span className="text-[9px] font-medium text-slate-400">kg</span></p>
                </div>
                <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100">
                  <p className="text-[7px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">AI Grade</p>
                  <p className="font-black text-emerald-600 text-base sm:text-xl">{batch.qualityGrade || '---'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 sm:pt-5 border-t border-slate-50 gap-4">
                <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                  <Calendar size={10} /> {batch.harvestDate}
                </div>
                <button className="flex items-center justify-center gap-1.5 text-slate-900 font-black text-[9px] uppercase tracking-widest hover:text-emerald-600 transition-colors">
                  Full Audit <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm animate-in slide-in-from-bottom-4 duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-5">Species</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Mass</th>
                  <th className="px-8 py-5">Grade</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedBatches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                          <Leaf size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{batch.species}</p>
                          <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">#{batch.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[8px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border
                        ${batch.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          batch.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-blue-50 text-blue-700 border-blue-100'}`}>
                        {batch.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900">{batch.weight} kg</td>
                    <td className="px-8 py-5 text-sm font-black text-emerald-600">{batch.qualityGrade || '---'}</td>
                    <td className="px-8 py-5 text-xs font-medium text-slate-400 uppercase tracking-widest">{batch.harvestDate}</td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors group-hover:translate-x-1 transition-transform">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {processedBatches.length === 0 && (
        <div className="col-span-full py-16 sm:py-24 text-center bg-white rounded-[32px] sm:rounded-[48px] border-2 border-dashed border-slate-100">
           <Clock size={40} className="mx-auto text-slate-100 mb-3" />
           <h3 className="text-lg font-black text-slate-300">No Inventory Found</h3>
           <p className="text-[9px] font-black text-slate-200 uppercase tracking-[0.2em] mt-2">Adjust filter protocols</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-5 sm:px-7 py-3.5 sm:py-5 rounded-xl sm:rounded-[24px] border border-slate-100 shadow-sm gap-4">
           <button 
             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
             disabled={currentPage === 1}
             className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30"
           >
             <ArrowLeft size={12} /> Prev
           </button>
           
           <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">
             Page <span className="text-slate-900">{currentPage}</span> / {totalPages}
           </span>

           <button 
             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
             disabled={currentPage === totalPages}
             className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30"
           >
             Next <ArrowRight size={12} />
           </button>
        </div>
      )}

      {/* Harvest Wizard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-xl rounded-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 sm:px-10 pt-7 sm:pt-8 pb-5 border-b border-slate-50">
              <div className="flex items-center gap-3 sm:gap-5">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2 sm:gap-3">
                    <div className={`h-7 w-7 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-[10px] sm:text-xs border-2
                      ${step >= s ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>
                      {s}
                    </div>
                    {s < 3 && <div className={`w-3 sm:w-6 h-1 rounded-full ${step > s ? 'bg-slate-900' : 'bg-slate-50'}`} />}
                  </div>
                ))}
              </div>
              <button onClick={resetForm} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X size={18} />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 sm:p-10 overflow-y-auto flex-1">
              {step === 1 && (
                <div className="space-y-5 sm:space-y-6 animate-in slide-in-from-right duration-300">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Logistics Deck</h3>
                    <p className="text-slate-400 mt-1 text-xs sm:text-sm">Origin verification and parameters.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Taxonomy</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Saccharina latissima"
                        className="w-full px-5 py-3.5 sm:py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 outline-none font-bold text-xs"
                        value={formData.species}
                        onChange={e => setFormData({ ...formData, species: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Payload (KG)</label>
                      <input 
                        type="number" 
                        className="w-full px-5 py-3.5 sm:py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 outline-none font-black text-base"
                        value={formData.weight}
                        onChange={e => setFormData({ ...formData, weight: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 sm:space-y-6 animate-in slide-in-from-right duration-300">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Qualitative Lens</h3>
                    <p className="text-slate-400 mt-1 text-xs sm:text-sm">Metadata for neural grading engine.</p>
                  </div>
                  <div>
                    <label className="block text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Condition Description</label>
                    <textarea 
                      rows={4}
                      placeholder="Observed rich olive hue, firm texture..."
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 outline-none font-medium resize-none text-xs sm:text-sm leading-relaxed"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5 sm:space-y-6 animate-in slide-in-from-right duration-300">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Validation Report</h3>
                    <p className="text-slate-400 mt-1 text-xs sm:text-sm">Synthesized metadata analysis.</p>
                  </div>
                  {analyzing ? (
                    <div className="flex flex-col items-center py-8 sm:py-12 gap-4">
                      <div className="h-12 w-12 sm:h-14 sm:w-14 border-[4px] border-emerald-50 border-t-emerald-600 rounded-full animate-spin"></div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Neural Handshake...</p>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 sm:p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <p className="text-[8px] font-black uppercase tracking-widest text-emerald-800 mb-1.5">Quality Grade</p>
                        <p className="text-4xl sm:text-5xl font-black text-emerald-600 tracking-tighter">{aiAnalysis.grade}</p>
                      </div>
                      <div className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800">
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Market Value / KG</p>
                        <p className="text-2xl sm:text-3xl font-black text-white">${aiAnalysis.estimatedValuePerKg}</p>
                      </div>
                      <div className="sm:col-span-2 p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100">
                         <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Reasoning</p>
                         <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                           "{aiAnalysis.reasoning}"
                         </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-10 bg-white border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={step === 1 ? resetForm : handlePrev}
                className="w-full sm:w-auto px-5 py-3 text-slate-400 font-black uppercase text-[9px] tracking-widest hover:text-slate-900 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> {step === 1 ? 'Discard' : 'Back'}
              </button>
              <button 
                onClick={step === 3 ? handleSubmit : handleNext}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-xl sm:rounded-[18px] font-black uppercase text-[9px] tracking-widest flex items-center justify-center gap-2.5 hover:bg-emerald-600 shadow-xl"
              >
                {step === 3 ? 'Finalize Entry' : 'Continue'} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerPortal;
