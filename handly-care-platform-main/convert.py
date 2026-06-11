import re
import os

with open(r"C:\Users\Jismon Jacob\.gemini\antigravity-ide\brain\e6e2d335-d7b2-47e9-8b2a-84b702a45ed8\.system_generated\steps\597\content.md", "r", encoding="utf-8") as f:
    html = f.read()

# Extract from <section class="relative py-24 sm:py-32 overflow-hidden bg-[#080C0C]" id="market-reality"> to the end of main
match = re.search(r'(<section class="relative py-24 sm:py-32 overflow-hidden bg-\[#080C0C\]" id="market-reality">.*?)</main>', html, re.DOTALL)
if match:
    sections_html = match.group(1)
    
    # Simple HTML to JSX conversions
    jsx = sections_html.replace('class="', 'className="')
    jsx = jsx.replace('charSet="', 'charset="') # React actually uses charSet but lowercase in html
    jsx = re.sub(r'stroke-([a-z])', lambda m: 'stroke' + m.group(1).upper(), jsx)
    jsx = re.sub(r'fill-([a-z])', lambda m: 'fill' + m.group(1).upper(), jsx)
    
    # Self close tags
    for tag in ['img', 'br', 'hr', 'input']:
        jsx = re.sub(f'<{tag}([^>]*?)(?<!/)>', f'<{tag}\\1 />', jsx)
        
    jsx = jsx.replace('style="background-image:', 'style={{ backgroundImage: ')
    jsx = jsx.replace('background-size:', ', backgroundSize: ')
    jsx = jsx.replace(';height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"', ", height:'100%', width:'100%', left:0, top:0, right:0, bottom:0, color:'transparent' }}")
    jsx = jsx.replace('style="opacity:0;transform:translateX(-10px)"', 'style={{ opacity:0, transform:"translateX(-10px)" }}')
    jsx = jsx.replace('style="pointer-events:none;opacity:0;transform:translateY(10px)"', 'style={{ pointerEvents:"none", opacity:0, transform:"translateY(10px)" }}')
    jsx = jsx.replace('style="height:30%"', 'style={{ height:"30%" }}')
    jsx = jsx.replace('style="height:45%"', 'style={{ height:"45%" }}')
    jsx = jsx.replace('style="height:38%"', 'style={{ height:"38%" }}')
    jsx = jsx.replace('style="height:60%"', 'style={{ height:"60%" }}')
    jsx = jsx.replace('style="height:55%"', 'style={{ height:"55%" }}')
    jsx = jsx.replace('style="height:72%"', 'style={{ height:"72%" }}')
    jsx = jsx.replace('style="height:68%"', 'style={{ height:"68%" }}')
    jsx = jsx.replace('style="height:85%"', 'style={{ height:"85%" }}')
    jsx = jsx.replace('style="height:78%"', 'style={{ height:"78%" }}')
    jsx = jsx.replace('style="height:100%"', 'style={{ height:"100%" }}')
    jsx = jsx.replace('style="width:100%;height:100%"', 'style={{ width:"100%", height:"100%" }}')
    jsx = jsx.replace('style="pointer-events:none"', 'style={{ pointerEvents:"none" }}')
    jsx = jsx.replace('style="position:absolute', 'style={{ position:"absolute"')
    
    jsx = jsx.replace('<!-- -->', '')
    
    # NITI Aayog Replacements
    jsx = jsx.replace('$666B market', 'USD 21.3B Market')
    jsx = jsx.replace('The global home care sector is exploding', 'The Indian home care sector is exploding (NITI Aayog 2024)')
    jsx = jsx.replace('Projected global home healthcare market size by 2030', 'Projected Indian home healthcare market size by 2027')
    jsx = jsx.replace('Grand View Research, 2023', 'NITI Aayog Position Paper, 2024')
    jsx = jsx.replace('Of the world population will be 60+ by 2030', 'Elderly population in India by 2050 (19.5% of total)')
    jsx = jsx.replace('World Health Organization, 2022', 'NITI Aayog Position Paper, 2024')
    jsx = jsx.replace('$0B', 'USD 21.3B')
    jsx = jsx.replace('0M', '319M')

    out = f"""import React from 'react';
import {{ openBookDemo }} from './BookDemoDialog';

export function AllSections() {{
  return (
    <>
      {jsx}
    </>
  );
}}
"""
    with open(r"C:\Users\Jismon Jacob\Downloads\handly-care-platform-main\handly-care-platform-main\src\components\landing\Sections.tsx", "w", encoding="utf-8") as out_f:
        out_f.write(out)
    print("Done")
else:
    print("Match not found")
