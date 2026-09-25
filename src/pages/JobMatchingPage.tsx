import React, { useId, useState } from 'react';
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Shield,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  X,
  Headphones,
  Eye,
  Accessibility,
  Wifi,
  Building2,
  Users,
  UserCheck,
  Star,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import type { Page, DisabilityType } from '../types';

interface Props {
  onNavigate: (page: Page) => void;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

type AccomTag =
  | 'screen_reader'
  | 'sign_language'
  | 'captioning'
  | 'remote'
  | 'wheelchair'
  | 'flexible'
  | 'assistive_tech';

interface JobListing {
  id: string;
  title: string;
  company: string;
  companySize: string;
  location: string;
  type: 'remote' | 'hybrid' | 'onsite';
  salary: string;
  skills: string[];
  match: number;
  postedDays: number;
  accessible: boolean;
  accommodations: AccomTag[];
  category: DisabilityType[];
  jobCoach: string | null;
  slots: number;
  verified: boolean;
}

const JOBS: JobListing[] = [
  {
    id: 'j1',
    title: 'Frontend Engineer',
    company: 'BRI Digital',
    companySize: '500–1.000 karyawan',
    location: 'Jakarta (Remote)',
    type: 'remote',
    salary: 'Rp 8–14 jt/bln',
    skills: ['React', 'TypeScript', 'Figma'],
    match: 94,
    postedDays: 2,
    accessible: true,
    accommodations: ['screen_reader', 'remote', 'flexible'],
    category: ['tunanetra', 'tunarungu'],
    jobCoach: 'Yolanda S.',
    slots: 3,
    verified: true,
  },
  {
    id: 'j2',
    title: 'UI/UX Designer',
    company: 'Tokopedia',
    companySize: '1.000–5.000 karyawan',
    location: 'Jakarta (Hybrid)',
    type: 'hybrid',
    salary: 'Rp 10–16 jt/bln',
    skills: ['Figma', 'Prototyping', 'User Research'],
    match: 88,
    postedDays: 5,
    accessible: true,
    accommodations: ['captioning', 'sign_language', 'flexible'],
    category: ['tunarungu', 'tunawicara'],
    jobCoach: 'Bimo R.',
    slots: 2,
    verified: true,
  },
  {
    id: 'j3',
    title: 'Data Entry Specialist',
    company: 'Shopee Indonesia',
    companySize: '5.000+ karyawan',
    location: 'Remote',
    type: 'remote',
    salary: 'Rp 4–6 jt/bln',
    skills: ['Excel', 'Ketelitian', 'Administrasi'],
    match: 76,
    postedDays: 1,
    accessible: true,
    accommodations: ['remote', 'flexible', 'assistive_tech'],
    category: ['tunadaksa', 'autisme'],
    jobCoach: 'Dewi P.',
    slots: 5,
    verified: true,
  },
  {
    id: 'j4',
    title: 'Customer Service (Teks/Chat)',
    company: 'Traveloka',
    companySize: '1.000–5.000 karyawan',
    location: 'Yogyakarta (Hybrid)',
    type: 'hybrid',
    salary: 'Rp 5–8 jt/bln',
    skills: ['Komunikasi Tertulis', 'CRM', 'Empati'],
    match: 81,
    postedDays: 3,
    accessible: true,
    accommodations: ['captioning', 'remote', 'flexible'],
    category: ['tunarungu', 'tunawicara'],
    jobCoach: null,
    slots: 4,
    verified: false,
  },
  {
    id: 'j5',
    title: 'Barista & Operator Kafe',
    company: 'Fore Coffee',
    companySize: '200–500 karyawan',
    location: 'Bandung (Onsite)',
    type: 'onsite',
    salary: 'Rp 3–4,5 jt/bln',
    skills: ['Keramahan', 'Kecepatan', 'Tim'],
    match: 65,
    postedDays: 7,
    accessible: true,
    accommodations: ['wheelchair', 'assistive_tech'],
    category: ['tunadaksa'],
    jobCoach: 'Rian F.',
    slots: 2,
    verified: true,
  },
  {
    id: 'j6',
    title: 'Graphic Designer',
    company: 'Gojek',
    companySize: '5.000+ karyawan',
    location: 'Remote',
    type: 'remote',
    salary: 'Rp 7–12 jt/bln',
    skills: ['Adobe Illustrator', 'Canva', 'Branding'],
    match: 72,
    postedDays: 4,
    accessible: true,
    accommodations: ['screen_reader', 'remote', 'assistive_tech'],
    category: ['tunanetra', 'tunadaksa'],
    jobCoach: 'Yolanda S.',
    slots: 1,
    verified: true,
  },
];

const COACHES = [
  {
    id: 'c1',
    name: 'Yolanda Santoso',
    specialty: 'Tech & Digital',
    disabilities: ['tunanetra', 'tunadaksa'],
    sessions: 127,
    rating: 4.9,
    available: true,
    photo: 'YS',
  },
  {
    id: 'c2',
    name: 'Bimo Raharjo',
    specialty: 'Desain & Kreatif',
    disabilities: ['tunarungu', 'tunawicara'],
    sessions: 84,
    rating: 4.8,
    available: true,
    photo: 'BR',
  },
  {
    id: 'c3',
    name: 'Dewi Putri',
    specialty: 'Administrasi & Logistik',
    disabilities: ['tunadaksa', 'autisme'],
    sessions: 203,
    rating: 5.0,
    available: false,
    photo: 'DP',
  },
  {
    id: 'c4',
    name: 'Rian Firmansyah',
    specialty: 'Hospitality & F&B',
    disabilities: ['tunadaksa'],
    sessions: 61,
    rating: 4.7,
    available: true,
    photo: 'RF',
  },
];

const ACCOM_META: Record<AccomTag, { label: string; icon: React.FC<{ size?: number }> }> = {
  screen_reader:  { label: 'Screen Reader', icon: Eye },
  sign_language:  { label: 'Juru Bahasa Isyarat', icon: Accessibility },
  captioning:     { label: 'Caption/Teks Real-time', icon: Headphones },
  remote:         { label: 'Remote/WFH', icon: Wifi },
  wheelchair:     { label: 'Ramah Kursi Roda', icon: Accessibility },
  flexible:       { label: 'Jam Fleksibel', icon: Clock },
  assistive_tech: { label: 'Alat Bantu Disediakan', icon: Shield },
};

const DISABILITY_LABELS: Record<string, string> = {
  tunarungu: 'Tunarungu',
  tunadaksa: 'Tunadaksa',
  tunanetra: 'Tunanetra',
  tunawicara: 'Tunawicara',
  autisme: 'Autisme',
  lainnya: 'Lainnya',
  all: 'Semua Kategori',
};

const TYPE_LABELS: Record<string, string> = {
  all: 'Semua Tipe',
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'Onsite',
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  remote:  { bg: 'var(--color-surface)', text: '#395886' },
  hybrid:  { bg: 'var(--color-surface-2)', text: '#395886' },
  onsite:  { bg: 'var(--color-border)', text: '#fff' },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function MatchBadge({ score }: { score: number }) {
  const color = score >= 90 ? '#395886' : score >= 75 ? '#628ECB' : '#8AAEE0';
  const ring = score >= 90 ? 'var(--color-surface-2)' : 'var(--color-surface)';
  return (
    <div
      className="relative flex items-center justify-center w-14 h-14 rounded-full flex-shrink-0"
      style={{ background: ring }}
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Kecocokan ${score}%`}
    >
      <svg className="absolute inset-0" width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r="24" fill="none" stroke="#F0F3FA" strokeWidth="4" />
        <circle
          cx="28" cy="28" r="24"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${(score / 100) * 150.8} 150.8`}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
        />
      </svg>
      <span className="text-xs font-bold tabular-nums z-10" style={{ color, fontFamily: 'var(--font-mono)' }}>
        {score}%
      </span>
    </div>
  );
}

function AccomChip({ tag }: { tag: AccomTag }) {
  const meta = ACCOM_META[tag];
  const Icon = meta.icon;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border"
      style={{ borderColor: 'var(--color-border)', color: '#628ECB', background: 'var(--color-bg)' }}
    >
      <Icon size={10} />
      {meta.label}
    </span>
  );
}

