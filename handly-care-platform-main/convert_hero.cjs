const fs = require('fs');

const html = fs.readFileSync(String.raw`C:\Users\Jismon Jacob\.gemini\antigravity-ide\brain\e6e2d335-d7b2-47e9-8b2a-84b702a45ed8\.system_generated\steps\597\content.md`, 'utf8');

let match = html.match(/(<section class="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden" id="hero">.*?)<\/section>/s);
if (match) {
    let jsx = match[1] + "</section>";
    
    jsx = jsx.replace(/class="/g, 'className="');
    jsx = jsx.replace(/charSet="/g, 'charset="'); 
    jsx = jsx.replace(/stroke-([a-z])/g, (_, letter) => 'stroke' + letter.toUpperCase());
    jsx = jsx.replace(/fill-([a-z])/g, (_, letter) => 'fill' + letter.toUpperCase());

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
    jsx = jsx.replace(/style="opacity:0;transform:translateX\(-10px\)"/g, 'style={{ opacity:0, transform:"translateX(-10px)" }}');
    jsx = jsx.replace(/style="pointer-events:none;opacity:0;transform:translateY\(10px\)"/g, 'style={{ pointerEvents:"none", opacity:0, transform:"translateY(10px)" }}');
    
    jsx = jsx.replace(/<!-- -->/g, '');

    // Replace click handlers to avoid errors, and add openBookDemo
    jsx = jsx.replace(/<button class="([^"]+)" type="button">Get started<\/button>/g, '<button className="$1" type="button" onClick={openBookDemo}>Get started</button>');
    jsx = jsx.replace(/<button type="button" class="([^"]+)">Get Started<\/button>/g, '<button type="button" className="$1" onClick={openBookDemo}>Get Started</button>');

    // NITI Aayog content in Hero
    jsx = jsx.replace(/HandlyCare V1\.0/g, 'NITI Aayog 2024 Validated');
    jsx = jsx.replace(/The AI Operations Platform for/g, 'Scale Care Delivery in a USD 21.3B Market for');

    const out = `import React from 'react';
import { openBookDemo } from './BookDemoDialog';

export function Hero() {
  return (
    ${jsx}
  );
}
`;
    fs.writeFileSync(String.raw`C:\Users\Jismon Jacob\Downloads\handly-care-platform-main\handly-care-platform-main\src\components\landing\Hero.tsx`, out, 'utf8');
    console.log("Done Hero");
} else {
    console.log("Match not found");
}
