const fs = require('fs');
let content = fs.readFileSync('src/pages/InterviewPage.tsx', 'utf8');

// Update image URLs to have crop=faces
content = content.replace(
  `"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1280&h=720&fit=crop&auto=format" // Candidate placeholder`,
  `"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1280&h=720&fit=crop&crop=faces&auto=format" // Candidate placeholder`
);
content = content.replace(
  `"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1280&h=720&fit=crop&auto=format"; // HRD placeholder`,
  `"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1280&h=720&fit=crop&crop=faces&auto=format"; // HRD placeholder`
);

content = content.replace(
  `"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&auto=format" // HRD self`,
  `"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=faces&auto=format" // HRD self`
);
content = content.replace(
  `"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&auto=format"; // Candidate self`,
  `"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=faces&auto=format"; // Candidate self`
);

// Add Audio element
const audioElement = `
      {/* Audio Element for voice simulation */}
      <audio 
        autoPlay 
        loop 
        src={userRole === 'hrd' 
          ? "https://www.soundjay.com/communication/sounds/voice-announcement-1.mp3" 
          : "https://www.soundjay.com/communication/sounds/voice-announcement-2.mp3"} 
      />

      {/* Main Video Area */}`;

content = content.replace(`{/* Main Video Area */}`, audioElement);

fs.writeFileSync('src/pages/InterviewPage.tsx', content);
