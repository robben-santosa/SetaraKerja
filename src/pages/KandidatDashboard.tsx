import React, { useId, useRef, useState } from 'react';
import {
 AICognitiveTranslator } from '../components/AITranslator';
import {
  Upload,
  ShieldCheck,
  Lock,
  Unlock,
  Eye,
  Bell,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronRight,
  Briefcase,
  Hash,
  Cpu,
  AlertTriangle,
  FileText,
  Star,
  MapPin,
  TrendingUp,
  Zap,
  Accessibility,
} from 'lucide-react';
import type { Application, Page, SkillScore } from '../types';
import {
 generateAnonymousId } from '../lib/encryption';

interface Props { onNavigate: (page: Page) => void; }

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_SKILLS: SkillScore[] = [
  { skill: 'React.js', score: 92, verifiedAt: '2026-09-01' },
  { skill: 'TypeScript', score: 87, verifiedAt: '2026-09-01' },
  { skill: 'UI/UX Design', score: 79, verifiedAt: '2026-08-28' },
  { skill: 'Node.js', score: 74, verifiedAt: '2026-08-28' },
  { skill: 'Figma', score: 83, verifiedAt: '2026-09-01' },
];

const MOCK_APPS: Application[] = [
  { id: '1', jobId: 'j1', jobTitle: 'Frontend Developer', company: 'PT Telkom Indonesia', status: 'interview_requested', appliedAt: '2026-09-20' },
  { id: '2', jobId: 'j2', jobTitle: 'UI/UX Designer', company: 'Tokopedia', status: 'screening', appliedAt: '2026-09-18' },
  { id: '3', jobId: 'j3', jobTitle: 'React Developer', company: 'Gojek', status: 'applied', appliedAt: '2026-09-22' },
  { id: '4', jobId: 'j4', jobTitle: 'Product Designer', company: 'Bukalapak', status: 'hired', appliedAt: '2026-09-10' },
];

const RECOMMENDED_JOBS = [
  { id: 'r1', title: 'Frontend Engineer', company: 'BRI Digital', location: 'Remote', match: 94, salary: 'Rp 8–14 jt', accessible: true },
  { id: 'r2', title: 'Web Developer', company: 'Traveloka', location: 'Hybrid — Jakarta', match: 88, salary: 'Rp 10–16 jt', accessible: true },
  { id: 'r3', title: 'JavaScript Engineer', company: 'Shopee Indonesia', location: 'Remote', match: 82, salary: 'Rp 9–15 jt', accessible: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const STATUS_MAP: Record<Application['status'], { label: string; icon: React.FC<{ size: number }>; color: string; bg: string }> = {
  applied:             { label: 'Terkirim',         icon: Clock,         color: '#64748b', bg: '#f1f5f9' },
  screening:           { label: 'Diseleksi',        icon: Eye,           color: '#628ECB', bg: 'var(--color-surface)' },
  interview_requested: { label: 'Interview Diminta',icon: Bell,          color: '#395886', bg: 'var(--color-surface-2)' },
  interview_scheduled: { label: 'Terjadwal',        icon: CheckCircle2,  color: '#395886', bg: 'var(--color-surface)' },
  hired:               { label: 'Diterima',      icon: Star,          color: '#fff',    bg: '#395886' },
  rejected:            { label: 'Tidak Dilanjutkan',icon: XCircle,       color: '#ef4444', bg: '#fee2e2' },
};

function SkillBar({ skill, score }: SkillScore) {
  const color = score >= 90 ? '#628ECB' : score >= 75 ? '#395886' : '#8AAEE0';
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 flex-shrink-0 text-xs font-medium text-right truncate" style={{ color: '#628ECB' }}>{skill}</span>
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ background: 'var(--color-surface)' }}
        role="progressbar"
        aria-label={`${skill}: ${score} dari 100`}
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${score}%`, background: `linear-gradient(90deg, #395886, ${color})` }}
        />
      </div>
      <span
        className="w-9 flex-shrink-0 text-xs font-bold tabular-nums text-right"
        style={{ color, fontFamily: 'var(--font-mono)' }}
      >
        {score}
      </span>
    </div>
  );
}

