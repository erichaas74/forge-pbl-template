from pathlib import Path
import re

base=Path('src/app/templates/heist/escape')
def edit(path, fn):
    p=base/path
    old=p.read_text(encoding='utf-8')
    new=fn(old)
    if old==new: raise RuntimeError(f'No change: {path}')
    p.write_text(new,encoding='utf-8')

# The scene owns manipulation; the adjacent tutor owns prompts and trial explanations.
def workspace(s):
    s=re.sub(r'  <header class="week-heading">.*?</header>\n','',s,flags=re.S)
    start=s.index('      <div class="workshop-picker">')
    end=s.index('      @for (key',start)
    setup=s[start:end]
    grade=re.search(r'        <label\s*>Math pathway.*?</label>',setup,re.S).group(0)
    note=setup[setup.index('      <div class="setup-note">'):]
    s=s[:start]+s[end:]
    start=s.index('      <div class="secondary-tools"')
    end=s.index('      @if (runtime.warning())',start)
    tools=s[start:end]
    tools=tools[tools.index('      <div class="workspace-options">'):]
    tools=tools.rsplit('      </div>',1)[0]
    s=s[:start]+s[end:]
    s=s.replace('<summary>AI Tutor <span>Disconnected</span></summary>','<summary>AI Tutor <span>Disconnected</span></summary>')
    s=s.replace('          <h2>Questions & concepts</h2>', '''          <h2>{{ runtime.step().title }}</h2>
          @for (clue of guidance(); track $index) { <p>{{ clue }}</p> }
          <h2>Questions & concepts</h2>''')
    s=s.replace('          <h2>Future model controls</h2>', '''          <h2>Preview settings</h2>
'''+grade+'\n'+note+tools+'''
          @if (credits(); as url) { <a [href]="url" target="_blank" rel="noopener">Animal art & animation credits</a> }
          <h2>Future model controls</h2>''')
    s=s.replace('Proposed weekly products <span>Week {{ week().week }}</span>','Proposed weekly products <span>{{ week().title }}</span>')
    return s
edit(Path('weekly/expedition-week-workspace.component.html'),workspace)
def workspace_ts(s):
    s=s.replace("import { isBridgeDiorama, isCageDiorama } from '../locks/machine-presentation';", "import { fractionLabel } from '../gear-lock/gear-lock.domain';")
    s=s.replace("import { usesPiston } from '../balance-lock/balance-lock.domain';\n",'')
    s=re.sub(r'  readonly sceneTools = signal\(false\);\n  readonly timingScene = computed\(\(\) => \{.*?\n  \}\);', '''  readonly guidance = computed(() => {
    const p = this.runtime.step().puzzle;
    if (p.type === 'machine-lock') return p.lock.stages.flatMap(s => [s.instruction, s.hint]);
    if (p.type === 'balance-lock') return p.lock.scales.map(s => s.instruction);
    if (p.type === 'gear-lock') return [p.lock.instruction,
      `Axle A: ${fractionLabel(p.lock.firstMultiplier)} × ${p.lock.driverTeeth} teeth. Axle B: ${fractionLabel(p.lock.secondMultiplier)} × ${p.lock.pinionTeeth} teeth. Output target: ${fractionLabel(p.lock.outputTurns)} turns.`];
    return [];
  });
  readonly credits = computed(() => {
    const p = this.runtime.step().puzzle;
    if (p.type === 'gear-lock') return p.lock.presentation?.animal.credits;
    if (p.type === 'machine-lock') {
      const stage = p.lock.stages.find(s => s.kind === 'timing-wheels');
      if (stage?.kind === 'timing-wheels') return stage.presentation?.animal.credits;
    }
    return undefined;
  });''',s,flags=re.S)
    return s.replace('    this.sceneTools.set(false);\n','')
edit(Path('weekly/expedition-week-workspace.component.ts'),workspace_ts)
edit(Path('weekly/expedition-week-workspace.component.html'),lambda s:s.replace(' [class.timing-scene]="timingScene()"',''))

