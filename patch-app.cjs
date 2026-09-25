const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Import SettingsPage
content = content.replace(
  "import SignLanguagePage from './pages/SignLanguagePage';",
  "import SignLanguagePage from './pages/SignLanguagePage';\nimport SettingsPage from './pages/SettingsPage';"
);

// Add the route
content = content.replace(
  "{page === 'sign-language'         && <SignLanguagePage onNavigate={navigate} />}",
  "{page === 'sign-language'         && <SignLanguagePage onNavigate={navigate} />}\n        {page === 'settings'              && <SettingsPage onNavigate={navigate} userRole={userRole} />}"
);

// We need to hide header on settings if it's the dashboard layout, but the user requested Settings, which has a distinct layout.
// Let's modify showHeader logic:
content = content.replace(
  "const showHeader = page !== 'interview' && page !== 'hrd';",
  "const showHeader = page !== 'interview' && page !== 'hrd' && page !== 'settings';"
);

fs.writeFileSync('src/App.tsx', content);
