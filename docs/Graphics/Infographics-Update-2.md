the likely root-cause (incl. sizing math), and exact fixes Cursor should apply. I’ll only cover the five visuals you flagged.

1) Home — Agentic Engine (needs most help)

What the screenshot shows

The Models labels run into the flow lane.

Several step cards are clipped/squeezed; metrics wrap.

Policy pill and the traveling token don’t align cleanly with “Redact”.

Root cause (math)

Lane width = canvas (600) − padding (24) − rail (120) − rail/gutter (12) ≈ 444 px usable.

Spec asked for 6× step cards @90 px + 5× 12 px gaps = 600 px → can’t fit in 444 px, so the row compresses/wraps.

Fix

Make the lane a fixed, non-wrapping row that actually fits, or allow controlled horizontal scroll. Do the former:

// Container
<section className="flex gap-3">
  <aside className="w-[120px] shrink-0">…</aside>
  <div className="flex-1 overflow-hidden">
    <div className="flex items-center gap-1.5 flex-nowrap"> {/* gaps 6px */}
      {/* six steps that fit */}
    </div>
  </div>
</section>


New step sizing that fits: w-[70px] h-[44px], gap 6px.
6×70 + 5×6 = 450 px; still tight → also trim each card’s side padding to keep arrows inside lane.

<Card className="w-[70px] h-[44px] shrink-0">
  <div className="p-1 leading-none">
    <div className="text-[11px] truncate">Plan</div>
    <div className="flex gap-1 text-[10px] whitespace-nowrap">
      <MiniChip>lat 110ms</MiniChip>
      <MiniChip>cost 0.3</MiniChip>
    </div>
  </div>
</Card>


Keep the policy pill in its own row above the lane, not absolutely over it:

<div className="flex justify-center mb-1">
  <MiniChip className="whitespace-nowrap">Policy: PII Masking ON</MiniChip>
</div>


Ensure rail is columnar, not inline:

<aside className="w-[120px] shrink-0">
  <div className="space-y-2">
    <section><h5 className="text-xs mb-1">Tools</h5>…</section>
    <section><h5 className="text-xs mb-1">Models</h5>…</section>
    <section><h5 className="text-xs mb-1">Policies</h5>…</section>
  </div>
</aside>


Arrows between cards: draw as a dedicated, absolute SVG layer with anchors at card centers; don’t rely on margins.

If you prefer original 90-px cards: wrap the lane in horizontal scroll + snap:

<div className="overflow-x-auto scrollbar-none">
  <div className="flex gap-3 pr-3 snap-x">
    {/* 90×48 cards each with className="snap-start" */}
  </div>
</div>

2) Home — Workspaces & Canvases

What the screenshot shows

Some smart cards are cramped; chips and footers collide.

Column headers & “Add Canvas” crowd the board; columns feel uneven.

Root cause

Several cards are exact height but internal spacing exceeds it (chips wrap → height pressure). Header bar sits in the same grid row as the board.

Fix

Make the board a separate block with top margin; keep columns uniform:

<header className="mb-2 flex items-center justify-between">
  <div className="text-sm">Workspace: Atlas</div>
  <div className="flex items-center gap-2"><Avatars… /><Button>+ Add Canvas</Button></div>
</header>

<div className="grid grid-cols-3 gap-3 items-start">
  {/* columns */}
</div>


Pin card internals with justify-between and clamp all text:

<Card className="w-[160px] h-[70px] shrink-0">
  <div className="h-full p-2 flex flex-col justify-between">
    <div className="text-xs truncate">Renewal Brief</div>
    <div className="flex gap-1 flex-wrap">
      <MiniChip size="xs">Entity: Vendor</MiniChip>
      <MiniChip size="xs">Doc link</MiniChip>
    </div>
    <div className="text-[11px] opacity-70 truncate">Last note: …</div>
    <div className="flex gap-2 text-[11px] mt-1">
      <GhostIcon name="sparkles" />
      <GhostIcon name="follow" />
      <GhostIcon name="flow" />
    </div>
  </div>
</Card>


If 2–3 chips wrap, cap at two and show a “+1” tail chip:

<div className="flex gap-1">
  <MiniChip size="xs">Entity: Vendor</MiniChip>
  <MiniChip size="xs">Doc link</MiniChip>
  <MiniChip size="xs">+1</MiniChip>
</div>

3) Home — Enterprise Security

What the screenshot shows

Table rows look squeezed; some values clipped; right panel tight to the table.

Root cause

The left table uses content-sized columns; long “Resource/Action” values wrap. Grid gap between table and side panel is minimal.

Fix

Lock the two-pane template and fix column widths. Enable no-wrap + truncate.

<div className="grid grid-cols-[420px_1fr] gap-3">
  <Card className="overflow-hidden">
    <table className="table-fixed w-full text-xs">
      <colgroup>
        <col className="w-[60px]" />
        <col className="w-[70px]" />
        <col className="w-[110px]" />
        <col className="w-[110px]" />
        <col className="w-[60px]" />
        <col className="w-[50px]" />
      </colgroup>
      <tbody>
        <tr className="h-7">
          <td className="truncate whitespace-nowrap">09:42</td>
          <td className="truncate whitespace-nowrap">j.lee</td>
          <td className="truncate whitespace-nowrap">Request</td>
          <td className="truncate whitespace-nowrap">{'{redacted}'}</td>
          <td className="truncate whitespace-nowrap">PII</td>
          <td className="truncate whitespace-nowrap">Allow</td>
        </tr>
        …
      </tbody>
    </table>
  </Card>

  <Card className="min-h-[120px] p-2">
    <div className="flex items-start justify-between">
      <div>
        <div className="text-sm">Evidence Pack</div>
        <p className="text-xs opacity-70">Every action is logged…</p>
      </div>
      <Button size="sm">Export</Button>
    </div>
  </Card>
