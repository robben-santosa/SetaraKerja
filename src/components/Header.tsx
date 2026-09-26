import React, { useState } from 'react';
import { HandMetal, ShieldCheck } from 'lucide-react';
import type { Page } from '../types';
import { useUser } from '../contexts/UserContext';

interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userRole?: 'kandidat' | 'hrd' | null;
  onLogout?: () => void;
  /** Pintasan khusus admin: langsung masuk tanpa form login/daftar. */
  onAdminLogin?: () => void;
}

export default function Header({ currentPage, onNavigate, userRole, onLogout, onAdminLogin }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile } = useUser();

  const isDashboard = currentPage.startsWith('kandidat') || currentPage.startsWith('hrd') || currentPage === 'job-matching';

  const navLinks: { label: string; page: Page }[] = userRole === 'kandidat'
    ? [
        { label: 'Beranda', page: 'kandidat' },
        { label: 'Cari Kerja', page: 'job-matching' },
        { label: 'Portofolio', page: 'kandidat-portfolio' },
        { label: 'Skill Passport', page: 'kandidat-passport' },
        { label: 'Lamaran', page: 'kandidat-applications' },
      ]
    : userRole === 'hrd'
    ? [
        { label: 'Beranda', page: 'hrd' },
        { label: 'Kandidat', page: 'hrd-candidates' },
        { label: 'Kepatuhan', page: 'hrd-compliance' },
      ]
    : [];

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{ backdropFilter: 'blur(8px)', background: 'color-mix(in srgb, var(--color-card-bg) 95%, transparent)', borderColor: 'var(--color-border-subtle)' }}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        aria-label="Navigasi utama"
      >
        {/* Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-1"
          aria-label="SetaraKerja — kembali ke beranda"
        >
          <div
            className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="text-lg font-bold"
            style={{ color: 'var(--color-heading)' }}
          >
            SetaraKerja
          </span>
        </button>

        {/* Desktop nav */}
        {isDashboard && navLinks.length > 0 && (
          <div className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                role="listitem"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  currentPage === link.page
                    ? 'bg-[#DBEAFE] dark:bg-[#1e3a5f] text-[#1E40AF] dark:text-[#7eb8ff]'
                    : 'text-[#6B7280] dark:text-[#94a3b8] hover:text-[#111827] dark:hover:text-white hover:bg-[#F8FAFF] dark:hover:bg-[#1e293b]'
                }`}
                aria-current={currentPage === link.page ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {!userRole && (
            <>
              {onAdminLogin && (
                <button
                  onClick={onAdminLogin}
                  className="flex items-center gap-1.5 text-xs font-extrabold text-white px-3.5 py-2 rounded-lg shadow-sm transition-all hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  style={{ background: 'linear-gradient(135deg, #395886, #628ECB)' }}
                  title="Khusus admin — langsung masuk tanpa login atau daftar"
                  aria-label="Masuk langsung sebagai admin, tanpa login atau daftar"
                >
                  <ShieldCheck size={15} aria-hidden="true" />
                  Admin
                </button>
              )}
              <button
                onClick={() => onNavigate('login')}
                className="hidden sm:block text-sm font-medium transition-colors px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Masuk
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="hidden sm:block text-sm font-semibold bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-[#1E40AF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                Daftar Gratis
              </button>
            </>
          )}

          {userRole && (
            <>
              <button
                onClick={() => onNavigate('sign-language')}
                className="hidden sm:flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 hover:text-[#2563EB] dark:hover:text-[#7eb8ff]"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="Buka halaman latihan BISINDO"
              >
                <HandMetal size={17} aria-hidden="true" />
                <span>BISINDO</span>
              </button>

              {/* Settings shortcut — shows real-time avatar from UserContext */}
              <button
                onClick={() => onNavigate('settings')}
                className="flex items-center gap-2 rounded-full transition-colors p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{ '&:hover': { background: 'var(--color-surface)' } } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                aria-label={`Buka pengaturan profil: ${profile.name}`}
              >
                {profile.avatar ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--color-border-subtle)' }}>
                    <img
                      src={profile.avatar}
                      alt={`Foto profil ${profile.name}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ) : (
                  <div
                    className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    aria-hidden="true"
                  >
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate" style={{ color: 'var(--color-text-2)' }}>
                  {profile.name}
                </span>
              </button>

              <div className="w-px h-6" style={{ background: 'var(--color-border-subtle)' }} aria-hidden="true" />

              <button
                onClick={onLogout}
                className="text-sm font-medium hover:text-[#EF4444] transition-colors px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Keluar
              </button>
            </>
          )}

          {/* Mobile menu button */}
          {isDashboard && navLinks.length > 0 && (
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#F8FAFF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && isDashboard && (
        <div id="mobile-menu" className="md:hidden border-t px-4 py-3 space-y-1" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-card-bg)' }}>
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                currentPage === link.page
                  ? 'bg-[#DBEAFE] dark:bg-[#1e3a5f] text-[#1E40AF] dark:text-[#7eb8ff]'
                  : 'text-[#6B7280] dark:text-[#94a3b8] hover:bg-[#F8FAFF] dark:hover:bg-[#1e293b]'
              }`}
              aria-current={currentPage === link.page ? 'page' : undefined}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
