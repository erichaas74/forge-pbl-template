/* Local authoring only. Produces code-drawn illustrations and silent, captioned WebM scenes.
 * Existing newsroom originals are read, never modified. No media leaves this machine. */
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    'playwright',
);
const publicRoot = path.resolve(__dirname, '../public');
const outputRoot = publicRoot;
async function write(relative, data) {
  const target = path.resolve(outputRoot, relative);
  if (!target.startsWith(outputRoot + path.sep))
    throw new Error('Asset path escaped public.');
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, data);
}
const svg = (content, width = 800, height = 500) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${content}</svg>`;
const palette = `<g transform="rotate(-12 160 150)"><rect x="91" y="27" width="130" height="255" rx="15" fill="#583b28"/><rect x="86" y="21" width="130" height="255" rx="15" fill="#bf8d53" stroke="#e7c28b" stroke-width="3"/><path d="M105 24Q111 90 102 160T108 272M195 25Q181 95 196 168T190 270" fill="none" stroke="#91643f" stroke-width="3"/><ellipse cx="125" cy="65" rx="19" ry="17" fill="#382b2b"/><ellipse cx="179" cy="65" rx="19" ry="17" fill="#a34736"/><rect x="120" y="101" width="61" height="137" rx="9" fill="#705032"/><path d="M146 116L138 223M165 113L155 224" stroke="#efd18a" stroke-width="7" stroke-linecap="round"/><path d="M146 116L146 130M165 113L163 128" stroke="#3c3b31" stroke-width="6" stroke-linecap="round"/></g>`;
const shabti = `<g><path d="M139 36Q160 20 181 36L196 86L183 114L197 251Q160 279 123 251L136 114L122 86Z" fill="#51a9a5" stroke="#b2d0b0" stroke-width="3"/><path d="M139 38Q159 29 181 39L186 72L172 91L145 91L134 72Z" fill="#8bc7b7"/><path d="M136 55H184M134 63H186M137 73L131 91M182 73L187 91" fill="none" stroke="#285e67" stroke-width="5"/><path d="M143 66h9m16 0h9M154 81q6 4 13 0" fill="none" stroke="#183f4d" stroke-width="3"/><path d="M132 111L184 156M188 111L138 157" stroke="#236771" stroke-width="12"/><path d="M160 155V242M142 170H179M140 183H181M138 199H183M137 213H184M135 227H185" stroke="#2d7377" stroke-width="3"/></g>`;
const gallery = `<defs><radialGradient id="glow"><stop stop-color="#508b81"/><stop offset="1" stop-color="#123338"/></radialGradient></defs><rect width="800" height="500" fill="url(#glow)"/><path d="M245 0L128 407H672L555 0" fill="#ffe6a8" opacity=".06"/><ellipse cx="400" cy="403" rx="177" ry="27" fill="#0c292f"/><path d="M264 399H536V465H264Z" fill="#a98e67"/><path d="M244 391H556V408H244Z" fill="#e3c798"/><path d="M290 423H510" stroke="#685d46"/><circle cx="70" cy="62" r="24" fill="none" stroke="#ccb789" opacity=".6"/><path d="M54 62H86M70 46V78" stroke="#ccb789" opacity=".6"/>`;
function portrait(name) {
  return `<style>@keyframes senator-gesture{0%,100%{transform:rotate(0)}50%{transform:rotate(1.2deg)}}.senator-gesture{transform-box:fill-box;transform-origin:center bottom;animation:senator-gesture 1.8s ease-in-out 2}@media(prefers-reduced-motion:reduce){.senator-gesture{animation:none}}</style><g class="senator-gesture">${rawPortrait(name)}</g>`;
}
function rawPortrait(name) {
  const left = name === 'lucius';
  return `<g><path d="M55 318Q54 198 99 182L217 183Q266 210 265 318Z" fill="${left ? '#f8e9c8' : '#7b4779'}" stroke="#352d47" stroke-width="4"/><path d="M99 183Q126 243 245 264M67 247Q140 261 242 298" fill="none" stroke="${left ? '#d0b28d' : '#b881a2'}" stroke-width="5"/><path d="M116 179L202 293L228 275L141 170Z" fill="${left ? '#b35350' : '#f2d6a5'}"/><path d="M119 173V147H190V176Q157 200 119 173" fill="${left ? '#915d48' : '#ca9479'}"/><ellipse cx="153" cy="109" rx="58" ry="65" fill="${left ? '#ac7355' : '#e3ae91'}" stroke="#453843" stroke-width="3"/><path d="${left ? 'M96 111Q74 36 144 28Q215 24 212 106L191 81Q151 91 119 75L101 115' : 'M95 127Q53 71 97 37Q147 6 199 40Q241 70 206 145L192 88Q151 99 111 80L109 127'}" fill="${left ? '#2d303b' : '#e4d9cb'}" stroke="#443743" stroke-width="3"/><path d="M118 115Q128 109 139 115M165 115Q178 109 187 115" fill="none" stroke="#343444" stroke-width="3"/><circle cx="130" cy="115" r="4" fill="#343444"/><circle cx="176" cy="115" r="4" fill="#343444"/><path d="M151 115L146 135L157 136M135 152Q152 163 174 148" fill="none" stroke="#713d40" stroke-width="3" stroke-linecap="round"/><path d="M113 101L139 99M165 99L187 103" stroke="#443743" stroke-width="4"/><ellipse cx="153" cy="57" rx="47" ry="18" fill="none" stroke="#d8b660" stroke-width="6"/><path d="M117 50l-9-11m17 7-4-15m18 11V26m13 16 7-15m4 18 13-13m-1 18 15-7" stroke="#a79b55" stroke-width="7" stroke-linecap="round"/><path d="M76 219L34 151L20 159L43 246Q55 263 83 249M226 217L273 173L284 188L252 252" fill="${left ? '#ac7355' : '#e3ae91'}" stroke="#453843" stroke-width="3"/><path d="M34 153L20 119L10 123L18 160M273 175L290 150L300 156L284 189" fill="${left ? '#ac7355' : '#e3ae91'}" stroke="#453843" stroke-width="3"/></g>`;
}
const ship = `<g><path d="M0 85Q78 138 154 85L132 127Q75 151 22 126Z" fill="#794d32" stroke="#e5ba75" stroke-width="3"/><path d="M74 -63V112M30 2V107M120 -11V108" stroke="#dfb171" stroke-width="6"/><path d="M79 -54L79 26L144 26Q127 -23 79 -54M69 -48L69 28L13 28Q44 3 69 -48M124 -3V65H172Q158 22 124 -3M33 9V68H-11Q5 27 33 9M79 38V91H139Q110 77 79 38" fill="#fff0ce" stroke="#d8c093" stroke-width="2"/><path d="M75 -62V-89L115 -76L77 -68" fill="#d76051"/><path d="M24 108H135" stroke="#be8751" stroke-width="3"/></g>`;
function ocean(kind, time = 0) {
  const storm = kind === 'direct';
  const harbor = kind === 'harbor';
  const title = storm
    ? 'HEADWINDS'
    : harbor
      ? 'A HARBOR. A COMMUNITY.'
      : 'CAPTAIN, CHOOSE OUR COURSE.';
  const cloud = (x, y, scale) =>
    `<g transform="translate(${x} ${y}) scale(${scale})" fill="${storm ? '#344956' : '#c6d7d4'}" opacity=".78"><ellipse cx="0" cy="0" rx="90" ry="22"/><ellipse cx="-22" cy="-20" rx="40" ry="32"/><ellipse cx="32" cy="-17" rx="47" ry="29"/></g>`;
  let waves = '';
  for (let row = 0; row < 5; row++) {
    const y = 270 + row * 44;
    const offset = Math.sin(time * 1.3 + row) * 25;
    waves += `<path d="M-80 ${y} ${Array.from({ length: 8 }, (_, i) => `q55 ${-16 - (storm ? 10 : 0)} 110 0`).join(' ')}" fill="none" stroke="${row % 2 ? '#57999c' : '#225f76'}" stroke-width="${row === 0 ? 3 : 9}" transform="translate(${offset} 0)" opacity=".7"/>`;
  }
  return svg(
    `<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="${storm ? '#243c52' : '#759ca6'}"/><stop offset="1" stop-color="${storm ? '#849390' : '#e5cf9f'}"/></linearGradient><linearGradient id="sea" x2="0" y2="1"><stop stop-color="#448494"/><stop offset="1" stop-color="#103d58"/></linearGradient></defs><rect width="800" height="500" fill="url(#sky)"/><circle cx="635" cy="135" r="53" fill="#ffe2a0" opacity="${storm ? '.1' : '.7'}"/>${cloud(140 + Math.sin(time) * 15, 102, 1)}${cloud(540 - Math.sin(time) * 24, 73, 1.4)}<rect y="267" width="800" height="233" fill="url(#sea)"/>${harbor ? '<path d="M530 272L635 214L800 190V333Z" fill="#546e54"/><path d="M666 220L676 103H704L716 218Z" fill="#ede0b6"/><path d="M669 147H710V168H669Z" fill="#b45d50"/><path d="M670 101L690 84L710 101Z" fill="#503f3f"/><path d="M627 240H766V269H627Z" fill="#9d6948"/><path d="M627 272V311M720 271V303" stroke="#6c513e" stroke-width="8"/>' : ''}${waves}<g transform="translate(${harbor ? 298 + Math.min(time, 8) * 5 : 320 + Math.sin(time / 2) * 14} ${264 + Math.sin(time * 2) * (storm ? 13 : 5)}) rotate(${Math.sin(time * 2) * (storm ? 7 : 2)})">${ship}</g><rect x="32" y="393" width="736" height="79" rx="9" fill="#0e293de3"/><text x="400" y="423" text-anchor="middle" font-family="Trebuchet MS, sans-serif" font-size="11" letter-spacing="4" fill="#eacb8d">PRACTICE VOYAGE · ILLUSTRATED SCENE</text><text x="400" y="451" text-anchor="middle" font-family="Trebuchet MS, sans-serif" font-size="23" font-weight="bold" fill="#fff0c7">${title}</text>`,
  );
}
async function main() {
  for (const [name, object] of [
    ['palette', palette],
    ['shabti', shabti],
  ]) {
    await write(
      `project-intros/objects/${name}.svg`,
      svg(`<rect width="320" height="310" fill="none"/>${object}`, 320, 310),
    );
    await write(
      `project-intros/objects/${name}-spotlight.svg`,
      svg(
        `${gallery}<g transform="translate(212 31) scale(1.18)">${object}</g><text x="400" y="485" text-anchor="middle" fill="#e8d6b4" font-family="Trebuchet MS" font-size="11" letter-spacing="2">TEACHING ILLUSTRATION · EXPLORE THE MUSEUM RECORD</text>`,
      ),
    );
  }
  for (const name of ['lucius', 'cassius'])
    await write(`project-intros/senate/${name}.svg`, svg(portrait(name), 310, 320));
  await write(
    'project-intros/senate/senators.svg',
    svg(
      `<defs><linearGradient id="wall" x2="0" y2="1"><stop stop-color="#7a5862"/><stop offset="1" stop-color="#33263b"/></linearGradient></defs><rect width="800" height="500" fill="url(#wall)"/><path d="M35 30H765V62H35M30 373H770V404H30M0 445H800" stroke="#cca781" stroke-width="9"/><path d="M90 61V365M710 61V365M353 61V257M447 61V257" stroke="#b9977c" stroke-width="26"/><path d="M326 324V459H342V372H459V459H475V324" fill="none" stroke="#b08763" stroke-width="17"/><rect x="328" y="267" width="144" height="82" rx="10" fill="#af715e" stroke="#d6b178" stroke-width="6"/><text x="400" y="303" text-anchor="middle" fill="#fff0d1" font-family="Trebuchet MS" font-size="15" font-weight="bold">RESERVED</text><text x="400" y="326" text-anchor="middle" fill="#fff0d1" font-family="Trebuchet MS" font-size="13">FOR YOU</text><g transform="translate(4 64) scale(1.13)">${portrait('lucius')}</g><g transform="translate(450 64) scale(1.13)">${portrait('cassius')}</g>`,
    ),
  );
  for (const kind of ['departure', 'direct', 'harbor']) {
    await write(`project-intros/voyage/${kind}.svg`, ocean(kind));
    const captions = {
      departure: [
        'A ship leaves harbor. Clouds gather.',
        'Shorter passage: older wind reports.',
        'Longer route: a known supply harbor.',
      ],
      direct: [
        'Headwinds slow the ship.',
        'Two extra days of provisions used.',
        'Less distance did not mean less time.',
      ],
      harbor: [
        'The ship reaches shelter.',
        'The detour adds one day.',
        'Supplies require an agreement with people here.',
      ],
    };
    await write(
      `project-intros/voyage/${kind}.vtt`,
      `WEBVTT\n\n00:00.000 --> 00:03.000\n${captions[kind][0]}\n\n00:03.000 --> 00:06.000\n${captions[kind][1]}\n\n00:06.000 --> 00:12.000\n${captions[kind][2]}\n`,
    );
  }
  await write(
    'history-live/final-presentations/presentation-reel.vtt',
    'WEBVTT\n\n00:00.000 --> 00:06.000\nA modern classroom correspondent prepares a historical news report. Presentation format demonstration.\n\n00:06.000 --> 00:13.000\nTwo costumed correspondents appear side by side. Paired-correspondent presentation format.\n',
  );
  if (process.argv.includes('--illustrations-only')) return;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.route('**/__intro-media.html', (route) =>
      route.fulfill({
        contentType: 'text/html',
        body: '<!doctype html><html><body>Local media authoring</body></html>',
      }),
    );
    await page.goto('http://127.0.0.1:4200/__intro-media.html');
    for (const kind of ['departure', 'direct', 'harbor']) {
      const frames = Array.from({ length: 192 }, (_, i) => ocean(kind, i / 24));
      const base64 = await page.evaluate(async (frames) => {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');
        const stream = canvas.captureStream(24);
        const recorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp9',
          videoBitsPerSecond: 1300000,
        });
        const chunks = [];
        recorder.ondataavailable = (e) => chunks.push(e.data);
        const done = new Promise((resolve) => (recorder.onstop = resolve));
        recorder.start();
        for (const frame of frames) {
          const image = new Image();
          image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(frame);
          await image.decode();
          ctx.drawImage(image, 0, 0);
          await new Promise((resolve) => setTimeout(resolve, 1000 / 24));
        }
        recorder.stop();
        await done;
        stream.getTracks().forEach((track) => track.stop());
        const buffer = await new Blob(chunks, { type: 'video/webm' }).arrayBuffer();
        let binary = '';
        for (const byte of new Uint8Array(buffer)) binary += String.fromCharCode(byte);
        return btoa(binary);
      }, frames);
      await write(`project-intros/voyage/${kind}.webm`, Buffer.from(base64, 'base64'));
      console.log('Generated voyage/' + kind + '.webm');
    }
    const base64 = await page.evaluate(async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      const stream = canvas.captureStream(24);
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 1600000,
      });
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      const done = new Promise((resolve) => (recorder.onstop = resolve));
      recorder.start();
      for (const [index, name] of [
        'newsroom-report',
        'competing-correspondents',
      ].entries()) {
        const video = document.createElement('video');
        video.muted = true;
        video.src = '/history-live/final-presentations/' + encodeURIComponent(name) + '.mp4';
        await new Promise((resolve, reject) => {
          video.onloadeddata = resolve;
          video.onerror = reject;
        });
        await video.play();
        while (!video.ended) {
          ctx.fillStyle = '#102a40';
          ctx.fillRect(0, 0, 800, 500);
          const scale = Math.min(800 / video.videoWidth, 438 / video.videoHeight);
          const w = video.videoWidth * scale,
            h = video.videoHeight * scale;
          ctx.drawImage(video, (800 - w) / 2, (438 - h) / 2, w, h);
          ctx.fillStyle = '#0e293d';
          ctx.fillRect(0, 438, 800, 62);
          ctx.fillStyle = '#e2ecf2';
          ctx.font = 'bold 20px Trebuchet MS';
          ctx.textAlign = 'center';
          ctx.fillText(
            index ? 'TWO PERSPECTIVES. YOUR NEXT QUESTION?' : 'YOUR ASSIGNMENT STARTS HERE.',
            400,
            467,
          );
          ctx.font = '11px Trebuchet MS';
          ctx.fillStyle = '#aacdde';
          ctx.fillText('MODERN CLASSROOM TRAILER · DRAMATIZED', 400, 489);
          await new Promise((resolve) => setTimeout(resolve, 1000 / 24));
        }
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
      recorder.stop();
      await done;
      stream.getTracks().forEach((track) => track.stop());
      const buffer = await new Blob(chunks, { type: 'video/webm' }).arrayBuffer();
      let binary = '';
      for (const byte of new Uint8Array(buffer)) binary += String.fromCharCode(byte);
      return btoa(binary);
    });
    await write('history-live/final-presentations/presentation-reel.webm', Buffer.from(base64, 'base64'));
    console.log('Generated history-live/final-presentations/presentation-reel.webm');
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
