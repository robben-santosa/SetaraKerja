const fs = require('fs');
let code = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');

// Add import
if (!code.includes('import laptopImg')) {
  code = code.replace(
    "import type { Page } from '../types';", 
    "import type { Page } from '../types';\nimport laptopImg from '../assets/laptop2.png';"
  );
}

const oldCard = `            {/* Main HRD mock card */}
            <div
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 w-full max-w-sm z-[5]"
              role="img"
              aria-label="Contoh tampilan kandidat anonim di dashboard HRD"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Dashboard HRD — Anonim</div>
                  <div className="text-sm font-semibold text-slate-900">Frontend Developer · 3 Pelamar</div>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                  <Lock size={12} className="text-blue-700" aria-hidden="true" />
                  <span className="text-xs font-medium" style={{ color: '#395886' }}>AES-256</span>
                </div>
              </div>

              {[
                { id: '#CAND-8902', skills: [['React', 92], ['TypeScript', 87], ['UI/UX', 79]] as [string, number][], ai: 89 },
                { id: '#CAND-3341', skills: [['Python', 95], ['FastAPI', 88], ['SQL', 91]] as [string, number][], ai: 92 },
              ].map(c => (
                <div key={c.id} className="mb-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#395886' }} aria-hidden="true">
                        <UserRound size={16} className="text-blue-200" />
                      </div>
                      <div>
                        <div className="text-sm font-bold" style={{ fontFamily: 'var(--font-mono)', color: '#395886' }}>{c.id}</div>
                        <div className="text-xs text-slate-400">Identitas terenkripsi</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">AI Score</div>
                      <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: '#628ECB' }}>{c.ai}/100</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.skills.map(([s, score]) => (
                      <div key={s} className="flex items-center gap-1.5 bg-white border border-blue-100 rounded-lg px-2 py-1">
                        <span className="text-xs text-slate-600">{s}</span>
                        <span className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: '#395886' }}>{score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <Lock size={14} className="text-blue-700 flex-shrink-0" aria-hidden="true" />
                <p className="text-xs" style={{ color: '#395886' }}>
                  <strong>Identitas terkunci.</strong> Tersedia setelah HRD request &amp; kandidat setuju.
                </p>
              </div>
            </div>`;

const newCard = `            {/* Right: Laptop Image */}
            <div className="w-full max-w-lg z-10 flex items-center justify-center">
              <img src={laptopImg} alt="Laptop Interface" className="w-full h-auto drop-shadow-2xl rounded-2xl" />
            </div>`;

if (code.includes(oldCard)) {
  code = code.replace(oldCard, newCard);
  fs.writeFileSync('src/pages/LandingPage.tsx', code);
  console.log('Patched');
} else {
  console.log('Not found');
}
