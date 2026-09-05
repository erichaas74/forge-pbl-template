# Route map and market experience audit

Reviewed September 3, 2026. Scope: the current working implementation of the Grade 5 Frontier Trading Company route map and market. This is an audit and proposal, not an implementation change.

The strongest direction is an illustrated trading adventure with a clear decision area. Each screen should make three things obvious: where the company is, what the student can do next, and what that choice will cost. Scenery can be expressive while prices, quantities, and route comparisons stay steady and readable.

## What already works

- The parchment, wood framing, and teal actions establish a consistent setting.
- Merchants, discoverable storefronts, weather, and a visible wagon provide a useful foundation for a living market.
- Route cards expose distance, days, supplies, terrain, and transportation restrictions.
- Trade drafts and confirmation screens separate planning from official transactions.
- Cash and cargo calculations, receipts, and evidence pinning support the learning objectives.
- Buttons provide alternatives to dragging, and shared styles already support reduced motion.

## Findings to address first

| Priority | Finding and evidence | Recommended change |
| --- | --- | --- |
| High | **A trade draft disappears when visiting Route and returning to Market.** Reproduced with a two-line flour/coffee draft; the return screen showed zero items. Drafts are component-local and the shell destroys the component when changing workspaces. | Preserve planning state across workspaces, including the draft, selected merchant, selected route, and route rationale. A student should be able to investigate a destination without losing a purchase plan. Revalidate a plan against current official state before committing. |
| High | **The builder and draft show different meanings of “cash after.”** With one flour and one coffee planned from $160, the coffee builder showed $126.68 and 2 cargo spaces, while the combined draft showed $104.24 remaining. The builder previews only its selected line. | Preview the candidate complete draft everywhere. Show one consistent cash/cargo outcome; label a single-item subtotal explicitly if retained. |
| High | **Repeated “Add” does not accumulate quantity.** Clicking “Add to trade draft” twice for one flour left “Buy 1 Flour.” Code uses the same replacement logic for repeated drops. | Make adding one crate increase quantity. If editing an existing line means replacing its quantity, label that action “Update quantity.” Distinguish adding from editing. |
| High | **The main actions are hard to keep in view.** In the default approximately 1265 × 712 preview, the market scene fills the opening area and goods start below it. The route map also extends below the viewport, and route cards scroll inside an already scrolling page. The market table has horizontal scrolling at this size. | Reduce the tall application header, bring the selected merchant's goods next to its scene, and keep a concise planning summary visible. Use larger text and fewer columns by default. |
| Medium | **Workspace navigation retains an unrelated scroll position.** Reproduced when moving from lower market controls to Route: the map opened partway down. | On workspace changes, restore a deliberate per-workspace position or start at its heading; handle keyboard focus without hiding it under the header. |
| Medium | **The departure animation can imply travel that has not happened.** Source inspection: the wagon traverses the whole route and a local day timer advances, while route commitment initializes official progress to zero. Actual progress happens later in Journey. | Animate a short departure only. Drive position and day labels from official travel progress; stop at real decisions and celebrate arrival when it occurs. |
| Medium | **“Trend” implies a time comparison that the current data does not provide.** The configuration derives higher/lower from static sell-price multipliers. Merchant copy can say demand is climbing from that flag. | Label the current information as local demand or price relative to a stated baseline. Reserve rising/falling claims and charts for actual price history. |
| Medium | **Rumor credibility is not consistently visible.** Route cards say “Merchant rumor,” but the market's regular merchant quote does not show its configured trust cue. The notice board does. | Use compact “Posted fact” and “Merchant rumor” labels with source, place, and day when available. Keep uncertainty visible beside the claim. |

Primary implementation references: `ui/pages/market-view.component.ts` (draft, selectedLinePreview, addToDraft), `ui/pages/route-map.component.ts` (commit and day timer), their HTML/SCSS files, `ui/simulation-decision-shell.component.html` (workspace switching), `domain/simulation-decision.engine.ts` (commitRoute and advanceTravel), and `projects/frontier-trading/frontier-trading.config.ts` (market helper). Template paths are under `src/app/templates/simulation-decision/`.

## Ideas for a livelier, clearer route map

