import React, { useEffect, useState } from 'react';
import { Award, Bot, BriefcaseBusiness, Eye, FileText, FolderOpen, Palette, Search, Target, Trophy, UserRound } from 'lucide-react';
import type { Page } from './types';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider, useThemeContext } from './contexts/ThemeContext';
import { useBlindMode } from './hooks/useBlindMode';

import Header from './components/Header';
import Footer from './components/Footer';
import AccessibilityToggle from './components/AccessibilityToggle';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import KandidatDashboard from './pages/KandidatDashboard';
import HRDDashboard from './pages/HRDDashboard';
import InterviewPage from './pages/InterviewPage';
import SignLanguagePage from './pages/SignLanguagePage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import JobMatchingPage from './pages/JobMatchingPage';
import FeedbackPage from './pages/FeedbackPage';
import { InclusiveMap } from './components/InclusiveMap';
import KandidatLayout from './layouts/KandidatLayout';

// ─── Placeholder pages ────────────────────────────────────────────────────────

function KandidatPortfolio({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 30); return () => clearTimeout(t); }, []);

  const statsRow = [
    { icon: Palette, label: 'Total Karya', value: '3', delta: '+1 bln ini', up: true },
    { icon: Eye, label: 'Total Dilihat', value: '1.248', delta: '+5.02%', up: true },
    { icon: Award, label: 'Avg AI Score', value: '88', delta: '-1.72%', up: false },
    { icon: Trophy, label: 'Match Tertinggi', value: '92%', delta: '+3.72%', up: true },
  ];

  const projects = [
    { title: 'Dashboard Analytics', type: 'UI/UX Design', date: 'Agu 2026', score: 92, tags: ['Figma', 'Prototype'], icon: Palette, status: 'Aktif' },
    { title: 'E-Commerce App', type: 'Frontend Dev', date: 'Sep 2026', score: 88, tags: ['React', 'TypeScript'], icon: BriefcaseBusiness, status: 'Aktif' },
    { title: 'API Microservice', type: 'Backend Dev', date: 'Jul 2026', score: 84, tags: ['Node.js', 'PostgreSQL'], icon: FileText, status: 'Review' },
  ];

  const activity = [
    { time: '2j lalu', text: 'Dashboard Analytics dilihat oleh Recruiter #R12', icon: Eye },
    { time: '1h lalu', text: 'AI Score E-Commerce App diperbarui ke 88/100', icon: Bot },
    { time: '3h lalu', text: 'API Microservice masuk shortlist perusahaan', icon: FileText },
  ];

  const statusBars = [
    { label: 'Dilihat Rekruter', pct: 75, color: '#395886' },
    { label: 'Match ke Lowongan', pct: 60, color: '#628ECB' },
    { label: 'Shortlisted', pct: 33, color: '#8AAEE0' },
  ];

  return (
    <div className="min-h-full" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">

        {/* ── Greeting banner ── */}
        <div
          className="rounded-2xl px-7 py-6 mb-6 flex items-center justify-between portfolio-header"
          style={{ background: 'linear-gradient(135deg, #395886 0%, #628ECB 100%)' }}
        >
          <div>
            <div className="text-blue-200 text-sm font-medium mb-1">Selamat datang kembali</div>
            <h1 className="text-2xl font-bold text-white">Portofolio Saya</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ color: '#D5DEEF', border: '1px solid rgba(255,255,255,0.3)' }}>
              Export PDF
            </button>
            <button
              onClick={() => onNavigate('kandidat')}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)' }}
            >
              + Upload Karya
            </button>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsRow.map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 border transition-all hover:shadow-md hover:-translate-y-0.5 portfolio-card-${i + 1} ${mounted ? 'card-visible' : 'card-hidden'}`}
              style={{
                background: 'var(--color-card-bg)',
                borderColor: 'var(--color-border-subtle)',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-surface)' }}>
                  <s.icon size={19} style={{ color: '#395886' }} />
                </div>
                <span className="text-xs font-bold" style={{ color: s.up ? '#22c55e' : '#ef4444' }}>
                  {s.up ? '↑' : '↓'} {s.delta}
                </span>
              </div>
              <div className="text-2xl font-bold mb-0.5 tabular-nums" style={{ color: 'var(--color-heading)', fontFamily: 'var(--font-mono)' }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-4)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Main 2-col ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Left: project list */}
          <div
            className={`lg:col-span-2 rounded-2xl border overflow-hidden ${mounted ? 'card-visible' : 'card-hidden'}`}
            style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)', animationDelay: '0.15s' }}
          >
            <div className="px-6 py-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <div>
                <h2 className="font-bold text-base" style={{ color: 'var(--color-heading)' }}>Karya Aktif</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-4)' }}>{projects.length} karya · Semua terenkripsi &amp; anonim</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  style={{ borderColor: 'var(--color-border)', color: '#628ECB', background: 'var(--color-surface)' }}>←</button>
                <button className="w-8 h-8 rounded-lg border flex items-center justify-center text-sm transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  style={{ borderColor: 'var(--color-border)', color: '#628ECB', background: 'var(--color-surface)' }}>→</button>
              </div>
            </div>

            <div className="divide-y" style={{ '--tw-divide-color': 'var(--color-border-subtle)' } as React.CSSProperties}>
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className="px-6 py-4 flex items-center gap-4 transition-colors hover:bg-blue-50/30 group"
                  style={{ animationDelay: `${0.2 + i * 0.07}s` }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-surface)' }}>
                    <proj.icon size={20} style={{ color: '#395886' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ color: 'var(--color-heading)' }}>{proj.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#628ECB' }}>{proj.type} · {proj.date}</div>
                  </div>
                  <div className="hidden sm:flex flex-wrap gap-1 flex-shrink-0">
                    {proj.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--color-surface)', color: '#628ECB' }}>{t}</span>
                    ))}
                  </div>
                  <div className="text-center flex-shrink-0 w-14">
                    <div className="text-sm font-bold tabular-nums" style={{ color: '#395886', fontFamily: 'var(--font-mono)' }}>{proj.score}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-4)' }}>Score</div>
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0"
                    style={{
                      background: proj.status === 'Aktif' ? '#D5DEEF' : '#fef3c7',
                      color: proj.status === 'Aktif' ? '#395886' : '#92400e',
                    }}
                  >{proj.status}</span>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <div
                className="rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{ borderColor: 'var(--color-border)' }}
                onClick={() => onNavigate('kandidat')}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onNavigate('kandidat')}
              >
                <FolderOpen size={25} className="mx-auto mb-1.5" style={{ color: '#395886' }} />
                <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-text-1)' }}>Tambah Karya Baru</div>
                <p className="text-xs" style={{ color: 'var(--color-text-4)' }}>Drag &amp; drop atau klik · PDF, ZIP, PNG, JPG · Maks 50 MB</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {/* Status bars */}
            <div
              className={`rounded-2xl border p-6 ${mounted ? 'card-visible' : 'card-hidden'}`}
              style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)', animationDelay: '0.25s' }}
            >
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-heading)' }}>Status Karya</h3>
              <p className="text-xs mb-5" style={{ color: 'var(--color-text-4)' }}>Ringkasan per kategori</p>
              <div className="space-y-4">
                {statusBars.map((b, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs" style={{ color: 'var(--color-heading)' }}>{b.label}</span>
                      <span className="text-xs font-bold" style={{ color: b.color }}>{b.pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--color-surface)' }}
                      role="progressbar" aria-valuenow={b.pct} aria-valuemin={0} aria-valuemax={100} aria-label={b.label}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: mounted ? `${b.pct}%` : '0%', background: b.color, transitionDelay: `${0.3 + i * 0.1}s` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div
              className={`rounded-2xl border flex-1 p-6 ${mounted ? 'card-visible' : 'card-hidden'}`}
              style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)', animationDelay: '0.33s' }}
            >
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-heading)' }}>Aktivitas Terkini</h3>
              <p className="text-xs mb-5" style={{ color: 'var(--color-text-4)' }}>Update portofoliomu</p>
              <div className="space-y-4">
                {activity.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-surface)' }}><a.icon size={15} style={{ color: '#395886' }} /></div>
                    <div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-1)' }}>{a.text}</p>
                      <span className="text-xs" style={{ color: 'var(--color-text-4)' }}>{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KandidatPassport({ onNavigate: _nav }: { onNavigate: (p: Page) => void }) {
  const [activeTab, setActiveTab] = React.useState<'skills' | 'activity'>('skills');

  const skills = [
    { skill: 'React.js',     score: 92, level: 'Expert',       verifiedAt: '01 Sep 2026', icon: '⚛' },
    { skill: 'TypeScript',   score: 87, level: 'Advanced',     verifiedAt: '01 Sep 2026', icon: 'TS' },
    { skill: 'UI/UX Design', score: 79, level: 'Advanced',     verifiedAt: '28 Agu 2026', icon: 'UX' },
    { skill: 'Node.js',      score: 74, level: 'Intermediate', verifiedAt: '28 Agu 2026', icon: 'NJ' },
    { skill: 'Figma',        score: 83, level: 'Advanced',     verifiedAt: '01 Sep 2026', icon: 'Fg' },
  ];
  const activity = [
    { time: '2j lalu',  text: 'React.js skill diverifikasi ulang', type: 'verify' },
    { time: '1h lalu',  text: 'AI Score diperbarui ke 83/100',     type: 'score'  },
    { time: '3h lalu',  text: 'Blockchain hash diperbarui',        type: 'chain'  },
    { time: 'Kemarin',  text: 'Figma skill ditambahkan',           type: 'add'    },
    { time: '2h lalu',  text: 'TypeScript diverifikasi komunitas', type: 'verify' },
  ];
  const levelStyle = (l: string) =>
    l === 'Expert'       ? { bg: '#D5DEEF', color: '#395886' } :
    l === 'Advanced'     ? { bg: '#e0f2fe', color: '#0369a1' } :
                           { bg: '#fef9c3', color: '#854d0e' };
  const barColor = (s: number) => s >= 90 ? '#628ECB' : s >= 75 ? '#395886' : '#8AAEE0';
  const avgScore = Math.round(skills.reduce((a, s) => a + s.score, 0) / skills.length);

  const statCards = [
    { label: 'Total Skill',   value: skills.length.toString(), sub: 'Terdaftar',    accent: '#395886' },
    { label: 'AI Score',      value: `${avgScore}`,            sub: 'dari 100',     accent: '#628ECB' },
    { label: 'Terverifikasi', value: '5',                      sub: 'Skill aktif',  accent: '#22c55e' },
    { label: 'Top Skill',     value: 'React.js',               sub: '92 / 100',     accent: '#8AAEE0' },
  ];

  return (
    <div className="min-h-full" style={{ background: 'var(--color-bg)' }}>
      {/* ── Header ── */}
      <div className="px-6 sm:px-8 py-6 border-b flex items-center justify-between" style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#628ECB' }}>SetaraKerja · Skill Passport</p>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-heading)' }}>Skill Passport</h1>
          <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-text-4)' }}>Kandidat #A7F3 · Terakhir diperbarui: 23 Sep 2026</p>
        </div>
        <button
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
          style={{ background: 'linear-gradient(135deg, #395886, #628ECB)' }}
        >
          Download PDF
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">
        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {statCards.map((c, i) => (
            <div key={i} className="rounded-2xl p-5 border transition-all hover:shadow-md" style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-4)' }}>{c.label}</div>
              <div className="text-2xl font-bold leading-none mb-1" style={{ color: c.accent, fontFamily: 'var(--font-mono)' }}>{c.value}</div>
              <div className="text-xs font-bold" style={{ color: 'var(--color-text-4)' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Main layout ── */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Left: skill list ── */}
          <div className="flex-1 min-w-0 rounded-2xl border overflow-hidden" style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}>
            {/* Tabs */}
            <div className="px-6 pt-5 pb-0 flex items-center gap-1 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
              {(['skills', 'activity'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="pb-3 px-3 text-sm font-bold border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  style={{
                    borderBottomColor: activeTab === tab ? '#395886' : 'transparent',
                    color: activeTab === tab ? '#395886' : 'var(--color-text-4)',
                  }}
                >
                  {tab === 'skills' ? 'Skill Saya' : 'Aktivitas'}
                </button>
              ))}
              <div className="ml-auto pb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'var(--color-surface)', color: '#395886' }}>
                  {skills.length} skill
                </span>
              </div>
            </div>

            {/* Tab: Skills */}
            {activeTab === 'skills' && (
              <div>
                <div className="px-6 py-3 grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 text-xs font-bold uppercase tracking-widest border-b" style={{ color: 'var(--color-text-4)', borderColor: 'var(--color-border-subtle)' }}>
                  <span>Skill</span><span>Progress</span><span className="text-right">Level</span><span className="text-right">Score</span><span></span>
                </div>
                {skills.map((s, i) => {
                  const lc = levelStyle(s.level);
                  const bc = barColor(s.score);
                  return (
                    <div
                      key={s.skill}
                      className="px-6 py-4 grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 items-center border-b transition-colors hover:bg-blue-50/20"
                      style={{ borderColor: 'var(--color-border-subtle)' }}
                    >
                      {/* Icon + name */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'var(--color-surface)', color: '#395886' }}>
                          {s.icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold" style={{ color: 'var(--color-heading)' }}>{s.skill}</div>
                          <div className="text-xs font-bold" style={{ color: 'var(--color-text-4)' }}>{s.verifiedAt}</div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div
                        className="h-2.5 rounded-full overflow-hidden"
                        style={{ background: 'var(--color-surface)' }}
                        role="progressbar"
                        aria-valuenow={s.score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${s.skill}: ${s.score}/100`}
                      >
                        <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: `linear-gradient(90deg, #395886, ${bc})` }} />
                      </div>

                      {/* Level badge */}
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: lc.bg, color: lc.color }}>
                        {s.level}
                      </span>

                      {/* Score */}
                      <span className="text-sm font-bold tabular-nums text-right" style={{ color: bc, fontFamily: 'var(--font-mono)' }}>
                        {s.score}/100
                      </span>

                      {/* Actions */}
                      <div className="flex gap-2 justify-end">
                        <button className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" style={{ background: '#395886' }}>
                          Verifikasi
                        </button>
                        <button className="text-xs font-bold px-3 py-1.5 rounded-lg border transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" style={{ borderColor: 'var(--color-border-subtle)', color: '#628ECB', background: 'var(--color-surface)' }}>
                          Riwayat
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Add skill row */}
                <div className="px-6 py-5">
                  <button
                    className="w-full py-3.5 rounded-xl border-2 border-dashed text-sm font-bold transition-all hover:border-blue-400 hover:bg-blue-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    style={{ borderColor: 'var(--color-border)', color: '#628ECB' }}
                  >
                    + Tambah Skill Baru
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Activity */}
            {activeTab === 'activity' && (
              <div className="divide-y" style={{ '--tw-divide-color': 'var(--color-border-subtle)' } as React.CSSProperties}>
                {activity.map((a, i) => (
                  <div key={i} className="px-6 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-surface)' }}>
                      <Award size={16} style={{ color: '#395886' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold" style={{ color: 'var(--color-heading)' }}>{a.text}</div>
                      <div className="text-xs font-bold mt-0.5" style={{ color: 'var(--color-text-4)' }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right panel: diagnostics ── */}
          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
            {/* Blockchain */}
            <div className="rounded-2xl border p-5" style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm" style={{ color: 'var(--color-heading)' }}>Blockchain Hash</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#D5DEEF', color: '#395886' }}>Polygon</span>
              </div>
              <div className="text-xs font-mono px-3 py-2.5 rounded-xl truncate mb-3" style={{ background: 'var(--color-surface)', color: '#628ECB' }}>
                0x8f3a9b2c1d4e5f6a...c29e
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold" style={{ color: 'var(--color-text-4)' }}>Terverifikasi on-chain</span>
              </div>
            </div>

            {/* Verifikasi status */}
            <div className="rounded-2xl border p-5" style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--color-heading)' }}>Status Verifikasi</h3>
              {[
                { label: 'AI Gemini 1.5 Pro', status: 'Selesai', ok: true },
                { label: 'Komunitas Difabel', status: 'Selesai', ok: true },
                { label: 'Rekruter Terverifikasi', status: 'Menunggu', ok: false },
              ].map((v, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <div>
                    <div className="text-xs font-bold" style={{ color: 'var(--color-heading)' }}>{v.label}</div>
                  </div>
                  <span className="text-xs font-bold" style={{ color: v.ok ? '#22c55e' : '#f59e0b' }}>
                    {v.ok ? '✓ ' : '◌ '}{v.status}
                  </span>
                </div>
              ))}
            </div>

            {/* AI Score ring */}
            <div className="rounded-2xl border p-5 text-center" style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--color-heading)' }}>AI Score Keseluruhan</h3>
              <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto mb-3" role="img" aria-label={`AI Score: ${avgScore} dari 100`}>
                <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90" aria-hidden="true">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#D5DEEF" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#628ECB" strokeWidth="3"
                    strokeDasharray={`${avgScore} ${100 - avgScore}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold" style={{ color: '#395886', fontFamily: 'var(--font-mono)' }}>{avgScore}</span>
                  <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-4)' }}>/100</span>
                </div>
              </div>
              <p className="text-xs font-bold" style={{ color: 'var(--color-text-4)' }}>Dianalisis Gemini 1.5 Pro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KandidatKebutuhanPribadi({ onNavigate: _nav }: { onNavigate: (p: Page) => void }) {
  type NeedStatus = 'dibutuhkan' | 'diproses' | 'terpenuhi';
  interface Need {
    id: number; title: string; desc: string; category: string; priority: 'Tinggi' | 'Sedang' | 'Rendah'; status: NeedStatus;
  }
  const [needs, setNeeds] = React.useState<Need[]>([
    { id: 1, title: 'Screen Reader',         desc: 'Butuh screen reader kompatibel NVDA/JAWS untuk navigasi antarmuka web.',               category: 'Teknologi',   priority: 'Tinggi', status: 'dibutuhkan' },
    { id: 2, title: 'Aksesibilitas Kursi Roda', desc: 'Kantor perlu ramp & lift yang aksesibel sesuai standar difabel.',                     category: 'Fisik',       priority: 'Tinggi', status: 'dibutuhkan' },
    { id: 3, title: 'Jam Kerja Fleksibel',    desc: 'Butuh fleksibilitas jam kerja karena kebutuhan terapi rutin dua kali seminggu.',        category: 'Jadwal',      priority: 'Sedang', status: 'diproses'   },
    { id: 4, title: 'Interpreter Bahasa Isyarat', desc: 'Dibutuhkan interpreter BISINDO untuk rapat tim & sesi interview.',                   category: 'Komunikasi',  priority: 'Tinggi', status: 'diproses'   },
    { id: 5, title: 'Kerja Remote',           desc: 'Sistem kerja remote/hybrid karena mobilitas terbatas.',                                  category: 'Jadwal',      priority: 'Sedang', status: 'terpenuhi'  },
    { id: 6, title: 'Closed Caption Otomatis', desc: 'Platform meeting harus mendukung caption otomatis (Google Meet / Zoom CC).',            category: 'Teknologi',   priority: 'Rendah', status: 'terpenuhi'  },
  ]);

  const columns: { key: NeedStatus; label: string; color: string; bg: string }[] = [
    { key: 'dibutuhkan', label: 'Dibutuhkan',  color: '#ef4444', bg: '#fee2e2' },
    { key: 'diproses',   label: 'Diproses',    color: '#f59e0b', bg: '#fef9c3' },
    { key: 'terpenuhi',  label: 'Terpenuhi',   color: '#22c55e', bg: '#dcfce7' },
  ];
  const priorityStyle = (p: string) =>
    p === 'Tinggi' ? { bg: '#fee2e2', color: '#ef4444' } :
    p === 'Sedang' ? { bg: '#fef9c3', color: '#b45309' } :
                     { bg: '#f0fdf4', color: '#15803d' };

  const moveNext = (id: number) => {
    setNeeds(prev => prev.map(n => {
      if (n.id !== id) return n;
      const next: NeedStatus = n.status === 'dibutuhkan' ? 'diproses' : n.status === 'diproses' ? 'terpenuhi' : 'terpenuhi';
      return { ...n, status: next };
    }));
  };

  const statCards = [
    { label: 'Total Kebutuhan', value: needs.length.toString(),                                      accent: '#395886' },
    { label: 'Dibutuhkan',      value: needs.filter(n => n.status === 'dibutuhkan').length.toString(), accent: '#ef4444' },
    { label: 'Diproses',        value: needs.filter(n => n.status === 'diproses').length.toString(),   accent: '#f59e0b' },
    { label: 'Terpenuhi',       value: needs.filter(n => n.status === 'terpenuhi').length.toString(),  accent: '#22c55e' },
  ];

  return (
    <div className="min-h-full" style={{ background: 'var(--color-bg)' }}>
      {/* ── Header ── */}
      <div className="px-6 sm:px-8 py-6 border-b flex items-center justify-between" style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#628ECB' }}>SetaraKerja · Aksesibilitas</p>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-heading)' }}>Kebutuhan Pribadi</h1>
          <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-text-4)' }}>Kelola kebutuhan aksesibilitas & akomodasi Anda</p>
        </div>
        <button
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
          style={{ background: 'linear-gradient(135deg, #395886, #628ECB)' }}
        >
          + Tambah Kebutuhan
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">
        {/* ── Stat tiles ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {statCards.map((c, i) => (
            <div key={i} className="rounded-2xl p-5 border transition-all hover:shadow-md" style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-4)' }}>{c.label}</div>
              <div className="text-3xl font-bold leading-none mb-1" style={{ color: c.accent, fontFamily: 'var(--font-mono)' }}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* ── Kanban board ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {columns.map(col => {
            const colNeeds = needs.filter(n => n.status === col.key);
            return (
              <div key={col.key} className="flex flex-col gap-3">
                {/* Column header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: col.color }} aria-hidden="true" />
                    <span className="text-sm font-bold" style={{ color: 'var(--color-heading)' }}>{col.label}</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: col.bg, color: col.color }}>
                    {colNeeds.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-3">
                  {colNeeds.map(need => {
                    const ps = priorityStyle(need.priority);
                    return (
                      <div
                        key={need.id}
                        className="rounded-2xl border p-4 transition-all hover:shadow-md"
                        style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: 'var(--color-surface)', color: '#628ECB' }}>
                            {need.category}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0" style={{ background: ps.bg, color: ps.color }}>
                            {need.priority}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold mb-1.5" style={{ color: 'var(--color-heading)' }}>{need.title}</h4>
                        <p className="text-xs font-bold leading-relaxed mb-3" style={{ color: 'var(--color-text-4)' }}>{need.desc}</p>
                        {need.status !== 'terpenuhi' && (
                          <button
                            onClick={() => moveNext(need.id)}
                            className="w-full py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                            style={{ background: need.status === 'dibutuhkan' ? '#f59e0b' : '#22c55e' }}
                          >
                            {need.status === 'dibutuhkan' ? 'Ajukan ke HRD →' : 'Tandai Terpenuhi →'}
                          </button>
                        )}
                        {need.status === 'terpenuhi' && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-green-500 text-sm" aria-hidden="true">✓</span>
                            <span className="text-xs font-bold" style={{ color: '#22c55e' }}>Kebutuhan telah terpenuhi</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function KandidatApplications({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const apps = [
    {
      company: 'PT Telkom Indonesia', job: 'Frontend Developer',
      dateDay: 'Sen', dateNum: '20',
      matchScore: 86, sparkPts: '0,18 12,16 24,19 36,14 48,17 60,13 72,15',
      statusLabel: 'Interview', timeLabel: '4j 30m', timeDesc: 'Waktu Review',
      action: 'interview' as Page,
      rowBg: '#1B3A5C', accent: '#7EB3E8',
    },
    {
      company: 'Tokopedia', job: 'UI/UX Designer',
      dateDay: 'Sel', dateNum: '18',
      matchScore: 72, sparkPts: '0,20 12,17 24,21 36,16 48,19 60,16 72,18',
      statusLabel: 'Diseleksi', timeLabel: '3j 20m', timeDesc: 'Waktu Aktif',
      action: null as Page | null,
      rowBg: '#1E4672', accent: '#628ECB',
    },
    {
      company: 'Gojek', job: 'React Developer',
      dateDay: 'Rab', dateNum: '22',
      matchScore: 60, sparkPts: '0,22 12,24 36,20 48,23 60,21 72,22',
      statusLabel: 'Terkirim', timeLabel: '2j 45m', timeDesc: 'Waktu Input',
      action: null as Page | null,
      rowBg: '#234D7B', accent: '#8AAEE0',
    },
    {
      company: 'Bukalapak', job: 'Product Designer',
      dateDay: 'Kam', dateNum: '10',
      matchScore: 95, sparkPts: '0,10 12,8 24,11 36,6 48,9 60,6 72,7',
      statusLabel: 'Diterima', timeLabel: '14 hari', timeDesc: 'Sejak Melamar',
      action: null as Page | null,
      rowBg: '#1A3D2E', accent: '#6EC99A',
    },
  ];

  const statBars = [
    { label: 'Lamaran Aktif', pct: 75, color: '#628ECB' },
    { label: 'Lolos Seleksi', pct: 50, color: '#395886' },
    { label: 'Interview Rate', pct: 25, color: '#8AAEE0' },
  ];

  const gantt = [
    { label: 'Telkom', start: 0, end: 45, color: '#395886' },
    { label: 'Tokopedia', start: 22, end: 66, color: '#628ECB' },
    { label: 'Gojek', start: 52, end: 90, color: '#8AAEE0' },
    { label: 'Bukalapak', start: 8, end: 100, color: '#6EC99A' },
  ];

  const timeLabels = ['Sep 10', 'Sep 14', 'Sep 18', 'Sep 22', 'Sep 26'];

  const schedule = [
    { time: '09:30', job: 'Technical Interview', company: 'PT Telkom', icon: Target },
    { time: '10:40', job: 'HR Screening', company: 'Tokopedia', icon: UserRound },
    { time: '11:50', job: 'Portfolio Review', company: 'Gojek', icon: FolderOpen },
  ];

  const donutR = 50;
  const donutCirc = 2 * Math.PI * donutR;

  return (
    <div className="min-h-full" style={{ background: 'var(--color-surface-alt)' }}>
      <div className="mx-auto px-4 sm:px-5 py-7" style={{ maxWidth: 1120 }}>
        <div className="flex gap-5 items-start">

          {/* ── Main card ── */}
          <div className="flex-1 min-w-0 rounded-3xl shadow-sm overflow-hidden" style={{ background: 'var(--color-card-bg)' }}>

            {/* Card header */}
            <div className="px-7 pt-7 pb-5 flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-heading)' }}>Semua Lamaran</h1>
                <p className="text-sm mt-0.5" style={{ color: '#628ECB' }}>Pantau perkembangan lamaranmu</p>
              </div>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-4)' }} />
                <input
                  type="search"
                  placeholder="Cari lamaran..."
                  className="pl-8 pr-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  style={{ background: 'var(--color-surface-alt)', border: 'none', width: 190 }}
                />
              </div>
            </div>

            {/* Inner two-col: rows+bottom | stats */}
            <div className="flex">

              {/* Left: application rows + bottom */}
              <div className="flex-1 min-w-0">
                {apps.map((app, i) => (
                  <div
                    key={i}
                    className="px-6 py-4 flex items-center gap-4 animate-slide-up opacity-0"
                    style={{ background: app.rowBg, animationDelay: `${0.1 + i * 0.1}s`, animationFillMode: "forwards" }}
                  >
                    {/* Date badge */}
                    <div className="rounded-xl px-3 py-2 text-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)', minWidth: 50 }}>
                      <div className="text-xs font-medium leading-none mb-1" style={{ color: app.accent }}>{app.dateDay}</div>
                      <div className="text-2xl font-bold text-white leading-none">{app.dateNum}</div>
                    </div>

                    {/* Company + job */}
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm truncate">{app.job}</div>
                      <div className="text-xs mt-0.5 truncate" style={{ color: app.accent }}>{app.company}</div>
                    </div>

                    {/* Sparkline + match score */}
                    <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                      <svg width="72" height="28" viewBox="0 0 72 28" aria-hidden="true">
                        <polyline
                          points={app.sparkPts}
                          fill="none"
                          stroke="rgba(255,255,255,0.5)"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-white text-sm font-bold leading-none">{app.matchScore}%</div>
                      <div className="text-xs" style={{ color: app.accent }}>Match Score</div>
                    </div>

                    {/* Time */}
                    <div className="text-center flex-shrink-0">
                      <div className="text-white font-bold text-sm">{app.timeLabel}</div>
                      <div className="text-xs mt-0.5" style={{ color: app.accent }}>{app.timeDesc}</div>
                    </div>

                    {/* Status */}
                    <div className="text-center flex-shrink-0" style={{ minWidth: 86 }}>
                      <div className="text-white font-bold text-sm">{app.statusLabel}</div>
                      <div className="text-xs mt-0.5" style={{ color: app.accent }}>Status</div>
                    </div>

                    {/* Action button */}
                    <div className="flex-shrink-0" style={{ minWidth: 56 }}>
                      {app.action && (
                        <button
                          onClick={() => onNavigate(app.action!)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
                        >Buka</button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Bottom: Gantt + Schedule */}
                <div className="grid grid-cols-5" style={{ borderTop: '1px solid var(--color-surface-alt)' }}>
                  {/* Gantt timeline */}
                  <div className="col-span-3 px-7 py-6" style={{ borderRight: '1px solid var(--color-surface-alt)' }}>
                    <h3 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-heading)' }}>Progres Lamaran</h3>
                    <p className="text-xs mb-4" style={{ color: 'var(--color-border)' }}>Timeline per perusahaan</p>
                    <div className="flex justify-between mb-2 pl-16">
                      {timeLabels.map(t => (
                        <span key={t} className="text-xs" style={{ color: 'var(--color-border)' }}>{t}</span>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {gantt.map((g, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xs w-14 text-right flex-shrink-0" style={{ color: '#628ECB' }}>{g.label}</span>
                          <div className="flex-1 h-5 rounded-full relative overflow-hidden" style={{ background: 'var(--color-surface-alt)' }}>
                            <div
                              className="absolute h-full rounded-full"
                              style={{ left: `${g.start}%`, width: `${g.end - g.start}%`, background: g.color, opacity: 0.85 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming schedule */}
                  <div className="col-span-2 px-6 py-6">
                    <h3 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-heading)' }}>Jadwal Mendatang</h3>
                    <p className="text-xs mb-4" style={{ color: 'var(--color-border)' }}>Interview &amp; screening</p>
                    <div className="space-y-4">
                      {schedule.map((s, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-surface-alt)' }}><s.icon size={15} style={{ color: '#395886' }} /></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold truncate" style={{ color: 'var(--color-heading)' }}>{s.job}</div>
                            <div className="text-xs" style={{ color: 'var(--color-border)' }}>{s.company}</div>
                          </div>
                          <span className="text-xs font-bold flex-shrink-0" style={{ color: '#628ECB' }}>{s.time}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => onNavigate('interview')}
                      className="mt-5 w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      style={{ background: 'linear-gradient(135deg, #395886, #628ECB)' }}
                    >Lihat Semua Jadwal</button>
                  </div>
                </div>
              </div>

              {/* Right: stats panel */}
              <div className="w-52 flex-shrink-0 px-5 py-6" style={{ borderLeft: '1px solid var(--color-surface-alt)' }}>
                <h3 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-heading)' }}>Statistik Sep</h3>
                <p className="text-xs mb-5" style={{ color: 'var(--color-border)' }}>Ringkasan lamaran</p>
                {/* Donut chart */}
                <div className="flex justify-center mb-5">
                  <svg width="128" height="128" viewBox="0 0 140 140" aria-label="4 total lamaran, 75% progres">
                    <defs>
                      <linearGradient id="dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#395886" />
                        <stop offset="100%" stopColor="#628ECB" />
                      </linearGradient>
                    </defs>
                    <circle cx="70" cy="70" r={donutR} fill="none" stroke="var(--color-surface-alt)" strokeWidth="14" />
                    <circle
                      cx="70" cy="70" r={donutR}
                      fill="none"
                      stroke="url(#dGrad)"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray={`${0.75 * donutCirc} ${donutCirc}`}
                      transform="rotate(-90 70 70)"
                    />
                    <text x="70" y="64" textAnchor="middle" fontSize="26" fontWeight="bold" fill="var(--color-heading)">4</text>
                    <text x="70" y="82" textAnchor="middle" fontSize="10" fill="var(--color-border)">Lamaran</text>
                  </svg>
                </div>
                {/* Progress bars */}
                <div className="space-y-4">
                  {statBars.map((b, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs" style={{ color: 'var(--color-heading)' }}>{b.label}</span>
                        <span className="text-xs font-bold" style={{ color: b.color }}>{b.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-alt)' }}>
                        <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Profile panel (right) ── */}
          <div className="w-56 flex-shrink-0">
            <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(165deg, #0C1E35 0%, #14355C 48%, #0E4040 100%)' }}>
              {/* Profile section */}
              <div className="px-6 pt-8 pb-4 text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.22)' }}
                  aria-hidden="true"
                ><UserRound size={28} /></div>
                <div className="text-white font-bold text-base">Kandidat #A7F3</div>
                <div className="text-xs mt-1 mb-4" style={{ color: '#7EB3E8' }}>Penyandang Disabilitas</div>
                <button
                  className="rounded-full px-5 py-1.5 text-xs font-semibold text-white mb-5 transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  style={{ border: '1px solid rgba(255,255,255,0.35)' }}
                >✏️ Edit Profil</button>
                <div className="text-xs mb-2 font-medium" style={{ color: '#7EB3E8' }}>Periode Pencarian:</div>
                <div className="flex gap-2 justify-center">
                  <div className="rounded-xl px-3 py-2 text-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="text-xs" style={{ color: '#7EB3E8' }}>Mulai</div>
                    <div className="text-white font-bold text-sm">01 Sep</div>
                  </div>
                  <div className="rounded-xl px-3 py-2 text-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="text-xs" style={{ color: '#7EB3E8' }}>Target</div>
                    <div className="text-white font-bold text-sm">30 Sep</div>
                  </div>
                </div>
              </div>

              {/* City illustration */}
              <div className="relative" style={{ height: 132 }}>
                <div className="absolute top-3 left-0 right-0 text-center z-10 pointer-events-none">
                  <div className="text-xl font-bold text-white leading-tight">Jakarta</div>
                  <div className="text-xs" style={{ color: '#7EB3E8' }}>Jakarta, Indonesia • WIB</div>
                </div>
                <svg
                  width="100%" height="132" viewBox="0 0 224 132"
                  preserveAspectRatio="xMidYMax slice"
                  aria-hidden="true"
                  style={{ position: 'absolute', bottom: 0, left: 0 }}
                >
                  {/* Background buildings */}
                  <rect x="8"  y="56" width="22" height="76" rx="2" fill="#1A4D6E" opacity="0.75" />
                  <rect x="33" y="42" width="17" height="90" rx="2" fill="#1E5C85" opacity="0.82" />
                  <rect x="54" y="50" width="24" height="82" rx="2" fill="#2468A0" opacity="0.72" />
                  <rect x="82" y="36" width="19" height="96" rx="2" fill="#1B5A7A" opacity="0.88" />
                  <rect x="106" y="46" width="22" height="86" rx="2" fill="#1E6890" opacity="0.72" />
                  <rect x="133" y="39" width="20" height="93" rx="2" fill="#1A5070" opacity="0.82" />
                  <rect x="158" y="53" width="19" height="79" rx="2" fill="#24629A" opacity="0.68" />
                  <rect x="181" y="44" width="24" height="88" rx="2" fill="#1B5580" opacity="0.78" />
                  {/* Ground */}
                  <rect x="0" y="106" width="224" height="26" fill="#0D3A28" opacity="0.92" />
                  {/* Trees */}
                  <ellipse cx="20"  cy="104" rx="16" ry="18" fill="#1B6B4A" />
                  <ellipse cx="204" cy="102" rx="14" ry="17" fill="#1B6B4A" />
                  <ellipse cx="188" cy="108" rx="10" ry="13" fill="#1D7050" />
                  {/* Water reflection */}
                  <rect x="0" y="119" width="224" height="13" fill="#0A2840" opacity="0.68" />
                  {/* Window lights */}
                  <rect x="37"  y="56" width="4" height="3" rx="0.5" fill="#FFE380" opacity="0.7" />
                  <rect x="58"  y="63" width="4" height="3" rx="0.5" fill="#FFE380" opacity="0.6" />
                  <rect x="86"  y="46" width="4" height="3" rx="0.5" fill="#FFE380" opacity="0.8" />
                  <rect x="110" y="57" width="4" height="3" rx="0.5" fill="#FFE380" opacity="0.6" />
                  <rect x="137" y="49" width="4" height="3" rx="0.5" fill="#FFE380" opacity="0.7" />
                  <rect x="163" y="62" width="4" height="3" rx="0.5" fill="#FFE380" opacity="0.5" />
                  <rect x="185" y="54" width="4" height="3" rx="0.5" fill="#FFE380" opacity="0.65" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function HRDCandidates({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <main id="main-content" className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#395886] mb-2" >Kelola Kandidat</h1>
        <p className="text-sm text-slate-500 mb-6">Semua kandidat ditampilkan secara anonim. Identitas hanya tersedia setelah Anda commit interview.</p>
      </div>
    </main>
  );
}

function HRDCompliance({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <main id="main-content" className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#395886] mb-2" >Laporan Kepatuhan UU 8/2016</h1>
        <p className="text-sm text-slate-500 mb-6">PT Telkom Indonesia · Periode: Januari – September 2026</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Karyawan', val: '250', color: 'text-blue-600' },
            { label: 'Kuota Wajib (2%)', val: '5 orang', color: 'text-blue-600' },
            { label: 'Terpenuhi', val: '1 (0.4%)', color: 'text-red-600' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
              <div className={`text-2xl font-bold mb-1 ${item.color}`} style={{ fontFamily: 'var(--font-mono)' }}>{item.val}</div>
              <div className="text-xs text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-[#395886] mb-4">Progress Menuju Kepatuhan</h2>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-2" role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} aria-label="20% kuota tercapai">
            <div className="h-full bg-red-500 rounded-full" style={{ width: '20%' }} />
          </div>
          <p className="text-sm text-slate-500 mb-5">20% tercapai — perlu 4 kandidat difabel lagi untuk memenuhi kuota</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500">
            Export Laporan PDF
          </button>
        </div>
      </div>
    </main>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function AppInner() {
  const [page, setPage] = useState<Page>('landing');
  const [userRole, setUserRole] = useState<'kandidat' | 'hrd' | null>(null);
  const { theme, isDark, toggleTheme } = useThemeContext();
  const { enabled: blindMode, toggle: toggleBlindMode } = useBlindMode();

  // Atur lang dan title per halaman
  useEffect(() => {
    document.documentElement.setAttribute('lang', 'id');
    const titles: Record<Page, string> = {
      landing: 'SetaraKerja — Kerja Berdasarkan Skill, Bukan Fisik',
      login: 'Masuk — SetaraKerja',
      register: 'Daftar — SetaraKerja',
      kandidat: 'Dashboard Kandidat — SetaraKerja',
      'kandidat-portfolio': 'Portofolio — SetaraKerja',
      'kandidat-passport': 'Skill Passport — SetaraKerja',
      'kandidat-applications': 'Semua Lamaran — SetaraKerja',
      hrd: 'Dashboard HRD — SetaraKerja',
      'hrd-candidates': 'Kelola Kandidat — SetaraKerja',
      'hrd-compliance': 'Laporan Kepatuhan — SetaraKerja',
      'kebutuhan-pribadi': 'Kebutuhan Pribadi — SetaraKerja',
      'hrd-map': 'Peta Perusahaan — SetaraKerja',
      interview: 'Sesi Interview — SetaraKerja',
      'sign-language': 'Latihan BISINDO — SetaraKerja',
      settings: 'Pengaturan — SetaraKerja',
      'job-matching': 'Cari Kerja — SetaraKerja',
      help: 'Pusat Bantuan — SetaraKerja',
      feedback: 'Masukan — SetaraKerja',
    };
    document.title = titles[page] ?? 'SetaraKerja';

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      'Platform blind hiring untuk penyandang disabilitas Indonesia. Kerja berdasarkan skill, bukan fisik. Aksesibel WCAG 2.2 AA.';
  }, [page]);

  const navigate = (target: Page) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (role: 'kandidat' | 'hrd') => {
    setUserRole(role);
    navigate(role === 'kandidat' ? 'kandidat' : 'hrd');
  };

  const handleLogout = () => {
    setUserRole(null);
    navigate('landing');
  };

  // Number-key navigation shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key === '1') navigate('landing');
      if (e.key === '2') navigate('login');
      if (e.key === '3') navigate('register');
      if (e.key === '4') navigate(userRole === 'hrd' ? 'hrd' : 'kandidat');
      if (e.key === '5') navigate('sign-language');
      if (e.key === '?') {
        alert(
          'Shortcut Keyboard:\n1 → Beranda\n2 → Masuk\n3 → Daftar\n4 → Dashboard\n5 → BISINDO\nAlt+A → Panel Aksesibilitas\n? → Bantuan ini'
        );
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [userRole]); // eslint-disable-line react-hooks/exhaustive-deps

  const dashboardPage = page.startsWith('kandidat') || page.startsWith('hrd') || page === 'job-matching' || page === 'sign-language' || page === 'settings' || page === 'help' || page === 'feedback' || page === 'kebutuhan-pribadi';
  const showHeader = !dashboardPage && page !== 'interview';
  const showFooter = ['landing', 'login', 'register'].includes(page);

  return (
    <UserProvider initialRole={userRole}>
    <AccessibilityProvider onNavigate={navigate}>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="skip-link"
        tabIndex={0}
      >
        Langsung ke konten utama
      </a>

      <div className="min-h-screen flex flex-col page-transition" key={page}>

        {/* Blind mode status bar */}
        {blindMode && (
          <div
            role="status"
            aria-label="Mode Tunanetra aktif"
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9998] flex items-center gap-2.5 px-5 py-2.5 rounded-full text-white text-xs font-semibold shadow-xl"
            style={{ background: 'linear-gradient(90deg,#395886,#628ECB)' }}
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true" />
            Mode Tunanetra Aktif — Audio panduan kursor menyala
          </div>
        )}

        {showHeader && (
          <Header
            currentPage={page}
            onNavigate={navigate}
            userRole={userRole}
            onLogout={handleLogout}
          />
        )}

        {/* Route map */}
        {page === 'landing'               && <LandingPage onNavigate={navigate} />}
        {page === 'login'                 && <LoginPage onNavigate={navigate} onLogin={handleLogin} />}
        {page === 'register'              && <RegisterPage onNavigate={navigate} onLogin={handleLogin} />}
        {dashboardPage && (
          <KandidatLayout currentPage={page} onNavigate={navigate} onLogout={handleLogout} role={userRole === 'hrd' ? 'hrd' : 'kandidat'}>
            {page === 'kandidat'              && <KandidatDashboard onNavigate={navigate} />}
            {page === 'kandidat-portfolio'    && <KandidatPortfolio onNavigate={navigate} />}
            {page === 'kandidat-passport'     && <KandidatPassport onNavigate={navigate} />}
            {page === 'kandidat-applications' && <KandidatApplications onNavigate={navigate} />}
            {page === 'kebutuhan-pribadi'      && <KandidatKebutuhanPribadi onNavigate={navigate} />}
            {page === 'job-matching'          && <JobMatchingPage onNavigate={navigate} />}
            {page === 'sign-language'         && <SignLanguagePage onNavigate={navigate} />}
            {page === 'hrd'                    && <HRDDashboard onNavigate={navigate} onLogout={handleLogout} />}
            {page === 'hrd-candidates'         && <HRDCandidates onNavigate={navigate} />}
            {page === 'hrd-compliance'         && <HRDCompliance onNavigate={navigate} />}
            {page === 'hrd-map'                && <section className="min-h-full bg-[#E8EFF9] px-4 py-7 sm:px-6"><div className="mx-auto max-w-6xl"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-widest text-[#628ECB]">Jaringan inklusif</p><h1 className="mt-1 text-2xl font-bold text-[#395886]">Peta perusahaan inklusif</h1></div><InclusiveMap /></div></section>}
            {page === 'settings'               && <SettingsPage onNavigate={navigate} userRole={userRole} theme={theme} onToggleTheme={toggleTheme} blindMode={blindMode} onToggleBlindMode={toggleBlindMode} isDark={isDark} />}
            {page === 'help'                   && <HelpPage onNavigate={navigate} userRole={userRole} isDark={isDark} />}
            {page === 'feedback'               && <FeedbackPage role={userRole ?? 'kandidat'} />}
          </KandidatLayout>
        )}
        {page === 'interview'             && <InterviewPage onNavigate={navigate} userRole={userRole ?? 'kandidat'} />}

        {showFooter && <Footer onNavigate={navigate} />}
      </div>

      {/* Accessibility FAB — always visible */}
      <AccessibilityToggle />
    </AccessibilityProvider>
    </UserProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
