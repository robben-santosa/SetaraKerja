import re
import os

files = ['src/pages/LandingPage.tsx', 'src/pages/HRDDashboard.tsx', 'src/App.tsx']

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # In LandingPage, replace text-[#1E293B] with style={{ color: 'var(--color-heading)' }} or text-[var(--color-heading)]
    content = content.replace('text-[#1E293B]', 'text-[#395886]')
    content = content.replace('text-slate-900', 'text-[#395886]')
    content = content.replace('bg-slate-900', 'bg-[#395886]')

    # Also replace text-slate-800 to text-[#395886] in LandingPage
    content = content.replace('text-slate-800', 'text-[#395886]')

    with open(file, 'w') as f:
        f.write(content)
