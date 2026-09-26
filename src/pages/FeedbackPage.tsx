import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  UserRound,
  Building2,
  CheckCircle2,
  Circle,
  Clock,
  CalendarClock,
  Accessibility,
  ShieldCheck,
  Sparkles,
  Handshake,
} from 'lucide-react';

type Message = { id: number; author: 'Kandidat' | 'HRD'; text: string; time: string };

/* Status rekrutmen — relevan dengan proses blind hiring */
const TIMELINE = [
  { label: 'Lamaran terkirim', note: '20 Sep 2026', state: 'done' as const },
  { label: 'Seleksi administrasi', note: '21 Sep 2026', state: 'done' as const },
  { label: 'Interview', note: 'Dijadwalkan 28 Sep · 10.00 WIB', state: 'current' as const },
  { label: 'Penawaran kerja', note: 'Menunggu hasil interview', state: 'todo' as const },
];

/* Kebutuhan akomodasi — klik untuk menyisipkan ke kolom pesan */
const ACCOMMODATIONS = [
  'Live caption saat sesi video',
  'Juru bahasa isyarat saat interview',
  'Ramah kursi roda di lokasi kantor',
  'Pembaca layar (screen reader)',
  'Jadwal di luar jam kerja',
  'Ruang tenang saat istirahat',
];

/* Jadwal berikutnya — dikonfirmasi lewat percakapan */
const UPCOMING = [
  { day: '26', month: 'Sep', title: 'Kirim portofolio terbaru', time: 'Sebelum pukul 17.00 WIB' },
  { day: '28', month: 'Sep', title: 'Interview video call', time: '10.00 WIB · Live caption aktif' },
  { day: '30', month: 'Sep', title: 'Konfirmasi akomodasi kantor', time: 'Menunggu balasan HRD' },
];

const QUICK_REPLIES: Record<'kandidat' | 'hrd', string[]> = {
  kandidat: [
    'Baik, terima kasih atas informasinya.',
    'Mohon maaf, saya butuh waktu untuk menyiapkan jawaban terbaik.',
    'Apakah interview dapat dijadwalkan di luar jam kerja?',
    'Portofolio terbaru sudah saya kirimkan melalui platform.',
  ],
  hrd: [
    'Terima kasih, lamaran Anda sedang kami proses.',
    'Kami akan menyiapkan akomodasi sesuai kebutuhan Anda.',
    'Mohon konfirmasi ketersediaan jadwal interview Anda.',
    'Portofolio Anda sudah diterima tim rekrutmen.',
  ],
};

/* Panduan komunikasi — menjaga proses tetap blind & nyaman */
const GUIDELINES = [
  'Jangan menyebut nama, usia, atau penampilan — fokus ke skill & pengalaman.',
  'Gunakan kalimat singkat dan sederhana agar mudah dipahami semua pihak.',
  'Balas pesan idealnya dalam 1×24 jam kerja agar proses tidak tertunda.',
  'Semua kebutuhan akomodasi aman dibicarakan di sini, bukan di CV.',
];

