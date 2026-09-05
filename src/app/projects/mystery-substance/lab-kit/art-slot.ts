/**
 * Art slot contract, shared by every station.
 *
 * Each apparatus part renders in two layers: a photoreal plate (`src`) when one
 * exists, and a built-in SVG stand-in when it does not. The dynamic layers
 * always draw on top of whichever is showing.
 *
 * `well` is the contract between the two. It is the box the dynamic layer
 * fills, in percent of the part, so a rendered plate must be exported with its
 * chamber in the same place as the stand-in.
 */
export interface ArtSlot {
  /** Path under `public/`. Undefined renders the SVG stand-in. */
  src?: string;
  /**
   * How the plate composites over the bench.
   *
   * Glass is nearly impossible to cut out cleanly, so glassware plates are
   * generated on pure black and composited with `screen`, which drops black to
   * nothing and keeps the highlights. Opaque parts — the balance chassis, the
   * metal fittings — need a real alpha cutout and composite normally.
   */
  blend?: 'normal' | 'screen';
  /** Aspect ratio (width / height). A plate must be exported at this ratio. */
  aspect: number;
  /** Rendered size in CSS pixels at a 16px root, for reference. */
  displayPx: { width: number; height: number };
  /** Recommended export size in pixels (3x), so plates stay crisp. */
  exportPx: { width: number; height: number };
  /**
   * Inset of the dynamic well, in percent of the part box.
   *
   * These currently describe the SVG stand-in's geometry. When a plate lands,
   * re-measure where its liquid chamber sits and update these numbers, or the
   * liquid will not line up with the glass.
   */
  well?: { top: number; right: number; bottom: number; left: number };
  /** What the plate should show, for whoever renders it. */
  note: string;
}
