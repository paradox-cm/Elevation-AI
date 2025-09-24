I’m calling out only what still looks off (spacing, layout, truncation, rhythm), no fixes yet.

Home — Knowledge Blocks

Some tile labels sit tighter to borders than others; internal paddings don’t feel consistent across the 3×3.

A few chips run closer to the tile edge than in neighboring tiles; chip rows appear denser on bottom row than top.

Connector dots/lines touch different vertical positions per tile (not consistently mid-edge), which makes the network look slightly crooked.

Text truncation ellipses vary in length; a couple of titles end mid-word while others have cleaner breaks.

Home — Agentic Engine

The left rail headings (“Tools / Models / Policies”) look vertically closer to their first row than to the section above, producing uneven section rhythm.

Step cards read as a single row now, but inter-card spacing isn’t uniform; two middle steps appear slightly tighter than the ends.

Metric chips within steps sit at different vertical baselines card-to-card; some chips hug the title, others drop lower.

The policy pill is visually aligned with the lane but sits closer to one side than truly centered relative to all six steps.

The traveling token’s path looks a few pixels below the card centers on two steps, breaking the straight horizontal flow.

Home — Workspaces & Canvases

Column headers (“Inbox / In Progress / Done”) don’t line up to the same baseline; the center header appears a touch lower.

Smart cards keep height, but the excerpt line on several cards is riding the same band as the icons, causing visual crowding.

Vertical gaps between cards vary within the same column—middle column looks tighter than left/right.

The board’s leftmost column begins slightly higher than the others under the header row; the top row of cards isn’t perfectly aligned across columns.

Presence avatars and “Add Canvas” still read as part of the board, not a separate toolbar; their bottom edge aligns too close to the top row of cards.

Home — Personal Co-pilot

The Answer card’s two lines sometimes resolve as 1½ lines with an awkward ellipsis; line-height feels different from the chat bubble above.

Citation chips intermittently wrap to a second row with almost no vertical breathing space from the body text.

In the right tray, the middle action card’s title + subtitle stack appears 1–2px higher than the top/bottom cards—buttons are not perfectly aligned column-wise.

Home — Enterprise Security

Table columns are holding, but “Resource” and “Action” still nudge baselines; some rows look microscopically taller, creating a faint “wavy” grid.

The filter chip row sits close enough to the table header that the first data row looks cramped.

The “Evidence Pack” panel feels optically heavier than the table because its inner padding is looser; the two panes don’t share a common top text baseline.

Platform — Private Brain

Source cards show slightly different internal paddings (email vs. meeting vs. ticket), so the four rows don’t read as a uniform stack.

In the Extraction column, the three rows don’t occupy identical heights; the confidence bar row looks taller than “Entity.”

The mini graph label “Knowledge Graph” (header) appears closer to the top border than the “Sources / Extraction” headers—header paddings inconsistent.

Platform — Workspaces

Sidebar items have inconsistent vertical centering; the selected workspace pill text looks a touch lower than unselected items.

Row 1 widgets: the rightmost card’s border sits 1–2px closer to the container edge than the leftmost, so the three don’t feel evenly distributed.

The count in “Live Task Queue” visually pushes against the chips; compared to the other two widgets, the content feels top-heavy.

Row 2 mini smart cards aren’t perfectly aligned to the left/right edges of Row 1; left edge looks inset more than the right.

Top bar controls (“Open Pipeline / Start Flow”) don’t align to the title baseline; they feel vertically mid-air relative to avatars.

Platform — Connect Securely

In the routing table, the “Policy” column text looks slightly right-biased within its cell compared to the other columns (optical centering off).

The horizontal divider between table and live section is faint enough that the two blocks visually merge.

Live Requests: the matched-rule chip group collides with the request label on the two longest labels; chips overlap the text’s reading area.

The Policy Gate card on the right crowds the request list by a few pixels; right gutter appears tighter than the left gutter of the list.

Request row heights vary subtly; the bottom two rows are taller than the top rows even with similar chip counts.

Platform — Library

Template cards: the mini node graphs aren’t vertically centered within their card’s middle band; some thumbnails sit lower.

Metadata rows (owner, last used, version) don’t share equal spacing between tokens; the middle token sometimes squeezes the others.

The grid’s rightmost column touches the container edge more closely than the leftmost; overall column gutters feel asymmetrical.

Platform — Command Center

Three-pane layout widths look right, but the center Answer card’s title baseline is a few pixels lower than the left pane’s top list item—cross-pane baseline mismatch.

Entities and Citations chip rows occasionally collapse into each other with minimal vertical spacing when there are three chips in both rows.

In the right “Do” pane, the “Run” buttons don’t align vertically across items; the middle row’s button sits slightly higher.





Home — Knowledge Blocks

Layout

Canvas is 600×360. Title strip height = 36px.

Grid has 3 columns × 3 rows, tile size exactly 160×90, gap exactly 12px both axes.
Spacing

Every tile has identical inner padding (8px); label → body → chips are vertically spaced by 4–8px.
Truncation

All single-line texts use truncation (no wrap). No tile shows more than 2 bullet lines.
Connectors

Connector dots sit mid-edge on tiles (±2px tolerance). Lines do not overlap tile content.
Consistency

Chip rows never touch tile borders (≥ 6px inset on all sides).

Home — Agentic Engine

Rail

