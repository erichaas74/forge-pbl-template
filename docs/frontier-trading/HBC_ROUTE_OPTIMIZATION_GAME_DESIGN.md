# Hudson's Bay Company route and cargo optimization game design

**Design date:** September 3, 2026  
**Status:** Experience and system design; no implementation in this document.

## Design decision

Reframe Frontier Trading Company as **The Annual Outfit: Hudson Bay Supply Challenge**.

The main play is no longer completing as many buy/sell actions as possible. Each company receives the same historical scenario and must:

1. interpret route and source evidence;
2. reserve crew provisions and required post supplies;
3. construct a weight-limited cargo manifest;
4. compare feasible routes;
5. calculate forecast cost, revenue, and profit;
6. dispatch the outfit;
7. respond to route conditions;
8. audit forecast against the resulting ledger.

The winning company is the team with the **highest verified net profit among plans that satisfy every capacity, budget, route, provision, and service requirement**. A guessed or overloaded high-profit manifest is not eligible.

This gives profit optimization a clear mathematical meaning while preserving the larger lesson: a historical supply network depended on geography, weather, transport limits, record keeping, and relationships—not only the price of goods.

## Historical correction to the current game

An early HBC scenario should not center on covered wagons. HBC's early network depended on ships through Hudson Bay, coastal factories, Indigenous canoe routes, sledges, and later inland freight boats. Parks Canada describes Hudson Bay itself as the route carrying furs outward and trade goods inward, while the Archives of Manitoba identifies York Factory as a major factory and freight center.

Use transport appropriate to each historical chapter:

| Period                    | Network focus                                                                            | Student transport model                            |
| ------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 1668–1714                 | Atlantic voyage, Hudson Bay access, bayside posts, annual inventories                    | Ocean supply ship and local sloop                  |
| 1690–1774                 | York Factory and Indigenous trade routes connecting the Bay to the Saskatchewan interior | Canoe brigades, portages, winter sledges           |
| 1774–1821                 | HBC inland expansion after Cumberland House and growing supply complexity                | Canoes first; York boats only in the later chapter |
| Early–mid 1800s extension | York Factory as a northern transshipment and supply center                               | York boat brigades and Métis crews                 |

The York boat chapter is useful for a weight-optimization game, but it must be labeled as a later development. Archives of Manitoba says York boats could carry upwards of 75 packs averaging about 40 kilograms or 90 pounds each; Parks Canada gives a maximum of about six tonnes and notes crews of six to eight, many of whom were Métis. Heavy York boats were introduced on the Lower Track in the early nineteenth century, not on the seventeenth-century Middle Track.

Do not simply rename the current prairie wagon. The map, vehicle, cargo language, route events, and historical sources should all agree on the same place and period.

The reusable load engine may still support wagons for another project or a correctly dated land-route chapter. It should render a wagon only when that scenario supplies an appropriate historical vehicle.

## Historical campaign structure

### Chapter 1: Prove the Bay Route, 1668–1670

**Question:** Why would investors risk an ocean voyage through Hudson Bay?

Teams compare a southern overland alternative with the northern sea route, load a small supply manifest, and account for voyage time, ice risk, food, and return cargo. The Manitoba Museum describes the 1668 _Nonsuch_ voyage as a scouting mission whose successful return with furs helped lead to HBC's creation in 1670.

The source lesson must also address the colonial setting. The Museum's current interpretation connects the venture to British monopoly finance and asks visitors to examine its darker history. Students should distinguish “profitable to investors” from “beneficial or fair to everyone affected.”

### Chapter 2: York Factory and the Middle Track, 1690–1774

**Question:** Who actually made the early inland trade network work?

The route map follows York Factory up the Hayes River, through Cross Lake, the Minago River and Moose Lake, and toward the Saskatchewan River. A Manitoba provincial plaque documents Indigenous traders using this Middle Track in the seventeenth and eighteenth centuries and leading Henry Kelsey through it in 1690.