layouts=[('locks/fraction-cage','fraction','fc',160,205),('locks/timing-cage','timing','tc',86,135),('gear-lock/gear-cage','gear','gc',198,252),('locks/optics-cage','optics','oc',132,160),('locks/bridge-cage','bridge','bc',162,184)]
for folder,kind,prefix,height,mobile in layouts:
    def layout(s):
        # Delete alternate cameras and menu DOM, including its instructional text.
        s=re.sub(r'<div class="'+prefix+r'-focus"[^\n]*\n','',s)
        s=re.sub(r' ?<button type="button" data-action="(?:options|settings)"[^>]*>Options</button>','',s)
        s=re.sub(r'<div (?:class="'+prefix+r'-(?:settings)"|data-options) hidden>[^\n]*</div>', '', s)
        s=re.sub(r'(<p class="'+prefix+r'-title">[^<]*)<span[^>]*>.*?</span>',r'\1',s)
        s=s.replace('<div class="bc-clue" data-clue></div>','')
        s=s.replace('>Position the carriage</small>','></small>').replace('>Fit a measured cable</small>','></small>')
        s=s.replace('>Seat sector</button>','>Place</button>').replace('>Lift sector</button>','>Lift</button>')
        # A single reset remains a physical operation, rather than a settings menu.
        s=s.replace('data-action="expand"', 'data-action="expand"',1)
        s=re.sub(r'(<button type="button" data-action="expand"[^>]*>Expand</button>)',r'\1 <button type="button" data-action="reset" aria-label="Reset mechanism">↺</button>',s)
        viewport='.tc-viewport' if prefix=='tc' else '.fc-viewport' if prefix=='fc' else '[data-viewport]'
        bottom='tc-controls' if prefix=='tc' else prefix+'-bottom'
        # Live narration remains available to screen readers without filling the scene with prose.
        css=f'''\n[data-{kind}-cage] .{prefix}-feedback{{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}}
[data-{kind}-cage] {viewport}{{bottom:{height}px}}
[data-{kind}-cage] .{bottom}{{height:{height}px;min-height:{height}px}}
[data-{kind}-cage] output{{display:inline-block;min-width:28px;text-align:center;font-variant-numeric:tabular-nums}}
@media(max-width:680px){{[data-{kind}-cage] {viewport}{{bottom:{mobile}px}}[data-{kind}-cage] .{bottom}{{height:{mobile}px;min-height:{mobile}px}}}}
'''
        return s.replace('</style>',css+'</style>')
    edit(Path(folder)/f'{kind}-cage.layout.ts',layout)

# Remove menu wiring; reduced-motion now follows the shared accessible preference.
for folder,kind,prefix,_,_ in layouts:
    def scene(s):
        s=re.sub(r"  q\('\[data-clue\]'\).textContent = d.hint;\n",'',s)
        s=re.sub(r"  q<HTMLAnchorElement>\('\[data-credits\]'\).href = .*?;\n",'',s)
        s=s.replace("const viewport = q<HTMLDivElement>('.fc-viewport'),\n    options = q('.fc-settings');", "const viewport = q<HTMLDivElement>('.fc-viewport');")
        s=s.replace("const viewport = q<HTMLDivElement>('.tc-viewport'),\n    settings = q<HTMLDivElement>('.tc-settings');", "const viewport = q<HTMLDivElement>('.tc-viewport');")
        s=re.sub(r"    if \(name === '(?:options|settings)'\) \{.*?\n    \}", '',s,flags=re.S)
        s=re.sub(r"      case 'options': \{.*?\n      \}", '',s,flags=re.S)
        s=re.sub(r"      if \(!(?:options|settings).hidden\) \{.*?\n      \} else if \(expanded\)", '      if (expanded)',s,flags=re.S)
        s=re.sub(r"^.*(?:options|settings).hidden = true;\n",'',s,flags=re.M)
        s=re.sub(r"^.*action\('(?:options|settings)'\).*\n",'',s,flags=re.M)
        s=s.replace('          viewer.closeOptions();\n','').replace('        viewer.closeOptions();\n','')
        s=re.sub(r"^.*q(?:<[^>]+>)?\('\[data-(?:motion|setting=motion)\]'\).checked = motion;\n",'',s,flags=re.M)
        if kind in ('fraction','timing'):
            # No local setting overrides remain.
            s=s.replace('motion || snapshot().reducedMotion','snapshot().reducedMotion')
            s=re.sub(r'  let motion = snapshot\(\).reducedMotion,\n', '  let ',s)
        if kind in ('gear','optics'):
            s=re.sub(r"  const reducedInput = q<HTMLInputElement>\('\[data-motion\]'\);\n  reducedInput.checked = snapshot\(\).reducedMotion;\n",'',s)
            s=s.replace('reducedInput.checked || snapshot().reducedMotion','snapshot().reducedMotion').replace('v.reducedMotion || reducedInput.checked','v.reducedMotion')
        if kind=='optics':
            s=s.replace("const control = q<HTMLSelectElement>('[data-angle-control]'),\n    reducedInput = q<HTMLInputElement>('[data-motion]');\n  reducedInput.checked = snapshot().reducedMotion;", "const control = q<HTMLOutputElement>('[data-angle-control]');")
            s=re.sub(r"      if \(control.dataset\['mirror'\].*?\n      \}\n",'',s,flags=re.S)
            s=s.replace('      control.disabled = !can;\n','')
            s=s.replace('      control.value = String(shown[selected]);','      control.value = `${shown[selected]}°`;')
        if kind=='bridge':
            s=s.replace("const sequence = new BridgeSequence(d, snapshot()),\n    reduced = q<HTMLInputElement>('[data-motion]');\n  reduced.checked = snapshot().reducedMotion;", "const sequence = new BridgeSequence(d, snapshot());")
            s=s.replace('q<HTMLSelectElement>(\'[data-axis=', 'q<HTMLOutputElement>(\'[data-axis=')
            s=re.sub(r'  for \(const axis of Object.values\(axes\)\).*?\n    \}\n','',s,flags=re.S)
            s=s.replace('reduced.checked || snapshot().reducedMotion','snapshot().reducedMotion')
            s=s.replace('        axes[axis].disabled = !can;\n','')
            s=re.sub(r"^.*q\('\[data-(?:clue|hint)\]'\).textContent.*\n",'',s,flags=re.M)
            s=s.replace("? 'Aligned'\n          : i === 0\n            ? 'Position the carriage'\n            : 'Fit a measured cable'", "? '✓' : ''")
        if kind in ('fraction','timing'):
            s=re.sub(r'  function onChange\(.*?\n  \}\n','',s,flags=re.S)
            s=s.replace("  root.addEventListener('change', onChange);\n",'').replace("    root.removeEventListener('change', onChange);\n",'')
        else:
            s=re.sub(r"    if \(\(event.target as HTMLElement\).matches\('\[data-sound\]'\)\) \{.*?\n    \}", '', s,flags=re.S)
        return s
    edit(Path(folder)/f'{kind}-cage.scene.ts',scene)