Left rail width = 120px (±1px). “Tools / Models / Policies” section headings have equal top/bottom spacing (8px above first row, 8px below last).
Lane

Exactly 6 step cards render in one row (no wrap). Inter-card horizontal gap is uniform (all = 6–12px; not mixed).

Each step card title is single line; metric chips are single line and do not wrap.
Alignment

The geometric center of the traveling token aligns with the vertical center of each step card (variance ≤ 2px).

The policy pill sits horizontally centered over the lane (offset ≤ 2px) and has ≥ 6px vertical clearance to the top of step cards.
Overflow

No step content clips (no cut descenders/ascenders) and no card pushes outside the lane bounds.

Home — Workspaces & Canvases

Header vs Board

Header bar and board are separate blocks with ≥ 8px vertical gap. Top edge of the first card in each column aligns to the same baseline (offset ≤ 2px across columns).
Columns

Three columns with equal widths; gutters left↔center and center↔right are identical (±1px).
Cards

Every smart card is exactly 160×70. Internal content fits without overlap: title, chips (≤ 2 visible + optional “+1”), excerpt, icon row.
Rhythm

Vertical gaps between cards within a column are uniform (all = 8px).
Footers

Footer icon rows across all cards share a common baseline (offset ≤ 1px).

Home — Personal Co-pilot

Split

Left pane width = 336px, gutter = 12px, right pane = 228px (±1px).
Answer Card

Body text clamps to 2 lines exactly; no third partial line.

Citation chips render on one row or (if wrapping) maintain ≥ 4px spacing from body and between rows.
Actions

All three action cards are 64px high. Their primary buttons align vertically (button baselines within 1px across the column).
Input

Chat input sits flush to the bottom of the left pane and does not overlap content.

Home — Enterprise Security

Two-Pane

Table pane width = ~420px; side panel consumes remaining width. Column gap between them = 12px (±1px).
Table

Table uses fixed column widths; no cell text wraps. Row height is constant (all rows = 28px, variance ≤ 1px).

Masked values {redacted} do not alter row height or column width.
Filters

Filter chip row has ≥ 6px separation above the table header row.
Side Panel

Side panel’s top text baseline aligns with the table header baseline (offset ≤ 2px).

Platform — Private Brain

Columns

Three equal columns with 12px gaps; headers (“Sources / Extraction / Knowledge Graph”) share a common baseline (offset ≤ 2px).
Sources

Exactly 4 source cards, each 48px high; each shows a single truncated line.
Extraction

Exactly 3 rows of equal height (~48px each). Confidence bars are vertically centered within their row (offset ≤ 1px).
Graph

Mini-graph fits within its column with ≥ 8px inset on all sides. Node labels never overlap edges or column header.

Platform — Workspaces

Grid

Sidebar = 120px fixed; main panel fills remainder. Column gap = 12px.
Sidebar

All workspace items have equal row height (28–32px), text vertically centered. Selected item uses same height as others (no size jump).
Row 1 Widgets

Three widgets render on one row with equal widths, equal heights (68–70px), and equal gutters. Widget outer borders align on the same top/bottom baselines (≤ 1px variance).
Row 2 Preview

The mini smart-card row is vertically separated from Row 1 by ≥ 12px. Left and right edges of Row 2 align with Row 1 (no inset drift).
Top Bar

“Open Pipeline / Start Flow” buttons’ baselines align with the title + avatars (offset ≤ 2px).

Platform — Connect Securely

Routing Table

Four columns with fixed widths. No cell wraps; all rows share identical height (~24–28px).

“Policy” column text is optically centered (left/right padding matches other columns within 1px).
Section Separation

Visible divider with ≥ 8px vertical spacing above and below; top/bottom sections read as distinct blocks.
Live Requests

Each request row height is consistent (~24px), and matched-rule chips do not overlap the request label; if truncated, both label and chips remain readable.
Policy Gate

Right gate card width is constant and leaves ≥ 12px gutter between it and the request list. Gate content never overlaps list content.

Platform — Library

Grid

3 columns × 2 rows, equal gutters (12px) and equal card sizes (180×90).
Thumbs

Mini node-graph thumbnails are vertically centered within their band (center offset ≤ 1px across cards).
Metadata

Bottom metadata line uses three tokens with even spacing; none wrap; the line sits ≥ 4px from card bottom.
Symmetry

Rightmost column’s outer gutter equals the leftmost column’s outer gutter (±1px).

Platform — Command Center

Three-Pane

Columns are 160px / 240px / 160px with 8px inter-pane gutters. No pane wraps to a new line.
Baselines

Center pane title baseline aligns with top list item baseline in the left pane (offset ≤ 2px).
Chips

Entities and Citations rows are visually distinct with ≥ 4px vertical separation and ≥ 4px between chips; no overlap.
Actions

All “Run” buttons align vertically across the three items (centerline offset ≤ 1px). No action row exceeds 48px height.

Global checks (apply to all 10)

No component exceeds the 600×360 canvas or bleeds into the page margin.

All fixed-size cards include overflow: hidden and never show vertical scrollbars.

Single-line texts truncate with ellipsis; multi-line bodies use consistent line-height and clamp counts (2–3 lines as specified).

Horizontal and vertical gutters within each component are uniform—no pair of neighboring items differs by more than 1px in spacing.

There are no overlapping layers that intercept pointer events where interaction is expected elsewhere in the card.