Students plan canoe loads and portages while reading route knowledge as expertise supplied by named Indigenous peoples, not as a free map bonus. Parks Canada notes that early York Factory trade relied on Cree and Assiniboine middlemen. The simulation should present Indigenous traders as decision makers and commercial actors whose knowledge and labor shaped the network.

### Chapter 3: Move Inland, 1774

**Question:** Why did HBC change a long-standing coastal strategy?

Teams compare maintaining a bayside factory model with supporting Cumberland House. Parks Canada identifies Cumberland House, established in 1774, as HBC's first inland post. The optimization problem adds recurring post provisions, longer communication times, canoe scarcity, and the cost of keeping an inland post supplied.

This chapter should use a 1794 York Factory record as a counterexample: an inland post could be abandoned when the cost of canoes and provisions exceeded the value of the furs protected there. Students decide from the evidence whether an apparently profitable route remains viable after all support costs.

### Chapter 4: York Boat Outfit, early 1800s

**Question:** How should a limited freight capacity serve several posts and still earn a return?

This is the capstone optimization round. Teams use the real historical freight unit of approximately 90-pound packs and a maximum boat load of 75 packs. They must reserve capacity for crew provisions and required post supplies before choosing discretionary high-margin cargo.

## The new core game loop

### 1. Read the commission

Every team receives the same:

- year and historical situation;
- starting depot and possible destinations;
- route distances, travel days, portages, seasonal limits, and known risks;
- vehicle capacity and required crew provisions;
- post supply requests;
- acquisition cost and forecast return for each cargo bundle;
- two or three short historical source cards.

### 2. Build a route plan

Teams choose a connected set of route segments rather than one destination button. Each segment has:

- travel days;
- fixed freight or crew cost;
- transport restrictions;
- portage handling cost;
- seasonal closure date;
- a historically sourced fact or uncertainty.

The map continuously shows total days and route cost, but it does not choose the “best” route.

### 3. Reserve non-negotiable capacity

Before loading trade cargo, the team must reserve:

- crew provisions;
- repair materials;
- mail or records when required by the scenario;
- minimum supplies requested by each served post.

This prevents a simplistic strategy of filling every space with the highest nominal-price good.

### 4. Build the manifest

Every cargo card shows:

- packs per bundle;
- pounds per pack;
- acquisition cost per bundle;
- expected return per bundle at each post;
- post demand limit;
- source for the historical type of good;
- uncertainty or spoilage risk where appropriate.

Students drag bundles into the hold or use equivalent quantity controls. The load view shows physical pack stacks, while the worksheet requires students to calculate the totals.

### 5. Submit a forecast

Before the system reveals its totals, every team submits:

- total loaded packs and pounds;
- remaining capacity;
- total acquisition cost;
- fixed route and provisioning cost;
- expected revenue;
- expected net profit;
- profit per pack for at least two discretionary goods;
- a written explanation of the chosen route and manifest.

### 6. Validate the plan

The engine independently checks:

```text
total weight = sum(quantity × packs per bundle × pounds per pack)

forecast gross margin = sum(quantity × (destination return − acquisition cost))

forecast net profit = forecast gross margin − route cost − crew/provision cost
```

Subject to:

```text
loaded packs ≤ vehicle pack capacity
total acquisition cost + fixed costs ≤ available budget
route days ≤ days available
post minimums are satisfied
quantities are whole bundles
all route segments connect
```

An invalid plan returns a specific mathematical reason: overweight by 3 packs, over budget by 12 ledger credits, missing 2 provision bundles, or arriving 1 day after freeze-up.

### 7. Dispatch and reveal conditions

Route events change a value used in the submitted plan instead of interrupting play with an unrelated multiple-choice card. Examples:

- a portage adds a handling cost per pack;
- damaged cargo reduces the delivered quantity;
- a delay adds crew-provision packs and days;
- another class company reaches a post first and lowers demand for one discretionary good;
- a source update changes the expected return at one post.

