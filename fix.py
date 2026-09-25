with open('src/pages/HRDDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '{isSidebarOpen && {isSidebarOpen && <span className="font-bold text-lg">SetaraKerja</span>}}',
    '{isSidebarOpen && <span className="font-bold text-lg">SetaraKerja</span>}'
)

with open('src/pages/HRDDashboard.tsx', 'w') as f:
    f.write(content)
