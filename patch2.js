const fs = require('fs');
let code = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');

// Add import
if (!code.includes('import laptopImg')) {
  code = code.replace(
    "import type { Page } from '../types';", 
    "import type { Page } from '../types';\nimport laptopImg from '../assets/laptop2.png';"
  );
}

// Replace the Main HRD mock card
const oldCardStart = `            {/* Main HRD mock card */}`;
const oldCardEnd = `              </div>\n            </div>`;

const newCard = `            {/* Right: Laptop Image */}\n            <div className="w-full max-w-lg z-10">\n              <img src={laptopImg} alt="Laptop Interface" className="w-full h-auto drop-shadow-2xl rounded-xl" />\n            </div>`;

const startIndex = code.indexOf(oldCardStart);
// find the end of the div that wraps the mock card
// wait, we can just replace until "          </div>\n        </div>\n      </section>" (the wrapper)