export default function FeedbackPage({ role = 'kandidat' }: { role?: 'kandidat' | 'hrd' }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, author: 'HRD', text: 'Selamat siang! Lamaran Anda lolos seleksi administrasi. Kami mengundang Anda untuk interview video pada 28 September pukul 10.00 WIB.', time: '08.55' },
    { id: 2, author: 'HRD', text: 'Terima kasih sudah mengirimkan portofolio. Apakah ada kebutuhan akomodasi yang perlu kami siapkan saat interview?', time: '09.20' },
    { id: 3, author: 'Kandidat', text: 'Terima kasih. Saya akan lebih nyaman dengan live caption saat sesi video.', time: '09.34' },
    { id: 4, author: 'Kandidat', text: 'Saya juga sudah mencatat waktunya. Apakah ada tautan ruang virtual yang perlu saya siapkan sebelum sesi dimulai?', time: '09.41' },
    { id: 5, author: 'HRD', text: 'Tautan akan kami kirimkan H-1 melalui pesan ini. Kebutuhan akomodasi lain yang perlu disiapkan untuk hari interview?', time: '09.47' },
  ]);
  const [draft, setDraft] = useState('');
  const author = role === 'hrd' ? 'HRD' : 'Kandidat';
  const quickReplies = QUICK_REPLIES[role === 'hrd' ? 'hrd' : 'kandidat'];

  const send = () => {
    if (!draft.trim()) return;
    setMessages(m => [...m, {
      id: Date.now(),
      author,
      text: draft.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setDraft('');
  };

  const insertAccommodation = (label: string) => {
    const line = `Saya membutuhkan ${label} saat interview.`;
    setDraft(d => (d.trim() ? `${d.trim()} ${line}` : line));
  };

  return (
    <section className="min-h-full bg-[#F0F3FA] px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-[#628ECB]">
            <MessageSquare size={17} />
            <span className="text-xs font-bold uppercase tracking-[.16em]">Ruang komunikasi</span>
          </div>
          <h1 className="text-2xl font-bold text-[#395886]">Feedback & koordinasi</h1>
          <p className="mt-1 text-sm text-slate-500">
            Pesan singkat antara kandidat dan HRD untuk menyiapkan proses rekrutmen yang nyaman.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* ── Kolom kiri: percakapan ─────────────────────────────────── */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-[#D5DEEF] bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5ECF7] px-5 py-4 sm:px-6">
                <div>
                  <div className="font-semibold text-[#395886]">Percakapan rekrutmen</div>
                  <div className="text-xs text-slate-500">Portofolio kandidat #CAND-8902</div>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
                  style={{ background: '#E6EEF9', color: '#395886' }}
                >
                  <Clock size={13} aria-hidden="true" />
                  Interview · 28 Sep
                </span>
              </div>

              <div className="flex max-h-[540px] min-h-[320px] flex-col gap-5 overflow-y-auto p-5 sm:p-6">
                {messages.map(m => {
                  const mine = m.author === author;
                  const Icon = m.author === 'HRD' ? Building2 : UserRound;
                  return (
                    <div key={m.id} className={`flex gap-3 ${mine ? 'flex-row-reverse' : ''}`}>
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D5DEEF] text-[#395886]">
                        <Icon size={15} aria-hidden="true" />
                      </div>
                      <div className={`max-w-[80%] ${mine ? 'text-right' : ''}`}>
                        <div className="mb-1 text-xs font-semibold text-[#628ECB]">{m.author}</div>
                        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${mine ? 'rounded-tr-sm bg-[#395886] text-white' : 'rounded-tl-sm bg-[#F0F3FA] text-slate-700'}`}>
                          {m.text}
                        </div>
                        <div className="mt-1 text-xs text-slate-400">{m.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Balasan cepat */}
              <div className="border-t border-[#E5ECF7] px-5 pt-4 sm:px-6">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#628ECB]">
                  <Sparkles size={13} aria-hidden="true" />
                  Balasan cepat
                </div>
                <div className="flex flex-wrap gap-2 pb-4">
                  {quickReplies.map(q => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setDraft(q)}
                      className="rounded-full border border-[#D5DEEF] bg-[#F0F3FA] px-3 py-1.5 text-xs font-medium text-[#395886] transition hover:border-[#628ECB] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E5ECF7] p-4 sm:px-6 sm:pb-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && send()}
                    placeholder="Tulis pesan yang jelas dan sopan…"
                    aria-label="Tulis pesan"
                    className="min-w-0 flex-1 rounded-xl border border-[#D5DEEF] px-4 py-3 text-sm text-[#395886] outline-none transition focus:border-[#628ECB] focus:ring-4 focus:ring-[#D5DEEF]"
                  />
                  <button
                    onClick={send}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#395886] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#628ECB] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                  >
                    <Send size={16} aria-hidden="true" />
                    Kirim
                  </button>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck size={13} aria-hidden="true" />
                  Identitas terenkripsi — HRD hanya melihat skill dan kecocokan, bukan data pribadi.
                </p>
              </div>
            </div>

            {/* Etika komunikasi */}
            <div className="rounded-2xl border border-[#D5DEEF] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-[#395886]">
                <Handshake size={16} aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-wider">Etika komunikasi</h2>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {GUIDELINES.map(g => (
                  <li
                    key={g}
                    className="flex items-start gap-2 rounded-xl bg-[#F0F3FA] px-3 py-3 text-xs leading-relaxed text-slate-600"
                  >
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#628ECB]" aria-hidden="true" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Kolom kanan: konteks rekrutmen ─────────────────────────── */}
          <aside aria-label="Konteks percakapan" className="flex flex-col gap-6">
            {/* Status rekrutmen */}
            <div className="rounded-2xl border border-[#D5DEEF] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#395886]">Status rekrutmen</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#628ECB]">Tahap 3/4</span>
              </div>
              <ol className="relative space-y-4 pl-6">
                <span className="absolute left-[7px] top-2 bottom-2 w-px bg-[#D5DEEF]" aria-hidden="true" />
                {TIMELINE.map(t => (
                  <li key={t.label} className="relative">
                    <span
                      className={`absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full ${
                        t.state === 'done'
                          ? 'bg-[#15803D] text-white'
                          : t.state === 'current'
                            ? 'bg-[#395886] text-white ring-4 ring-[#E6EEF9]'
                            : 'bg-[#E6EEF9] text-[#628ECB]'
                      }`}
                      aria-hidden="true"
                    >
                      {t.state === 'done' ? <CheckCircle2 size={11} /> : t.state === 'current' ? <Circle size={7} fill="currentColor" /> : <Circle size={7} />}
                    </span>
                    <div className={`text-sm font-semibold ${t.state === 'todo' ? 'text-slate-400' : 'text-[#1A2A3A]'}`}>{t.label}</div>
                    <div className="text-xs text-slate-500">{t.note}</div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Kebutuhan akomodasi */}
            <div className="rounded-2xl border border-[#D5DEEF] bg-white p-5 shadow-sm">
              <div className="mb-1 flex items-center gap-2 text-[#395886]">
                <Accessibility size={16} aria-hidden="true" />
                <h2 className="text-sm font-bold">Kebutuhan akomodasi</h2>
              </div>
              <p className="mb-3 text-xs text-slate-500">Klik untuk menyisikannya ke kolom pesan.</p>
              <div className="flex flex-wrap gap-2">
                {ACCOMMODATIONS.map(a => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => insertAccommodation(a)}
                    className="rounded-full border border-[#D5DEEF] bg-[#F0F3FA] px-3 py-1.5 text-xs font-medium text-[#395886] transition hover:border-[#628ECB] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    + {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Info pihak terkait */}
            <div className="rounded-2xl border border-[#D5DEEF] bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-bold text-[#395886]">Pihak dalam percakapan</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-[#F0F3FA] p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#395886] text-white" aria-hidden="true">
                    <Building2 size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[#1A2A3A]">Rina Pratiwi · HRD</div>
                    <div className="truncate text-xs text-slate-500">PT Telkom Indonesia · Administrasi</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#F0F3FA] p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#628ECB] text-white" aria-hidden="true">
                    <UserRound size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[#1A2A3A]">{role === 'hrd' ? 'Kandidat #CAND-8902' : 'Anda'}</div>
                    <div className="truncate text-xs text-slate-500">Blind profile · Skill Passport 83/100</div>
                  </div>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl bg-[#E6EEF9] p-3">
                  <dd className="text-lg font-extrabold text-[#395886]" style={{ fontFamily: 'var(--font-mono)' }}>1.4h</dd>
                  <dt className="text-[10px] text-slate-500">Rata-rata balas</dt>
                </div>
                <div className="rounded-xl bg-[#E6EEF9] p-3">
                  <dd className="text-lg font-extrabold text-[#15803D]" style={{ fontFamily: 'var(--font-mono)' }}>100%</dd>
                  <dt className="text-[10px] text-slate-500">Pesan terbaca</dt>
                </div>
              </dl>
            </div>

            {/* Jadwal berikutnya */}
            <div className="rounded-2xl border border-[#D5DEEF] bg-white p-5 shadow-sm">
              <div className="mb-1 flex items-center gap-2 text-[#395886]">
                <CalendarClock size={16} aria-hidden="true" />
                <h2 className="text-sm font-bold">Jadwal berikutnya</h2>
              </div>
              <p className="mb-3 text-xs text-slate-500">Konfirmasi lewat pesan ini agar semua pihak siap.</p>
              <ul className="space-y-2.5">
                {UPCOMING.map(u => (
                  <li key={u.title} className="flex items-start gap-3 rounded-xl bg-[#F0F3FA] p-3">
                    <span
                      className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-xl leading-none"
                      style={{ background: '#395886', color: '#fff' }}
                      aria-hidden="true"
                    >
                      <span className="text-[9px] font-bold uppercase">{u.month}</span>
                      <span className="text-sm font-extrabold">{u.day}</span>
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#1A2A3A]">{u.title}</div>
                      <div className="text-xs text-slate-500">{u.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