Teams must revise the manifest or route and submit the changed calculation.

### 8. Audit the result

The ledger places forecast and actual values side by side:

| Measure            | Forecast | Actual | Difference |
| ------------------ | -------: | -----: | ---------: |
| Packs delivered    |          |        |            |
| Acquisition cost   |          |        |            |
| Freight/provisions |          |        |            |
| Revenue            |          |        |            |
| Net profit         |          |        |            |

The team explains the largest difference and identifies whether its original assumption, arithmetic, or route decision caused it.

## The optimized loading pattern students should discover

Teach a repeatable method without automatically solving the manifest:

1. **Subtract fixed load.** Start with vehicle capacity and remove crew provisions, repair packs, and required post supplies.
2. **Calculate feasibility.** Confirm the fixed load and route cost fit before considering optional cargo.
3. **Calculate gross margin per bundle.** Destination return minus acquisition cost.
4. **Calculate profit density.** Gross margin divided by packs used.
5. **Rank optional cargo.** High price is not the same as high profit per pack.
6. **Respect demand limits.** A post will not pay the forecast return for unlimited quantities.
7. **Test whole-bundle combinations.** The highest-density good may leave unusable space; a mixed load can earn more.
8. **Subtract route and risk cost.** Compare net profit rather than gross revenue.
9. **Recheck every constraint.** Weight, budget, time, post minimums, and connected route.
10. **Record the forecast.** The submitted math becomes the baseline for the final audit.

This is an accessible Grade 5 introduction to constrained optimization. Students use multiplication, division, decimal operations, tables, and systematic comparison without needing formal algebra or linear programming.

## Example capstone manifest

In this instructional example, a York boat has already reserved most of its 75-pack capacity for crew provisions, records, repairs, and fixed post consignments. The team controls the final **24-pack planning envelope** and has **100 classroom ledger credits**. These ledger credits and sample returns are instructional values, not claims about historical prices or currency.

| Bundle          | Packs | Cost | Expected return | Gross margin | Margin per pack | Minimum |
| --------------- | ----: | ---: | --------------: | -----------: | --------------: | ------: |
| Cloth bale      |     3 |   12 |              24 |           12 |               4 |       2 |
| Iron tools      |     5 |   20 |              45 |           25 |               5 |       1 |
| Sewing supplies |     2 |    9 |              21 |           12 |               6 |       0 |
| Kettle bundle   |     4 |   16 |              32 |           16 |               4 |       0 |
| Food provisions |     3 |    8 |              17 |            9 |               3 |       2 |

The required minimum uses 17 packs and 60 credits:

```text
2 cloth × 3 packs + 1 tools × 5 packs + 2 provisions × 3 packs = 17 packs

2 cloth × 12 + 1 tools × 20 + 2 provisions × 8 = 60 credits
```

Seven packs and 40 credits remain. Three sewing bundles fit in 6 packs and add 36 margin. One tools bundle plus one sewing bundle uses all 7 packs and adds 37 margin, so the mixed load is better.

The optimized manifest is:

```text
2 cloth + 2 tools + 1 sewing supplies + 2 provisions

weight = 2(3) + 2(5) + 1(2) + 2(3) = 24 packs
cost = 2(12) + 2(20) + 1(9) + 2(8) = 89 credits
gross margin = 2(12) + 2(25) + 1(12) + 2(9) = 104 credits
```

If route and provisioning costs assigned to this planning envelope are 14 credits, forecast net profit is 90 credits.

Exhaustive enumeration of the whole-bundle combinations under the 24-pack and 100-credit constraints confirms that this is the unique highest-margin manifest for the sample data. The game should accept any feasible plan, record its forecast, and score the actual result. The worked optimum belongs in teacher guidance or a post-round debrief, not in the live planner.

## Required mathematics and standards evidence

This design addresses the weaknesses identified in the [Trading Post learning and standards audit](TRADING_POST_LEARNING_STANDARDS_AUDIT.md) by requiring student-produced work before revealing canonical totals.