</div>


Masked values: render as font-mono text to stay compact.

4) Platform — Workspaces (biggest layout math bug here)

What the screenshot shows

Top widget cards wrap/squeeze; the second row bleeds upward; sidebar items wrap.

Root cause (math)

Main panel width = inner (576) − sidebar (120) − gutter (12) = 444 px.

Spec used 3× 176-px widgets + 2× 12-px gaps = 420 + 24 = 444 px (perfect on paper)… but actual padding/borders push it over → wrap.

Fix

Reduce widget width slightly and use fractional grid to avoid off-by-px:

<div className="grid grid-cols-[120px_1fr] gap-3">
  <aside className="w-[120px] shrink-0">
    <div className="space-y-1">
      {['Atlas','Orion','Nova','Zephyr'].map(n => (
        <button className="h-7 w-full text-left truncate px-2 rounded">{n}</button>
      ))}
    </div>
  </aside>

  <section className="space-y-3">
    {/* Row 1 */}
    <div className="grid grid-cols-3 gap-3">
      {/* Each uses min-w-0 to allow truncation inside */}
      <Card className="min-w-0 h-[68px]"><…Live Task Queue…/></Card>
      <Card className="min-w-0 h-[68px]"><…Canvas Gallery…/></Card>
      <Card className="min-w-0 h-[68px]"><…Linked Entities…/></Card>
    </div>

    {/* Row 2 */}
    <div className="grid grid-cols-3 gap-3">
      <Card className="h-[60px]"><…mini smart card…/></Card>
      <Card className="h-[60px]">…</Card>
      <Card className="h-[60px]">…</Card>
    </div>
  </section>
</div>


Inside widgets, truncate everything. Example:

<div className="p-2 h-full flex flex-col justify-between">
  <div className="text-xs truncate">Live Task Queue</div>
  <div className="flex items-center gap-2">
    <div className="text-lg leading-none">7</div>
    <div className="flex gap-1">
      <MiniChip size="xs">New</MiniChip>
      <MiniChip size="xs">Due</MiniChip>
    </div>
  </div>
</div>


Add mt-3 between rows. Ensure sidebar buttons h-7 & truncate so they never wrap.

5) Platform — Connect Securely

What the screenshot shows

Routing table cells wrap; last column pushes into divider.

In Live Requests, chips/cells collide with the Policy Gate.

Root cause

Over-long strings + content-sized columns; bottom grid uses ambiguous column widths.

Fix

Make the top table fixed with explicit widths; abbreviate labels; clamp text:

<Card className="h-[140px] overflow-hidden">
  <table className="table-fixed w-full text-xs">
    <colgroup>
      <col className="w-[150px]" /> {/* Condition */}
      <col className="w-[80px]"  /> {/* Action */}
      <col className="w-[110px]" /> {/* Model/Tool */}
      <col className="w-[90px]"  /> {/* Policy */}
    </colgroup>
    <tbody>
      <tr className="h-7">
        <td className="truncate">Task = “Summarize”</td>
        <td className="truncate">Route</td>
        <td className="truncate">Model A</td>
        <td className="truncate">PII Masking</td>
      </tr>
      …
    </tbody>
  </table>
</Card>


Bottom region: explicit two-column grid and chip rows that can truncate:

<div className="grid grid-cols-[1fr_120px] gap-3">
  <Card className="min-h-[120px]">
    <ul className="divide-y">
      {[1,2,3,4,5,6].map(i => (
        <li className="h-6 flex items-center justify-between gap-2">
          <span className="text-xs truncate">Req #{i}</span>
          <div className="flex gap-1 overflow-hidden">
            <MiniChip size="xs" className="truncate">Matched: Summarize</MiniChip>
            <MiniChip size="xs" className="truncate">→ Model A</MiniChip>
          </div>
        </li>
      ))}
    </ul>
  </Card>

  <Card className="w-[120px] shrink-0 p-2">
    <div className="text-xs mb-2">Policy Gate</div>
    <div className="flex flex-col gap-1">
      <MiniChip size="xs">De-ID</MiniChip>
      <MiniChip size="xs">Rate Limit</MiniChip>
      <MiniChip size="xs">Audit</MiniChip>
    </div>
  </Card>
</div>


Divider: give it margin (my-2) so the table doesn’t visually merge into Live Requests.

Small global tune-ups (apply across the five)

Clamp every multi-line text: line-clamp-2 (or -3 for answer cards).

Ensure fixed-size cards don’t expand: always add shrink-0 h-[…] w-[…].

Min-width negotiation: when using fraction columns, put min-w-0 on the child cards so truncation activates instead of overflow.

Chip rows: flex gap-1 overflow-hidden and avoid wrap unless the spec says wrap; if you allow wrap, limit to 2 chips + “+1”.

SVG/absolute layers: give them pointer-events-none unless interactive, so they don’t intercept dragging/hover.