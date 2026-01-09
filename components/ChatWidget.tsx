import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Anchor, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to the SeaweedTrade protocol. I'm your AI logistics coordinator. How can I assist with your marine commerce today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Understood. I'm processing your request through our maritime data nodes. Is there anything specific regarding logistics or quality grading you'd like to dive into?",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 1000);
  };

  const clearHistory = () => {
    setMessages([
      {
        id: '1',
        text: "History cleared. How can I assist with your marine commerce today?",
        sender: 'assistant',
        timestamp: new Date()
      }
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

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
            <div className="flex items-center gap-2">
              <button 
                onClick={clearHistory}
                title="Clear History"
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-rose-400"
              >
                <Trash2 size={16} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.sender === 'assistant' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-900 text-white'}`}>
                  {msg.sender === 'assistant' ? <Anchor size={14} /> : <div className="text-[10px] font-black">U</div>}
                </div>
                <div className={`p-4 rounded-2xl border shadow-sm max-w-[80%] ${
                  msg.sender === 'assistant' 
                    ? 'bg-white rounded-tl-none border-slate-100 text-slate-600' 
                    : 'bg-emerald-600 border-emerald-500 text-white rounded-tr-none'
                }`}>
                  <p className="text-xs font-medium leading-relaxed">
                    {msg.text}
                  </p>
                  <p className={`text-[8px] mt-2 font-black uppercase opacity-40 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'Check Market Prices',
                  'Verify a Batch',
                  'Global Shipping Rates'
                ].map((chip) => (
                  <button 
                    key={chip}
                    onClick={() => {
                      setInputValue(chip);
                    }}
                    className="px-4 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer input */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about trade routes..."
                className="w-full pl-6 pr-14 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-xs font-bold"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg"
              >
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
        {!isOpen && messages.length > 1 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 rounded-full border-4 border-white animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;