edit(Path('locks/diorama-viewer.ts'),lambda s:re.sub(r'  closeOptions\(\): void \{.*?\n  \}\n','',s,flags=re.S).replace("      if (!this.root.querySelector<HTMLElement>('[data-options]')!.hidden) {\n        this.closeOptions();\n        this.root.querySelector<HTMLButtonElement>('[data-action=options]')!.focus();\n      } else if (this.expanded)","      if (this.expanded)"))
edit(Path('locks/optics-cage/optics-cage.layout.ts'),lambda s:s.replace('<select data-angle-control aria-label="Selected mirror angle"></select>','<output data-angle-control aria-label="Selected mirror angle"></output>'))
edit(Path('locks/bridge-cage/bridge-cage.layout.ts'),lambda s:s.replace('<select data-axis="x" aria-label="Anchor X coordinate"></select>','<output data-axis="x" aria-label="Anchor X coordinate"></output>').replace('<select data-axis="y" aria-label="Anchor Y coordinate"></select>','<output data-axis="y" aria-label="Anchor Y coordinate"></output>'))
edit(Path('locks/fraction-cage/fraction-cage.layout.ts'),lambda s:re.sub(r'<select data-notch.*?</select>', '<output data-notch aria-label="Sector start notch"></output>',s))
edit(Path('locks/fraction-cage/fraction-cage.scene.ts'),lambda s:re.sub(r"^.*q<HTMLSelectElement>\('\[data-notch\]'\).disabled.*\n",'',s,flags=re.M).replace("q<HTMLSelectElement>('[data-notch]')", "q<HTMLOutputElement>('[data-notch]')"))

# Concise mechanism labels, no question prompts embedded in the inventory.
edit(Path('gear-lock/gear-cage/gear-cage.layout.ts'),lambda s:s.replace('<b>A · ${fractionLabel(d.firstMultiplier)} × ${d.driverTeeth}</b>','<b>Axle A</b>').replace('<b>B · ${fractionLabel(d.secondMultiplier)} × ${d.pinionTeeth}</b>','<b>Axle B</b>').replace('OUTPUT / TARGET ${fractionLabel(d.outputTurns)}','OUTPUT').replace('fractionLabel, type GearLockDefinition','type GearLockDefinition'))
edit(Path('balance-lock/balance-lock.component.html'),lambda s:re.sub(r'      <button class="help" \(click\)="help.set.*?\n      \}\n','',s,count=1,flags=re.S).replace('@if (help()) {','@if (help() && !authoringPreview()) {').replace('<div class="mechanism-brief">','<div class="mechanism-brief" [hidden]="authoringPreview()">'))
edit(Path('balance-lock/balance-lock.3d-layout.ts'),lambda s:s.replace('<small>Drag to the active pan, or select a weight below.</small>','').replace('<p class="b3d-scroll-hint">Scroll sideways to explore the complete lock.</p>','').replace('<div class="b3d-toolbar">','<div class="b3d-toolbar" aria-hidden="true" style="display:none">').replace('<span data-reading></span>','<span data-reading style="display:none"></span>'))

# Legacy liquid scenes retain their interactive apparatus and always-visible keyboard controls.
edit(Path('locks/render-liquids.ts'),lambda s:s.replace("'MEASURED TRANSFER\\nLet the float settle.'", "'TRANSFERRING'").replace("'Drag a vessel to the inlet\\nor tap it to pour.'", "''").replace("'Colored amounts are measured.\\nMatching color alone is not enough.'", "''").replace("      s.plate('pump-label', 615, 603, 'TURN A VALVE TO DISPENSE ONE MEASURE', 530);",''))
print('Castle scene UI updated')
