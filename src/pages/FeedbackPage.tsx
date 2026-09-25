import React, { useState } from 'react';
import { MessageSquare, Send, UserRound, Building2 } from 'lucide-react';

type Message = { id: number; author: 'Kandidat' | 'HRD'; text: string; time: string };

export default function FeedbackPage({ role = 'kandidat' }: { role?: 'kandidat' | 'hrd' }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, author: 'HRD', text: 'Terima kasih sudah mengirimkan portofolio. Apakah ada kebutuhan akomodasi yang perlu kami siapkan saat interview?', time: '09.20' },
    { id: 2, author: 'Kandidat', text: 'Terima kasih. Saya akan lebih nyaman dengan live caption saat sesi video.', time: '09.34' },
  ]);
  const [draft, setDraft] = useState('');
  const author = role === 'hrd' ? 'HRD' : 'Kandidat';
  const send = () => { if (!draft.trim()) return; setMessages(m => [...m, { id: Date.now(), author, text: draft.trim(), time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }]); setDraft(''); };
  return <section className="min-h-full bg-[#F0F3FA] px-4 py-7 sm:px-6"><div className="mx-auto max-w-3xl">
    <div className="mb-6"><div className="mb-2 flex items-center gap-2 text-[#628ECB]"><MessageSquare size={17}/><span className="text-xs font-bold uppercase tracking-[.16em]">Ruang komunikasi</span></div><h1 className="text-2xl font-bold text-[#395886]">Feedback & koordinasi</h1><p className="mt-1 text-sm text-slate-500">Pesan singkat antara kandidat dan HRD untuk menyiapkan proses rekrutmen yang nyaman.</p></div>
    <div className="overflow-hidden rounded-2xl border border-[#D5DEEF] bg-white shadow-sm"><div className="border-b border-[#E5ECF7] px-6 py-4"><div className="font-semibold text-[#395886]">Percakapan rekrutmen</div><div className="text-xs text-slate-500">Portofolio kandidat #CAND-8902</div></div><div className="space-y-5 p-6">{messages.map(m => { const mine = m.author === author; const Icon = m.author === 'HRD' ? Building2 : UserRound; return <div key={m.id} className={`flex gap-3 ${mine ? 'flex-row-reverse' : ''}`}><div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D5DEEF] text-[#395886]"><Icon size={15}/></div><div className={`max-w-[78%] ${mine ? 'text-right' : ''}`}><div className="mb-1 text-xs font-semibold text-[#628ECB]">{m.author}</div><div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${mine ? 'rounded-tr-sm bg-[#395886] text-white' : 'rounded-tl-sm bg-[#F0F3FA] text-slate-700'}`}>{m.text}</div><div className="mt-1 text-xs text-slate-400">{m.time}</div></div></div>})}</div><div className="border-t border-[#E5ECF7] p-4"><div className="flex gap-3"><input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Tulis pesan yang jelas dan sopan…" className="min-w-0 flex-1 rounded-xl border border-[#D5DEEF] px-4 py-3 text-sm text-[#395886] outline-none transition focus:border-[#628ECB] focus:ring-4 focus:ring-[#D5DEEF]"/><button onClick={send} className="inline-flex items-center gap-2 rounded-xl bg-[#395886] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#628ECB]"><Send size={16}/>Kirim</button></div></div></div>
  </div></section>;
}
