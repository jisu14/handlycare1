const fs = require('fs');
const html = fs.readFileSync(String.raw`C:\Users\Jismon Jacob\.gemini\antigravity-ide\brain\e6e2d335-d7b2-47e9-8b2a-84b702a45ed8\.system_generated\steps\597\content.md`, 'utf8');
const styles = html.match(/style="([^"]+)"/g);
console.log(Array.from(new Set(styles)).join('\n'));
