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
  ListChecks,
  Bell,
  Info,
  Target,
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
    location: 'Jakarta (Onsite)',
    type: 'onsite',
    salary: 'Rp 5–8 jt/bln',
    skills: ['Excel', 'Akurasi Data', 'Disiplin'],
    match: 82,
    postedDays: 1,
    accessible: true,
    accommodations: ['screen_reader', 'wheelchair', 'flexible'],
    category: ['tunadaksa', 'tunanetra'],
    jobCoach: 'Dewi P.',
    slots: 5,
    verified: true,
  },
  {
    id: 'j4',
    title: 'Staf Administrasi Keuangan',
    company: 'PT Bank Mandiri',
    companySize: '10.000+ karyawan',
    location: 'Jakarta (Hybrid)',
    type: 'hybrid',
    salary: 'Rp 6–10 jt/bln',
    skills: ['Akuntansi', 'Excel', 'Detail-oriented'],
    match: 79,
    postedDays: 3,
    accessible: true,
    accommodations: ['captioning', 'wheelchair', 'assistive_tech'],
    category: ['tunadaksa', 'tunarungu'],
    jobCoach: 'Rian F.',
    slots: 4,
    verified: true,
  },
  {
    id: 'j5',
    title: 'Customer Service Representative',
    company: 'Bukalapak',
    companySize: '1.000–5.000 karyawan',
    location: 'Bandung (Remote)',
    type: 'remote',
    salary: 'Rp 4–7 jt/bln',
    skills: ['Komunikasi', 'Empati', 'Problem Solving'],
    match: 75,
    postedDays: 7,
    accessible: true,
    accommodations: ['sign_language', 'remote', 'captioning'],
    category: ['tunarungu', 'tunawicara'],
    jobCoach: 'Yolanda S.',
    slots: 6,
    verified: false,
  },
  {
    id: 'j6',
    title: 'Guru Pendamping Inklusi (GPK)',
    company: 'Yayasan Pendidikan Anak Berkebutuhan Khusus',
    companySize: '50–200 karyawan',
    location: 'Yogyakarta (Onsite)',
    type: 'onsite',
    salary: 'Rp 4–6 jt/bln',
    skills: ['Pendidikan Inklusif', 'Sabar', 'Kreatif'],
    match: 91,
    postedDays: 2,
    accessible: true,
    accommodations: ['assistive_tech', 'flexible', 'sign_language'],
    category: ['autisme', 'tunadaksa', 'tunarungu', 'tunanetra'],
    jobCoach: 'Dewi P.',
    slots: 3,
    verified: true,
  },
  {
    id: 'j7',
    title: 'Quality Assurance Tester',
    company: 'Gojek',
    companySize: '5.000+ karyawan',
    location: 'Jakarta (Hybrid)',
    type: 'hybrid',
    salary: 'Rp 7–12 jt/bln',
    skills: ['Testing', 'Jira', 'Attention to Detail'],
    match: 85,
    postedDays: 4,
    accessible: true,
    accommodations: ['screen_reader', 'wheelchair', 'flexible'],
    category: ['tunadaksa', 'tunanetra'],
    jobCoach: 'Bimo R.',
    slots: 2,
    verified: true,
  },
  {
    id: 'j8',
    title: 'Content Writer & Translator',
    company: 'Gramedia Digital',
    companySize: '200–500 karyawan',
    location: 'Jakarta (Remote)',
    type: 'remote',
    salary: 'Rp 5–9 jt/bln',
    skills: ['Menulis', 'Terjemahan', 'SEO'],
    match: 77,
    postedDays: 6,
    accessible: true,
    accommodations: ['screen_reader', 'remote', 'captioning'],
    category: ['tunanetra', 'autisme'],
    jobCoach: 'Dewi P.',
    slots: 3,
    verified: true,
  },
  {
    id: 'j9',
    title: 'Operator Produksi',
    company: 'PT Unilever Indonesia',
    companySize: '5.000+ karyawan',
    location: 'Tangerang (Onsite)',
    type: 'onsite',
    salary: 'Rp 4–6 jt/bln',
    skills: ['Disiplin', 'Ketelitian', 'Kerja Tim'],
    match: 68,
    postedDays: 2,
    accessible: true,
    accommodations: ['wheelchair', 'flexible', 'sign_language'],
    category: ['tunadaksa', 'tunarungu'],
    jobCoach: 'Rian F.',
    slots: 8,
    verified: false,
  },
  {
    id: 'j10',
    title: 'Admin Logistik Gudang',
    company: 'PT Sinarmas Logistic',
    companySize: '1.000–5.000 karyawan',
    location: 'Surabaya (Hybrid)',
    type: 'hybrid',
    salary: 'Rp 4,5–6,5 jt/bln',
    skills: ['Inventori', 'Excel', 'Organisasi'],
    match: 71,
    postedDays: 5,
    accessible: true,
    accommodations: ['flexible', 'wheelchair', 'assistive_tech'],
    category: ['tunadaksa', 'autisme'],
    jobCoach: null,
    slots: 4,
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
  {
    id: 'c5',
    name: 'Siti Nurhaliza',
    specialty: 'Pendidikan & Pelatihan',
    disabilities: ['tunanetra', 'autisme', 'tunawicara'],
    sessions: 95,
    rating: 4.9,
    available: true,
    photo: 'SN',
  },
  {
    id: 'c6',
    name: 'Adi Pratama',
    specialty: 'Keuangan & Akuntansi',
    disabilities: ['tunarungu', 'tunadaksa'],
    sessions: 72,
    rating: 4.8,
    available: true,
    photo: 'AP',
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
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  remote:  { bg: '#DBEAFE', text: '#1D4ED8' },
  hybrid:  { bg: '#FEF3C7', text: '#B45309' },
  onsite:  { bg: '#E6EEF9', text: '#395886' },
};

const TYPE_LABELS: Record<string, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'Onsite',
};

