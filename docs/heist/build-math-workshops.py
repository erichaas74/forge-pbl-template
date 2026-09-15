"""Reproducible curriculum authoring for the seven registered workshop capabilities."""
import copy
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
project = ROOT / 'public/projects/castle-archive-rescue/project.json'
fixture = ROOT / 'src/app/templates/heist/testing/castle-escape-v3.3.fixture.json'
if not fixture.exists():
    fixture.write_bytes(project.read_bytes())
mission = json.loads(fixture.read_text(encoding='utf-8'))
mission['projectVersion'] = '4.0.0'
mission['schemaVersion'] = '1.3'
mission['mathGrades'] = [5, 6, 7, 8]
mission['subtitle'] = 'Twelve stolen animals. Nine working machines. Choose your math level: grades 5-8.'
ART = '/projects/castle-archive-rescue/art/v3/gear-workshop.png'

def stage(kind, title, instruction, hint, success, **kwargs):
    return dict(id=kind, kind=kind, title=title, instruction=instruction, hint=hint, success=success, **kwargs)

def puzzle(title, skill, stages):
    return dict(type='machine-lock', prompt=stages[0]['instruction'], hint=stages[0]['hint'], skill=skill,
                lock=dict(title=title, backdrop=ART, stages=stages))

def puzzles(grade):
    periods = {5:[4,6],6:[6,8],7:[4,6,9],8:[6,8]}[grade]
    phases = [1,1] if grade == 8 else [0]*len(periods)
    timing = stage('timing-wheels', 'The patrol synchronizer',
        'Find the FIRST positive tick when every wheel hole returns to its release line. '+
        ('Both wheels begin one tick past zero. Account for that offset.' if grade==8 else 'The wheels turn once every '+', '.join(map(str,periods))+' ticks. Zero does not count.'),
        'List common arrival times. A wheel with an offset aligns when (time + offset) is a multiple of its period.',
        'All the holes align at the first possible moment. The lookout shutter closes!',
        periods=periods, phases=phases, maxSteps=120 if grade==7 else 72, firstAlignment=True)
    fractions={5:[(1,2),(1,3),(1,4),(1,4),(1,6),(1,8)],6:[(1,3),(1,4),(1,6),(1,12),(1,2),(1,8)],
               7:[(5,12),(1,3),(1,4),(1,6),(1,8),(1,12)],8:[(7,24),(5,12),(1,8),(1,6),(1,3),(1,8)]}[grade]
    fraction=stage('fraction-gear','The broken moon cog',
        'Drag a selection of brass sectors onto the axle. Build exactly ONE full circle with no gaps or overlaps. Click a piece to select it; use the controls to rotate by one notch.',
        'Each notch is 1/24 of a turn. Convert the fractions to twenty-fourths, then arrange your chosen sectors edge to edge.',
        'A complete circle! The teeth mesh and six rabbits can hop free.',slots=24,teeth=48,
        pieces=[dict(id=f'sector-{i}',numerator=n,denominator=d) for i,(n,d) in enumerate(fractions)])
    goals={5:dict(mode='transform',start=dict(x=2,y=1),scale=1,shift=dict(x=4,y=3)),
           6:dict(mode='transform',start=dict(x=-5,y=2),scale=1,shift=dict(x=7,y=-5)),
           7:dict(mode='transform',start=dict(x=-2,y=1),scale=-2,shift=dict(x=-1,y=4)),
           8:dict(mode='intersection',lines=[dict(a=2,b=-1,c=-1),dict(a=1,b=1,c=7)])}
    coordinate=stage('coordinate','The bridge positioning engine',
        {5:'Start at (2, 1). Move 4 units right and 3 units up. Set the X and Y rails to the destination.',
         6:'Start at (-5, 2). Translate 7 units right and 5 units down. Locate the new ordered pair.',
         7:'Transform (-2, 1) using (x, y) -> (-2x - 1, -2y + 4). Position the head at the image point.',
         8:'Locate the shared release socket: y = 2x + 1 and y = -x + 7. Set the head at the intersection.'}[grade],
        'Horizontal position is x; vertical position is y. For the intersection, equate the two expressions for y.',
        'Both rails meet the hidden release socket. Now rig the bridge cable.',min=0 if grade==5 else -8 if grade==6 else -4,max=8,goal=goals[grade])
    route={5:[(0,0),(2.5,0),(6,0)],6:[(0,0),(4,0)],7:[(0,0),(6,0),(6,4)],8:[(0,0),(6,8)]}[grade]
    target={5:6,6:8,7:7.5,8:10}[grade]
    cable=stage('cable','The tension carriage',
        {5:'Two straight spans measure 2.5 m and 3.5 m. Hook on one cable that reaches exactly, without slack.',
         6:'The drawing measures 4 units. Its scale is 2 metres per drawing unit. Choose the actual cable length.',
         7:'A scale drawing shows a pulley route 6 units across and 4 units up. Each unit represents 0.75 m. Calculate the actual cable length.',
         8:'The anchors are 6 m apart horizontally and 8 m apart vertically. Use the Pythagorean theorem to find the diagonal cable length.'}[grade],
        'Follow the actual cable route. Add straight spans; for a diagonal use length squared = horizontal squared + vertical squared.',
        'The cable is taut. The spring seats its pin and the bridge lowers.',route=[dict(x=x,y=y) for x,y in route],
        mode='diagonal' if grade==8 else 'route',unit='m',scale=2 if grade==6 else .75 if grade==7 else 1,
        cables=[dict(id=f'cable-{i}',label=f'{target+i-2:g} m',length=target+i-2) for i in range(5)])
    advanced=grade>=7
    centers=[(4,6),(4,2),(8,2)] if advanced else [(4,4),(4,1)]
    reflection=stage('reflection','The moonbeam relay',
        'Turn the mirrors to guide the moonbeam into the green receiver. '+
        ('Use a three-reflection path around the stone baffle. ' if advanced else 'Use two reflections to turn the beam around the corner. ')+
        'Mirror angles are measured clockwise from horizontal; the angle of incidence equals the angle of reflection.',
        'A 45-degree mirror turns a horizontal ray vertically. Trace each bounce before turning the next mirror.',
        'The receiver charges. The moon-tower grille rises and the owls are free.',
        emitter=dict(x=1,y=6 if advanced else 4),direction=0,
        mirrors=[dict(id=f'mirror-{i}',center=dict(x=x,y=y),length=1.6,start=0 if i%2==0 else 90,step=45 if grade==5 else 15) for i,(x,y) in enumerate(centers)],
        receiver=dict(x=8,y=7) if advanced else dict(x=9,y=1),radius=.22,
        obstacles=[dict(a=dict(x=5.5,y=3),b=dict(x=5.5,y=7))] if advanced else [],bounceLimit=6)
    amounts={5:[1000,750,500,250,375,200],6:[1500,750,500,250,400,600],7:[1200,800,500,300,750,250],8:[1250,750,500,250,600,400]}[grade]
    capacity=4000 if grade>=7 else 3000
    volume=stage('volume','The floating sluice pin',
        {5:'Pour exactly 2.5 L into the chamber. Choose among the measured vessels; each can be poured once. 1000 mL = 1 L.',
         6:'The float needs 2750 mL. Labels mix litres and millilitres. Choose a combination with exactly that volume.',
         7:'Fill 62.5% of this 4 L chamber. Calculate the target, then combine measured pours to lift the pin to that height.',
         8:'A 4 L chamber must be five-eighths full. Express that fraction as a decimal volume and choose the measured pours.'}[grade],
        'Convert to a common unit before combining vessels. If the float passes its slot, remove a measured pour.',
        'The float pin meets its slot. Water flows to the escape channel.',capacity=capacity,target=2750 if grade==6 else 2500,unitTicks=1000,unit='L',
        vessels=[dict(id=f'vessel-{i}',label=(f'{a/1000:g} L' if i%2==0 else f'{a} mL'),amount=a,uses=1) for i,a in enumerate(amounts)])
    if grade>=7:volume['targetLabel']='62.5% CAPACITY' if grade==7 else '5/8 CAPACITY'
    parts={5:[2,3],6:[3,5],7:[2,7],8:[2,3,1]}[grade];total={5:2500,6:4000,7:4500,8:3000}[grade]
    mixing=stage('mixing','The riverboat fuel mixer',
        {5:'Make 2.5 L of lantern fuel: 2/5 blue extract and 3/5 amber extract. Each pump delivers 0.25 L.',
         6:'Make exactly 4 L in the ratio blue : amber = 3 : 5. Each pump delivers 0.25 L.',
         7:'Make 4.5 L. For every 2 parts blue, use 7 parts amber. Find each amount; each pump delivers 0.25 L.',
         8:'Make 3 L in the ratio blue : amber : rose = 2 : 3 : 1. Each pump delivers 0.25 L. All three amounts and the total must agree.'}[grade],
        'Add the ratio parts. Divide the required total by that sum to find one part, then scale each ingredient.',
        'The mixture and total are both exact. The riverboat is ready to carry everyone home.',capacity=5000,total=total,unitTicks=1000,unit='L',
        ingredients=[dict(id=f'extract-{i}',label=['Blue','Amber','Rose'][i],color=['#4ebddd','#eab34f','#d96992'][i],parts=p,measure=250,supply=4000) for i,p in enumerate(parts)])
    return {1:puzzle('Patrol synchronizer','Common multiples and wheel phases',[timing]),
            2:puzzle('Rabbit courtyard workshop','Fraction equivalence and circle coverage',[fraction]),
            4:puzzle('Moon-tower optics','Angles and geometric reflection',[reflection]),
            5:puzzle('Bridge engineering workshop','Coordinates, transformations and length',[coordinate,cable]),
            6:puzzle('Sluice workshop','Volume, unit conversion and rational numbers',[volume]),
            7:puzzle('Riverboat workshop','Fractions, ratios and proportional quantities',[mixing])}