| Standard or practice                              | Required game artifact                                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **5.NBT.A.3** Compare decimals                    | Written comparison of at least two costs, returns, or profit densities                 |
| **5.NBT.B.5** Multiply multi-digit whole numbers  | Pack-to-pound totals and whole-number cargo extensions                                 |
| **5.NBT.B.6** Find whole-number quotients         | Packs per load, equal allocation among boats or posts, and explained quotient strategy |
| **5.NBT.B.7** Operate with decimals to hundredths | Acquisition cost, route cost, revenue, gross margin, and net profit                    |
| **5.OA.A.1–2** Write and interpret expressions    | Student-authored manifest and net-profit equations with grouping where needed          |
| **MP1 and MP2** Solve and reason quantitatively   | A feasible plan that reconciles weight, budget, days, and service requirements         |
| **MP3** Construct an argument                     | Written defense comparing two feasible route-and-load plans                            |
| **MP4** Model with mathematics                    | Forecast, actual result, and variance tied to the historical logistics model           |
| **MP6** Attend to precision                       | Every number carries packs, pounds, days, or ledger-credit units                       |

The LMS records the answer, representation, attempts, support used, and linked manifest. Company profit remains a game result; standard mastery comes from these individual artifacts.

## How every route becomes mathematical

| Route feature            | Mathematical decision                                                     |
| ------------------------ | ------------------------------------------------------------------------- |
| Distance and travel time | Compare total days, pace, and arrival before seasonal closure             |
| Portage                  | Calculate added cost or time per loaded pack                              |
| River level or ice       | Recalculate capacity, delay, or feasible transport                        |
| Multiple posts           | Allocate limited goods under minimum and demand constraints               |
| Return cargo             | Reserve enough capacity for furs or records moving back toward the depot  |
| Vehicle change           | Repack cargo and compare capacity lost during transshipment               |
| Provision use            | Calculate packs consumed as route days increase                           |
| Damage                   | Subtract lost quantity and revise revenue/profit                          |
| Demand change            | Recalculate revenue using a new unit return and demand cap                |
| Route uncertainty        | Compare a safe known cost with a risky expected cost; explain assumptions |

Routes should never be resolved by clicking “low,” “moderate,” or “high” risk alone. Each choice should change a quantity the team must use.

## Social studies inquiry built into play

### Source room

Each chapter opens with two short sources and one map. Students answer:

- Who created this record?
- What business or political purpose did it serve?
- What does it reveal about the route, goods, labor, or decision?
- Whose perspective is absent?
- How should this evidence change the team's plan?

Use actual source categories preserved by HBC Archives: post journals, ship logs, inventories, freight books, store invoice books, fur invoices, maps, and correspondence. The 1714 York Factory journal is especially useful because it contains a shipment list, an inventory, copied letters, weather and flood problems, and evidence of trade relationships.

### Required perspectives

The game must not tell early HBC history only through company clerks. Include carefully sourced accounts of:

- Cree and Assiniboine traders who connected York Factory to interior networks;
- First Nations route knowledge, provisioning, technologies, and commercial agency;
- Mattonnabbee and the organized movement between coastal posts and the interior;
- Métis boat crews and freight work in the later York boat chapter;
- European investors, governors, clerks, and ship crews;
- the effects of monopoly claims and colonial expansion.

Names, nation affiliations, language, and community perspectives should be reviewed with Indigenous-authored sources and, where possible, relevant communities before publication. Do not reduce Indigenous people to “helpers,” price modifiers, or collectible bonuses.

### Historical argument after optimization

The final group claim is:

> Which geographic knowledge, labor, transport technology, and business records made your route possible, and who bore its risks?

Students must cite one route source, one inventory or account source, and their own forecast-versus-actual calculation.

## Final class competition

### Team roles

Teams of four rotate roles after the first route revision:

