with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'className="px-6 py-4 flex items-center gap-4"' in line and 'app.rowBg' in lines[i+1]:
        # This is the app row.
        lines[i] = '                    className="px-6 py-4 flex items-center gap-4 animate-slide-up opacity-0"\n'
        lines[i+1] = '                    style={{ background: app.rowBg, animationDelay: `${0.1 + i * 0.1}s`, animationFillMode: "forwards" }}\n'

with open('src/App.tsx', 'w') as f:
    f.writelines(lines)
