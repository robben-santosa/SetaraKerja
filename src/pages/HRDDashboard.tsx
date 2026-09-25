import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Bell, User, Users, LayoutDashboard,
  Settings, MessageSquare, HelpCircle,
  TrendingUp, CheckCircle2, ChevronDown, ShieldCheck, X, LogOut,
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import type { Page } from '../types';

interface Props { onNavigate: (page: Page) => void; onLogout?: () => void; }

// --- Types & Data ---
interface Candidate {
  id: string; code: string; aiScore: number;
  skills: { name: string; score: number }[];
  radarData: { subject: string; score: number }[];
  appliedAt: string; status: 'applied' | 'screening' | 'interview_requested' | 'hired' | 'rejected';
  isRevealed: boolean; revealedData?: { name: string; disability: string; accommodations: string[] };
}

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1', code: '#CAND-8902', aiScore: 92,
    skills: [{ name: 'React', score: 92 }, { name: 'TypeScript', score: 87 }],
    radarData: [{ subject: 'React', score: 92 }, { subject: 'TypeScript', score: 87 }, { subject: 'UI/UX', score: 79 }],
    appliedAt: '2026-09-20', status: 'screening', isRevealed: false,
  },
  {
    id: '2', code: '#CAND-3341', aiScore: 89,
    skills: [{ name: 'Vue.js', score: 89 }, { name: 'JavaScript', score: 94 }],
    radarData: [{ subject: 'Vue.js', score: 89 }, { subject: 'JavaScript', score: 94 }, { subject: 'CSS', score: 86 }],
    appliedAt: '2026-09-19', status: 'applied', isRevealed: false,
  },
  {
    id: '4', code: '#CAND-1209', aiScore: 77,
    skills: [{ name: 'Angular', score: 77 }, { name: 'Java', score: 82 }],
    radarData: [{ subject: 'Angular', score: 77 }, { subject: 'Java', score: 82 }, { subject: 'SQL', score: 74 }],
    appliedAt: '2026-09-15', status: 'hired', isRevealed: true,
    revealedData: { name: 'Budi Santoso', disability: 'Tunadaksa', accommodations: ['Remote Work', 'Wheelchair Access'] },
  }
];

const COMPLIANCE = { employees: 250, quota: 2, required: 5, hired: 1 };

const BAR_DATA = [
  { name: 'Jan', screening: 20, hired: 10 },
  { name: 'Feb', screening: 30, hired: 12 },
  { name: 'Mar', screening: 15, hired: 8 },
  { name: 'Apr', screening: 40, hired: 15 },
  { name: 'May', screening: 25, hired: 11 },
  { name: 'Jun', screening: 35, hired: 18 },
];

const PIE_DATA = [
  { name: 'Frontend', value: 400, color: '#395886' },
  { name: 'Backend', value: 300, color: '#628ECB' },
  { name: 'Design', value: 300, color: '#8AAEE0' },
];

// --- Subcomponents ---

interface RevealModalProps {
  candidateCode: string;
  onClose: () => void;
  onConfirm: () => void;
}

