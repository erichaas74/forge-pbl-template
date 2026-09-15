/** Scoped native controls stay readable independently of the WebGL resolution. */
export const timingCageLayout = `
<style>
[data-timing-cage]{position:relative;width:100%;height:100%;overflow:hidden;background:#101d28;color:#f4ecd8;font:14px/1.35 'Trebuchet MS',sans-serif;isolation:isolate;box-sizing:border-box}
[data-timing-cage] *{box-sizing:border-box}
[data-timing-cage] button,[data-timing-cage] a{font:inherit}
[data-timing-cage] button{cursor:pointer;min-height:44px;padding:9px 13px;border:1px solid #66756e;border-radius:7px;background:#1b303b;color:#f4ecd8}
[data-timing-cage] button:hover{background:#314b53;border-color:#d9bb7b}
[data-timing-cage] button:disabled{cursor:default;opacity:.4}
[data-timing-cage] button:focus-visible,[data-timing-cage] input:focus-visible,[data-timing-cage] summary:focus-visible,[data-timing-cage] a:focus-visible{outline:3px solid #ffe19c;outline-offset:3px}
[data-timing-cage] [hidden]{display:none!important}
[data-timing-cage] .tc-viewport{position:absolute;inset:0 0 126px;overflow:hidden;background:radial-gradient(ellipse at 60% 30%,#365360,#0c1924 85%)}
[data-timing-cage] canvas{width:100%;height:100%;display:block;touch-action:pan-y}
[data-timing-cage] .tc-corners{position:absolute;inset:14px 14px auto;display:flex;align-items:start;justify-content:space-between;gap:10px;pointer-events:none}
[data-timing-cage] .tc-corners>*{pointer-events:auto}
[data-timing-cage] .tc-title{margin:0;color:#f5d897;text-shadow:0 2px 6px #000;font:600 12px/1.6 'Trebuchet MS',sans-serif;letter-spacing:.18em}
[data-timing-cage] .tc-subtitle{display:block;letter-spacing:0;color:#c6d5d9;font-weight:400;font-size:12px}
[data-timing-cage] .tc-view-buttons{display:flex;gap:6px}
[data-timing-cage] .tc-view-buttons button{font-size:12px;background:#152632eb;padding:7px 10px}
[data-timing-cage] .tc-focus{position:absolute;left:12px;bottom:140px;display:flex;gap:5px}
[data-timing-cage] .tc-focus button{font-size:12px;background:#142632e8}
[data-timing-cage] button[aria-pressed=true]{background:#425d59;border-color:#edcf90}
[data-timing-cage] .tc-controls{position:absolute;inset:auto 0 0;padding:12px 15px;min-height:126px;background:linear-gradient(110deg,#142630,#1e353d);border-top:1px solid #727361;display:grid;grid-template-columns:1fr auto;gap:8px 12px}
[data-timing-cage] .tc-ticks{display:flex;align-items:center;gap:13px}
[data-timing-cage] .tc-count{font:38px/.95 Georgia,serif;min-width:48px;color:#f5d590;font-variant-numeric:tabular-nums}
[data-timing-cage] .tc-count small{display:block;font:10px/1.8 'Trebuchet MS',sans-serif;letter-spacing:.2em;color:#c5d0cb}
[data-timing-cage] .tc-readings{display:flex;gap:8px;flex-wrap:wrap}
[data-timing-cage] .tc-wheel{padding:4px 9px;border-left:2px solid #b99e6c;font-size:12px;color:#dbe4dd}
[data-timing-cage] .tc-wheel[data-aligned=true]{border-color:#9fe1c1;color:#b7f0d3}
[data-timing-cage] .tc-wheel b{font-size:13px;font-weight:600;display:block;color:#f1dfb9}
[data-timing-cage] .tc-actions{display:flex;align-items:center;justify-content:flex-end;gap:6px}
[data-timing-cage] [data-action=advance]{background:#e1be7c;border-color:#f8d99a;color:#14232d;font-weight:bold;min-width:118px;box-shadow:inset 0 1px #fff4c9}
[data-timing-cage] .tc-feedback{grid-column:1/-1;font-size:12px;color:#d3dfd9;min-height:17px}
[data-timing-cage] .tc-feedback[data-open=true]{color:#b2edcb}
[data-timing-cage] .tc-settings{position:absolute;right:14px;top:70px;width:min(340px,calc(100% - 28px));max-height:calc(100% - 225px);overflow:auto;z-index:5;border:1px solid #788783;border-radius:9px;padding:15px;background:#172a35;box-shadow:0 16px 35px #0008}
[data-timing-cage] .tc-settings label{display:flex;gap:9px;align-items:center;margin:12px 0;font-size:13px}
[data-timing-cage] .tc-settings input{width:20px;height:20px;accent-color:#e4c184}
[data-timing-cage] .tc-settings a{color:#dec994;font-size:12px}
[data-timing-cage] .tc-settings p{font-size:13px;margin:7px 0 13px;color:#c6d5d8}
[data-timing-cage] .tc-settings strong{font-size:14px;color:#f0d497}
[data-timing-cage] .tc-settings button{width:100%;margin-bottom:10px}
[data-timing-cage] .tc-label{position:absolute;pointer-events:none;text-align:center;background:#142633e8;border:1px solid #81918a75;padding:5px 9px;border-radius:5px;font-size:12px;color:#f3dab0;white-space:nowrap;box-shadow:0 4px 12px #0003}
[data-timing-cage] .tc-label small{display:block;font-size:11px;color:#d1dfda}
[data-timing-cage] .tc-label[data-highlight=true]{border-color:#c4e2ca;color:#c4f1d3}
[data-timing-cage] .tc-caption{position:absolute;left:50%;bottom:143px;transform:translateX(-50%);padding:8px 15px;text-align:center;max-width:68%;background:#172d36e8;border:1px solid #b99b6c;border-radius:7px;font-size:14px;color:#f6dba5;pointer-events:none}
[data-timing-cage].tc-expanded{position:fixed;inset:14px;z-index:2000;width:auto;height:auto;border:1px solid #9a987b;border-radius:12px;box-shadow:0 0 0 30px #05121cec}
@media(max-width:650px){
 [data-timing-cage] .tc-viewport{bottom:192px}
 [data-timing-cage] .tc-controls{min-height:192px;grid-template-columns:1fr;padding:11px}
 [data-timing-cage] .tc-actions{justify-content:stretch}
 [data-timing-cage] .tc-actions button{flex:1}
 [data-timing-cage] .tc-focus{bottom:205px}
 [data-timing-cage] .tc-caption{bottom:258px;font-size:12px;max-width:94%;width:max-content}
 [data-timing-cage] .tc-view-buttons button{font-size:11px;padding:6px 8px}
 [data-timing-cage] .tc-title{font-size:10px;letter-spacing:.1em}
 [data-timing-cage] .tc-subtitle{font-size:11px;max-width:145px}
 [data-timing-cage].tc-expanded{inset:5px}
}
</style>
<div class="tc-viewport"></div>
<div class="tc-corners"><p class="tc-title">PATROL SYNCHRONIZER<span class="tc-subtitle">Turn the crank. Watch the holes.</span></p><div class="tc-view-buttons"><button type="button" data-action="expand" aria-label="Expand patrol workshop">Expand</button><button type="button" data-action="settings" aria-expanded="false">Options</button></div></div>
<div class="tc-focus" role="group" aria-label="Scene focus"><button type="button" data-focus="all" aria-pressed="true">Whole scene</button><button type="button" data-focus="lock" aria-pressed="false">Lock</button><button type="button" data-focus="cage" aria-pressed="false">Cage</button></div>
<div class="tc-caption" role="status" hidden></div>
<div class="tc-controls">
 <div class="tc-ticks"><div class="tc-count"><span data-count>0</span><small>TICKS</small></div><div class="tc-readings" aria-label="Wheel timing"></div></div>
 <div class="tc-actions"><button type="button" data-action="rewind" aria-label="Rewind one tick">↶ 1</button><button type="button" data-action="advance">Crank +1</button><button type="button" data-action="replay" hidden>Replay escape</button><button type="button" data-action="pause">Pause</button></div>
 <div class="tc-feedback" aria-live="polite">The first turn arms the latch.</div>
</div>
<div class="tc-settings" hidden><strong>Workshop options</strong><p data-clue></p><button type="button" data-action="reset">Rewind to the start</button><label><input type="checkbox" data-setting="motion">Reduce motion</label><label><input type="checkbox" data-setting="sound" checked>Mechanical sounds</label><a data-credits target="_blank" rel="noopener">Animal art & animation credits ↗</a></div>
`;
