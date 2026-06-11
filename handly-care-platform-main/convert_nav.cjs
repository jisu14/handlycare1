const fs = require('fs');

const html = fs.readFileSync(String.raw`C:\Users\Jismon Jacob\.gemini\antigravity-ide\brain\e6e2d335-d7b2-47e9-8b2a-84b702a45ed8\.system_generated\steps\597\content.md`, 'utf8');

let match = html.match(/(<header class="fixed top-0 left-0 right-0 z-50 pointer-events-none">.*?)<\/header>/s);
if (match) {
    let jsx = match[1];
    
    jsx = jsx.replace(/class="/g, 'className="');
    jsx = jsx.replace(/charSet="/g, 'charset="'); 
    jsx = jsx.replace(/stroke-([a-z])/g, (_, letter) => 'stroke' + letter.toUpperCase());
    jsx = jsx.replace(/fill-([a-z])/g, (_, letter) => 'fill' + letter.toUpperCase());
    jsx = jsx.replace(/strokeWidth="/g, 'strokeWidth="');
    jsx = jsx.replace(/strokeLinecap="/g, 'strokeLinecap="');
    jsx = jsx.replace(/strokeLinejoin="/g, 'strokeLinejoin="');

    // Self close tags
    ['img', 'br', 'hr', 'input'].forEach(tag => {
        jsx = jsx.replace(new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'g'), `<${tag}$1 />`);
    });

    // Handle styles
    jsx = jsx.replace(/style="background-color:transparent"/g, 'style={{ backgroundColor:"transparent" }}');
    jsx = jsx.replace(/style="color:#ffffff"/g, 'style={{ color:"#ffffff" }}');
    jsx = jsx.replace(/style="background-color:#ffffff;color:#000000"/g, 'style={{ backgroundColor:"#ffffff", color:"#000000" }}');
    jsx = jsx.replace(/style="background-color:#E6F4F1;color:#083A3C"/g, 'style={{ backgroundColor:"#E6F4F1", color:"#083A3C" }}');
    jsx = jsx.replace(/style="background-color:#F0EBF8;color:#2D1B4E"/g, 'style={{ backgroundColor:"#F0EBF8", color:"#2D1B4E" }}');
    jsx = jsx.replace(/style="background-color:#FFF3E6;color:#4D2D00"/g, 'style={{ backgroundColor:"#FFF3E6", color:"#4D2D00" }}');

    jsx = jsx.replace(/<!-- -->/g, '');
    jsx = jsx.replace(/tabindex="0"/g, 'tabIndex={0}');

    const out = `import React from 'react';
import { openBookDemo } from './BookDemoDialog';

export function Navbar() {
  return (
    ${jsx}
  );
}
`;
    fs.writeFileSync(String.raw`C:\Users\Jismon Jacob\Downloads\handly-care-platform-main\handly-care-platform-main\src\components\landing\Navbar.tsx`, out, 'utf8');
    console.log("Done Nav");
} else {
    console.log("Match not found");
}
