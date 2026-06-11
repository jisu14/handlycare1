const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:/Users/Jismon Jacob/.gemini/antigravity-ide/brain/e6e2d335-d7b2-47e9-8b2a-84b702a45ed8/.system_generated/logs/transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const obj = JSON.parse(line);
      if (obj.type === 'USER_INPUT' || obj.source === 'USER_EXPLICIT') {
         console.log(obj.created_at, obj.content.substring(0, 100).replace(/\n/g, ' '));
      }
    } catch (e) {
    }
  }
}
processLineByLine();
