export const bridgeCageLayout = `<style>
[data-bridge-cage]{position:relative;isolation:isolate;width:100%;height:100%;overflow:hidden;background:#173b40;color:#ecf2e5;font:13px/1.35 'Trebuchet MS',sans-serif}
[data-bridge-cage] *{box-sizing:border-box}[data-bridge-cage] [hidden]{display:none!important}
[data-bridge-cage] button,[data-bridge-cage] select{font:inherit;min-height:42px;padding:6px 10px;color:#edf1e4;background:#284d50;border:1px solid #84a6a3;border-radius:6px;cursor:pointer}
[data-bridge-cage] button:hover{background:#426465;border-color:#e9c77d}[data-bridge-cage] button:disabled{opacity:.42;cursor:default}
[data-bridge-cage] :focus-visible{outline:3px solid #ffda85;outline-offset:2px}[data-bridge-cage] button[aria-pressed=true]{background:#446965;border-color:#e0c38b}
[data-bridge-cage] [data-viewport]{position:absolute;inset:0 0 220px;overflow:hidden}
[data-bridge-cage] canvas{width:100%;height:100%;display:block;touch-action:none;cursor:grab}
[data-bridge-cage] .bc-top{position:absolute;inset:12px 12px auto;display:flex;justify-content:space-between;gap:8px;pointer-events:none}
[data-bridge-cage] .bc-top>*{pointer-events:auto}[data-bridge-cage] .bc-title{margin:0;color:#e4dfbb;font-size:11px;letter-spacing:.13em;text-shadow:0 2px 5px #09282d}
[data-bridge-cage] .bc-title span{display:block;font-size:12px;letter-spacing:0;margin-top:4px}
[data-bridge-cage] .bc-top button{font-size:11px;padding:5px 8px}
[data-bridge-cage] .bc-focus{position:absolute;left:12px;bottom:230px;display:flex;gap:5px}
[data-bridge-cage] .bc-focus button{font-size:11px;background:#173f43ed}
[data-bridge-cage] .bc-bottom{position:absolute;inset:auto 0 0;height:220px;padding:10px 14px;background:linear-gradient(115deg,#16383e,#30564f);border-top:1px solid #8da294;display:flex;flex-direction:column;gap:8px}
[data-bridge-cage] .bc-stages{display:flex;gap:7px}[data-bridge-cage] .bc-stages button{flex:1;display:flex;align-items:center;gap:9px;text-align:left}
[data-bridge-cage] .bc-stages b{font:24px Georgia;color:#f3d294}[data-bridge-cage] .bc-stages small{display:block;color:#c2d9d4;font-size:10px}
[data-bridge-cage] .bc-clue{font-size:12px;min-height:32px;color:#f0dfb2}
[data-bridge-cage] .bc-rails,[data-bridge-cage] .bc-actions,[data-bridge-cage] .bc-cables{display:flex;gap:7px;align-items:center;justify-content:space-between}
[data-bridge-cage] .bc-rails label{display:flex;align-items:center;gap:5px}[data-bridge-cage] .bc-axis{display:flex;align-items:center;gap:5px}
[data-bridge-cage] .bc-axis button{font-size:19px;min-width:42px;padding:4px}
[data-bridge-cage] .bc-cables button{flex:1;padding:5px 7px;display:flex;align-items:center;justify-content:center;gap:6px}
[data-bridge-cage] .bc-cables svg{width:28px;height:28px;flex-shrink:0}
[data-bridge-cage] .bc-feedback{font-size:12px;color:#d3e5dc;min-height:16px;flex:1}
[data-bridge-cage] .bc-actions{gap:8px}[data-bridge-cage] .bc-actions button{min-height:36px;font-size:11px}
[data-bridge-cage] [data-options]{position:absolute;right:12px;top:65px;max-height:calc(100% - 300px);overflow:auto;width:min(325px,calc(100% - 24px));background:#244b4b;border:1px solid #95ada3;box-shadow:0 14px 30px #0008;border-radius:8px;padding:15px;z-index:7}
[data-bridge-cage] [data-options] label{display:flex;gap:8px;align-items:center;margin:12px 0}[data-bridge-cage] [data-options] input{width:20px;height:20px;accent-color:#d7b871}
[data-bridge-cage].diorama-expanded{position:fixed;inset:12px;z-index:2000;width:auto;height:auto;border:1px solid #8ba59e;border-radius:12px;box-shadow:0 0 0 30px #102b30ed}
@media(max-width:680px){
 [data-bridge-cage] [data-viewport]{bottom:280px}[data-bridge-cage] .bc-bottom{height:280px;padding:10px;gap:8px}
 [data-bridge-cage] .bc-focus{bottom:290px}[data-bridge-cage] .bc-clue{font-size:11px;min-height:46px}
 [data-bridge-cage] .bc-title{font-size:9px;max-width:175px}[data-bridge-cage] .bc-title span{font-size:10px}
 [data-bridge-cage] .bc-rails{justify-content:center;gap:10px;flex-wrap:wrap}[data-bridge-cage] .bc-axis{gap:4px}
 [data-bridge-cage] .bc-axis button{min-width:35px}[data-bridge-cage] .bc-axis select{max-width:58px;padding:5px}
 [data-bridge-cage] .bc-cables{gap:4px}[data-bridge-cage] .bc-cables button{flex-direction:column;gap:2px;font-size:11px;padding:4px}
 [data-bridge-cage] .bc-cables svg{width:23px;height:23px}[data-bridge-cage] .bc-actions{flex-wrap:wrap;justify-content:center}
 [data-bridge-cage] .bc-feedback{flex-basis:100%;font-size:11px;min-height:30px}
 [data-bridge-cage].diorama-expanded{inset:5px}
}
</style>
<div data-viewport></div>
<div class="bc-top"><p class="bc-title">RIVER CROSSING<span>Dock the anchor. Rig the cable.</span></p><div><button type="button" data-action="expand" aria-label="Expand bridge workshop">Expand</button> <button type="button" data-action="options" aria-expanded="false">Options</button></div></div>
<div class="bc-focus" role="group" aria-label="Scene focus"><button type="button" data-focus="all" aria-pressed="true">Whole scene</button><button type="button" data-focus="drive" aria-pressed="false">Mechanism</button><button type="button" data-focus="cage" aria-pressed="false">Crossing</button></div>
<div class="bc-bottom">
 <div class="bc-stages" role="group" aria-label="Bridge mechanisms"><button type="button" data-stage="0" aria-pressed="true"><b>1</b><span>Anchor rails<small data-status="0">Position the carriage</small></span></button><button type="button" data-stage="1" aria-pressed="false"><b>2</b><span>Cable rig<small data-status="1">Fit a measured cable</small></span></button></div>
 <div class="bc-clue" data-clue></div>
 <div class="bc-rails" data-rails>
  <div class="bc-axis"><button type="button" data-action="xminus" aria-label="Move anchor left">−</button><label>X <select data-axis="x" aria-label="Anchor X coordinate"></select></label><button type="button" data-action="xplus" aria-label="Move anchor right">+</button></div>
  <div class="bc-axis"><button type="button" data-action="yminus" aria-label="Move anchor down">−</button><label>Y <select data-axis="y" aria-label="Anchor Y coordinate"></select></label><button type="button" data-action="yplus" aria-label="Move anchor up">+</button></div>
 </div>
 <div class="bc-cables" data-cables role="group" aria-label="Cable reels" hidden></div>
 <div class="bc-actions"><div class="bc-feedback" aria-live="polite"></div><button type="button" data-action="test">Test setup</button><button type="button" data-action="replay" hidden>Replay crossing</button><button type="button" data-action="pause" aria-pressed="false">Pause</button></div>
</div>
<div data-options hidden><strong>Bridge engineer's notes</strong><p data-hint></p><button type="button" data-action="reset">Reset this mechanism</button><label><input type="checkbox" data-motion>Reduce motion</label><label><input type="checkbox" data-sound checked>Mechanical sounds</label></div>`;
