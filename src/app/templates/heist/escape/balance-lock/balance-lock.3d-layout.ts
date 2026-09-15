export const balanceStageLayout = `<style>
 [data-balance-3d]{display:block;position:relative;background:#0b151b;color:#e8e4d7;font-family:system-ui,sans-serif;isolation:isolate}
 [data-balance-3d] *{box-sizing:border-box}
 [data-balance-3d] .b3d-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 20px;border-bottom:1px solid #ffffff12}
 [data-balance-3d] .b3d-focus{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d9c49b}
 [data-balance-3d] .b3d-mechanism{font-size:10px;letter-spacing:1.7px;color:#9cb3b5}
 [data-balance-3d] .b3d-scene-container{position:relative}
 [data-balance-3d] .b3d-scroll-hint{display:none;margin:0;padding:8px 12px;font-size:10px;color:#a5b8be}
 @media(max-width:760px){[data-balance-3d] .b3d-scroll-hint{display:block}}
 [data-balance-3d] .b3d-scene-scroll:focus-visible{outline:2px solid #aee6d0;outline-offset:-2px}
 [data-balance-3d] button{font:inherit;cursor:pointer}
 [data-balance-3d] .b3d-scene-scroll{overflow-x:auto;overscroll-behavior-x:contain}[data-balance-3d] .b3d-viewport{min-width:var(--balance-min-width);position:relative;height:var(--balance-3d-height,clamp(410px,44vw,570px));min-height:360px;background:radial-gradient(ellipse at 45% 40%,#23363d,#0b151b 78%)}
 [data-balance-3d] canvas{display:block;width:100%;height:100%;touch-action:none}
 [data-balance-3d] .b3d-reading{position:absolute;left:22px;top:20px;pointer-events:none;font-size:12px;line-height:1.65;color:#a5b8be;max-width:46%;text-shadow:0 1px 4px #000}
 [data-balance-3d] .b3d-reading strong{display:block;color:#f0e5c6;font-size:17px;letter-spacing:.2px;font-weight:500}
 [data-balance-3d] .b3d-state{position:absolute;right:20px;bottom:20px;font-size:10px;letter-spacing:1.7px;color:#c4cbc7;padding:10px 13px;background:#0c1921cb;border:1px solid #b1c5bc33;border-radius:6px;pointer-events:none}
 [data-balance-3d][data-released=true] .b3d-state{color:#b6f4cf;border-color:#74c79577}
 [data-balance-3d] .b3d-tray{padding:17px 20px 20px;border-top:1px solid #a7b7b523;background:linear-gradient(125deg,#213034,#16262c)}
 [data-balance-3d] .b3d-tray-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:13px;gap:12px;font-size:11px;letter-spacing:1.7px;color:#d2bf95}
 [data-balance-3d] .b3d-tray-title small{font-size:11px;letter-spacing:0;color:#b1c1c4;line-height:1.5;text-align:right}
 [data-balance-3d] .b3d-weights{display:grid;grid-template-columns:repeat(auto-fit,minmax(95px,1fr));gap:10px}
 [data-balance-3d] .b3d-weight{display:flex;align-items:center;justify-content:center;flex-direction:column;position:relative;min-height:80px;padding:11px 8px 8px;border:1px solid #a692584c;border-radius:9px;background:linear-gradient(150deg,#455055,#1f3035 75%);color:#f1e4c3;box-shadow:0 5px 10px #0003;touch-action:none;transition:background .18s,box-shadow .18s}
 [data-balance-3d] .b3d-weight::before{content:'';display:block;width:25px;height:5px;background:linear-gradient(90deg,#6d5431,#e0c580,#857049);border-radius:4px;margin-bottom:6px}
 [data-balance-3d] .b3d-weight strong{font:500 24px Georgia,serif}
 [data-balance-3d] .b3d-weight small{font-size:9px;letter-spacing:1px;color:#b4c0ba;margin-top:5px}
 [data-balance-3d] .b3d-weight[aria-pressed=true]{border-color:#b8edcc;background:#36544c;box-shadow:0 0 0 2px #a0ddbc33}
 [data-balance-3d] button:focus-visible{outline:3px solid #aee6d0;outline-offset:3px}
 [data-balance-3d] button:disabled{opacity:.45;cursor:default}
 [data-balance-3d] .b3d-placement{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
 [data-balance-3d] .b3d-placement[hidden]{display:none}
 [data-balance-3d] .b3d-placement button{min-height:40px;border:1px solid #718d83;border-radius:6px;background:#263e3d;color:#e5e7d3;padding:7px 14px;font-size:12px;flex:1}
 [data-balance-3d] .b3d-drag{position:absolute;pointer-events:none;z-index:3;transform:translate(-50%,-50%);background:#d2b471;color:#26332d;border:1px solid #f6e4a5;border-radius:8px;padding:14px;font:700 24px Georgia;box-shadow:0 9px 25px #0008}
 @media(max-width:600px){[data-balance-3d] .b3d-toolbar{padding:10px 12px;gap:7px}[data-balance-3d] .b3d-focus{font-size:9px;letter-spacing:1px}[data-balance-3d] .b3d-mechanism{font-size:9px;letter-spacing:.7px}[data-balance-3d] .b3d-viewport{height:400px}[data-balance-3d] .b3d-reading{left:14px;top:12px;font-size:10px}[data-balance-3d] .b3d-reading strong{font-size:14px}[data-balance-3d] .b3d-state{right:12px;bottom:12px;padding:8px;font-size:8px}[data-balance-3d] .b3d-tray{padding:14px 12px}[data-balance-3d] .b3d-weights{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}[data-balance-3d] .b3d-weight{min-height:76px}[data-balance-3d] .b3d-weight strong{font-size:21px}}
 [data-balance-3d] .b3d-toolbar{padding:8px 14px}
 [data-balance-3d] .b3d-tray{padding:10px 14px 12px}
 [data-balance-3d] .b3d-tray-title{margin-bottom:8px;font-size:10px}
 [data-balance-3d] .b3d-weight{min-height:62px;padding:7px}
 [data-balance-3d] .b3d-weight strong{font-size:21px}
 @media(max-width:600px){[data-balance-3d] .b3d-viewport{height:var(--balance-3d-height,360px);min-height:300px}[data-balance-3d] .b3d-reading{max-width:70%;padding:3px 6px;background:#12252ddb;border-radius:4px}[data-balance-3d] .b3d-tray-title{font-size:9px;gap:6px}[data-balance-3d] .b3d-tray-title small{font-size:9px}}
 </style>
 <div class="b3d-toolbar" aria-hidden="true" style="display:none"><span class="b3d-focus" data-focus-label></span><span class="b3d-mechanism" data-mechanism-label></span></div>
 <div class="b3d-scene-container"><div class="b3d-scene-scroll" tabindex="0" role="region" aria-label="Complete lock mechanism. Scroll sideways on a narrow screen."><div class="b3d-viewport"></div></div><div class="b3d-reading"><strong data-equation></strong><span data-reading style="display:none"></span></div><div class="b3d-state" role="status" data-lock-state></div></div>

 <div class="b3d-tray"><div class="b3d-tray-title"><span data-tray-label></span></div><div class="b3d-weights" role="group" aria-label="3D workshop weight tray"></div><div class="b3d-placement" role="group" aria-label="Place selected weight" hidden><button data-place="1">Left pan</button><button data-place="2">Right pan</button><button data-place="0">Return to tray</button></div></div>`;
