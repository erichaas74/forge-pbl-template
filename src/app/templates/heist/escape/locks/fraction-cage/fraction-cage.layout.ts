import type { FractionGear } from '../machine.models';
import { SECTOR_COLORS } from './fraction-cage.model';

export function fractionCageLayout(d: FractionGear): string {
  const tray = d.pieces
    .map((p, i) => {
      const a = (Math.PI * 2 * p.numerator) / p.denominator;
      const x = 30 + Math.sin(a) * 24,
        y = 29 - Math.cos(a) * 24;
      return `<button type="button" data-piece="${i}" aria-pressed="false" aria-label="Sector ${i + 1}: ${p.numerator}/${p.denominator}">
      <svg viewBox="0 0 60 58" aria-hidden="true"><circle cx="30" cy="29" r="25" fill="none" stroke="#78908b" stroke-dasharray="2 3"/>
      <path d="M30 29L30 5A24 24 0 ${a > Math.PI ? 1 : 0} 1 ${x} ${y}Z" fill="#${SECTOR_COLORS[i].toString(16)}" stroke="#eee1b6" stroke-width="1"/>
      <circle cx="30" cy="29" r="3" fill="#172c2e"/></svg>
      <b>${p.numerator}/${p.denominator}</b><small data-piece-state="${i}">IN TRAY</small></button>`;
    })
    .join('');
  return `<style>
[data-fraction-cage]{position:relative;isolation:isolate;width:100%;height:100%;overflow:hidden;background:#112d30;color:#eee8d3;font:13px/1.35 'Trebuchet MS',sans-serif;box-sizing:border-box}
[data-fraction-cage] *{box-sizing:border-box}
[data-fraction-cage] [hidden]{display:none!important}
[data-fraction-cage] button,[data-fraction-cage] select{font:inherit;min-height:42px;color:#eee8d3;background:#203c3e;border:1px solid #68847b;border-radius:6px;cursor:pointer;padding:7px 11px}
[data-fraction-cage] button:hover{background:#365750;border-color:#edcd90}
[data-fraction-cage] button:disabled{opacity:.4;cursor:default}
[data-fraction-cage] :focus-visible{outline:3px solid #ffe49e;outline-offset:2px}
[data-fraction-cage] button[aria-pressed=true]{background:#405c4e;border-color:#f8dd9c}
[data-fraction-cage] .fc-viewport{position:absolute;inset:0 0 230px;overflow:hidden}
[data-fraction-cage] canvas{display:block;width:100%;height:100%;touch-action:none}
[data-fraction-cage] .fc-top{position:absolute;inset:12px 12px auto;display:flex;justify-content:space-between;align-items:start;gap:6px;pointer-events:none}
[data-fraction-cage] .fc-top>*{pointer-events:auto}
[data-fraction-cage] .fc-title{margin:0;color:#f3d38e;letter-spacing:.15em;font-size:11px;text-shadow:0 2px 5px #000}
[data-fraction-cage] .fc-title span{display:block;color:#d1ddd0;letter-spacing:0;font-size:12px;margin-top:3px}
[data-fraction-cage] .fc-top button{font-size:11px;padding:5px 8px}
[data-fraction-cage] .fc-focus{position:absolute;bottom:241px;left:12px;display:flex;gap:5px}
[data-fraction-cage] .fc-focus button{font-size:11px;background:#163235ed}
[data-fraction-cage] .fc-label{position:absolute;pointer-events:none;white-space:nowrap;padding:5px 9px;background:#162d31ed;border:1px solid #819183;border-radius:4px;font-size:11px;color:#f2dba3;transform:translate(-50%,-50%)}
[data-fraction-cage] .fc-bottom{position:absolute;inset:auto 0 0;height:230px;padding:10px 12px;background:linear-gradient(115deg,#142e31,#29443d);border-top:1px solid #798369;display:flex;flex-direction:column;gap:8px}
[data-fraction-cage] .fc-tray{display:flex;gap:7px;justify-content:center;min-height:80px}
[data-fraction-cage] .fc-tray button{position:relative;flex:1;max-width:130px;min-width:0;padding:3px 4px 4px;touch-action:none;display:grid;grid-template-columns:minmax(30px,1fr) auto;align-items:center;gap:0 2px}
[data-fraction-cage] .fc-tray svg{width:100%;height:49px;grid-row:1/3}
[data-fraction-cage] .fc-tray b{font:21px Georgia,serif;padding-right:4px}
[data-fraction-cage] .fc-tray small{font-size:8px;color:#bfcec1;letter-spacing:.05em;padding-right:4px}
[data-fraction-cage] .fc-assembly{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap}
[data-fraction-cage] .fc-total{font:19px Georgia,serif;color:#f1d8a4}
[data-fraction-cage] .fc-state{font-size:11px;color:#c8d9cd;margin-left:7px;white-space:nowrap}
[data-fraction-cage] .fc-buttons{display:flex;align-items:center;gap:5px;flex-wrap:wrap}
[data-fraction-cage] .fc-buttons label{display:flex;align-items:center;gap:4px;font-size:11px}
[data-fraction-cage] .fc-buttons button{font-size:12px;padding:6px 9px}
[data-fraction-cage] [data-action=seat]{background:#dfc18a;color:#203128;border-color:#f6dba3;font-weight:bold}
[data-fraction-cage] .fc-feedback{font-size:12px;min-height:17px;color:#d3dfd1}
[data-fraction-cage] .fc-feedback[data-blocked=true]{color:#ffc1a8}
[data-fraction-cage] .fc-settings{position:absolute;right:12px;top:65px;width:min(320px,calc(100% - 24px));max-height:calc(100% - 300px);overflow:auto;z-index:6;padding:15px;border:1px solid #7e9385;background:#173435;border-radius:8px;box-shadow:0 15px 30px #0007}
[data-fraction-cage] .fc-settings p{font-size:13px;margin:5px 0 12px}
[data-fraction-cage] .fc-settings label{display:flex;align-items:center;gap:8px;margin:10px 0}
[data-fraction-cage] .fc-settings input{width:20px;height:20px;accent-color:#e3c58f}
[data-fraction-cage] .fc-settings small{color:#bfd2c6}
[data-fraction-cage].fc-expanded{position:fixed;inset:12px;z-index:2000;width:auto;height:auto;border:1px solid #a69b7c;border-radius:12px;box-shadow:0 0 0 30px #071c22ed}
@media(max-width:680px){
 [data-fraction-cage] .fc-viewport{bottom:260px}
 [data-fraction-cage] .fc-bottom{height:260px;padding:8px;gap:7px}
 [data-fraction-cage] .fc-focus{bottom:270px}
 [data-fraction-cage] .fc-tray{gap:4px;min-height:82px}
 [data-fraction-cage] .fc-tray button{display:flex;flex-direction:column;padding:2px;gap:0}
 [data-fraction-cage] .fc-tray svg{height:36px}
 [data-fraction-cage] .fc-tray b{font-size:18px;padding:0}
 [data-fraction-cage] .fc-tray small{font-size:7px;padding:0}
 [data-fraction-cage] .fc-assembly{gap:4px}
 [data-fraction-cage] .fc-buttons{gap:4px;justify-content:center}
 [data-fraction-cage] .fc-buttons button{padding:5px 8px;min-height:42px}
 [data-fraction-cage] .fc-total{font-size:17px}
 [data-fraction-cage] .fc-title{font-size:9px;letter-spacing:.08em}
 [data-fraction-cage] .fc-title span{font-size:10px;max-width:155px}
 [data-fraction-cage].fc-expanded{inset:5px}
}
</style>
<div class="fc-viewport"></div>
<div class="fc-top"><p class="fc-title">RABBIT COURTYARD<span>Build one whole. Open their path.</span></p><div><button type="button" data-action="expand" aria-label="Expand rabbit workshop">Expand</button> <button type="button" data-action="options" aria-expanded="false">Options</button></div></div>
<div class="fc-focus" aria-label="Scene focus" role="group"><button type="button" data-focus="all" aria-pressed="true">Whole scene</button><button type="button" data-focus="cog" aria-pressed="false">Cog</button><button type="button" data-focus="cage" aria-pressed="false">Rabbits</button></div>
<div class="fc-bottom">
 <div class="fc-tray" aria-label="Fraction sector tray" role="group">${tray}</div>
 <div class="fc-assembly"><span><span class="fc-total" data-total>0 = 0</span><span class="fc-state" data-state></span></span><button type="button" data-action="pause">Pause</button></div>
 <div class="fc-buttons"><button type="button" data-action="left" aria-label="Rotate sector counterclockwise">↶</button><label>Start <select data-notch aria-label="Sector start notch">${Array.from({ length: d.slots }, (_, i) => `<option value="${i}">${i}</option>`).join('')}</select></label><button type="button" data-action="right" aria-label="Rotate sector clockwise">↷</button><button type="button" data-action="seat">Seat sector</button><button type="button" data-action="lift">Lift sector</button><button type="button" data-action="replay" hidden>Replay escape</button></div>
 <div class="fc-feedback" aria-live="polite">Select a fraction sector, then place it on the cog.</div>
</div>
<div class="fc-settings" hidden><p data-clue></p><button type="button" data-action="reset">Empty the cog</button><label><input type="checkbox" data-motion>Reduce motion</label><label><input type="checkbox" data-sound checked>Mechanical sounds</label><small>Original articulated rabbit models. Six rabbits, one clear path.</small></div>`;
}