const MATCH_TIER = [
  { min: 90, label: 'Sangat Cocok', short: 'Tinggi', color: '#395886' },
  { min: 75, label: 'Cocok', short: 'Sedang', color: '#2A5AAC' },
  { min: 60, label: 'Cukup Cocok', short: 'Cukup', color: '#B45309' },
  { min: 0, label: 'Perlu Pertimbangan', short: 'Rendah', color: '#B91C1C' },
];

const getMatchTier = (score: number) => {
  for (const tier of MATCH_TIER) {
    if (score >= tier.min) return tier;
  }
  return MATCH_TIER[MATCH_TIER.length - 1];
};

const MatchBadge = ({ score }: { score: number }) => {
  const tier = getMatchTier(score);
  return (
    <span
      className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold"
      style={{ background: tier.color + '15', color: tier.color, border: `1px solid ${tier.color}33` }}
      title={`${tier.label} — ${score}%`}
    >
      <Sparkles size={9} aria-hidden="true" />
      {tier.short} {Math.round(score / 10)}/10
    </span>
  );
};

const AccomChip = ({ tag }: { tag: AccomTag }) => {
  const { label, icon: Icon } = ACCOM_META[tag];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium"
      style={{ background: 'var(--color-bg)', color: 'var(--color-heading)', border: '1px solid var(--color-surface)' }}
    >
      <Icon size={10} aria-hidden="true" />
      {label}
    </span>
  );
};

const CoachCard = ({
  coach,
  onRequest,
}: {
  coach: typeof COACHES[0];
  onRequest: () => void;
}) => {
  const disIcons = coach.disabilities.map(d => (
    <span key={d} className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: 'var(--color-surface)', color: '#628ECB' }}>
      {DISABILITY_LABELS[d].slice(0, 3)}
    </span>
  ));

  return (
    <div className="p-3 rounded-xl border transition-all hover:shadow-sm" style={{ borderColor: 'var(--color-border)' }}>
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: 'var(--color-surface)', color: '#395886', fontFamily: 'var(--font-mono)' }}
          aria-hidden="true"
        >
          {coach.photo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-sm truncate" style={{ color: '#1e293b' }}>{coach.name}</h3>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: coach.available ? '#DCFCE7' : '#FEF3C7', color: coach.available ? '#15803D' : '#B45309' }}>
              {coach.available ? 'Tersedia' : 'Penuh'}
            </span>
          </div>
          <p className="text-xs mt-0.5 truncate" style={{ color: '#628ECB' }}>{coach.specialty}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {disIcons}
          </div>
          <div className="flex items-center gap-3 mt-2 text-[11px]" style={{ color: '#8AAEE0' }}>
            <span className="flex items-center gap-1">
              <Star size={10} className="text-amber-500" aria-hidden="true" />
              {coach.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users size={10} aria-hidden="true" />
              {coach.sessions} sesi
            </span>
          </div>
        </div>
      </div>
      {coach.available && (
        <button
          onClick={onRequest}
          className="w-full mt-3 py-2 rounded-lg text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}
        >
          Minta Pendampingan
        </button>
      )}
    </div>
  );
};

