const fs = require('fs');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix styles
    content = content.replace(/style="max-height:0px"/g, 'style={{ maxHeight:"0px" }}');
    
    // Fix svg attributes
    content = content.replace(/clip-rule="/g, 'clipRule="');
    content = content.replace(/stop-color="/g, 'stopColor="');
    content = content.replace(/stop-opacity="/g, 'stopOpacity="');
    content = content.replace(/fill-opacity="/g, 'fillOpacity="');
    content = content.replace(/stroke-width="/g, 'strokeWidth="');
    content = content.replace(/stroke-linecap="/g, 'strokeLinecap="');
    content = content.replace(/stroke-linejoin="/g, 'strokeLinejoin="');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
}

fixFile(String.raw`C:\Users\Jismon Jacob\Downloads\handly-care-platform-main\handly-care-platform-main\src\components\landing\Sections.tsx`);
fixFile(String.raw`C:\Users\Jismon Jacob\Downloads\handly-care-platform-main\handly-care-platform-main\src\components\landing\Hero.tsx`);
fixFile(String.raw`C:\Users\Jismon Jacob\Downloads\handly-care-platform-main\handly-care-platform-main\src\components\landing\Navbar.tsx`);
