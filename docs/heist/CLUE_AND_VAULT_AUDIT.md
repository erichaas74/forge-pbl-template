# Shadow Gallery: clue and vault audit

Reference walkthrough for `/projects/shadow-gallery` (The Cartographer’s Vault, project 1.0.0). **Contains solutions.** The claims and answers below come from `public/projects/shadow-gallery/project.json`; the illustrations are reconstructions, and the marked detail studies and captions are the evidence being tested.

## How the opening clues work

Each gallery has three paintings, one historically compatible scene, and two frauds. Open a painting and click a marked detail or its text button. The setting inscription establishes the claimed date and place; the specific detail supplies the claim to test against the field notebook. Looking at a painting is not the same as inspecting its detail. Inspecting a clue does not automatically confirm it.

Choose the passage under a compatible scene to start that gallery’s passage mechanisms. If you choose a fraud, the passage catches. Inspect the offending detail, select its category, and confirm the analysis. Both the specific detail and category must match. Solve the related recovery lock to seal the fraud and return to the same junction. The setting inscription alone is not the offending detail.

Fraud recovery is optional: choosing the authentic scene directly allows progress without identifying both frauds. A cleared gallery therefore does not mean every fraud in it was investigated. There is currently no route back into a cleared gallery; export the current record before starting another practice if you want to explore missed branches.

### First encounter: Hispaniola, 1492

| Passage | Marked clue | How to reason about it | Outcome |
| --- | --- | --- | --- |
| I · The morning study | Established horse herds | The detail specifically claims herds kept before European arrival. “Where the cargo began” places European horses in the Old World and their introduction after contact. | Wrong animal / plant. Repair the exchange crates. |
| II · The collector’s scene | Maize and a dugout canoe | The crop and island canoe fit the Caribbean setting. Compare the exchange and Caribbean community notes. | Authentic. Operate the exchange crates, then the compass. |
| III · The light beyond | Inca island settlement | The frame calls the Hispaniola community Inca. “People of the Caribbean” and “An Andean archive” place Taíno in the Caribbean and Inca in the Andes. | Wrong group of people. Place Inca → Andes and Taíno → Caribbean. |

The exchange crates require **Horse and Wheat → Old World; Maize and Potato → Americas**. Select an object, then click its destination. Clicking the four object names without placing them leaves the lock incomplete. Once every item has a destination, operate the mechanism. Any wrong placement can be changed.

The first compass asks for **3/8 of a clockwise turn from north**: `360 × 3/8 = 135°`. Enter 135 in the calculation field and move the compass to 135°. Both are checked. Then operate the mechanism and use **Enter next gallery**. A recovery crate lock and the authentic passage’s crate lock are separate steps, even though they use the same sorting rule.

### Second set: the navigator’s workshop, Portugal, 1500

Passage I’s reflecting sextant and Passage II’s Harrison marine timekeeper are both **Wrong technology**: the field notes place them in the eighteenth century. Passage III’s compass and mariner’s astrolabe fit the workshop’s date. For the technology drawers, place the compass and astrolabe under **Belongs around 1500**, and the sextant and Harrison timekeeper under **Invented later**. The passage compass then requires west: **270° clockwise from north**, in both the calculation and setting.

## Complete fraud-clue checklist

This is the reference checklist, not a record of a student’s discoveries. The in-app **How clues work & vault audit** view maintains that practice’s running list automatically, including inspected but unverified claims. Correct analysis shows the explanation immediately; completing recovery changes it to **Fraud sealed**.

