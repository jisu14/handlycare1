const fs = require('fs');

const html = fs.readFileSync(String.raw`C:\Users\Jismon Jacob\.gemini\antigravity-ide\brain\e6e2d335-d7b2-47e9-8b2a-84b702a45ed8\.system_generated\steps\597\content.md`, 'utf8');

let match = html.match(/(<section class="relative py-24 sm:py-32 overflow-hidden bg-\[#080C0C\]" id="market-reality">.*?)<\/main>/s);
if (match) {
    let jsx = match[1];
    
    jsx = jsx.replace(/class="/g, 'className="');
    jsx = jsx.replace(/charSet="/g, 'charset="'); 
    jsx = jsx.replace(/stroke-([a-z])/g, (_, letter) => 'stroke' + letter.toUpperCase());
    jsx = jsx.replace(/fill-([a-z])/g, (_, letter) => 'fill' + letter.toUpperCase());
    jsx = jsx.replace(/strokeWidth="/g, 'strokeWidth="');
    jsx = jsx.replace(/strokeLinecap="/g, 'strokeLinecap="');
    jsx = jsx.replace(/strokeLinejoin="/g, 'strokeLinejoin="');
    jsx = jsx.replace(/strokeDasharray="/g, 'strokeDasharray="');
    jsx = jsx.replace(/strokeDashoffset="/g, 'strokeDashoffset="');
    jsx = jsx.replace(/preserveAspectRatio="/g, 'preserveAspectRatio="');
    jsx = jsx.replace(/viewBox="/g, 'viewBox="');

    // Self close tags
    ['img', 'br', 'hr', 'input'].forEach(tag => {
        jsx = jsx.replace(new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'g'), `<${tag}$1 />`);
    });

    // Handle styles
    jsx = jsx.replace(/style="background-image:linear-gradient\([^;]+;background-size:60px 60px"/g, 'style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }}');
    jsx = jsx.replace(/style="height:30%"/g, 'style={{ height:"30%" }}');
    jsx = jsx.replace(/style="height:45%"/g, 'style={{ height:"45%" }}');
    jsx = jsx.replace(/style="height:38%"/g, 'style={{ height:"38%" }}');
    jsx = jsx.replace(/style="height:60%"/g, 'style={{ height:"60%" }}');
    jsx = jsx.replace(/style="height:55%"/g, 'style={{ height:"55%" }}');
    jsx = jsx.replace(/style="height:72%"/g, 'style={{ height:"72%" }}');
    jsx = jsx.replace(/style="height:68%"/g, 'style={{ height:"68%" }}');
    jsx = jsx.replace(/style="height:85%"/g, 'style={{ height:"85%" }}');
    jsx = jsx.replace(/style="height:78%"/g, 'style={{ height:"78%" }}');
    jsx = jsx.replace(/style="height:100%"/g, 'style={{ height:"100%" }}');
    jsx = jsx.replace(/style="width:100%;height:100%"/g, 'style={{ width:"100%", height:"100%" }}');
    jsx = jsx.replace(/style="pointer-events:none"/g, 'style={{ pointerEvents:"none" }}');
    jsx = jsx.replace(/style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"/g, 'style={{ position:"absolute", height:"100%", width:"100%", left:0, top:0, right:0, bottom:0, color:"transparent" }}');
    
    jsx = jsx.replace(/<!-- -->/g, '');

    // NITI Aayog Replacements
    jsx = jsx.replace(/\$666B market/g, 'USD 21.3B Market');
    jsx = jsx.replace(/The global home care sector is exploding/g, 'The Indian home care sector is exploding (NITI Aayog 2024)');
    jsx = jsx.replace(/Projected global home healthcare market size by 2030/g, 'Projected Indian home healthcare market size by 2027');
    jsx = jsx.replace(/Grand View Research, 2023/g, 'NITI Aayog Position Paper, 2024');
    jsx = jsx.replace(/Of the world population will be 60\+ by 2030/g, 'Elderly population in India by 2050 (19.5% of total)');
    jsx = jsx.replace(/World Health Organization, 2022/g, 'NITI Aayog Position Paper, 2024');
    jsx = jsx.replace(/\$0B/g, 'USD 21.3B');
    jsx = jsx.replace(/0M/g, '319M');

    const out = `import React from 'react';
import { openBookDemo } from './BookDemoDialog';

export function AllSections() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;
    fs.writeFileSync(String.raw`C:\Users\Jismon Jacob\Downloads\handly-care-platform-main\handly-care-platform-main\src\components\landing\Sections.tsx`, out, 'utf8');
    console.log("Done");
} else {
    console.log("Match not found");
}
