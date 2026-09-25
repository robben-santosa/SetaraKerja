const fs = require('fs');
let content = fs.readFileSync('src/types/index.ts', 'utf8');

content = content.replace(
  "| 'sign-language';",
  "| 'sign-language'\n  | 'settings';"
);

fs.writeFileSync('src/types/index.ts', content);