function ApplyModal({ job, onClose }: { job: JobListing; onClose: () => void }) {
  const [step, setStep] = useState<'confirm' | 'done'>('confirm');
  const modalId = useId();

  if (step === 'done') {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(57,88,134,0.4)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl"
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Lamaran terkirim"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'var(--color-surface)' }}
            aria-hidden="true"
          >
            <CheckCircle2 size={40} style={{ color: '#395886' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#395886' }}>
            Lamaran Terkirim!
          </h2>
          <p className="text-sm text-slate-500 mb-1">
            Identitasmu tetap <strong className="text-slate-700">anonim</strong> — HRD hanya melihat Skill Passport & skor AI-mu.
          </p>
          <p className="text-xs text-slate-400 mb-8">
            Lamaran ke <span className="font-semibold">{job.company}</span> sebagai{' '}
            <span className="font-semibold">{job.title}</span> sudah tercatat.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl font-semibold text-sm transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}
          >
            Lihat Status Lamaran
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(57,88,134,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${modalId}-title`}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2
              id={`${modalId}-title`}
              className="text-xl font-bold"
              style={{ color: '#395886' }}
            >
              Blind Apply
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">{job.title} · {job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* What will be sent */}
        <div
          className="rounded-2xl p-5 mb-5 border"
          style={{ background: 'var(--color-bg)', borderColor: 'var(--color-surface)' }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#628ECB' }}>
            Yang dikirim ke HRD
          </p>
          <ul className="space-y-2">
            {['ID Anonim: #A7F3 (bukan namamu)', 'Skill Passport & Skor AI', 'Portofolio terenkripsi', 'Kebutuhan akomodasi'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={14} style={{ color: '#628ECB' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What won't be sent */}
        <div
          className="rounded-2xl p-5 mb-6 border"
          style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-surface)' }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-red-400">
            Yang TIDAK dikirim
          </p>
          <ul className="space-y-2">
            {['Nama, foto, atau kontak', 'Riwayat disabilitas medis', 'Alamat atau data identitas'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-500 line-through decoration-red-300">
                <X size={14} className="text-red-300 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setStep('done')}
          className="w-full py-4 rounded-2xl font-semibold text-base transition-all hover:brightness-110 hover:scale-[1.02] active:scale-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
          style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}
        >
          Kirim Lamaran Anonim
        </button>
        <p className="text-center text-xs text-slate-400 mt-3">
          Identitasmu terlindungi dengan enkripsi AES-256
        </p>
      </div>
    </div>
  );
}

function CoachCard({ coach, onRequest }: { coach: typeof COACHES[0]; onRequest: () => void }) {
  return (
    <div
      className="bg-white rounded-2xl border p-5 flex gap-4 hover:shadow-md transition-all"
      style={{ borderColor: 'var(--color-surface)' }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0"
        style={{
          background: coach.available ? 'linear-gradient(135deg,#395886,#628ECB)' : 'var(--color-surface)',
          color: coach.available ? '#fff' : '#628ECB',
          fontFamily: 'var(--font-mono)',
        }}
        aria-hidden="true"
      >
        {coach.photo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-sm text-slate-900">{coach.name}</p>
            <p className="text-xs text-slate-400">{coach.specialty}</p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star size={12} style={{ color: '#f59e0b' }} />
            <span className="text-xs font-bold tabular-nums" style={{ color: '#395886', fontFamily: 'var(--font-mono)' }}>
              {coach.rating}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-slate-400">{coach.sessions} sesi selesai</span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: coach.available ? 'var(--color-surface)' : '#f1f5f9',
              color: coach.available ? '#395886' : '#94a3b8',
            }}
          >
            {coach.available ? 'Tersedia' : 'Penuh'}
          </span>
        </div>
      </div>
      <button
        onClick={onRequest}
        disabled={!coach.available}
        className="self-center flex-shrink-0 text-xs font-semibold px-3 py-2 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: coach.available ? '#395886' : 'var(--color-surface)',
          color: '#fff',
        }}
        aria-label={`Minta sesi dengan ${coach.name}`}
      >
        Minta Sesi
      </button>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function JobMatchingPage({ onNavigate }: Props) {
  const searchId = useId();
  const [query, setQuery] = useState('');
  const [activeDisability, setActiveDisability] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [applyJob, setApplyJob] = useState<JobListing | null>(null);
  const [coachRequested, setCoachRequested] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const disabilities = ['all', 'tunanetra', 'tunarungu', 'tunadaksa', 'tunawicara', 'autisme'];
  const types = ['all', 'remote', 'hybrid', 'onsite'];

  const filtered = JOBS.filter(j => {
    const matchQ = !query || j.title.toLowerCase().includes(query.toLowerCase()) || j.company.toLowerCase().includes(query.toLowerCase()) || j.skills.some(s => s.toLowerCase().includes(query.toLowerCase()));
    const matchD = activeDisability === 'all' || j.category.includes(activeDisability as DisabilityType);
    const matchT = activeType === 'all' || j.type === activeType;
    return matchQ && matchD && matchT;
  });

  const toggleSave = (id: string) => {
    setSavedJobs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main id="main-content" className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Hero search bar */}
      <div style={{ background: 'linear-gradient(135deg,#395886 0%,#628ECB 100%)' }} className="px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate('kandidat')}
            className="text-blue-200 text-sm mb-5 flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            ← Dashboard Kandidat
          </button>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-2"
            
          >
            Job Matching
          </h1>
          <p className="text-blue-200 text-sm mb-7 max-w-lg">
            Semua lowongan telah diverifikasi aksesibilitasnya. Lamar secara anonim — HRD hanya melihat skill-mu, bukan identitasmu.
          </p>

          {/* Search input */}
          <div className="relative max-w-2xl">
            <label htmlFor={searchId} className="sr-only">Cari posisi, perusahaan, atau skill</label>
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: '#8AAEE0' }}
              aria-hidden="true"
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari posisi, perusahaan, atau skill…"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm text-slate-900 bg-white shadow-xl border-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            />
          </div>

          {/* Quick stats */}
          <div className="flex gap-6 mt-6 text-blue-200 text-xs">
            <span><strong className="text-white">{JOBS.length}</strong> lowongan aktif</span>
            <span><strong className="text-white">100%</strong> terverifikasi aksesibel</span>
            <span><strong className="text-white">{COACHES.length}</strong> job coach siap mendampingi</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          {/* Disability filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Kategori:</span>
            {disabilities.map(d => (
              <button
                key={d}
                onClick={() => setActiveDisability(d)}
                className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{
                  background: activeDisability === d ? '#395886' : 'var(--color-card-bg)',
                  color: activeDisability === d ? '#fff' : '#628ECB',
                  border: `1.5px solid ${activeDisability === d ? '#395886' : 'var(--color-border)'}`,
                }}
                aria-pressed={activeDisability === d}
              >
                {DISABILITY_LABELS[d]}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-slate-200 hidden sm:block" aria-hidden="true" />

          {/* Type filter */}
          <div className="flex items-center gap-1.5">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{
                  background: activeType === t ? '#628ECB' : 'var(--color-card-bg)',
                  color: activeType === t ? '#fff' : '#8AAEE0',
                  border: `1.5px solid ${activeType === t ? '#628ECB' : 'var(--color-border)'}`,
                }}
                aria-pressed={activeType === t}
              >
                {TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job list */}
          <section className="lg:col-span-2" aria-label="Daftar lowongan">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold" style={{ color: '#395886' }}>
                {filtered.length} lowongan ditemukan
              </h2>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Sparkles size={12} style={{ color: '#628ECB' }} aria-hidden="true" />
                Diurutkan berdasarkan kecocokan AI
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border p-10 text-center" style={{ borderColor: 'var(--color-surface)' }}>
                <Search size={30} className="mx-auto mb-3 text-[#395886]" aria-hidden="true" />
                <p className="font-semibold text-slate-700 mb-1">Tidak ada hasil</p>
                <p className="text-sm text-slate-400">Coba ubah filter atau kata kunci pencarian.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {filtered.map(job => {
                  const tc = TYPE_COLORS[job.type];
                  const isSaved = savedJobs.has(job.id);
                  return (
                    <li
                      key={job.id}
                      className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                      style={{ borderColor: 'var(--color-surface)' }}
                    >
                      {/* Match bar accent at top */}
                      <div
                        className="h-1"
                        style={{
                          background: `linear-gradient(to right, #395886 0%, #628ECB ${job.match}%, transparent ${job.match}%)`,
                        }}
                        aria-hidden="true"
                      />

                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          {/* Company avatar */}
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={{ background: 'var(--color-surface)', color: '#395886', fontFamily: 'var(--font-mono)' }}
                            aria-hidden="true"
                          >
                            {job.company.slice(0, 2).toUpperCase()}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-bold text-slate-900 text-base leading-tight">{job.title}</h3>
                                <p className="text-sm text-slate-500 mt-0.5">
                                  {job.company}
                                  {job.verified && (
                                    <span
                                      className="inline-flex items-center gap-0.5 ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                                      style={{ background: 'var(--color-surface)', color: '#395886' }}
                                    >
                                      <CheckCircle2 size={10} aria-hidden="true" />
                                      Verified
                                    </span>
                                  )}
                                </p>
                              </div>
                              <MatchBadge score={job.match} />
                            </div>

                            {/* Meta row */}
                            <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-400">
                              <span className="flex items-center gap-1">
                                <MapPin size={11} aria-hidden="true" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase size={11} aria-hidden="true" />
                                {job.salary}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users size={11} aria-hidden="true" />
                                {job.slots} slot tersisa
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={11} aria-hidden="true" />
                                {job.postedDays}h lalu
                              </span>
                            </div>

                            {/* Type + skills */}
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              <span
                                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                                style={{ background: tc.bg, color: tc.text }}
                              >
                                {TYPE_LABELS[job.type]}
                              </span>
                              {job.skills.map(s => (
                                <span
                                  key={s}
                                  className="text-xs px-2.5 py-0.5 rounded-full border"
                                  style={{ borderColor: 'var(--color-border)', color: '#628ECB', background: 'var(--color-bg)' }}
                                >
                                  {s}
                                </span>
                              ))}
                            </div>

                            {/* Accommodations */}
                            <div className="flex flex-wrap gap-1.5 mt-2.5" aria-label="Akomodasi tersedia">
                              {job.accommodations.map(a => <AccomChip key={a} tag={a} />)}
                            </div>

                            {/* Job coach tag */}
                            {job.jobCoach && (
                              <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#628ECB' }}>
                                <UserCheck size={12} aria-hidden="true" />
                                Job Coach: <strong>{job.jobCoach}</strong> siap mendampingi
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-bg)' }}>
                          <button
                            onClick={() => setApplyJob(job)}
                            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110 hover:scale-[1.02] active:scale-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                            style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}
                          >
                            Blind Apply
                          </button>
                          <button
                            onClick={() => toggleSave(job.id)}
                            className="px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                            style={{
                              borderColor: 'var(--color-border)',
                              background: isSaved ? 'var(--color-surface)' : 'var(--color-card-bg)',
                              color: isSaved ? '#395886' : '#628ECB',
                            }}
                            aria-label={isSaved ? `Hapus ${job.title} dari simpan` : `Simpan ${job.title}`}
                            aria-pressed={isSaved}
                          >
                            {isSaved ? '★ Disimpan' : '☆ Simpan'}
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Sidebar: Job Coach */}
          <aside aria-label="Job Coach tersedia">
            <div
              className="bg-white rounded-2xl border overflow-hidden sticky top-6"
              style={{ borderColor: 'var(--color-surface)' }}
            >
              <div
                className="px-5 py-4 border-b"
                style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', borderColor: '#628ECB' }}
              >
                <div className="flex items-center gap-2">
                  <UserCheck size={16} className="text-white" aria-hidden="true" />
                  <h2 className="text-sm font-bold text-white">Job Coach</h2>
                </div>
                <p className="text-xs text-blue-200 mt-0.5">
                  Pendampingan gratis di 3 bulan pertama kerja
                </p>
              </div>

              <div className="p-4 space-y-3">
                {COACHES.map(coach => (
                  <CoachCard
                    key={coach.id}
                    coach={coach}
                    onRequest={() => setCoachRequested(coach.id)}
                  />
                ))}
              </div>

              <div className="px-5 pb-5">
                <p className="text-xs text-slate-400 text-center">
                  Job Coach mendampingi komunikasi dengan HRD & rekan kerja selama masa orientasi
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Blind apply modal */}
      {applyJob && (
        <ApplyModal
          job={applyJob}
          onClose={() => setApplyJob(null)}
        />
      )}

      {/* Coach request confirmation */}
      {coachRequested && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(57,88,134,0.4)', backdropFilter: 'blur(4px)' }}
          onClick={() => setCoachRequested(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Permintaan sesi job coach"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-lg font-bold"
              style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff', fontFamily: 'var(--font-mono)' }}
              aria-hidden="true"
            >
              {COACHES.find(c => c.id === coachRequested)?.photo}
            </div>
            <h2 className="text-xl font-bold mb-1" style={{ color: '#395886' }}>
              Permintaan Terkirim!
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              <strong>{COACHES.find(c => c.id === coachRequested)?.name}</strong> akan menghubungimu dalam 1×24 jam melalui platform ini.
            </p>
            <button
              onClick={() => setCoachRequested(null)}
              className="w-full py-3 rounded-2xl font-semibold text-sm transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
              style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}
            >
              Oke, Mengerti
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
