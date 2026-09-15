import { type GearLockDefinition } from '../gear-lock.domain';

export function gearCageLayout(d: GearLockDefinition): string {
  const tray = d.gears
    .map((g, i) => {
      const points = Array.from({ length: g.teeth * 4 }, (_, n) => {
        const radius = n % 4 === 1 || n % 4 === 2 ? 24 : 20.5,
          a = (n * Math.PI * 2) / (g.teeth * 4);
        return `${30 + Math.cos(a) * radius},${29 + Math.sin(a) * radius}`;
      }).join(' ');
      return `<button type="button" data-cog="${i}" aria-label="${g.teeth}-tooth cog" aria-pressed="false"><svg viewBox="0 0 60 58" aria-hidden="true"><polygon points="${points}" fill="${i % 2 ? '#cda963' : '#a0b3b9'}" stroke="#eedbb0" stroke-width=".7"/><circle cx="30" cy="29" r="12" fill="none" stroke="#324b51"/><circle cx="30" cy="29" r="4" fill="#203942"/></svg><b>${g.teeth}</b><small data-location="${i}">IN TRAY</small></button>`;
    })
    .join('');
  return `<style>
[data-gear-cage]{position:relative;isolation:isolate;box-sizing:border-box;width:100%;height:100%;overflow:hidden;background:#182b35;color:#f1e6cc;font:13px/1.35 'Trebuchet MS',sans-serif}
[data-gear-cage] *{box-sizing:border-box}
[data-gear-cage] [hidden]{display:none!important}
[data-gear-cage] button,[data-gear-cage] select{font:inherit;min-height:42px;padding:6px 10px;color:#f1e6cc;background:#223c47;border:1px solid #778b85;border-radius:6px;cursor:pointer}
[data-gear-cage] button:hover{background:#38535a;border-color:#e9cb87}
[data-gear-cage] button:disabled{opacity:.4;cursor:default}
[data-gear-cage] :focus-visible{outline:3px solid #ffdd91;outline-offset:2px}
[data-gear-cage] button[aria-pressed=true]{background:#485d57;border-color:#edd294}
[data-gear-cage] [data-viewport]{position:absolute;inset:0 0 236px;overflow:hidden}
[data-gear-cage] canvas{width:100%;height:100%;display:block;touch-action:none}
[data-gear-cage] .gc-top{position:absolute;inset:12px 12px auto;display:flex;justify-content:space-between;align-items:start;gap:8px;pointer-events:none}
[data-gear-cage] .gc-top>*{pointer-events:auto}
[data-gear-cage] .gc-title{font-size:11px;letter-spacing:.12em;color:#f0cd87;margin:0;text-shadow:0 2px 5px #000}
[data-gear-cage] .gc-title span{display:block;font-size:12px;letter-spacing:0;color:#d4ddd9;margin-top:3px}
[data-gear-cage] .gc-top button{font-size:11px;padding:5px 8px}
[data-gear-cage] .gc-focus{position:absolute;left:12px;bottom:248px;display:flex;gap:5px}
[data-gear-cage] .gc-focus button{font-size:11px;background:#1c323deb}
[data-gear-cage] .gc-label{position:absolute;pointer-events:none;transform:translate(-50%,-50%);white-space:nowrap;font-size:12px;color:#f0d496;background:#172e39ef;padding:5px 8px;border:1px solid #859188;border-radius:4px}
[data-gear-cage] .gc-drag{position:absolute;z-index:9;pointer-events:none;transform:translate(-50%,-50%);display:grid;place-items:center;width:64px;height:64px;border:6px dashed #f7dca4;border-radius:50%;background:#566564ee;box-shadow:0 8px 18px #0008;color:#fff3d1;font:26px Georgia,serif}
[data-gear-cage] .gc-bottom{position:absolute;inset:auto 0 0;height:236px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;border-top:1px solid #897f60;background:linear-gradient(115deg,#152d39,#294047)}
[data-gear-cage] .gc-tray{display:flex;justify-content:center;gap:6px;height:76px}
[data-gear-cage] .gc-tray button{display:grid;grid-template-columns:minmax(26px,1fr) auto;gap:0 3px;align-items:center;max-width:130px;min-width:0;flex:1;padding:3px 6px;touch-action:none}
[data-gear-cage] .gc-tray svg{width:100%;height:51px;grid-row:1/3}
[data-gear-cage] .gc-tray b{font:24px Georgia,serif}
[data-gear-cage] .gc-tray small{font-size:8px;letter-spacing:.08em;color:#c4d3ce}
[data-gear-cage] .gc-clues{display:grid;grid-template-columns:1fr 1fr 1.15fr;gap:6px}
[data-gear-cage] .gc-clues button{text-align:left;padding:6px 9px;min-height:45px}
[data-gear-cage] .gc-clues button:disabled{opacity:1;border-color:#536d73;cursor:default}
[data-gear-cage] .gc-clues b{font-size:14px;color:#f1d59c}
[data-gear-cage] .gc-clues span{display:block;font-size:10px;color:#c7d7d7}
[data-gear-cage] .gc-clues [data-calibrated=true]{border-color:#92d1b5}
[data-gear-cage] .gc-drum{border-left:2px solid #c5a464;padding:3px 8px}
[data-gear-cage] .gc-drum b{display:block;font:18px Georgia,serif}
[data-gear-cage] .gc-actions{display:flex;align-items:center;gap:6px;justify-content:space-between}
[data-gear-cage] .gc-actions label{display:flex;align-items:center;gap:5px;font-size:11px}
[data-gear-cage] .gc-actions button{font-size:12px;padding:6px 9px}
[data-gear-cage] [data-action=crank]{background:#d8b878;border-color:#f4d99a;color:#18303b;font-weight:bold}
[data-gear-cage] .gc-feedback{min-height:18px;font-size:12px;color:#d1dfda}
[data-gear-cage] .gc-feedback[data-wrong=true]{color:#f6bb9c}
[data-gear-cage] [data-options]{position:absolute;right:12px;top:66px;width:min(330px,calc(100% - 24px));max-height:calc(100% - 310px);overflow:auto;background:#1a3541;border:1px solid #8c988d;border-radius:8px;box-shadow:0 14px 30px #0008;padding:15px;z-index:7}
[data-gear-cage] [data-options] p{font-size:13px;margin:7px 0 14px;color:#c7d9d8}
[data-gear-cage] [data-options] label{display:flex;gap:8px;align-items:center;margin:12px 0}
[data-gear-cage] [data-options] input{width:20px;height:20px;accent-color:#dfc080}
[data-gear-cage] [data-options] a{color:#edcf93;font-size:12px}
[data-gear-cage].diorama-expanded{position:fixed;inset:12px;z-index:2000;width:auto;height:auto;border:1px solid #9e9c83;border-radius:12px;box-shadow:0 0 0 30px #061823ed}
@media(max-width:680px){
 [data-gear-cage] .gc-label{font-size:10px;padding:3px 5px}
 [data-gear-cage] [data-viewport]{bottom:300px}
 [data-gear-cage] .gc-bottom{height:300px;padding:8px;gap:7px}
 [data-gear-cage] .gc-focus{bottom:311px;gap:4px}
 [data-gear-cage] .gc-focus button{padding:6px 8px}
 [data-gear-cage] .gc-tray{gap:4px;min-height:75px}
 [data-gear-cage] .gc-tray button{display:flex;flex-direction:column;padding:1px;gap:0}
 [data-gear-cage] .gc-tray svg{height:36px}
 [data-gear-cage] .gc-tray b{font-size:19px}
 [data-gear-cage] .gc-tray small{font-size:7px}
 [data-gear-cage] .gc-clues b{font-size:12px}
 [data-gear-cage] .gc-clues span{font-size:9px}
 [data-gear-cage] .gc-clues button{padding:6px}
 [data-gear-cage] .gc-actions{flex-wrap:wrap;justify-content:center;gap:5px}
 [data-gear-cage] .gc-title{font-size:9px;letter-spacing:.06em}
 [data-gear-cage] .gc-title span{font-size:10px;max-width:140px}
 [data-gear-cage].diorama-expanded{inset:5px}
}

[data-gear-cage] .gc-feedback{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
[data-gear-cage] [data-viewport]{bottom:212px}
[data-gear-cage] .gc-bottom{height:212px;min-height:212px}
[data-gear-cage] output{display:inline-block;min-width:28px;text-align:center;font-variant-numeric:tabular-nums}
@media(max-width:680px){[data-gear-cage] [data-viewport]{bottom:252px}[data-gear-cage] .gc-bottom{height:252px;min-height:252px}}
</style>
<div data-viewport></div>
<div class="gc-top"><p class="gc-title">CLOCKWORK FOX RESCUE</p><div><button type="button" data-action="expand" aria-label="Expand fox workshop">Expand</button> <button type="button" data-action="reset" aria-label="Reset mechanism">↺</button></div></div>
<div class="gc-bottom"><div class="gc-tray" role="group" aria-label="Cog tray">${tray}</div>
<div class="gc-clues"><button type="button" data-socket="0" aria-label="Place selected cog on axle A"><b>Axle A</b><span data-a>Choose a cog</span></button><button type="button" data-socket="1" aria-label="Place selected cog on axle B"><b>Axle B</b><span data-b>Choose a cog</span></button><div class="gc-drum"><span>OUTPUT</span><b data-output>0 turns</b></div></div>
<div class="gc-actions"><label>Input turns <select data-turns aria-label="Input crank turns">${Array.from({ length: d.maxCrank }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}</select></label><button type="button" data-action="crank">Turn crank</button><button type="button" data-action="return">Return cog</button><button type="button" data-action="replay" hidden>Replay escape</button><button type="button" data-action="pause">Pause</button></div>
<div class="gc-feedback" aria-live="polite">Choose a cog, then tap A or B.</div></div>
`;
}
