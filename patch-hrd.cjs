const fs = require('fs');
let content = fs.readFileSync('src/pages/HRDDashboard.tsx', 'utf8');

// Inside HRDDashboard, add state for userProfile
const stateInjection = `  const [candidates, setCandidates] = useState<Candidate[]>(() => {`;
const userProfileCode = `  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('user_profile');
    return saved ? JSON.parse(saved) : { name: 'HR Manager', title: 'Admin Officer', avatar: '' };
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {`;

content = content.replace(stateInjection, userProfileCode);

// Update Settings button to navigate to 'settings'
content = content.replace(
  `<button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#047857] hover:bg-emerald-50 rounded-2xl font-medium transition-colors">
                  <Settings size={18} /> Settings
                </button>`,
  `<button onClick={() => onNavigate('settings')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#047857] hover:bg-emerald-50 rounded-2xl font-medium transition-colors">
                  <Settings size={18} /> Settings
                </button>`
);

// Update Header Profile section
const oldHeaderProfile = `<div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center"><User size={16} className="text-slate-500"/></div>
              <div className="text-sm">
                <div className="font-bold text-slate-900 leading-tight">HR Manager</div>
                <div className="text-xs text-slate-400 leading-tight">Admin Officer</div>
              </div>`;
              
const newHeaderProfile = `{userProfile.avatar ? (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200"><img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" /></div>
              ) : (
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center"><User size={16} className="text-slate-500"/></div>
              )}
              <div className="text-sm">
                <div className="font-bold text-slate-900 leading-tight">{userProfile.name}</div>
                <div className="text-xs text-slate-400 leading-tight">{userProfile.title}</div>
              </div>`;

content = content.replace(oldHeaderProfile, newHeaderProfile);

fs.writeFileSync('src/pages/HRDDashboard.tsx', content);