function RevealModal({ candidateCode, onClose, onConfirm }: RevealModalProps) {
  const headingId = 'reveal-modal-heading';
  const descId = 'reveal-modal-desc';
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Focus the confirm button on mount; trap focus inside the modal
  useEffect(() => {
    confirmRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      aria-describedby={descId}
    >
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 id={headingId} className="text-xl font-bold text-[#395886]">
            Ungkap Identitas Kandidat
          </h2>
          <button
            onClick={onClose}
            aria-label="Tutup dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <p id={descId} className="text-sm text-slate-500 mb-2">
          Kandidat <strong className="text-[#395886]">{candidateCode}</strong> — aksi ini tidak dapat dibatalkan
          dan dicatat secara permanen dalam Audit Log sesuai UU No. 8/2016.
        </p>
        <p className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6">
          Identitas akan terungkap hanya jika kandidat juga telah menyetujui pengungkapan dari sisi mereka.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-slate-200 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Batal
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="flex-1 bg-[#395886] text-white py-2.5 rounded-xl font-semibold hover:bg-[#628ECB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#628ECB]"
          >
            Konfirmasi Ungkap
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HRDDashboard({ onNavigate, onLogout }: Props) {
  const { profile: userProfile } = useUser();

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('hrd_candidates');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return MOCK_CANDIDATES;
  });

  useEffect(() => {
    localStorage.setItem('hrd_candidates', JSON.stringify(candidates));
  }, [candidates]);
  const [revealTarget, setRevealTarget] = useState<string | null>(null);

  const confirmReveal = () => {
    if (!revealTarget) return;
    setCandidates(p => p.map(c => c.id === revealTarget ? {
      ...c, isRevealed: true, revealedData: { name: 'Sari Rahayu', disability: 'Tunarungu', accommodations: ['Remote Work'] }
    } : c));
    setRevealTarget(null);
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen flex p-4 font-sans gap-4" style={{ background: 'var(--color-bg)', color: 'var(--color-text-1)' }}>
      
      {revealTarget && (
        <RevealModal
          candidateCode={candidates.find(c => c.id === revealTarget)?.code ?? ''}
          onClose={() => setRevealTarget(null)}
          onConfirm={confirmReveal}
        />
      )}

      {/* --- Sidebar --- */}
      <aside className="hidden">
        <div>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#395886] rounded-xl flex items-center justify-center text-white font-bold italic text-xl">S</div>
              <span className="font-bold text-lg">SetaraKerja</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-3 tracking-wider">MENU</div>
              <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#395886] text-white rounded-2xl font-medium">
                  <LayoutDashboard size={18} /> Dashboard
                </button>
                <button onClick={() => onNavigate('hrd-candidates')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#395886] hover:bg-[var(--color-bg)] rounded-2xl font-medium transition-colors">
                  <Users size={18} /> Candidates
                </button>
                <button onClick={() => onNavigate('hrd-compliance')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#395886] hover:bg-[var(--color-bg)] rounded-2xl font-medium transition-colors">
                  <ShieldCheck size={18} /> Compliance
                </button>
              </nav>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-400 mb-3 tracking-wider">TOOLS</div>
              <nav className="space-y-1">
                <button onClick={() => onNavigate('settings')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#395886] hover:bg-[var(--color-bg)] rounded-2xl font-medium transition-colors">
                  <Settings size={18} /> Settings
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#395886] hover:bg-[var(--color-bg)] rounded-2xl font-medium transition-colors">
                  <MessageSquare size={18} /> Feedback
                </button>
                <button onClick={() => onNavigate('help')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#395886] hover:bg-[var(--color-bg)] rounded-2xl font-medium transition-colors">
                  <HelpCircle size={18} /> Help
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Upgrade Card */}
        <div className="space-y-3"><div className="bg-[#395886] text-white rounded-2xl p-5 relative overflow-hidden">
          <div className="w-8 h-8 bg-[#628ECB] rounded-lg flex items-center justify-center mb-4 text-sm font-bold italic">S</div>
          <h3 className="font-bold mb-1">Inclusive Pro</h3>
          <p className="text-xs text-blue-200 mb-4 opacity-80">Discover the benefit of an upgraded account</p>
          <button className="w-full py-2 bg-[#628ECB] hover:bg-[#8AAEE0] rounded-xl text-sm font-medium transition-colors">Upgrade $580</button>
        </div><button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-[#F0F3FA] hover:text-[#395886] transition-colors"><LogOut size={18} /> Keluar</button></div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pr-2">
        
        {/* Header */}
        <header className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#395886] mb-1">Dashboard HRD</h1>
            <p className="text-sm text-slate-500">{today}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-slate-600 transition-colors">
              <Search size={18} />
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full shadow-sm cursor-pointer">
              {userProfile.avatar ? (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200"><img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" /></div>
              ) : (
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center"><User size={16} className="text-slate-500"/></div>
              )}
              <div className="text-sm">
                <div className="font-bold text-[#395886] leading-tight">{userProfile.name}</div>
                <div className="text-xs text-slate-400 leading-tight">{userProfile.title}</div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-4">
          {/* Left Column (8 cols) */}
          <div className="col-span-12 xl:col-span-8 flex flex-col gap-4">
            
            {/* 4 Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#395886] text-white rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Users size={20} /></div>
                  <span className="bg-[#628ECB] text-xs font-bold px-2 py-1 rounded-lg">+12.5%</span>
                </div>
                <div className="text-sm text-blue-100 mb-1">Total Kandidat</div>
                <div className="flex items-end gap-3">
                  <div className="text-3xl font-bold">{candidates.length * 123}</div>
                  <div className="text-xs text-blue-200 mb-1 leading-tight">Kandidat vs<br/>Bulan Lalu</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500"><TrendingUp size={20} /></div>
                  <span className="bg-[#628ECB] text-white text-xs font-bold px-2 py-1 rounded-lg">+5.2%</span>
                </div>
                <div className="text-sm text-slate-500 mb-1">Menunggu Interview</div>
                <div className="flex items-end gap-3">
                  <div className="text-3xl font-bold">{candidates.filter(c => c.status === 'interview_requested').length * 45}</div>
                  <div className="text-xs text-slate-400 mb-1 leading-tight">Interview vs<br/>Bulan Lalu</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500"><CheckCircle2 size={20} /></div>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">-2.1%</span>
                </div>
                <div className="text-sm text-slate-500 mb-1">Diterima</div>
                <div className="flex items-end gap-3">
                  <div className="text-3xl font-bold">{COMPLIANCE.hired * 15}</div>
                  <div className="text-xs text-slate-400 mb-1 leading-tight">Diterima vs<br/>Bulan Lalu</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500"><ShieldCheck size={20} /></div>
                  <span className="bg-[#628ECB] text-white text-xs font-bold px-2 py-1 rounded-lg">+18.0%</span>
                </div>
                <div className="text-sm text-slate-500 mb-1">Kuota Terpenuhi</div>
                <div className="flex items-end gap-3">
                  <div className="text-3xl font-bold">{(COMPLIANCE.hired / COMPLIANCE.required * 100).toFixed(1)}%</div>
                  <div className="text-xs text-slate-400 mb-1 leading-tight">Kuota vs<br/>Bulan Lalu</div>
                </div>
              </div>
            </div>

            {/* Bar Chart Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-lg">Tren Lamaran</h3>
                  <p className="text-sm text-slate-500">Track candidate volume</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-[#8AAEE0]"></div> Screening</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-[#395886]"></div> Hired</div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                  This year <ChevronDown size={14} />
                </button>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BAR_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="screening" fill="#8AAEE0" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="hired" fill="#395886" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Candidates List */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-lg text-[#395886]">Daftar Kandidat</h3>
                  <p className="text-xs text-slate-500">Tersimpan di local server</p>
                </div>
                <button onClick={() => onNavigate('hrd-candidates')} className="text-sm font-medium text-[#395886] hover:underline">
                  Kelola Semua
                </button>
              </div>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                 {candidates.map(c => (
                   <div key={c.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-all">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-[#395886] text-white rounded-xl flex items-center justify-center font-mono text-xs shrink-0">
                         {c.isRevealed ? c.revealedData?.name.split(' ').map(n=>n[0]).join('').slice(0,2) : '??'}
                       </div>
                       <div>
                         <div className="font-bold text-sm text-[#395886]">{c.isRevealed ? c.revealedData?.name : c.code}</div>
                         <div className="text-xs text-slate-500 flex gap-2">
                           <span className="font-bold text-[#395886]">Score {c.aiScore}</span>
                           <span>•</span>
                           <span className="capitalize">{c.status.replace('_', ' ')}</span>
                         </div>
                       </div>
                     </div>
                     <div className="text-right shrink-0 ml-4">
                        {(c.status === 'applied' || c.status === 'screening') && (
                          <button
                            onClick={() => setCandidates(p => p.map(cand => cand.id === c.id ? { ...cand, status: 'interview_requested' } : cand))}
                            className="bg-[#395886] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#628ECB] transition-colors"
                          >
                            Tindak Lanjut
                          </button>
                        )}
                        {c.status === 'interview_requested' && !c.isRevealed && (
                          <button
                            onClick={() => setRevealTarget(c.id)}
                            className="bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Ungkap Identitas
                          </button>
                        )}
                        {c.isRevealed && c.status !== 'hired' && (
                          <button
                            onClick={() => setCandidates(p => p.map(cand => cand.id === c.id ? { ...cand, status: 'hired' } : cand))}
                            className="border border-[#395886] text-[#395886] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[var(--color-bg)] transition-colors"
                          >
                            Terima
                          </button>
                        )}
                        {c.status === 'hired' && (
                           <span className="text-xs font-bold text-[#395886] flex items-center gap-1">
                             <CheckCircle2 size={14} /> Diterima
                           </span>
                        )}
                     </div>
                   </div>
                 ))}
               </div>
            </div>

          </div>

          {/* Right Column (4 cols) */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-4">
            
            {/* Pie Chart Card */}
            <div className="bg-gradient-to-br from-[#D5DEEF] to-[#B1C9EF] rounded-3xl p-6 shadow-sm flex flex-col h-auto">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-[#395886]">Skill Demographics</h3>
                  <p className="text-sm text-slate-600">Track candidate skills</p>
                </div>
                <button className="flex items-center gap-1 text-xs text-slate-700 bg-white/50 px-2 py-1 rounded-lg">
                  Today <ChevronDown size={12} />
                </button>
              </div>
              
              <div className="h-64 w-full flex items-center justify-center my-4 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={0} outerRadius={100} paddingAngle={0} dataKey="value" stroke="none">
                      {PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                  </PieChart>
                </ResponsiveContainer>
                {/* Decorative lines like in the pie chart */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-[100px] h-[100px] border-r border-b border-white/30 translate-x-[50px] translate-y-[50px]"></div>
                </div>
              </div>

              <div className="space-y-2 mt-auto">
                {PIE_DATA.map((item, i) => (
                  <div key={item.name} className="flex justify-between items-center text-sm">
                    <span className="text-slate-700 font-medium">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#395886]">{(item.value / 10).toFixed(3)}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md text-white ${i===2 ? 'bg-red-500' : 'bg-[#628ECB]'}`}>
                        {i===2 ? '-2.09%' : '+1.9%'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Right Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-lg text-[#395886]">Candidate Growth</h3>
                  <p className="text-sm text-slate-500">Track candidates by location</p>
                </div>
                <button className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
                  Today <ChevronDown size={12} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                {/* Simulated bubble chart with styled divs */}
                <div className="relative w-32 h-32">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-[#395886] rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10 text-lg">87%</div>
                  <div className="absolute top-4 right-0 w-12 h-12 bg-[#628ECB] rounded-full flex items-center justify-center text-white font-bold shadow-md z-0 text-xs">17%</div>
                  <div className="absolute bottom-2 right-2 w-16 h-16 bg-[#628ECB] rounded-full flex items-center justify-center text-white font-bold shadow-md z-20 text-sm">57%</div>
                  <div className="absolute bottom-0 left-8 w-14 h-14 bg-[#8AAEE0] rounded-full flex items-center justify-center text-white font-bold shadow-sm z-30 text-xs">37%</div>
                </div>

                <div className="space-y-3 flex-1 ml-6">
                  {[
                    { country: 'United States', flag: '🇺🇸', val: 80 },
                    { country: 'Germany', flag: '🇩🇪', val: 60 },
                    { country: 'Australia', flag: '🇦🇺', val: 40 },
                    { country: 'France', flag: '🇫🇷', val: 20 },
                  ].map(c => (
                    <div key={c.country} className="flex items-center gap-2 text-xs">
                      <span>{c.flag}</span>
                      <span className="flex-1 text-slate-600 truncate">{c.country}</span>
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#395886] rounded-full" style={{width: `${c.val}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
