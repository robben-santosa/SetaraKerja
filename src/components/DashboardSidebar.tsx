import React, { useState } from 'react';
import type { Page } from '../types';
import {
  LayoutDashboard,
  Search,
  ClipboardList,
  FolderOpen,
  Award,
  HandMetal,
  Settings,
  LogOut,
  ShieldCheck,
  Users,
  MessageSquare,
  HelpCircle,
  Map,
  Menu,
  X,
  Heart,
} from 'lucide-react';

interface NavItem {
  label: string;
  page: Page;
  icon: React.FC<{ size: number; 'aria-hidden'?: boolean | 'true' }>;
}

const CANDIDATE_NAV: NavItem[] = [
  { label: 'Dashboard', page: 'kandidat', icon: LayoutDashboard },
  { label: 'Cari Kerja', page: 'job-matching', icon: Search },
  { label: 'Lamaran', page: 'kandidat-applications', icon: ClipboardList },
  { label: 'Portofolio', page: 'kandidat-portfolio', icon: FolderOpen },
  { label: 'Skill Passport', page: 'kandidat-passport', icon: Award },
  { label: 'Kebutuhan Pribadi', page: 'kebutuhan-pribadi', icon: Heart },
  { label: 'BISINDO AI', page: 'sign-language', icon: HandMetal },
  { label: 'Feedback', page: 'feedback', icon: MessageSquare },
  { label: 'Pengaturan', page: 'settings', icon: Settings },
  { label: 'Bantuan', page: 'help', icon: HelpCircle },
];
const HRD_NAV: NavItem[] = [
  { label: 'Dashboard', page: 'hrd', icon: LayoutDashboard },
  { label: 'Kandidat', page: 'hrd-candidates', icon: Users },
  { label: 'Kepatuhan', page: 'hrd-compliance', icon: ShieldCheck },
  { label: 'Peta Perusahaan', page: 'hrd-map', icon: Map },
  { label: 'Feedback', page: 'feedback', icon: MessageSquare },
  { label: 'Pengaturan', page: 'settings', icon: Settings },
  { label: 'Bantuan', page: 'help', icon: HelpCircle },
];

interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userName: string;
  userAvatar?: string;
  role?: 'kandidat' | 'hrd';
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function DashboardSidebar({ currentPage, onNavigate, onLogout, userName, userAvatar, role = 'kandidat', collapsed = false, onToggle }: Props) {
  const navItems = role === 'hrd' ? HRD_NAV : CANDIDATE_NAV;
  const isActive = (page: Page) =>
    page === 'kandidat' ? currentPage === 'kandidat' : currentPage === page;
  const [clickedPage, setClickedPage] = useState<Page | null>(null);

  const handleNavClick = (page: Page) => {
    setClickedPage(page);
    setTimeout(() => setClickedPage(null), 350);
    onNavigate(page);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#395886' }}>
      {/* Logo */}
      <div
        className={`flex items-center ${collapsed ? 'justify-center px-3' : 'gap-3 px-5'} py-5 flex-shrink-0`}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.15)' }}
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
        {!collapsed && <div>
          <div
            className="text-xl font-bold text-white leading-none"
            
          >
            SetaraKerja
          </div>
          <div className="text-[11px] mt-0.5 font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Blind Hiring Protocol Platform
          </div>
        </div>}
        <button onClick={onToggle} className={`${collapsed ? 'absolute top-4 -right-10 bg-[#395886] rounded-r-xl' : 'ml-auto'} p-2 text-white/70 hover:text-white`} aria-label={collapsed ? 'Buka sidebar' : 'Tutup sidebar'}>{collapsed ? <Menu size={18}/> : <X size={18}/>}</button>
      </div>

      {/* Nav */}
      <nav className={`${collapsed ? 'px-2' : 'px-3'} py-4`} aria-label={`Menu ${role === 'hrd' ? 'HRD' : 'kandidat'}`}>
        {!collapsed && <p className="text-xs font-semibold uppercase tracking-widest px-4 mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Menu Utama
        </p>}
        <ul className="space-y-0.5" role="list">
          {navItems.map(item => {
            const active = isActive(item.page);
            const Icon = item.icon;
            return (
              <li key={item.page}>
                <button
                  onClick={() => handleNavClick(item.page)}
                  aria-current={active ? 'page' : undefined}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-2.5 rounded-xl text-sm font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 ${clickedPage === item.page ? 'nav-click-anim' : ''}`}
                  aria-label={collapsed ? item.label : undefined}
                  style={{
                    background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                    focusVisibleRingColor: 'rgba(255,255,255,0.5)',
                  } as React.CSSProperties}
                  onMouseEnter={e => {
                    if (!active) {
                      const el = e.currentTarget;
                      el.style.background = 'rgba(255,255,255,0.08)';
                      el.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      const el = e.currentTarget;
                      el.style.background = 'transparent';
                      el.style.color = 'rgba(255,255,255,0.65)';
                    }
                  }}
                >
                  <Icon size={18} aria-hidden="true" />
                  {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                  {active && !collapsed && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#B1C9EF' }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User + Logout */}
      <div
        className={`${collapsed ? 'px-2' : 'px-3'} mt-2 pb-5 flex-shrink-0`}
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        {/* User info */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-1' : 'gap-3 px-3'} pt-4 pb-3`}>
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={`Foto profil ${userName}`}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0 border-2"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
              aria-hidden="true"
            >
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          {!collapsed && <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-white truncate leading-none">{userName}</div>
            <div
              className="text-[11px] flex items-center gap-1 mt-0.5"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              <ShieldCheck size={10} aria-hidden="true" />
              Terverifikasi
            </div>
          </div>}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-2.5 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2`}
          aria-label="Keluar"
          style={{ color: 'rgba(255,255,255,0.55)' }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.background = 'rgba(255,100,100,0.15)';
            el.style.color = '#ffb3b3';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.background = 'transparent';
            el.style.color = 'rgba(255,255,255,0.55)';
          }}
        >
          <LogOut size={18} aria-hidden="true" />
          {!collapsed && 'Keluar'}
        </button>
      </div>
    </div>
  );
}
