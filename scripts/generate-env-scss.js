// const fs = require('fs');
// const path = require('path');
// require('dotenv').config(); // Load .env file

// // Read environment variables
// const primaryColor = process.env.REACT_APP_PRIMARY_COLOR || '#e80002';
// const secondaryColor = process.env.REACT_APP_SECONDARY_COLOR || '#d1344e';
// const accentColor = process.env.REACT_APP_ACCENT_COLOR || '#39cff7';
// // const shadowColor = process.env.REACT_APP_SHADOW_COLOR || '#6faedd';

// console.log("Primary Color:", process.env.REACT_APP_PRIMARY_COLOR);
// console.log("Secondary Color:", process.env.REACT_APP_SECONDARY_COLOR);
// console.log("Accent Color:", process.env.REACT_APP_ACCENT_COLOR);


// // SCSS content with environment variables
// const scssContent = `
//   $primary-color: ${primaryColor};
//   $secondary-color: ${secondaryColor};
//   $accent-color: ${accentColor};
  
// `;
// // $shadow-color: ${shadowColor};

// // Write to the _env.scss file
// const filePath = path.resolve(__dirname, '../src/styles/_env.scss');
// fs.writeFileSync(filePath, scssContent, 'utf8');
// console.log(`Environment variables injected into ${filePath}`);

//mothod 2

const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load .env file

// Read environment variables
const primaryColor = process.env.REACT_APP_PRIMARY_COLOR || '#e80002';
const secondaryColor = process.env.REACT_APP_SECONDARY_COLOR || '#d1344e';
const accentColor = process.env.REACT_APP_ACCENT_COLOR || '#39cff7';

console.log("Primary Color:", primaryColor);
console.log("Secondary Color:", secondaryColor);
console.log("Accent Color:", accentColor);

// SCSS content with environment variables
const scssContent = `
  $primary-color: ${primaryColor};
  $secondary-color: ${secondaryColor};
  $accent-color: ${accentColor};
`;

// Write to the _env.scss file
const filePath = path.resolve(__dirname, '../src/styles/_env.scss');
fs.writeFileSync(filePath, scssContent, 'utf8');
console.log(`Environment variables injected into ${filePath}`);