function ApplicationRow({ app, onNavigate }: { app: Application; onNavigate: (page: Page) => void }) {
  const { label, icon: Icon, color, bg } = STATUS_MAP[app.status];
  const isActionable = app.status === 'interview_requested';

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm"
      style={{
        borderColor: isActionable ? 'var(--color-border)' : 'var(--color-surface-alt)',
        background: isActionable ? 'var(--color-bg)' : 'var(--color-card-bg)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--color-surface)' }}
        aria-hidden="true"
      >
        <Briefcase size={16} style={{ color: '#628ECB' }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate" style={{ color: '#1e293b' }}>{app.jobTitle}</div>
        <div className="text-xs mt-0.5" style={{ color: '#8AAEE0' }}>
          {app.company} · {new Date(app.appliedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: bg, color }}
        >
          <Icon size={11} aria-hidden="true" />
          {label}
        </span>
        {isActionable && (
          <button
            onClick={() => onNavigate('interview')}
            className="text-xs text-white px-3 py-1.5 rounded-lg font-semibold transition-all hover:opacity-90 min-h-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            style={{ background: '#395886' }}
          >Lihat Detail</button>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function KandidatDashboard({ onNavigate }: Props) {
  const [anonymousId] = useState(() => generateAnonymousId());
  const [isMasked, setIsMasked] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [uploads, setUploads] = useState<{ name: string; progress: number; done: boolean }[]>([]);
  const [notification, setNotification] = useState(
    'PT Telkom Indonesia meminta interview. Identitas Anda diminta untuk dibuka.'
  );
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aiScore = Math.round(MOCK_SKILLS.reduce((a, s) => a + s.score, 0) / MOCK_SKILLS.length);

  const simulateUpload = async (file: File) => {
    const entry = { name: file.name, progress: 0, done: false };
    setUploads(prev => [...prev, entry]);
    const idx = uploads.length;
    for (let p = 0; p <= 100; p += 8) {
      await new Promise(r => setTimeout(r, 100));
      setUploads(prev => prev.map((u, i) => i === idx ? { ...u, progress: Math.min(p, 100) } : u));
    }
    setUploads(prev => prev.map((u, i) => i === idx ? { ...u, progress: 100, done: true } : u));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    Array.from(e.dataTransfer.files).forEach(simulateUpload);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files ?? []).forEach(simulateUpload);
    e.target.value = '';
  };

  const displayName = isMasked ? `Kandidat ${anonymousId}` : 'Sari Rahayu';

  return (
    <div className="min-h-full pb-10" style={{ background: 'var(--color-bg)' }}>

      {/* ── Notification banner ──────────────────────────────────────────── */}
      {notification && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center justify-between gap-4 px-5 sm:px-8 py-3"
          style={{ background: 'linear-gradient(90deg, #395886 0%, #628ECB 100%)' }}
        >
          <p className="text-sm font-medium text-white flex items-center gap-2 min-w-0 truncate">
            <Bell size={15} aria-hidden="true" className="flex-shrink-0" />
            {notification}
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onNavigate('interview')}
              className="text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[30px]"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
            >Lihat Detail</button>
            <button
              onClick={() => setNotification('')}
              aria-label="Tutup notifikasi"
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <XCircle size={16} className="text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">

        {/* ── Welcome hero ─────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-7 overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #395886 0%, #628ECB 100%)' }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-10"
            style={{ background: '#fff' }}
            aria-hidden="true"
          />
          <div
            className="absolute right-24 -bottom-16 w-32 h-32 rounded-full opacity-10"
            style={{ background: '#fff' }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-[1.2] text-white mb-2" >
                Selamat datang kembali
              </h1>
              <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Identitas aktif:{' '}
                <strong className="text-white font-mono">{displayName}</strong>
              </p>
              <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {MOCK_APPS.filter(a => a.status === 'interview_requested').length} interview menunggu respons Anda hari ini.
              </p>
            </div>
            <button
              onClick={() => setIsMasked(m => !m)}
              aria-pressed={isMasked}
              aria-label={isMasked ? 'Nonaktifkan mode anonim' : 'Aktifkan mode anonim'}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 flex-shrink-0 self-start sm:self-auto"
              style={{
                background: isMasked ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)',
                color: isMasked ? '#fff' : '#395886',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              {isMasked ? <Lock size={16} aria-hidden="true" /> : <Unlock size={16} aria-hidden="true" />}
              {isMasked ? 'Mode Anonim Aktif' : 'Identitas Terbuka'}
            </button>
          </div>
        </div>

        {/* ── Quick stats ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
          {[
            { label: 'Total Lamaran', value: MOCK_APPS.length.toString(), icon: Briefcase, accent: '#395886' },
            { label: 'Interview Aktif', value: MOCK_APPS.filter(a => a.status === 'interview_requested').length.toString(), icon: Bell, accent: '#628ECB' },
            { label: 'AI Score', value: `${aiScore}/100`, icon: Zap, accent: '#8AAEE0' },
            { label: 'Match Terbaik', value: '94%', icon: TrendingUp, accent: '#395886' },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 border transition-all hover:shadow-md"
              style={{ borderColor: 'var(--color-surface-alt)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--color-bg)' }}
                  aria-hidden="true"
                >
                  <Icon size={18} style={{ color: accent }} />
                </div>
              </div>
              <div className="text-2xl font-bold tabular-nums leading-none mb-1" style={{ color: accent, fontFamily: 'var(--font-mono)' }}>
                {value}
              </div>
              <div className="text-xs font-medium" style={{ color: '#8AAEE0' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Main grid ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left column ──────────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Skill Passport card */}
            <section
              aria-labelledby="passport-heading"
              className="bg-white rounded-2xl border p-6"
              style={{ borderColor: 'var(--color-surface-alt)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2
                  id="passport-heading"
                  className="text-lg md:text-xl font-semibold flex items-center gap-2"
                  style={{ color: '#8AAEE0' }}
                >
                  <Hash size={13} aria-hidden="true" />
                  Skill Passport
                </h2>
                <button
                  onClick={() => onNavigate('kandidat-passport')}
                  className="text-xs font-semibold flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded px-1"
                  style={{ color: '#628ECB' }}
                >
                  Lihat semua <ChevronRight size={13} aria-hidden="true" />
                </button>
              </div>

              {/* AI Score ring */}
              <div
                className="flex items-center gap-4 mb-5 p-4 rounded-2xl"
                style={{ background: 'var(--color-bg)', border: '1px solid var(--color-surface)' }}
              >
                <div
                  className="relative w-16 h-16 flex-shrink-0"
                  role="img"
                  aria-label={`AI Score: ${aiScore} dari 100`}
                >
                  <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90" aria-hidden="true">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#D5DEEF" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none" stroke="#628ECB" strokeWidth="3"
                      strokeDasharray={`${aiScore} ${100 - aiScore}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    className="absolute inset-0 flex items-center justify-center text-sm font-bold"
                    style={{ color: '#395886', fontFamily: 'var(--font-mono)' }}
                  >
                    {aiScore}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: '#395886' }}>AI Score Keseluruhan</div>
                  <div className="text-xs mt-0.5" style={{ color: '#8AAEE0' }}>Dianalisis Gemini 1.5 Pro</div>
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle2 size={12} style={{ color: '#628ECB' }} aria-hidden="true" />
                    <span className="text-xs font-semibold" style={{ color: '#628ECB' }}>Terverifikasi</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {MOCK_SKILLS.map(s => <SkillBar key={s.skill} {...s} />)}
              </div>

              {/* Blockchain hash */}
              <div
                className="mt-5 p-3 rounded-xl border"
                style={{ background: 'var(--color-bg)', borderColor: 'var(--color-surface)' }}
              >
                <div className="flex items-center gap-1.5 text-xs mb-1" style={{ color: '#8AAEE0' }}>
                  <Cpu size={11} aria-hidden="true" />
                  Polygon Blockchain Hash
                </div>
                <div
                  className="text-xs font-mono truncate"
                  style={{ color: '#628ECB' }}
                  title="0x8f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8c29e"
                >
                  0x8f3a9b2c1d4e5f6a...c29e
                </div>
              </div>
            </section>

            {/* Profile card */}
            <section
              aria-labelledby="profile-heading"
              className="bg-white rounded-2xl border p-6"
              style={{ borderColor: 'var(--color-surface-alt)' }}
            >
              <h2 id="profile-heading" className="sr-only">Profil kandidat</h2>
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: isMasked ? '#395886' : '#628ECB' }}
                  aria-hidden="true"
                >
                  {isMasked ? (
                    <span className="text-white font-mono font-bold text-sm">{anonymousId.slice(1)}</span>
                  ) : (
                    <span className="text-white font-bold text-xl">SR</span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold" style={{ color: '#395886' }}>{displayName}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#8AAEE0' }}>
                    {isMasked ? (
                      <span className="inline-flex items-center gap-1">
                        <ShieldCheck size={11} aria-hidden="true" />
                        Identitas terenkripsi AES-256
                      </span>
                    ) : (
                      'Tunarungu · Semarang, Jawa Tengah'
                    )}
                  </div>
                </div>
              </div>

              <dl
                className="grid grid-cols-3 gap-3 text-center pt-4"
                style={{ borderTop: '1px solid var(--color-bg)' }}
              >
                {[
                  { dt: 'Lamaran', dd: '4' },
                  { dt: 'Interview', dd: '1' },
                  { dt: 'AI Score', dd: aiScore.toString() },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="py-2 rounded-xl" style={{ background: 'var(--color-bg)' }}>
                    <dd
                      className="text-xl font-bold tabular-nums"
                      style={{ color: '#395886', fontFamily: 'var(--font-mono)' }}
                    >{dd}</dd>
                    <dt className="text-xs mt-0.5" style={{ color: '#8AAEE0' }}>{dt}</dt>
                  </div>
                ))}
              </dl>
            </section>

            {/* AI Cognitive Translator */}
            <AICognitiveTranslator />
          </div>

          {/* ── Right column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Upload Portfolio */}
            <section
              aria-labelledby="upload-heading"
              className="bg-white rounded-2xl border p-6"
              style={{ borderColor: 'var(--color-surface-alt)' }}
            >
              <h2
                id="upload-heading"
                className="text-lg md:text-xl font-semibold mb-5 flex items-center gap-2"
                style={{ color: '#8AAEE0' }}
              >
                <Upload size={13} aria-hidden="true" />
                Upload Portofolio
              </h2>

              <div
                role="button"
                tabIndex={0}
                aria-label="Area upload portofolio — drag & drop atau tekan Enter untuk memilih file"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all min-h-[140px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
                style={{
                  borderColor: dragOver ? '#628ECB' : 'var(--color-surface-2)',
                  background: dragOver ? 'var(--color-surface)' : 'var(--color-bg)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'var(--color-surface)' }}
                  aria-hidden="true"
                >
                  <Upload size={22} style={{ color: '#395886' }} />
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold" style={{ color: '#395886' }}>
                    {dragOver ? 'Lepaskan untuk upload' : 'Drag & drop atau klik untuk upload'}
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#8AAEE0' }}>
                    PDF, ZIP, PNG, JPG · Maks 50 MB · Tanpa nama/foto
                  </div>
                </div>
              </div>
              <input
                ref={fileInputRef}
                id={fileInputId}
                type="file"
                multiple
                accept=".pdf,.zip,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="sr-only"
                aria-label="Pilih file portofolio"
              />

              {uploads.length > 0 && (
                <ul className="mt-4 space-y-3" aria-label="Daftar file yang diupload">
                  {uploads.map((u, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl border"
                      style={{ background: 'var(--color-bg)', borderColor: 'var(--color-surface)' }}
                    >
                      <FileText size={16} style={{ color: '#8AAEE0' }} className="flex-shrink-0" aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate" style={{ color: '#395886' }}>{u.name}</div>
                        <div
                          className="mt-1.5 h-1.5 rounded-full overflow-hidden"
                          style={{ background: 'var(--color-surface)' }}
                          role="progressbar"
                          aria-valuenow={u.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={u.done ? 'Upload selesai' : `Mengupload: ${u.progress}%`}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${u.progress}%`, background: u.done ? '#628ECB' : '#395886' }}
                          />
                        </div>
                      </div>
                      <span
                        className="text-xs font-bold tabular-nums flex-shrink-0"
                        style={{ color: u.done ? '#628ECB' : '#395886', fontFamily: 'var(--font-mono)' }}
                      >
                        {u.done ? '✓' : `${u.progress}%`}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {uploads.some(u => u.done) && (
                <div
                  className="mt-3 flex items-center gap-2 p-3 rounded-xl border"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  aria-live="polite"
                >
                  <CheckCircle2 size={15} style={{ color: '#395886' }} aria-hidden="true" />
                  <p className="text-xs font-medium" style={{ color: '#395886' }}>
                    Portofolio dianalisis AI — Skill Passport diperbarui.
                  </p>
                </div>
              )}

              <div
                className="mt-3 flex items-start gap-2 p-3 rounded-xl border"
                style={{ background: 'var(--color-bg)', borderColor: 'var(--color-surface-2)' }}
              >
                <AlertTriangle size={13} style={{ color: '#628ECB' }} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs" style={{ color: '#628ECB' }}>
                  <strong>Penting:</strong> Hapus nama, foto, dan informasi identitas dari file sebelum upload
                  agar sistem blind hiring tetap terjaga.
                </p>
              </div>
            </section>

            {/* Recommended jobs */}
            <section
              aria-labelledby="jobs-heading"
              className="bg-white rounded-2xl border p-6"
              style={{ borderColor: 'var(--color-surface-alt)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2
                  id="jobs-heading"
                  className="text-lg md:text-xl font-semibold flex items-center gap-2"
                  style={{ color: '#8AAEE0' }}
                >
                  <Cpu size={13} aria-hidden="true" />
                  Rekomendasi AI
                </h2>
                <span className="text-xs" style={{ color: '#B1C9EF' }}>Berdasarkan Skill Passport Anda</span>
              </div>

              <ul className="space-y-3" aria-label="Daftar lowongan yang direkomendasikan">
                {RECOMMENDED_JOBS.map(job => (
                  <li key={job.id}>
                    <div
                      className="group flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-default"
                      style={{ borderColor: 'var(--color-surface-alt)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.background = 'var(--color-bg)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--color-surface-alt)';
                        e.currentTarget.style.background = '';
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--color-bg)' }}
                        aria-hidden="true"
                      >
                        <Briefcase size={16} style={{ color: '#628ECB' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-sm font-semibold" style={{ color: '#1e293b' }}>{job.title}</div>
                            <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: '#8AAEE0' }}>
                              <MapPin size={11} aria-hidden="true" />
                              {job.company} · {job.location}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div
                              className="text-lg font-bold tabular-nums leading-none"
                              style={{ color: job.match >= 90 ? '#395886' : '#628ECB', fontFamily: 'var(--font-mono)' }}
                            >
                              {job.match}%
                            </div>
                            <div className="text-xs" style={{ color: '#B1C9EF' }}>match</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium" style={{ color: '#628ECB' }}>{job.salary}</span>
                            {job.accessible && (
                              <span className="text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1" style={{ background: 'var(--color-surface)', color: '#395886' }}><Accessibility size={12} /> Aksesibel</span>
                            )}
                          </div>
                          <button
                            onClick={() => onNavigate('kandidat-applications')}
                            className="text-xs text-white px-3 py-1.5 rounded-lg font-semibold transition-all opacity-0 group-hover:opacity-100 hover:opacity-90 min-h-[30px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                            style={{ background: '#395886' }}
                          >Ajukan Lamaran</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onNavigate('job-matching')}
                className="w-full mt-4 py-3 rounded-2xl text-sm font-semibold border transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 flex items-center justify-center gap-2"
                style={{ borderColor: 'var(--color-surface-2)', color: '#628ECB', background: 'var(--color-bg)' }}
              >
                Lihat Semua Lowongan
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </section>

            {/* Application tracker */}
            <section
              aria-labelledby="tracker-heading"
              className="bg-white rounded-2xl border p-6"
              style={{ borderColor: 'var(--color-surface-alt)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2
                  id="tracker-heading"
                  className="text-lg md:text-xl font-semibold flex items-center gap-2"
                  style={{ color: '#8AAEE0' }}
                >
                  <Clock size={13} aria-hidden="true" />
                  Status Lamaran
                </h2>
                <button
                  onClick={() => onNavigate('kandidat-applications')}
                  className="text-xs font-semibold flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded px-1"
                  style={{ color: '#628ECB' }}
                >
                  Semua <ChevronRight size={13} aria-hidden="true" />
                </button>
              </div>
              <ul className="space-y-3" aria-label="Status lamaran pekerjaan">
                {MOCK_APPS.map(app => (
                  <li key={app.id}>
                    <ApplicationRow app={app} onNavigate={onNavigate} />
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