export default function JobMatchingPage({ onNavigate }: Props) {
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [disabilityFilter, setDisabilityFilter] = useState<string>('all');
  const [highMatch, setHighMatch] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);
  const [applyJob, setApplyJob] = useState<JobListing | null>(null);
  const [detailJob, setDetailJob] = useState<JobListing | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [coachRequested, setCoachRequested] = useState<string | null>(null);

  const toggleSave = (id: string) => {
    const next = new Set(savedJobs);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedJobs(next);
  };

  const base = JOBS.filter(job => {
    const matchesQuery = !q || `${job.title} ${job.company} ${job.skills.join(' ')}`.toLowerCase().includes(q.toLowerCase());
    const matchesDisability = disabilityFilter === 'all' || job.category.includes(disabilityFilter as DisabilityType);
    return matchesQuery && matchesDisability;
  });

  const filtered = base.filter(job => {
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    const matchesScore = !highMatch || job.match >= 80;
    const matchesSaved = !onlySaved || savedJobs.has(job.id);
    return matchesType && matchesScore && matchesSaved;
  });

  const countType = (t: string) => base.filter(job => job.type === t).length;
  const countHigh = base.filter(job => job.match >= 80).length;

  const FILTER_PILLS = [
    { key: 'all', label: 'Semua Lowongan', icon: Briefcase, count: base.length },
    { key: 'remote', label: 'Remote', icon: Wifi, count: countType('remote') },
    { key: 'hybrid', label: 'Hybrid', icon: Building2, count: countType('hybrid') },
    { key: 'onsite', label: 'Onsite', icon: MapPin, count: countType('onsite') },
  ];

  return (
    <main className="min-h-full" style={{ background: '#EBF0F9' }}>
      <div className="mx-auto px-4 sm:px-5 lg:px-6 py-6 lg:py-8" style={{ maxWidth: 1280 }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: '#395886' }}>
              SetaraKerja · Cari Kerja
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: '#1A2A3A' }}>
              Temukan Pekerjaan Inklusif
            </h1>
            <p className="text-sm mt-1" style={{ color: '#5B6B80' }}>
              Lowongan dari perusahaan yang peduli aksesibilitas & keberagaman
            </p>
          </div>
        </div>

        {/* Panel */}
        <div className="rounded-3xl border bg-white p-4 shadow-sm sm:p-5 lg:p-6" style={{ borderColor: 'var(--color-surface)' }}>
          {/* Panel header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}
                aria-hidden="true"
              >
                <Briefcase size={18} />
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold leading-tight" style={{ color: 'var(--color-heading)' }}>
                  Lowongan
                </h2>
                <p className="truncate text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {JOBS.length} lowongan aktif · diperbarui hari ini
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="relative min-w-0 flex-1 sm:flex-none sm:w-64">
                <span className="sr-only">Cari lowongan</span>
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8AAEE0' }} aria-hidden="true" />
                <input
                  type="search"
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Cari posisi, perusahaan, skill..."
                  className="w-full rounded-full py-2.5 pl-9 pr-3 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-400/25"
                  style={{ background: '#F0F3FA', color: '#1A2A3A' }}
                />
              </label>
              <button
                type="button"
                onClick={() => onNavigate('help')}
                aria-label="Bantuan"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{ background: '#F0F3FA', color: '#395886', border: '1px solid var(--color-surface)' }}
              >
                <Info size={16} />
              </button>
              <button
                type="button"
                onClick={() => setOnlySaved(v => !v)}
                aria-pressed={onlySaved}
                aria-label="Tampilkan lowongan tersimpan"
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{
                  background: onlySaved ? '#395886' : '#F0F3FA',
                  color: onlySaved ? '#fff' : '#395886',
                  border: '1px solid var(--color-surface)',
                }}
              >
                <Bell size={16} />
                {savedJobs.size > 0 && (
                  <span
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold"
                    style={{ background: '#15803D', color: '#fff' }}
                  >
                    {savedJobs.size}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filter cepat (pil) + kartu status */}
          <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter cepat">
              {FILTER_PILLS.map(p => {
                const active = typeFilter === p.key;
                const Icon = p.icon;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setTypeFilter(p.key)}
                    aria-pressed={active}
                    className="inline-flex items-center gap-1.5 rounded-full py-1.5 pl-1.5 pr-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    style={{
                      background: active ? '#395886' : '#F0F3FA',
                      color: active ? '#fff' : '#395886',
                      border: `1px solid ${active ? '#395886' : 'var(--color-surface)'}`,
                    }}
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ background: active ? 'rgba(255,255,255,0.18)' : '#E6EEF9' }}
                      aria-hidden="true"
                    >
                      <Icon size={12} />
                    </span>
                    {p.label}
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px]"
                      style={{ background: active ? 'rgba(255,255,255,0.18)' : '#E6EEF9' }}
                    >
                      {p.count}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setHighMatch(v => !v)}
                aria-pressed={highMatch}
                className="inline-flex items-center gap-1.5 rounded-full py-1.5 pl-1.5 pr-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{
                  background: highMatch ? '#395886' : '#F0F3FA',
                  color: highMatch ? '#fff' : '#395886',
                  border: `1px solid ${highMatch ? '#395886' : 'var(--color-surface)'}`,
                }}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: highMatch ? 'rgba(255,255,255,0.18)' : '#E6EEF9' }}
                  aria-hidden="true"
                >
                  <Target size={12} />
                </span>
                Kecocokan 80%+
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px]"
                  style={{ background: highMatch ? 'rgba(255,255,255,0.18)' : '#E6EEF9' }}
                >
                  {countHigh}
                </span>
              </button>

              <select
                value={disabilityFilter}
                onChange={e => setDisabilityFilter(e.target.value)}
                aria-label="Filter jenis disabilitas"
                className="cursor-pointer rounded-full px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-400"
                style={{
                  background: disabilityFilter === 'all' ? '#F0F3FA' : '#395886',
                  color: disabilityFilter === 'all' ? '#395886' : '#fff',
                  border: `1px solid ${disabilityFilter === 'all' ? 'var(--color-surface)' : '#395886'}`,
                }}
              >
                <option value="all">Semua Disabilitas</option>
                {Object.entries(DISABILITY_LABELS).map(([k, v]) => (
                  <option key={k} value={k} style={{ color: '#1A2A3A' }}>{v}</option>
                ))}
              </select>
            </div>

            {/* Kartu status */}
            <div
              className="flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 shadow-sm"
              style={{ borderColor: 'var(--color-surface)', background: 'var(--color-card-bg)' }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ background: '#DCFCE7', color: '#15803D' }}
                aria-hidden="true"
              >
                <CheckCircle2 size={15} />
              </span>
              <div className="leading-tight">
                <div className="text-xs font-bold" style={{ color: 'var(--color-heading)' }}>Blind hiring aktif</div>
                <div className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Identitas disembunyikan dari HRD</div>
              </div>
            </div>
          </div>

          {/* Judul bagian */}
          <div className="mb-4 mt-6 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold" style={{ color: 'var(--color-heading)' }}>
              Cocok dengan Profilmu
            </h3>
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <Sparkles size={12} style={{ color: '#628ECB' }} aria-hidden="true" />
              {filtered.length} hasil · diurutkan berdasarkan kecocokan AI
            </span>
          </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border p-10 text-center" style={{ borderColor: 'var(--color-surface)' }}>
                <Search size={30} className="mx-auto mb-3 text-[#395886]" aria-hidden="true" />
                <p className="font-semibold text-slate-700 mb-1">Tidak ada hasil</p>
                <p className="text-sm text-slate-400">Coba ubah filter atau kata kunci pencarian.</p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map(job => {
                  const tc = TYPE_COLORS[job.type];
                  const isSaved = savedJobs.has(job.id);
                  return (
                    <li
                      key={job.id}
                      className="group flex flex-col rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                      style={{ borderColor: 'var(--color-surface)', background: 'var(--color-card-bg)' }}
                    >
                      {/* Perusahaan + badge kecocokan */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                            style={{ background: '#395886', color: '#fff', fontFamily: 'var(--font-mono)' }}
                            aria-hidden="true"
                          >
                            {job.company.slice(0, 2).toUpperCase()}
                          </span>
                          <span className="min-w-0 truncate text-sm font-semibold" style={{ color: 'var(--color-heading)' }}>
                            {job.company}
                          </span>
                          {job.verified && (
                            <span className="shrink-0" style={{ color: '#15803D' }} title="Perusahaan terverifikasi">
                              <CheckCircle2 size={13} aria-label="Terverifikasi" />
                            </span>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleSave(job.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                            style={{
                              background: isSaved ? '#E6EEF9' : 'transparent',
                              color: isSaved ? '#395886' : '#8AAEE0',
                              border: '1px solid var(--color-surface)',
                            }}
                            aria-pressed={isSaved}
                            aria-label={isSaved ? `Hapus ${job.title} dari simpanan` : `Simpan ${job.title}`}
                          >
                            <Star size={13} fill={isSaved ? 'currentColor' : 'none'} />
                          </button>
                          <MatchBadge score={job.match} />
                        </div>
                      </div>

                      {/* Kotak meta */}
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-xl px-2.5 py-2" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-surface)' }}>
                          <div className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                            <Briefcase size={10} aria-hidden="true" /> Tipe
                          </div>
                          <div className="mt-0.5 flex items-center gap-1.5 truncate text-xs font-bold" style={{ color: 'var(--color-heading)' }}>
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tc.text }} aria-hidden="true" />
                            {TYPE_LABELS[job.type]}
                          </div>
                        </div>
                        <div className="rounded-xl px-2.5 py-2" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-surface)' }}>
                          <div className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                            <Clock size={10} aria-hidden="true" /> Dipublikasikan
                          </div>
                          <div className="mt-0.5 flex items-center gap-1.5 truncate text-xs font-bold" style={{ color: 'var(--color-heading)' }}>
                            {job.postedDays} hari lalu
                          </div>
                        </div>
                      </div>

                      {/* Judul + deskripsi */}
                      <h3 className="mt-3 text-[15px] font-bold leading-snug" style={{ color: 'var(--color-heading)' }}>
                        {job.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        {job.salary} · {job.location} · {job.slots} slot tersisa
                      </p>

                      {/* Skill */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {job.skills.map(s => (
                          <span
                            key={s}
                            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{ background: 'var(--color-surface)', color: 'var(--color-heading)' }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Akomodasi */}
                      <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Akomodasi tersedia">
                        {job.accommodations.map(a => <AccomChip key={a} tag={a} />)}
                      </div>

                      {/* Job coach */}
                      {job.jobCoach && (
                        <div className="mt-2 flex items-center gap-1.5 text-[11px]" style={{ color: '#2A5AAC' }}>
                          <UserCheck size={12} aria-hidden="true" />
                          Coach: <strong>{job.jobCoach}</strong> siap mendampingi
                        </div>
                      )}

                      {/* Aksi */}
                      <div className="mt-auto flex gap-2 pt-4">
                        <button
                          type="button"
                          onClick={() => setDetailJob(job)}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                          style={{ borderColor: 'var(--color-border)', color: '#395886', background: 'var(--color-card-bg)' }}
                        >
                          <Eye size={14} aria-hidden="true" />
                          Lihat Detail
                        </button>
                        <button
                          type="button"
                          onClick={() => setApplyJob(job)}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                          style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}
                        >
                          <CheckCircle2 size={14} aria-hidden="true" />
                          Lamar Blind
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Job Coach */}
          <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4" aria-label="Job Coach tersedia">
            <div
              className="rounded-3xl border bg-white p-4 sm:p-5 lg:col-span-3"
              style={{ borderColor: 'var(--color-surface)' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}
                    aria-hidden="true"
                  >
                    <UserCheck size={17} />
                  </span>
                  <div>
                    <h2 className="text-base font-bold" style={{ color: 'var(--color-heading)' }}>Job Coach</h2>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      Pendampingan gratis di 3 bulan pertama kerja
                    </p>
                  </div>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
                  style={{ background: '#E6EEF9', color: '#395886' }}
                >
                  <Users size={12} aria-hidden="true" />
                  {COACHES.filter(c => c.available).length} coach tersedia
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {COACHES.map(coach => (
                  <CoachCard
                    key={coach.id}
                    coach={coach}
                    onRequest={() => setCoachRequested(coach.id)}
                  />
                ))}
              </div>

              <p className="mt-4 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Job Coach mendampingi komunikasi dengan HRD & rekan kerja selama masa orientasi
              </p>
            </div>

            <div
              className="flex flex-col gap-4 rounded-3xl border bg-white p-5"
              style={{ borderColor: 'var(--color-surface)' }}
            >
              {/* Layanan Job Coach */}
              <div className="rounded-xl p-3" style={{ background: '#F0F3FA' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#E6EEF9', color: '#395886' }} aria-hidden="true">
                    <ListChecks size={14} />
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--color-heading)' }}>Layanan Job Coach</span>
                </div>
                <ul className="space-y-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-emerald-600" /> Pendampingan interview & onboarding</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-emerald-600" /> Komunikasi kebutuhan akomodasi ke HRD</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-emerald-600" /> Mediasi konflik tempat kerja</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-emerald-600" /> Evaluasi adaptasi 30/60/90 hari</li>
                </ul>
              </div>

              {/* Statistik */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 rounded-xl p-3 text-center" style={{ background: 'var(--color-bg)' }}>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold" style={{ color: '#395886', fontFamily: 'var(--font-mono)' }}>500+</div>
                  <div className="text-[10px] leading-tight" style={{ color: 'var(--color-text-muted)' }}>Kandidat Dibantu</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold" style={{ color: '#2A5AAC', fontFamily: 'var(--font-mono)' }}>94%</div>
                  <div className="text-[10px] leading-tight" style={{ color: 'var(--color-text-muted)' }}>Tertahan 1+ Tahun</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold" style={{ color: '#15803D', fontFamily: 'var(--font-mono)' }}>4.9/5</div>
                  <div className="text-[10px] leading-tight" style={{ color: 'var(--color-text-muted)' }}>Rating Kepuasan</div>
                </div>
              </div>

              <button
                className="mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}
              >
                Jadwalkan Konsultasi Gratis
              </button>
            </div>
          </section>
      </div>

      {/* Detail lowongan */}
      {detailJob && (
        <DetailModal
          job={detailJob}
          onClose={() => setDetailJob(null)}
          onApply={() => {
            setApplyJob(detailJob);
            setDetailJob(null);
          }}
        />
      )}

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

// ─── Modal Blind Apply ────────────────────────────────────────────────────────

function DetailModal({ job, onClose, onApply }: { job: JobListing; onClose: () => void; onApply: () => void }) {
  const tier = getMatchTier(job.match);

  const facts = [
    { label: 'Tipe', value: TYPE_LABELS[job.type] },
    { label: 'Lokasi', value: job.location },
    { label: 'Gaji', value: job.salary },
    { label: 'Slot tersisa', value: `${job.slots} orang` },
    { label: 'Ukuran perusahaan', value: job.companySize },
    { label: 'Dipublikasikan', value: `${job.postedDays} hari lalu` },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(57,88,134,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail lowongan ${job.title}`}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Kepala */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: '#395886', color: '#fff', fontFamily: 'var(--font-mono)' }}
              aria-hidden="true"
            >
              {job.company.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold" style={{ color: 'var(--color-heading)' }}>{job.title}</h2>
              <p className="truncate text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {job.company}{job.verified ? ' · Terverifikasi' : ''}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-1.5 transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            style={{ background: 'var(--color-bg)', color: '#395886' }}
            aria-label="Tutup detail"
          >
            <X size={18} />
          </button>
        </div>

        {/* Bar kecocokan */}
        <div className="mt-4 rounded-2xl p-3" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-surface)' }}>
          <div className="flex items-center justify-between gap-2 text-xs" style={{ color: 'var(--color-heading)' }}>
            <span className="font-semibold">Kecocokan dengan profilmu</span>
            <span className="font-bold" style={{ color: tier.color }}>{tier.label} · {job.match}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full" style={{ background: 'var(--color-surface)' }}>
            <div className="h-full rounded-full" style={{ width: `${job.match}%`, background: 'linear-gradient(90deg,#395886,#628ECB)' }} />
          </div>
        </div>

        {/* Fakta singkat */}
        <dl className="mt-4 grid grid-cols-2 gap-2">
          {facts.map(f => (
            <div key={f.label} className="rounded-xl px-3 py-2" style={{ border: '1px solid var(--color-surface)' }}>
              <dt className="text-[10px] font-semibold" style={{ color: 'var(--color-text-muted)' }}>{f.label}</dt>
              <dd className="truncate text-xs font-bold" style={{ color: 'var(--color-heading)' }}>{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* Skill */}
        <div className="mt-4">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-heading)' }}>Skill</h3>
          <div className="flex flex-wrap gap-1.5">
            {job.skills.map(s => (
              <span
                key={s}
                className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{ background: 'var(--color-surface)', color: 'var(--color-heading)' }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Akomodasi */}
        <div className="mt-4">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-heading)' }}>Akomodasi tersedia</h3>
          <div className="flex flex-wrap gap-1.5">
            {job.accommodations.map(a => <AccomChip key={a} tag={a} />)}
          </div>
        </div>

        {/* Job coach */}
        {job.jobCoach && (
          <div className="mt-4 flex items-center gap-2 rounded-xl p-3 text-xs" style={{ background: '#E6EEF9', color: '#395886' }}>
            <UserCheck size={14} aria-hidden="true" />
            Job Coach <strong>{job.jobCoach}</strong> siap mendampingi selama orientasi
          </div>
        )}

        {/* Aksi */}
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border px-4 py-3 text-sm font-semibold transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:w-auto sm:flex-1"
            style={{ borderColor: 'var(--color-border)', color: '#395886' }}
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={onApply}
            className="w-full rounded-xl px-4 py-3 text-sm font-semibold transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 sm:flex-1"
            style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}
          >
            Lamar Blind
          </button>
        </div>
      </div>
    </div>
  );
}

function ApplyModal({ job, onClose }: { job: JobListing; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', disability: '', accommodation: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) {
      // Simulasi submit
      alert(`Lamaran untuk ${job.title} dikirim!`);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(57,88,134,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Formulir blind apply"
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold" style={{ color: '#395886' }}>Blind Apply</h2>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100" aria-label="Tutup">
              <X size={20} style={{ color: '#628ECB' }} />
            </button>
          </div>
          <p className="text-sm mt-1 text-slate-500">{job.title} di {job.company}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#395886' }}>Nama Lengkap (Akan disembunyikan dari HRD)</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-400" style={{ borderColor: 'var(--color-border)' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#395886' }}>Email Aktif</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-400" style={{ borderColor: 'var(--color-border)' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#395886' }}>Jenis Disabilitas</label>
                <select value={form.disability} onChange={e => setForm({...form, disability: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-400" style={{ borderColor: 'var(--color-border)' }}>
                  <option value="">Pilih...</option>
                  {Object.entries(DISABILITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#395886' }}>Akomodasi yang Dibutuhkan</label>
                <select value={form.accommodation} onChange={e => setForm({...form, accommodation: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-blue-400" style={{ borderColor: 'var(--color-border)' }}>
                  <option value="">Pilih...</option>
                  {Object.entries(ACCOM_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#395886' }}>Siap Dikirim</h3>
              <p className="text-sm text-slate-500 mb-6">Data identitas Anda akan dienkripsi & disembunyikan dari HRD. Hanya skill & kecocokan yang terlihat.</p>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
            {step === 1 && (
              <button type="submit" className="w-full sm:flex-1 py-3 rounded-xl font-semibold" style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}>Lanjutkan</button>
            )}
            {step === 2 && (
              <>
                <button type="button" onClick={() => setStep(1)} className="w-full sm:flex-1 py-3 rounded-xl font-semibold border" style={{ borderColor: 'var(--color-border)', color: '#628ECB' }}>Kembali</button>
                <button type="submit" className="w-full sm:flex-1 py-3 rounded-xl font-semibold" style={{ background: 'linear-gradient(135deg,#395886,#628ECB)', color: '#fff' }}>Kirim Lamaran</button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}