for grade in range(5,9):
    for index, p in puzzles(grade).items():
        step=mission['steps'][index]
        if grade==5:
            step['puzzle']=p;step['title']=p['lock']['title'];step['action']='Solve lock'
            step['story']=p['lock']['stages'][0]['instruction']
            step['success']=p['lock']['stages'][-1]['success']
            step['explanation']='Your measured settings made the real mechanism line up: '+p['skill'].lower()+'.'
            step['clues']=[dict(label='Workshop',value=p['skill']),dict(label='Take your time',value='The rescue waits while you reason. Every control has a keyboard alternative.')]
        else: step.setdefault('gradePuzzles',{})[str(grade)]=p

# Retain the existing balance and compound-gear engines, with calibrated variants.
mission['steps'][0]['explanation']='Equivalent loads aligned all three balance pins. Fractions, decimals and mixed numbers describe the same physical mass.'
mission['steps'][3]['explanation']='Tooth ratios transferred motion through both axles. The chosen crank turns brought the release drum to its exact target.'
for grade in (6,7,8):
    p=copy.deepcopy(mission['steps'][0]['puzzle'])
    multiplier={6:2,7:3,8:5}[grade]
    for scale in p['lock']['scales']:
        for piece in scale['left']+scale['right']+scale['pieces']:
            piece['value']['numerator']*=multiplier
        scale['instruction']='Reconstruct the fixed load with the finite loose weights. Combine equivalent quantities; some weights are decoys.'
    p['skill']='Rational-number operations and equivalent quantities'
    mission['steps'][0].setdefault('gradePuzzles',{})[str(grade)]=p
    p=copy.deepcopy(mission['steps'][3]['puzzle']);d=p['lock']
    d['outputTurns']['numerator']=2;d['maxCrank']=12
    if grade==7:
        d['driverTeeth']=18
        d['gears']=[dict(id=f'cog-{n}',teeth=n) for n in [18,24,27,36,12,30]]
    if grade==8:
        d['driverTeeth']=16;d['secondMultiplier']['numerator']=3
        d['gears']=[dict(id=f'cog-{n}',teeth=n) for n in [16,24,36,48,12,30]]
    p['prompt']=d['instruction']='Use the two tooth-count multipliers, then calculate the crank turns needed for exactly TWO output revolutions.'
    p['hint']='For each meshed pair, turns multiply by driver teeth divided by driven teeth. The shared axle turns together.'
    mission['steps'][3].setdefault('gradePuzzles',{})[str(grade)]=p

# Weekly authoring content is maintained in the current package, independently of math fixtures.
# Rebuilding the unchanged machines must not discard that optional preview extension.
current = json.loads(project.read_text(encoding='utf-8'))
if 'previewWeeks' in current:
    mission['previewWeeks'] = current['previewWeeks']
project.write_text(json.dumps(mission,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
# Keep the matching version in src/app/projects/project-catalog.ts when publishing.
