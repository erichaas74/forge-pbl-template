// Compose short inspection films from this project's existing teaching artwork.
// No historical footage is implied. Text descriptions also ship as WebVTT and in the UI.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
const mission = JSON.parse(fs.readFileSync('public/projects/shadow-gallery/versions/2.0.0/project.json', 'utf8'));
const out = 'public/projects/shadow-gallery/weekly';
const temp = 'output/shadow-week-media';
fs.mkdirSync(out, { recursive: true }); fs.mkdirSync(temp, { recursive: true });
fs.copyFileSync('C:/Windows/Fonts/georgia.ttf', `${temp}/font.ttf`);
const size = 720;
function wrap(text, length) { const lines = []; let line = ''; for (const word of text.split(/\s+/)) { if (line.length + word.length > length) { lines.push(line); line = ''; } line += (line ? ' ' : '') + word; } if (line) lines.push(line); return lines.join('\n'); }
const stamp = seconds => `00:00:${String(seconds).padStart(2, '0')}.000`;
for (const [index, session] of mission.previewWeeks.weeks.flatMap(w => w.sessions).entries()) {
  const work = mission.works.find(w => w.id === session.workId), film = session.film;
  const target = path.join('public', film.src);
  const args = ['-hide_banner', '-loglevel', 'error', '-y', '-threads', '1', '-filter_complex_threads', '1', '-loop', '1', '-i', path.join('public', work.image.src)];
  const filters = [`[0:v]crop=iw/${work.image.grid}:ih/${work.image.grid}:${work.image.frame % work.image.grid}*iw/${work.image.grid}:${Math.floor(work.image.frame / work.image.grid)}*ih/${work.image.grid},scale=${size}:${size}[base]`];
  let previous = 'base', input = 0;
  for (const [i, region] of work.regions.entries()) {
    const option = region.options.find(o => o.id === region.originalOptionId);
    const x = Math.round(region.x * size / 100), y = Math.round(region.y * size / 100), width = 2 * Math.ceil(region.width * size / 200), height = 2 * Math.ceil(region.height * size / 200);
    const next = `layer${i}`;
    if (option.image) {
      args.push('-loop', '1', '-i', path.join('public', option.image)); input++;
      filters.push(`[${input}:v]format=rgba,scale=${width}:${height}:force_original_aspect_ratio=decrease:force_divisible_by=2,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=black@0[obj${i}]`);
      filters.push(`[${previous}][obj${i}]overlay=${x}:${y}:shortest=1[${next}]`);
    } else if (option.text) {
      const fontSize = Math.max(11, Math.min(17, Math.floor(width / 18)));
      const textFile = `${temp}/label-${index}-${i}.txt`;
      fs.writeFileSync(textFile, wrap(option.text, Math.max(16, Math.floor(width / (fontSize * .55)))));
      filters.push(`[${previous}]drawbox=x=${x}:y=${y}:w=${width}:h=${height}:color=0xe8d5a4@0.96:t=fill,drawtext=fontfile='${temp}/font.ttf':textfile='${textFile}':fontcolor=0x302513:fontsize=${fontSize}:line_spacing=3:x=${x}+(${width}-tw)/2:y=${y}+(${height}-th)/2[${next}]`);
    } else { filters.push(`[${previous}]null[${next}]`); }
    previous = next;
  }
  for (const [i, cue] of film.cues.entries()) {
    const r = work.regions.find(r => r.id === cue.regionId), next = `cue${i}`;
    filters.push(`[${previous}]drawbox=x=${r.x * size / 100}:y=${r.y * size / 100}:w=${r.width * size / 100}:h=${r.height * size / 100}:color=0xffd98e:t=3:enable='between(t,${cue.at},${i === 0 ? 5.99 : 12})'[${next}]`);
    previous = next;
  }
  filters.push(`[${previous}]zoompan=z='1+0.06*sin(on/288*PI)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=${size}x${size}:fps=24,format=yuv420p[video]`);
  args.push('-filter_complex', filters.join(';'), '-map', '[video]', '-t', '12', '-an', '-c:v', 'libx264', '-threads', '1', '-preset', 'veryfast', '-crf', '24', '-movflags', '+faststart', target);
  const result = spawnSync(ffmpeg, args, { encoding: 'utf8', windowsHide: true });
  if (result.status !== 0) throw new Error(result.stderr || `${result.error?.message ?? result.signal ?? 'unknown process failure'} (film ${index + 1})`);
  fs.writeFileSync(path.join('public', film.captions), 'WEBVTT\n\n' + film.cues.map((c, i) => `${stamp(c.at)} --> ${stamp(film.cues[i + 1]?.at ?? 12)}\n${c.transcript}\n`).join('\n'));
  console.log(`Created scene ${index + 1}: ${work.title}`);
}
