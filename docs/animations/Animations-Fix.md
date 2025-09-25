Got it — this is a classic “DOM visibility != React lifecycle” problem with canvases. Below are **concrete, stack-fit solutions** you can pick from (in order of reliability), plus exact code you can drop in.



# 1) Best fix: render **one** variant per breakpoint (don’t toggle via CSS)

**Why:** Toggling `hidden`/`block` doesn’t remount the component, so your init code never runs. Rendering only the active variant **does** trigger mount/unmount → clean init every time.

```tsx
// hooks/useMediaQuery.ts
import { useEffect, useState } from "react"
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])
  return matches
}
```

```tsx
// In your page/section:
import { useMediaQuery } from "@/hooks/useMediaQuery"

export default function Section() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  // key forces a fresh mount when switching modes (re-runs init)
  const key = isDesktop ? "lg" : "sm"

  return (
    <div>
      {isDesktop ? (
        <UnifiedKnowledge key={key} mode="desktop" />
      ) : (
        <UnifiedKnowledge key={key} mode="mobile" />
      )}
    </div>
  )
}
```

> If you currently have separate `*Mobile` components, either (a) merge into one component with a `mode` prop, **or** (b) keep them separate but still **conditionally render exactly one** (not both hidden/visible).

# 2) If you must keep both in the DOM: avoid `display:none`

**Why:** `display:none` → layout = 0×0 at swap time; timing gets tricky and some contexts won’t redraw without an explicit re-init.

Use “kept-alive but invisible” + pause the loop:

```tsx
// Wrapper determines visibility but keeps element mounted
<div className={isDesktop ? "opacity-0 pointer-events-none h-0" : "opacity-100"}>
  <UnifiedKnowledge mode="mobile" paused={isDesktop} />
</div>
<div className={isDesktop ? "opacity-100" : "opacity-0 pointer-events-none h-0"}>
  <UnifiedKnowledge mode="desktop" paused={!isDesktop} />
</div>
```

Inside the animation component:

```ts
const rafId = useRef<number | null>(null)

useEffect(() => {
  if (paused) {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    return
  }
  const tick = () => {
    // draw…
    rafId.current = requestAnimationFrame(tick)
  }
  rafId.current = requestAnimationFrame(tick)
  return () => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
  }
}, [paused])
```

# 3) Bullet-proof the (re)initialization timing with **ResizeObserver**

**Why:** IntersectionObserver won’t fire for `display:none`. ResizeObserver does fire when the element transitions from 0×0 to laid-out size.

```ts
import { useLayoutEffect, useRef } from "react"

function useSizeReady(ref: React.RefObject<HTMLElement>, onReady: () => void) {
  const readyRef = useRef(false)
  useLayoutEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect
      if (cr.width > 0 && cr.height > 0 && !readyRef.current) {
        readyRef.current = true
        // next frame ensures CSS has applied
        requestAnimationFrame(onReady)
      }
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ref, onReady])
}
```

Use it in your canvas component:

```tsx
const containerRef = useRef<HTMLDivElement>(null)

useSizeReady(containerRef, () => {
  // (re)initialize canvas size, context, and start loop
  initCanvas()
})

return <div ref={containerRef}><canvas ref={canvasRef}/></div>
```

# 4) React-key remount on **breakpoint change** (explicit)

Even if you stick with CSS show/hide, add a **breakpoint key** at a parent to force remount:

```tsx
const isDesktop = useMediaQuery("(min-width: 1024px)")
return (
  <div key={isDesktop ? "lg" : "sm"}>
    {/* existing desktop/mobile DOM here (even if hidden) */}
  </div>
)
```

# 5) Watch breakpoint with **matchMedia** and call your existing `initializeAndStartAnimation`

You already have `initializeAndStartAnimation`. Wire it to the media query:

```ts
useEffect(() => {
  const mq = window.matchMedia("(min-width: 1024px)")
  const onChange = () => {
    // let layout settle, then re-init
    requestAnimationFrame(() => requestAnimationFrame(initializeAndStartAnimation))
  }
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}, [initializeAndStartAnimation])
```

# 6) MutationObserver for Tailwind class flips

If some ancestors toggle `hidden`/`block`, observe that exact node and react when className changes:

```ts
useEffect(() => {
  const el = containerRef.current?.closest("[data-visibility-toggle]") ?? containerRef.current
  if (!el) return
  const mo = new MutationObserver(() => {
    const style = window.getComputedStyle(el)
    const nowVisible = style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0"
    if (nowVisible) requestAnimationFrame(initializeAndStartAnimation)
  })
  mo.observe(el, { attributes: true, attributeFilter: ["class", "style"] })
  return () => mo.disconnect()
}, [initializeAndStartAnimation])
```

> Add `data-visibility-toggle` on the wrapper that switches classes at breakpoints to make this deterministic.

# 7) Single **AnimationController** instance with attach/detach

Keep state & logic outside the component; just (re)bind to canvas on visibility.

```ts
class AnimationController {
  private ctx?: CanvasRenderingContext2D
  private raf: number | null = null
  attach(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!
    this.start()
  }
  detach() {
    if (this.raf) cancelAnimationFrame(this.raf)
    this.ctx = undefined
  }
  private start = () => {
    const loop = () => {
      if (!this.ctx) return
      // draw…
      this.raf = requestAnimationFrame(loop)
    }
    this.raf = requestAnimationFrame(loop)
  }
}

const controller = new AnimationController()

useEffect(() => {
  if (!canvasRef.current) return
  controller.attach(canvasRef.current)
  return () => controller.detach()
}, [/* key on breakpoint */])
```

# 8) OffscreenCanvas + Worker (advanced, future-proof)

**Why:** The animation runs independent of DOM visibility; swapping breakpoints only rebinds the bitmap.

* In component: `const off = canvas.transferControlToOffscreen()` → post to worker.
* Worker draws with `OffscreenCanvas` + rAF.
* On re-attach (after breakpoint change) just set size and keep streaming; no re-init cost.

> Great for heavier animations; requires modern browsers and a bit of plumbing.

# 9) DPI & size correctness (common silent failure)

On (re)attach, always re-sync canvas backing store:

```ts
function fitCanvasToContainer(canvas: HTMLCanvasElement) {
  const dpr = Math.max(1, window.devicePixelRatio || 1)
  const { width, height } = canvas.getBoundingClientRect()
  const bw = Math.max(1, Math.floor(width * dpr))
  const bh = Math.max(1, Math.floor(height * dpr))
  if (canvas.width !== bw || canvas.height !== bh) {
    canvas.width = bw
    canvas.height = bh
    const ctx = canvas.getContext("2d")!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // 1 CSS px == 1 unit
  }
}
```

Call this in your **ResizeObserver** and right before starting the loop.

# 10) Minimal changes that still work

* Replace `hidden lg:block` with `invisible lg:visible` or `opacity-0 lg:opacity-100` on the **canvas wrapper**, not on the canvas itself.
* Add a soft **debounce + double rAF** before re-init to ensure layout settled:

  ```ts
  requestAnimationFrame(() => requestAnimationFrame(initializeAndStartAnimation))
  ```

---

## Recommended path (fastest, least risky)

1. **Switch to conditional rendering per breakpoint** (Solution #1) and use a **key** tied to the breakpoint → guarantees remount and clean init.
2. Inside each animation, adopt **ResizeObserver** + **fitCanvasToContainer** (Solutions #3 & #9) so sizing is always correct.
3. If you must keep both DOM variants, use **opacity/pointer-events** instead of `display:none` and pause loops (Solution #2).

If you want, I can refactor one animation component to this pattern so you can replicate across the rest.