| # | Gallery / passage | Fraud clue | Category | Contradiction to establish | Recovery mechanism |
| --- | --- | --- | --- | --- | --- |
| 1 | First encounter · I | Established horse herds | Animal / plant | European horses were introduced after contact; the detail claims established pre-contact herds. | Exchange crates |
| 2 | First encounter · III | Inca island settlement | People | Inca belong to the Andes; this scene claims Hispaniola in the Caribbean. | Community placement |
| 3 | Navigator’s workshop · I | Reflecting sextant | Technology | An eighteenth-century instrument does not fit 1500. | Technology drawers |
| 4 | Navigator’s workshop · II | Harrison marine timekeeper | Technology | An eighteenth-century timekeeper does not fit 1500. | Technology drawers |
| 5 | Departure from the port · II | Departure dated 1607 | Timeline | Da Gama’s first departure for India was in 1497. | Chronological rail |
| 6 | Departure from the port · III | French-sponsored fleet | People | The expedition was sponsored by Portugal. | Sponsor lever → Portugal |
| 7 | Cargo across the Atlantic · I | Potatoes · European origin | Animal / plant | Potatoes originated in the Americas; the label reverses the direction. | Exchange crates |
| 8 | Cargo across the Atlantic · III | Horses · pre-contact Caribbean origin | Animal / plant | European horses came from the Old World after contact. | Exchange crates |
| 9 | Explorer’s route hall · I | India arrival · 1492 | Timeline | Da Gama first arrived in India in 1498. | Chronological rail |
| 10 | Explorer’s route hall · II | English expedition | People | The voyage was Portuguese, not English. | Sponsor lever → Portugal |
| 11 | Indigenous encounter archive · II | Taíno Caribbean settlement | People | The catalogue mislabels an Andean setting as a Taíno Caribbean community. | Community placement |
| 12 | Indigenous encounter archive · III | European horses before contact | Animal / plant | Established European horse herds do not fit the pre-contact Andes. | Exchange crates |
| 13 | Treaty and empire room · I | Treaty signed · 1607 | Timeline | The Treaty of Tordesillas was signed in 1494. | Date cylinders → 1494 |
| 14 | Treaty and empire room · III | Spain and France | People | The treaty’s parties were Spain and Portugal. | Treaty lever → Portugal |
| 15 | Cartographer’s vault · I | Marine timekeeper in 1492 | Technology | A Harrison-style timekeeper is centuries too late for 1492. | Technology drawers |
| 16 | Cartographer’s vault · II | Inca Caribbean village | People | The label moves the Inca from the Andes into a Caribbean community. | Community placement |

The UI calls the people category **Wrong group of people**; it also covers incorrect national sponsors and treaty parties. A pretty or convincing image is not evidence of authenticity. Use the specific labelled claim.

## Step through the full vault audit

The required route has 17 passage mechanisms across eight galleries. The 16 fraud-recovery locks are additional optional detours.

| Step | Gallery | Authentic passage and supporting detail | Passage mechanism audit |
| --- | --- | --- | --- |
| 1 | First encounter | II · Maize and a dugout canoe | Sort the four origins; calculate and set 135°. |
| 2 | Navigator’s workshop | III · Compass and astrolabe | Sort all four instruments by availability in 1500; calculate and set west, 270°. |
| 3 | Departure from the port | I · Portuguese expedition, 1497 | Order Caribbean arrival 1492 → treaty 1494 → Lisbon departure 1497 → India arrival 1498. |
| 4 | Cargo across the Atlantic | II · Maize from Americas, wheat from Old World | Sort origins. Calculate damaged capacity: `240 × 0.75 = 180 kg`. Load the operative (62) and archive (78): 140 kg. Tools alone bring it to 165; spare equipment alone to 180; both optional items total 205 and exceed capacity. |
| 5 | Explorer’s route hall | III · Portugal, around Africa, India 1498 | Route Lisbon → Southern Africa → India. Select Portugal. Scale: `7.5 cm × 4 m/cm = 30 m`; enter and extend to 30. |
| 6 | Indigenous encounter archive | I · Inca terraces and llamas | Inca → Andes; Taíno → Caribbean islands. |
| 7 | Treaty and empire room | II · Spain and Portugal, 1494 | Calculate and set 1494. Evidence board: signed 1494 → Timeline; Harrison timekeeper → Technology; maize origin → Animals / plants; Inca in Andes → People / place. |
| 8 | Cartographer’s vault | III · Caribbean canoe, maize, 1492 | Complete the four-part sequence below, then recover the collection. |

### Final vault, one mechanism at a time

1. **Date cylinders:** Columbus’s first Caribbean arrival → **1492**. Enter 1492 and set all four cylinders to 1–4–9–2.
2. **Compass:** west from north, clockwise → **270°**. Enter 270 and move the arm to 270°.
3. **Exchange crates:** Horse + Wheat → **Old World**; Maize + Potato → **Americas**. Place all four and operate.
4. **Treaty lever:** the crown alongside Portugal → **Spain**. Lower the lever and operate.
5. Click **Recover the collection**. The final room is only recorded as cleared when this action is taken, after all four locks are solved.
6. Review the dossier, write the three defenses, save, and download Markdown or JSON. Both exports include the running clue list and the current audit checklist. The JSON also retains all recorded decisions.

Opening the audit or replay does not complete a step. The audit shows current practice progress; replay separately shows past decision snapshots. Notebook/audit navigation preserves unsubmitted lock controls during the current page session. Accepted decisions and the derived running list survive reload through the existing local practice save; unsubmitted controls do not.
