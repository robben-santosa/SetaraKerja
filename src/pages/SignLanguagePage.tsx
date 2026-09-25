import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Camera,
  CameraOff,
  Trash2,
  BookOpen,
  MessageSquare,
  ChevronLeft,
  Info,
  Zap,
  AlertTriangle,
  HandMetal,
  Landmark,
} from 'lucide-react';
import type { Page } from '../types';
import Webcam from 'react-webcam';

interface Props { onNavigate: (page: Page) => void; }

// ─── BISINDO dictionary ───────────────────────────────────────────────────────

const BISINDO_WORDS: { word: string; symbol: string; meaning: string; category: string }[] = [
  { word: 'HALO', symbol: 'HA', meaning: 'Salam pembuka', category: 'Sapaan' }, { word: 'TERIMA KASIH', symbol: 'TK', meaning: 'Ungkapan syukur', category: 'Sapaan' }, { word: 'MAAF', symbol: 'MF', meaning: 'Permintaan maaf', category: 'Sapaan' }, { word: 'PERMISI', symbol: 'PM', meaning: 'Meminta izin lewat', category: 'Sapaan' }, { word: 'SELAMAT', symbol: 'SL', meaning: 'Ucapan selamat', category: 'Sapaan' }, { word: 'PAGI', symbol: 'PG', meaning: 'Waktu pagi hari', category: 'Waktu' }, { word: 'SAYA', symbol: 'SY', meaning: 'Kata ganti diri sendiri', category: 'Pronoun' }, { word: 'NAMA', symbol: 'NM', meaning: 'Identitas seseorang', category: 'Pronoun' }, { word: 'SIAPA', symbol: 'SP', meaning: 'Pertanyaan identitas', category: 'Pertanyaan' }, { word: 'APA', symbol: 'AP', meaning: 'Pertanyaan umum', category: 'Pertanyaan' }, { word: 'DI MANA', symbol: 'DM', meaning: 'Pertanyaan lokasi', category: 'Pertanyaan' }, { word: 'KAPAN', symbol: 'KP', meaning: 'Pertanyaan waktu', category: 'Pertanyaan' }, { word: 'BAGAIMANA', symbol: 'BG', meaning: 'Pertanyaan cara', category: 'Pertanyaan' }, { word: 'KERJA', symbol: 'KR', meaning: 'Pekerjaan / bekerja', category: 'Kerja' }, { word: 'LAMAR', symbol: 'LM', meaning: 'Melamar pekerjaan', category: 'Kerja' }, { word: 'BISA', symbol: 'BS', meaning: 'Mampu melakukan sesuatu', category: 'Ekspresi' }, { word: 'TIDAK', symbol: 'TD', meaning: 'Negasi / penolakan', category: 'Ekspresi' }, { word: 'YA', symbol: 'YA', meaning: 'Persetujuan', category: 'Ekspresi' }, { word: 'TOLONG', symbol: 'TL', meaning: 'Meminta bantuan', category: 'Ekspresi' }, { word: 'BANTU', symbol: 'BT', meaning: 'Memberikan bantuan', category: 'Ekspresi' },
];

const PHRASES = [
  { bisindo: 'SAYA + MAU + KERJA', id: 'Saya ingin bekerja di sini', cat: 'Interview' },
  { bisindo: 'NAMA + SAYA + ...', id: 'Nama saya adalah...', cat: 'Perkenalan' },
  { bisindo: 'SAYA + BISA + DESAIN', id: 'Saya bisa melakukan desain', cat: 'Skill' },
  { bisindo: 'KAPAN + MULAI + KERJA', id: 'Kapan saya bisa mulai bekerja?', cat: 'Interview' },
  { bisindo: 'TOLONG + BANTU + SAYA', id: 'Tolong bantu saya', cat: 'Bantuan' },
  { bisindo: 'TERIMA + KASIH + SUDAH', id: 'Terima kasih sudah...', cat: 'Sapaan' },
  { bisindo: 'SAYA + TIDAK + MENGERTI', id: 'Saya tidak mengerti', cat: 'Klarifikasi' },
  { bisindo: 'BISA + ULANG + APA', id: 'Bisa diulang? Apa tadi?', cat: 'Klarifikasi' },
];