- **Route keeper:** totals days, portages, and route costs.
- **Loadmaster:** totals packs, pounds, provisions, and remaining capacity.
- **Ledger clerk:** calculates acquisition cost, revenue, margin, and net profit.
- **Source historian:** evaluates the sources and documents assumptions and missing perspectives.

Every student submits one assigned calculation and one source observation. Team success does not substitute for individual evidence.

### Winner rule

A team is eligible only if:

- every load and budget constraint is satisfied;
- required post supplies are delivered;
- all submitted calculations reconcile with the canonical ledger;
- required individual math tasks are complete;
- the historical-source claim is submitted.

Among eligible teams:

```text
winner = highest verified actual net profit
```

Ties are broken by smallest absolute forecast error, then strongest source-supported explanation. Speed is not a tiebreaker.

Display separate recognitions so one number does not erase the other learning goals:

- Highest Verified Profit
- Most Accurate Forecast
- Strongest Route Evidence
- Best Recovery After a Disruption
- Clearest Historical Argument

The public class board should show company results, not individual grades.

## Price traps that reward calculation

- **High selling price, poor density:** tools sell for more but consume many packs.
- **Cheap goods, hidden route cost:** low acquisition cost is erased by portage cost per pack.
- **Over-supply:** returns fall after the destination demand cap.
- **Unusable remainder:** the top margin-per-pack bundle leaves space that a mixed combination uses better.
- **No return capacity:** an outbound manifest leaves insufficient room for required return cargo.
- **Long route provision cost:** a high-price post requires more food packs and arrives near freeze-up.
- **Gross-versus-net trap:** the largest revenue plan is not the largest profit plan.
- **Forecast trap:** uncertain source information is presented as a range rather than a guaranteed value.

Every trap should be visible in the source data before commitment. The challenge is interpreting and calculating, not discovering a hidden rule after losing.

## Required system capabilities

Add reusable configuration rather than HBC-specific branches:

```ts
interface LogisticsScenario {
  id: string;
  periodLabel: string;
  routeNetworkId: string;
  vehicleIds: readonly string[];
  fixedLoad: readonly ManifestLine[];
  serviceRequirements: readonly ServiceRequirement[];
  startingBudgetMinor: number;
  availableDays: number;
  sourceCardIds: readonly string[];
}

interface FreightVehicle {
  id: string;
  capacityPacks: number;
  poundsPerPack: number;
  compatibleSegmentTypes: readonly string[];
  crewProvisionRuleId: string;
}

interface CargoBundle {
  id: string;
  packsPerBundle: number;
  acquisitionCostMinor: number;
  destinationReturns: Readonly<Record<string, number>>;
  demandCaps: Readonly<Record<string, number>>;
  historicalSourceId: string;
}

interface OptimizationSubmission {
  routeSegmentIds: readonly string[];
  manifest: readonly ManifestLine[];
  forecast: ForecastCalculation;
  studentWork: readonly CalculationArtifact[];
  sourceClaim: HistoricalClaim;
}
```

The server or canonical runtime must calculate feasibility and official results independently. Student-entered totals are evidence, not authority over cash, cargo, score, or delivery state.

## Recommended interface changes

### Route map

- Replace destination-only trails with connected historical route segments.
- Show water, portage, seasonal, and transshipment symbols.
- Add a route worksheet with accumulated days, fixed cost, and provision use.
- Attach source cards to route segments.

### Load planner

- Replace the prairie wagon with the configured ship, canoe, sledge, or York boat.
- Stack visible 90-pound packs for the York boat chapter.
- Show fixed load, required load, discretionary load, and reserved return capacity separately.
- Require a student total before revealing canonical weight.

### Forecast desk

- Provide a structured calculation table with units.
- Compare at least two feasible manifest patterns.
- Lock the submitted forecast as an immutable evidence snapshot.

### Dispatch and journey

- Animate actual movement only after a valid manifest is accepted.
- Make events change route or cargo quantities.
- Require a revised calculation when conditions change.

### Ledger and results

