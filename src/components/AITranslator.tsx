import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, BrainCircuit } from 'lucide-react';

export function AICognitiveTranslator() {
  const [inputText, setInputText] = useState("Kandidat diharapkan memiliki kompetensi manajerial yang komprehensif, proaktif dalam inisiasi strategis, dan mampu beradaptasi dengan volatilitas dinamika pasar terkini.");
  const [isTranslating, setIsTranslating] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState("");

  const handleTranslate = () => {
    setIsTranslating(true);
    setSimplifiedText("");
    
    // Simulate AI translation delay
    setTimeout(() => {
      setSimplifiedText("Kamu harus bisa memimpin teman-temanmu, berani memberi ide baru, dan mudah belajar hal baru saat suasana di tempat kerja berubah-ubah.");
      setIsTranslating(false);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-[#F0F3FA] to-[#D5DEEF] rounded-2xl border border-[#B1C9EF] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold" style={{ color: '#395886' }}>
          <span className="flex items-center gap-2 uppercase tracking-wider">
            <BrainCircuit size={16} />
            AI Asisten Kognitif (Penyederhana Bahasa)
          </span>
        </h2>
        <span className="text-[10px] font-medium bg-white text-blue-700 px-2 py-1 rounded-full border border-blue-200">
          Beta
        </span>
      </div>
      
      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
        Fitur ini menerjemahkan kalimat yang sulit dipahami (seperti deskripsi pekerjaan yang rumit) menjadi bahasa yang lebih sederhana dan mudah dimengerti.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Teks Asli (Rumit):</label>
          <textarea
            className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#8AAEE0] transition-shadow resize-none"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Masukkan teks rumit di sini..."
          />
        </div>

        <button
          onClick={handleTranslate}
          disabled={isTranslating || !inputText}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 disabled:opacity-70"
          style={{ background: '#395886' }}
        >
          {isTranslating ? (
            <span className="animate-pulse flex items-center gap-2">
              <Sparkles size={16} /> Sedang Menyederhanakan...
            </span>
          ) : (
            <>
              Sederhanakan Bahasa <ArrowRight size={16} />
            </>
          )}
        </button>

        <div className={`transition-all duration-500 overflow-hidden ${simplifiedText ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0'}`}>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <BookOpen size={12} className="text-emerald-600" />
            Teks Sederhana (Mudah Dimengerti):
          </label>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-sm font-medium text-emerald-900 leading-relaxed">
              {simplifiedText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
