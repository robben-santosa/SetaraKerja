import re

with open('src/pages/HRDDashboard.tsx', 'r') as f:
    content = f.read()

# Add isSidebarOpen state
content = content.replace(
    'const today = new Date().toLocaleDateString',
    'const [isSidebarOpen, setIsSidebarOpen] = useState(true);\n  const today = new Date().toLocaleDateString'
)

# Remove the "kembali" cursor-pointer part and replace with a toggle
sidebar_header = """<div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 bg-[#395886] rounded-xl flex items-center justify-center text-white font-bold italic text-xl">S</div>
            <span className="font-bold text-lg">SetaraKerja</span>
          </div>"""

new_sidebar_header = """<div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#395886] rounded-xl flex items-center justify-center text-white font-bold italic text-xl">S</div>
              {isSidebarOpen && <span className="font-bold text-lg">SetaraKerja</span>}
            </div>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-slate-600 focus-visible:outline-none">
              <div className="w-6 h-6 flex items-center justify-center">☰</div>
            </button>
          </div>"""

content = content.replace(sidebar_header, new_sidebar_header)

# Make the sidebar width conditional
content = content.replace(
    '<aside className="w-64 bg-white rounded-3xl p-6 flex flex-col justify-between shrink-0 shadow-sm">',
    '<aside className={`${isSidebarOpen ? "w-64" : "w-24"} bg-white rounded-3xl p-6 flex flex-col justify-between shrink-0 shadow-sm transition-all duration-300`}>'
)

# Hide text when collapsed
content = re.sub(
    r'<span className="font-bold text-lg">SetaraKerja</span>',
    '{isSidebarOpen && <span className="font-bold text-lg">SetaraKerja</span>}',
    content
)

with open('src/pages/HRDDashboard.tsx', 'w') as f:
    f.write(content)
