import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Anchor } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-[32px] shadow-2xl shadow-slate-900/10 border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-500">
          {/* Header */}
          <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-black text-sm tracking-tight">Trade Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Neural Node Active</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Anchor size={14} />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  Welcome to the SeaweedTrade protocol. I'm your AI logistics coordinator. How can I assist with your marine commerce today?
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[
                'Check Market Prices',
                'Verify a Batch',
                'Global Shipping Rates',
                'Book a Consultation'
              ].map((chip) => (
                <button 
                  key={chip}
                  className="px-4 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Footer input */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask about trade routes..."
                className="w-full pl-6 pr-14 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-xs font-bold"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group h-16 w-16 rounded-[24px] flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-emerald-600 text-white hover:scale-110 hover:shadow-emerald-200 shadow-emerald-100'}`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 rounded-full border-4 border-white animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;