const fs = require('fs');
const readline = require('readline');

async function extractStateAt(targetTimeStr) {
  const fileStream = fs.createReadStream('C:/Users/Jismon Jacob/.gemini/antigravity-ide/brain/e6e2d335-d7b2-47e9-8b2a-84b702a45ed8/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  
  let targetTime = new Date(targetTimeStr).getTime();
  let files = {}; // absolute path -> content
  
  for await (const line of rl) {
    try {
      const step = JSON.parse(line);
      const stepTime = new Date(step.created_at).getTime();
      if (stepTime > targetTime) break;
      
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          if (tc.name === 'write_to_file' || tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content') {
             // For simplicity, just log what was edited.
             const file = tc.args.TargetFile || tc.args.AbsolutePath || 'unknown';
             console.log(`Edited ${file} at ${step.created_at}`);
          }
        }
      }
    } catch (e) {}
  }
}
extractStateAt('2026-06-11T10:52:00Z');
