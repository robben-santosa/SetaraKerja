import re

with open('src/pages/HRDDashboard.tsx', 'r') as f:
    content = f.read()

# Make the menu text conditional
def hide_text(match):
    prefix = match.group(1)
    icon = match.group(2)
    text = match.group(3)
    return f"{prefix}{icon} {{isSidebarOpen && <span>{text}</span>}}"

content = re.sub(
    r'(<button[^>]*>.*?)(<[A-Za-z]+ size=\{18\} />) ([A-Za-z]+)',
    hide_text,
    content
)

# Hide tools category header when closed
content = content.replace(
    '<div className="text-xs font-semibold text-slate-400 mb-3 tracking-wider">MENU</div>',
    '{isSidebarOpen && <div className="text-xs font-semibold text-slate-400 mb-3 tracking-wider">MENU</div>}'
)
content = content.replace(
    '<div className="text-xs font-semibold text-slate-400 mb-3 tracking-wider">TOOLS</div>',
    '{isSidebarOpen && <div className="text-xs font-semibold text-slate-400 mb-3 tracking-wider">TOOLS</div>}'
)

# Hide Inclusive pro box when closed
content = content.replace(
    '<div className="bg-[#395886] text-white rounded-2xl p-5 relative overflow-hidden">',
    '{isSidebarOpen && <div className="bg-[#395886] text-white rounded-2xl p-5 relative overflow-hidden">'
)
content = content.replace(
    '</button>\n        </div>\n      </aside>',
    '</button>\n        </div>}\n      </aside>'
)

with open('src/pages/HRDDashboard.tsx', 'w') as f:
    f.write(content)
