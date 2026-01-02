import React, { useState } from 'react';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Calendar, 
  Linkedin, 
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState('idle'); // idle, sending, success

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-6 lg:px-12 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.3em] mb-6">
            <ShieldCheck size={12} /> Global Protocol v4.0
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6">
            Let's Scale Your <span className="text-emerald-600">Marine Trade.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Connect with our trade engineers to optimize your seaweed supply chain or integrate into our global distribution mesh.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 p-8 md:p-12 rounded-[48px] border border-slate-100 shadow-sm">
            {formState === 'success' ? (
              <div className="py-20 text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">Protocol Initiated</h3>
                <p className="text-slate-500 font-medium mb-8">Your trade inquiry has been logged in our secure ledger. An analyst will reach out within 4 operating hours.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="text-emerald-600 font-black uppercase text-[11px] tracking-widest hover:underline"
                >
                  New Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Erik Sorenson"
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Nordic Bio-Dynamics"
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="erik@company.no"
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+47 000 00 000"
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nature of Inquiry</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold appearance-none">
                      <option>Buying / Sourcing</option>
                      <option>Selling / Supply</option>
                      <option>Technical Support</option>
                      <option>Strategic Partnership</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Projected Volume (Tons)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 100t - 500t"
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Context & Requirements</label>
                  <textarea 
                    rows={4}
                    placeholder="Briefly describe your trade requirements..."
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <p className="text-[10px] font-medium text-slate-400 leading-relaxed max-w-xs">
                    By submitting, you agree to our <span className="underline cursor-pointer">Privacy Policy</span>. Your data is handled via encrypted trade protocols.
                  </p>
                  <button 
                    disabled={formState === 'sending'}
                    className="w-full sm:w-auto px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                  >
                    {formState === 'sending' ? 'Transmitting...' : (
                      <>
                        Initiate Secure Protocol <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Information Column */}
          <div className="lg:col-span-5 space-y-10">
            {/* Direct Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm group hover:border-emerald-200 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Professional Correspondence</p>
                    <p className="text-lg font-black text-slate-900">trade@seaweedtrade.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest cursor-pointer hover:translate-x-1 transition-transform">
                  Reach Support <ArrowRight size={14} />
                </div>
              </div>

              <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm group hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Global Trade Desk</p>
                    <p className="text-lg font-black text-slate-900">+47 21 00 00 00</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-colors">
                    <MessageCircle size={12} /> WhatsApp
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-100 transition-colors">
                    <Send size={12} /> Telegram
                  </button>
                </div>
              </div>
            </div>

            {/* Location & Map Section */}
            <div className="bg-slate-900 text-white p-8 rounded-[48px] shadow-2xl relative overflow-hidden">
               <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/10 rounded-xl">
                        <MapPin className="text-emerald-400" size={20} />
                      </div>
                      <h3 className="text-xl font-black tracking-tight">Oslo Headquarters</h3>
                    </div>
                    <Linkedin size={24} className="text-white/20 hover:text-white cursor-pointer transition-colors" />
                 </div>

                 <p className="text-slate-400 font-medium leading-relaxed">
                   Maritime Trade Plaza 01-8A,<br />
                   Sentrum, 0150 Oslo, Norway
                 </p>

                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                       <Clock size={12} /> Operating Hours
                     </p>
                     <p className="text-xs font-bold">Mon-Fri: 09:00 - 18:00</p>
                     <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">GMT +1 (CET)</p>
                   </div>
                   <div className="space-y-2">
                     <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-black uppercase text-[9px] tracking-widest transition-all flex items-center justify-center gap-2">
                       <Calendar size={12} /> Book Demo
                     </button>
                   </div>
                 </div>

                 {/* Minimal Map Placeholder */}
                 <div className="w-full h-40 bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" 
                      alt="Oslo Map View" 
                      className="w-full h-full object-cover opacity-30 grayscale group-hover:opacity-50 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-3 bg-emerald-500 rounded-full animate-bounce shadow-lg shadow-emerald-500/50">
                        <MapPin size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/40 backdrop-blur rounded-lg text-[8px] font-black uppercase tracking-widest">
                      Live Network Node
                    </div>
                 </div>
               </div>
               
               {/* Background Accent */}
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;