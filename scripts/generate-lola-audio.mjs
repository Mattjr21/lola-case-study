/**
 * Regenerate Hear Lola clips with production voice profiles (free Edge neural TTS).
 * Run: npm run audio:generate
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EdgeTTS } from "edge-tts-universal";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "audio");

const clips = [
  {
    file: "lola-hours-en.mp3",
    voice: "en-US-JennyNeural",
    rate: "+3%",
    pitch: "+0Hz",
    text: "We're open 9 AM to 9 PM, seven days a week. Hot food and restaurant counter inside. SNAP and EBT welcome.",
  },
  {
    file: "lola-hours-es.mp3",
    voice: "es-US-PalomaNeural",
    rate: "+5%",
    pitch: "+4Hz",
    text: "Abrimos de nueve de la mañana a nueve de la noche, todos los días. Comida caliente y mostrador adentro. Aceptamos SNAP y EBT.",
  },
];

await mkdir(outDir, { recursive: true });

for (const clip of clips) {
  const tts = new EdgeTTS(clip.text, clip.voice, {
    rate: clip.rate,
    pitch: clip.pitch,
    volume: "+5%",
  });
  const result = await tts.synthesize();
  const buf = Buffer.from(await result.audio.arrayBuffer());
  const dest = path.join(outDir, clip.file);
  await writeFile(dest, buf);
  console.log(`Wrote ${dest} (${buf.length} bytes)`);
}