const CATEGORIES = ['Semua', 'Sapaan', 'Waktu', 'Pronoun', 'Pertanyaan', 'Kerja', 'Ekspresi'];

type TabValue = 'camera' | 'dictionary' | 'phrases';

// ─── Component ────────────────────────────────────────────────────────────────

export default function SignLanguagePage({ onNavigate }: Props) {
  const [tab, setTab] = useState<TabValue>('camera');
  const [cameraState, setCameraState] = useState<'idle' | 'requesting' | 'active' | 'error' | 'unsupported'>('idle');
  const [detectedWords, setDetectedWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<typeof BISINDO_WORDS[0] | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [dictSearch, setDictSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(false);

  const stopCamera = useCallback(() => {
    activeRef.current = false;
    if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current);
    setCameraState('idle');
    setCurrentWord(null);
  }, []);

  const startCamera = useCallback(async () => {
    setCameraState('requesting');
  }, []);

  const handleUserMedia = () => {
    setCameraState('active');
    activeRef.current = true;
    
    // Simulate MediaPipe Holistic + TensorFlow.js BISINDO detection
    let idx = 0;
    if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current);
    detectionIntervalRef.current = setInterval(() => {
      const word = BISINDO_WORDS[idx % BISINDO_WORDS.length];
      const conf = Math.round(76 + Math.random() * 20);
      setCurrentWord(word);
      setConfidence(conf);
      if (idx % 4 === 0) {
        setDetectedWords(prev => [...prev.slice(-11), word.word]);
      }
      idx++;
    }, 1100);
  };

  const handleUserMediaError = () => {
    setCameraState('error');
  };

  useEffect(() => () => stopCamera(), [stopCamera]);

  const filteredDict = BISINDO_WORDS.filter(w => {
    const matchCat = activeCategory === 'Semua' || w.category === activeCategory;
    const matchSearch = !dictSearch
      || w.word.toLowerCase().includes(dictSearch.toLowerCase())
      || w.meaning.toLowerCase().includes(dictSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main id="main-content" className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Page header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <button
              onClick={() => onNavigate('kandidat')}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Kembali ke Dashboard
            </button>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2" >
              <HandMetal size={23} aria-hidden="true" /> BISINDO AI Interpreter
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Bahasa Isyarat Indonesia — AI real-time via MediaPipe Holistic + TensorFlow.js
            </p>
          </div>
          {cameraState === 'active' && (
            <div
              role="status"
              className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold text-emerald-700">Mendeteksi</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 p-1 bg-white border border-slate-200 rounded-xl w-fit mb-6"
          role="tablist"
          aria-label="Bagian halaman BISINDO"
        >
          {[
            { value: 'camera' as TabValue, icon: Camera, label: 'Interpreter' },
            { value: 'dictionary' as TabValue, icon: BookOpen, label: 'Kamus' },
            { value: 'phrases' as TabValue, icon: MessageSquare, label: 'Frasa' },
          ].map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.value}
                role="tab"
                aria-selected={tab === t.value}
                aria-controls={`tabpanel-${t.value}`}
                id={`tab-${t.value}`}
                onClick={() => setTab(t.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  tab === t.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ── CAMERA TAB ─────────────────────────────────────────────────── */}
        {tab === 'camera' && (
          <div
            id="tabpanel-camera"
            role="tabpanel"
            aria-labelledby="tab-camera"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Camera viewport */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-2xl overflow-hidden aspect-video relative">
                {cameraState !== 'idle' && cameraState !== 'unsupported' && (
                  <Webcam
                    audio={false}
                    onUserMedia={handleUserMedia}
                    onUserMediaError={handleUserMediaError}
                    videoConstraints={{ facingMode: 'user' }}
                    className={`w-full h-full object-cover ${cameraState !== 'active' ? 'hidden' : ''}`}
                    aria-label="Feed kamera untuk deteksi gerakan tangan BISINDO"
                  />
                )}

                {/* Detection overlay */}
                {cameraState === 'active' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute border-2 border-emerald-400 rounded-xl opacity-60"
                      style={{ top: '18%', left: '28%', width: '44%', height: '62%' }}
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-black/75 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center justify-between text-xs text-white mb-1.5">
                          <div className="flex items-center gap-2">
                            <Zap size={12} className="text-emerald-400" aria-hidden="true" />
                            <span>Terdeteksi: <strong>{currentWord?.word ?? '—'}</strong></span>
                          </div>
                          <span className="font-mono text-emerald-400">{confidence}%</span>
                        </div>
                        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full transition-all"
                            style={{ width: `${confidence}%` }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                    {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map(pos => (
                      <span key={pos} className={`absolute ${pos} text-emerald-400 text-base opacity-60`} aria-hidden="true">+</span>
                    ))}
                  </div>
                )}

                {/* Idle / error / unsupported states */}
                {cameraState === 'idle' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
                    <Camera size={48} className="opacity-30" aria-hidden="true" />
                    <div className="text-center">
                      <div className="font-semibold mb-1">BISINDO AI Interpreter</div>
                      <p className="text-sm text-slate-300 max-w-xs text-center">
                        Aktifkan kamera untuk mulai deteksi gerakan tangan BISINDO secara real-time
                      </p>
                    </div>
                    <button
                      onClick={startCamera}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                    >
                      Aktifkan Kamera
                    </button>
                  </div>
                )}
                {cameraState === 'requesting' && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="w-10 h-10 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" aria-hidden="true" />
                      <p className="text-sm">Meminta izin kamera…</p>
                    </div>
                  </div>
                )}
                {cameraState === 'error' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white p-6 text-center">
                    <CameraOff size={40} className="opacity-50" aria-hidden="true" />
                    <div>
                      <div className="font-semibold">Kamera tidak dapat diakses</div>
                      <p className="text-sm text-slate-300 mt-1">Pastikan Anda mengizinkan akses kamera di browser.</p>
                    </div>
                    <button
                      onClick={startCamera}
                      className="bg-slate-700 text-white px-4 py-2 rounded-xl text-sm hover:bg-slate-600 transition-colors min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      Coba Lagi
                    </button>
                  </div>
                )}
                {cameraState === 'unsupported' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white p-6 text-center">
                    <AlertTriangle size={40} className="opacity-50" aria-hidden="true" />
                    <div>
                      <div className="font-semibold">Browser Tidak Mendukung</div>
                      <p className="text-sm text-slate-300 mt-1">Gunakan Chrome, Firefox, atau Edge versi terbaru.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera controls */}
              <div className="flex gap-3 mt-3">
                {cameraState === 'active' ? (
                  <button
                    onClick={stopCamera}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                  >
                    <CameraOff size={16} aria-hidden="true" />
                    Matikan Kamera
                  </button>
                ) : (
                  <button
                    onClick={startCamera}
                    disabled={cameraState === 'requesting'}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 min-h-[44px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                  >
                    <Camera size={16} aria-hidden="true" />
                    Aktifkan Kamera
                  </button>
                )}
                <button
                  onClick={() => setDetectedWords([])}
                  aria-label="Hapus output teks"
                  className="flex items-center justify-center border border-slate-200 text-slate-500 py-2.5 px-4 rounded-xl hover:bg-slate-100 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>

              {/* Tech badge */}
              <div className="mt-3 flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <Info size={14} className="text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-blue-800">
                  <strong>Demo:</strong> Produksi menggunakan MediaPipe Holistic (543 landmark) + TensorFlow.js
                  model yang dilatih pada dataset BISINDO Indonesia. Deteksi disimulasikan di demo ini.
                </p>
              </div>
            </div>

            {/* Output panel */}
            <div className="space-y-4">
              {/* Detected text output */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Output Teks</h2>
                  <span className="text-xs text-slate-400" aria-live="polite">Real-time</span>
                </div>

                <div
                  className="min-h-[100px] p-3 bg-slate-50 border border-slate-200 rounded-xl mb-3"
                  aria-live="polite"
                  aria-label="Teks hasil deteksi bahasa isyarat"
                >
                  {detectedWords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {detectedWords.map((word, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-1 rounded-lg text-sm font-medium transition-all ${
                            i === detectedWords.length - 1
                              ? 'bg-blue-600 text-white scale-105'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm text-center pt-4">
                      {cameraState === 'active' ? 'Gerakan tangan di depan kamera…' : 'Aktifkan kamera untuk mulai'}
                    </p>
                  )}
                </div>

                {detectedWords.length > 0 && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="text-xs font-semibold text-emerald-800 mb-0.5">Frasa terbentuk:</div>
                    <div className="text-sm text-emerald-900">{detectedWords.slice(-6).join(' ').toLowerCase()}</div>
                  </div>
                )}
              </div>

              {/* Current gesture detail */}
              {currentWord && cameraState === 'active' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-fade-in">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Gestur Saat Ini</div>
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D5DEEF] text-sm font-bold text-[#395886]" aria-hidden="true">{currentWord.symbol}</span>
                    <div>
                      <div className="font-bold text-slate-900" style={{ fontFamily: 'var(--font-mono)' }}>{currentWord.word}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{currentWord.meaning}</div>
                      <div className="inline-block mt-1 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                        {currentWord.category}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── DICTIONARY TAB ─────────────────────────────────────────────── */}
        {tab === 'dictionary' && (
          <div id="tabpanel-dictionary" role="tabpanel" aria-labelledby="tab-dictionary">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <label htmlFor="dict-search" className="sr-only">Cari kata BISINDO</label>
              <input
                id="dict-search"
                type="search"
                value={dictSearch}
                onChange={e => setDictSearch(e.target.value)}
                placeholder="Cari kata (mis: kerja, saya, tolong…)"
                className="flex-1 max-w-sm px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      activeCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredDict.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" role="list" aria-label="Kamus kata BISINDO">
                {filteredDict.map(item => (
                  <div
                    key={item.word}
                    role="listitem"
                    className="bg-white rounded-2xl border border-slate-200 p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#D5DEEF] text-xs font-bold text-[#395886]" aria-hidden="true">{item.symbol}</div>
                    <div className="font-bold text-sm text-slate-900 mb-0.5" style={{ fontFamily: 'var(--font-mono)' }}>{item.word}</div>
                    <div className="text-xs text-slate-400 leading-snug">{item.meaning}</div>
                    <div className="mt-2 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full inline-block">{item.category}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400">
                <BookOpen size={40} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
                <p className="text-sm font-medium">Kata tidak ditemukan</p>
                <p className="text-xs mt-1">Coba kata lain atau ubah filter kategori</p>
              </div>
            )}
          </div>
        )}

        {/* ── PHRASES TAB ────────────────────────────────────────────────── */}
        {tab === 'phrases' && (
          <div id="tabpanel-phrases" role="tabpanel" aria-labelledby="tab-phrases">
            <p className="text-sm text-slate-500 mb-6">Frasa BISINDO yang umum digunakan saat melamar kerja dan interview.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="Frasa umum BISINDO untuk konteks kerja">
              {PHRASES.map(p => (
                <div
                  key={p.bisindo}
                  role="listitem"
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-sm hover:border-blue-200 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="font-bold text-sm text-blue-700 leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
                      {p.bisindo}
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full flex-shrink-0">{p.cat}</span>
                  </div>
                  <div className="text-sm text-slate-600">{p.id}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-white">
              <h2 className="font-bold mb-3 flex items-center gap-2">
                <Landmark size={19} aria-hidden="true" />
                Tentang BISINDO
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-white">Bahasa Isyarat Indonesia (BISINDO)</strong> adalah bahasa isyarat natural
                yang digunakan komunitas tunarungu Indonesia. Berbeda dengan SIBI yang berbasis bahasa lisan,
                BISINDO adalah bahasa visual-gestural dengan tata bahasa sendiri. SetaraKerja mendukung BISINDO
                untuk memberdayakan{' '}
                <strong className="text-white">2,6 juta tunarungu</strong> di Indonesia mengakses pasar kerja formal.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