- Put forecast, actual, and variance in the same view.
- Separate verified profit from historical reasoning and individual mastery.
- Let every score value open the records and equations that produced it.

## Implementation sequence

1. Build a framework-independent manifest and route evaluator with exact integer money and whole-pack quantities.
2. Add one 24-pack instructional optimization scenario and prove the optimum with exhaustive test enumeration.
3. Replace current route completion with connected route-segment planning.
4. Add predict-then-reveal calculations for weight, cost, revenue, and profit.
5. Add immutable forecast and audit records.
6. Add the Chapter 2 Middle Track map and reviewed source cards.
7. Add the York boat capstone with 75 packs and route disruptions.
8. Add the classroom company leaderboard and individual calculation assignments.
9. Pilot the historical content with a social studies teacher and Indigenous reviewer.
10. Expand to the other historical chapters only after the first round is mathematically and historically sound.

## Acceptance criteria

- Every playable route changes at least one student-used quantity.
- Every submitted outfit includes route, weight, cost, revenue, and profit calculations.
- No overloaded, over-budget, disconnected, under-supplied, or late plan can win.
- All teams receive equivalent required math tasks regardless of chosen route.
- The optimal manifest can be proven from the published scenario data.
- Students compare at least two feasible combinations before dispatch.
- Historical transport matches the scenario period and geography.
- York boat capacity is presented with a cited source and correct period label.
- Indigenous peoples are represented as historical actors and knowledge holders, not game resources.
- Source cards identify creator, date, purpose, and perspective limits.
- Game profit, individual math mastery, historical argument, and grade remain separate.
- The winner is based on verified net profit, with forecast accuracy as the first tiebreaker.

## Historical sources for content development

- [Archives of Manitoba: Hudson's Bay Company Archives glossary](https://www.gov.mb.ca/chc/archives/hbca/glossaries.html) — business records, York boat pack capacity, factories, inventories, freight and invoice books.
- [Archives of Manitoba: 1714 York Factory journal](https://www.gov.mb.ca/chc/archives/hbca/spotlight/knights_tale.html) — early inventory, shipment, weather, business, and relationship evidence.
- [Manitoba Historic Resources Branch: Middle Track](https://www.gov.mb.ca/chc/hrb/plaques/plaq0783.html) — route geography and Indigenous traders' role in the seventeenth and eighteenth centuries.
- [Parks Canada: York Factory human history](https://parks.canada.ca/lhn-nhs/mb/yorkfactory/culture/histoire-history) — York Factory chronology, early trade, inland expansion, and administrative role.
- [Parks Canada: York Factory management plan](https://www.parks.canada.ca/lhn-nhs/mb/yorkfactory/info/gestion-management) — Hudson Bay transportation, transshipment, and supply functions.
- [Parks Canada: York boats](https://parks.canada.ca/lhn-nhs/mb/fortgarry/culture/york) — vessel construction, crews, freight role, and capacity.
- [Parks Canada: Sloop Cove and Samuel Hearne](https://parks.canada.ca/lhn-nhs/mb/prince/culture/decouvrir-discover3) — HBC sloops, Mattonnabbee, inland travel knowledge, and Cumberland House.
- [Archives of Manitoba: David Thompson and Sipiwesk Lake](https://www.gov.mb.ca/chc/archives/hbca/spotlight/david_thompson.html) — an archival example of inland-post supply costs and canoe scarcity shaping a closure decision.
- [Manitoba Museum: Nonsuch and its darker history](https://manitobamuseum.ca/shedding-light-on-the-darker-history-of-nonsuch/) — the 1668 voyage, investment, monopoly, and critical interpretation.
- [Manitoba Museum: Indigenous Connections](https://manitobamuseum.ca/about-us/indigenous-connections/) — current community-informed interpretation of the Nonsuch story and Cree trade at Waskaganish.

All final historical copy, dates, goods, capacities, and maps should be checked against the cited records. Instructional prices and forecast returns must be labeled as simulation values.
