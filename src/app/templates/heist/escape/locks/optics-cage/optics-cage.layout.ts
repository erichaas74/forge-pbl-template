import type { Reflection } from '../machine.models';

export function opticsCageLayout(d: Reflection): string {
  return `<style>
[data-optics-cage]{position:relative;isolation:isolate;box-sizing:border-box;width:100%;height:100%;overflow:hidden;background:#122238;color:#e3eaf1;font:13px/1.35 'Trebuchet MS',sans-serif}
[data-optics-cage] *{box-sizing:border-box}
[data-optics-cage] [hidden]{display:none!important}
[data-optics-cage] button,[data-optics-cage] select{font:inherit;min-height:42px;padding:6px 11px;color:#e7edf5;background:#233b52;border:1px solid #738b9b;border-radius:6px;cursor:pointer}
[data-optics-cage] button:hover{background:#36536a;border-color:#e6cd91}
[data-optics-cage] button:disabled{opacity:.4;cursor:default}
[data-optics-cage] :focus-visible{outline:3px solid #ffe1a4;outline-offset:2px}
[data-optics-cage] button[aria-pressed=true]{background:#365771;border-color:#93e3f3}
[data-optics-cage] [data-viewport]{position:absolute;inset:0 0 174px;overflow:hidden}
[data-optics-cage] canvas{width:100%;height:100%;display:block;touch-action:none;cursor:grab}
[data-optics-cage] canvas:active{cursor:grabbing}
[data-optics-cage] .oc-top{position:absolute;inset:12px 12px auto;display:flex;justify-content:space-between;align-items:start;gap:8px;pointer-events:none}
[data-optics-cage] .oc-top>*{pointer-events:auto}
[data-optics-cage] .oc-title{font-size:11px;letter-spacing:.15em;color:#c1e9ff;margin:0;text-shadow:0 2px 6px #07121e}
[data-optics-cage] .oc-title span{display:block;font-size:12px;letter-spacing:0;color:#d6e0e8;margin-top:4px}
[data-optics-cage] .oc-top button{font-size:11px;padding:5px 8px}
[data-optics-cage] .oc-focus{position:absolute;left:12px;bottom:185px;display:flex;gap:5px}
[data-optics-cage] .oc-focus button{font-size:11px;background:#192f45ef}
[data-optics-cage] .oc-bottom{position:absolute;inset:auto 0 0;height:174px;padding:11px 14px;border-top:1px solid #748694;background:linear-gradient(115deg,#12293e,#29465b);display:flex;flex-direction:column;gap:9px}
[data-optics-cage] .oc-mirrors{display:flex;gap:8px;align-items:stretch}
[data-optics-cage] .oc-mirrors button{flex:1;text-align:left;display:flex;align-items:center;gap:10px;min-height:51px}
[data-optics-cage] .oc-mirrors b{font:23px Georgia,serif;color:#f1d69f}
[data-optics-cage] .oc-mirrors span{display:block;font-size:10px;letter-spacing:.08em;color:#d0e0ec}
[data-optics-cage] .oc-mirrors strong{display:block;font-size:15px;letter-spacing:0;color:#f2f6fa}
[data-optics-cage] .oc-mirrors svg{width:30px;height:30px;flex-shrink:0}
[data-optics-cage] .oc-controls{display:flex;align-items:center;gap:7px;justify-content:space-between}
[data-optics-cage] .oc-controls label{display:flex;align-items:center;gap:6px;font-size:11px}
[data-optics-cage] .oc-turn{display:flex;align-items:center;gap:5px}
[data-optics-cage] .oc-turn button{font-size:21px;min-width:42px;padding:4px}
[data-optics-cage] .oc-controls button{white-space:nowrap}
[data-optics-cage] .oc-feedback{font-size:12px;color:#d0e4ef;min-height:18px}
[data-optics-cage] .oc-feedback[data-blocked=true]{color:#f2c4a5}
[data-optics-cage] [data-options]{position:absolute;right:12px;top:65px;width:min(325px,calc(100% - 24px));max-height:calc(100% - 255px);overflow:auto;background:#19344b;border:1px solid #7e9aaa;border-radius:8px;box-shadow:0 14px 30px #0008;padding:15px;z-index:7}
[data-optics-cage] [data-options] p{margin:8px 0 15px;color:#cedeea}
[data-optics-cage] [data-options] label{display:flex;gap:8px;align-items:center;margin:12px 0}
[data-optics-cage] [data-options] input{width:20px;height:20px;accent-color:#98daef}
[data-optics-cage].diorama-expanded{position:fixed;inset:12px;z-index:2000;width:auto;height:auto;border:1px solid #8b9eaf;border-radius:12px;box-shadow:0 0 0 30px #07121eed}
@media(max-width:680px){
 [data-optics-cage] [data-viewport]{bottom:222px}
 [data-optics-cage] .oc-bottom{height:222px;padding:10px;gap:9px}
 [data-optics-cage] .oc-focus{bottom:233px}
 [data-optics-cage] .oc-mirrors{gap:5px}
 [data-optics-cage] .oc-mirrors button{padding:7px;gap:6px}
 [data-optics-cage] .oc-mirrors svg{display:none}
 [data-optics-cage] .oc-controls{justify-content:center;flex-wrap:wrap;gap:7px}
 [data-optics-cage] .oc-turn{flex-basis:100%;justify-content:center}
 [data-optics-cage] .oc-title{font-size:9px;letter-spacing:.08em}
 [data-optics-cage] .oc-title span{font-size:10px;max-width:156px}
 [data-optics-cage] .oc-feedback{font-size:11px}
 [data-optics-cage].diorama-expanded{inset:5px}
}
</style>
<div data-viewport></div>
<div class="oc-top"><p class="oc-title">MOON-TOWER OWL RESCUE<span>Turn the mirrors. Follow the light.</span></p><div><button type="button" data-action="expand" aria-label="Expand owl workshop">Expand</button> <button type="button" data-action="options" aria-expanded="false">Options</button></div></div>
<div class="oc-focus" role="group" aria-label="Scene focus"><button type="button" data-focus="all" aria-pressed="true">Whole scene</button><button type="button" data-focus="drive" aria-pressed="false">Mirrors</button><button type="button" data-focus="cage" aria-pressed="false">Owls</button></div>
<div class="oc-bottom">
 <div class="oc-mirrors" role="group" aria-label="Select a mirror">${d.mirrors.map((_, i) => `<button type="button" data-mirror="${i}" aria-label="Select mirror ${i + 1}" aria-pressed="${i === 0}"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#152c42" stroke="#d5b87e"/><path d="M8 32L32 8" stroke="#c1eff8" stroke-width="4"/><circle cx="20" cy="20" r="3" fill="#e0c38b"/></svg><b>${i + 1}</b><span>MIRROR<strong data-angle="${i}">${d.mirrors[i].start}°</strong></span></button>`).join('')}</div>
 <div class="oc-controls"><div class="oc-turn"><button type="button" data-action="left" aria-label="Rotate selected mirror counterclockwise">↶</button><label><span data-selected>Mirror 1</span><select data-angle-control aria-label="Selected mirror angle"></select></label><button type="button" data-action="right" aria-label="Rotate selected mirror clockwise">↷</button></div><button type="button" data-action="test">Test beam</button><button type="button" data-action="replay" hidden>Replay flight</button><button type="button" data-action="pause" aria-pressed="false">Pause</button></div>
 <div class="oc-feedback" aria-live="polite">Drag a brass mirror handle, or select a mirror and turn it below.</div>
</div>
<div data-options hidden><strong>Every reflection follows the same rule.</strong><p>Measure from the line perpendicular to the mirror: the incoming and outgoing angles are equal. Dial angles here turn clockwise from horizontal.</p><p data-clue></p><button type="button" data-action="reset">Reset mirrors</button><label><input type="checkbox" data-motion>Reduce motion</label><label><input type="checkbox" data-sound checked>Mechanical sounds</label></div>`;
}