1. **Put the company on the map.** Add a recognizable wagon or chosen transport at the current town with an explicit “You are here” label. Mark destinations with small forts, river docks, camps, and mountain settlements. Keep names readable and give destinations generous click areas.
2. **Make route selection reveal a simple trip card.** Clicking a destination highlights its trail and opens: destination, days, supply cost, risk, and one cargo demand clue. For the existing Northern Fort Road, an example is “Fort Bridger · 3 days · $18 supplies · Low risk.” Keep the distance and terrain available in details.
3. **Compare routes in aligned rows.** Replace the narrow stack of detailed cards plus a second miniature comparison with a compact table of destinations, days, supplies, risk, and transport access. Highlight factual differences such as lowest supply cost and shortest travel time without prescribing the student's choice.
4. **Show consequences before departure.** A trip summary should include cash after supplies and expected arrival day, with possible delays clearly identified. Explain unavailable routes in plain language, such as “Your wagon cannot cross rocky mountain terrain.” Keep blocked routes inspectable.
5. **Use restrained environmental motion.** A river shimmer, drifting clouds, and occasional camp smoke can establish place. Keep numbers and essential labels stationary. Animate the wagon when progress changes, and show an arrival moment that leads directly to that destination's market.
6. **Make route direction unmistakable.** Add subtle arrowheads and distinguish selected, available, and unavailable routes with line styles plus labels. Where trails overlap, avoid suggesting an intermediate stop that the one-route game does not support.

## Ideas for a livelier, clearer market

1. **Make the stalls look inhabited.** Give the blacksmith a forge, the general store stacked sacks and jars, and the freight depot timber and crates. Use consistent illustrations and brief merchant reactions. Environment and merchandise should help students recognize the shop's purpose.
2. **Open the shop where the student clicked.** Selecting a stall should immediately reveal a clearly titled goods panel nearby. Put categories on storefront signs and offer an “All discovered goods” view so students can compare purchases while retaining the discovery mechanic.
3. **Make one visible shopping plan.** Use direct quantity controls, a total cost, cash remaining, and cargo usage together. Offer sensible quantity shortcuts such as +1 and +5. Any affordability/capacity helper must use the whole plan and should expose its calculation.
4. **Distinguish planned cargo from owned cargo.** Show planned crates with a clear “Planned” label, then settle them into the wagon on confirmation. Clicking a proposed crate should edit or remove that planned item, rather than suggest selling goods the company does not own yet.
5. **Let reactions explain consequences.** A merchant hands over a crate after confirmation; the wagon fills to the new level; a receipt shows quantity × unit price. Keep a persistent receipt available after the brief animation. Do not call sales revenue profit or celebrate spending as a loss of the game.
6. **Connect shopping to the destination.** Preserve the tentative route and show its reported demand beside relevant goods, with an evidence link. A known supply budget can appear as “Keep $18 for this route.” Clearly distinguish a planning estimate from a guaranteed outcome.

## Suggested delivery order

1. Repair draft continuity, combined previews, quantity behavior, and workspace scroll/focus.
2. Improve the shared header, text size, route comparison, trip card, and merchant-to-goods layout.
3. Add consistent location/storefront illustrations and state-driven transaction, departure, and arrival feedback.

Retain the configured single-route season and existing learning requirements. Implement shared UI improvements in the reusable simulation template; put location artwork, merchant content, and scene settings in project configuration. No core schema change or new capability is necessary merely to adopt the direction proposed here; evaluate optional fields when implementing specific features.

## Accessibility and verification

Aim for comfortably readable body text, larger primary controls, visible keyboard selection, and non-drag equivalents. W3C's [target size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) explains the 24 × 24 CSS-pixel minimum and its exceptions; larger primary targets are a sensible design aim for this project. Preserve reduced motion and make nonessential interaction animation suppressible, consistent with [W3C's animation guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).

Verified by source review and browser inspection of the local preview, including merchant selection, draft creation, repeated add, two-item totals, and navigation between Market and Route. A local audit company was created from an empty setup screen. No goods purchases or journeys were confirmed. Departure behavior is a source finding, not a completed journey test. Mobile and assistive-technology behavior were not fully tested.

Only this audit document was added. Application files and existing working changes were left intact. No tests were added or changed; build/tests were not run because this task changes documentation only. No specification changes or TEMPLATE_CAPABILITY_GAP items were introduced.
