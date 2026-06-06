# Comment System

_Started 2026-05-29 16:00 UTC_

---

## User

Apply comment

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

Let me find the ecosystem-footer element and the sections that follow it, plus the relevant JS.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

Now I can see the issues. There are two problems causing the scroll glitch:

1. **Broken CSS** — an orphaned `display: none; }` rule without a selector (around line 2088) that corrupts CSS parsing
2. **TOC sticky→absolute position swap** — the `updateTocStickyBehavior` JS function switches the TOC between `position: sticky` and `position: absolute` when the footer enters the viewport, causing a layout reflow/jump in the grid

Let me fix both:Now let me also add a smooth transition to the TOC opacity so it fades gracefully:

_[tool: str_replace_edit]_

_[tool: done]_

Fixed two issues causing the scroll glitch after the ecosystem footer:

1. **Broken CSS rule** — removed an orphaned `display: none; }` block without a selector that was corrupting CSS parsing downstream
2. **TOC position swap** — replaced the `sticky → absolute` position switch (which caused layout reflow/jumps) with a smooth opacity fade-out instead, so no layout shift occurs when scrolling past the footer area

## User

Apply comment

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

The active slide has inline overrides (extra height, large margins on title/image) that are causing it to overflow the container. I'll clean it up to fit properly with balanced spacing — consistent with the other slides.Now let me also normalize the other slides' image heights to match, so all slides have consistent spacing:

_[tool: str_replace_edit]_

_[tool: done]_

Fixed the carousel slide heights — removed the custom inline overrides (extra height, 60px margins) from the active slide and normalized all slide images to 460px, giving proper top and bottom spacing within the 550px track.

## User

Apply comment

## Assistant

_[tool: read_file]_

_[tool: str_replace_edit]_

I'll replace the mobile carousel with a proper 3-image slideshow where the active slide is centered with left/right preview images visible. Let me build this:Now let me add the CSS for the new mobile slideshow and update the JS. First, the CSS:

_[tool: str_replace_edit]_

Now update the JS — replace the old mobile carousel handler with the new slideshow logic:

_[tool: str_replace_edit]_

_[tool: done]_

Replaced the mobile carousel with a 3-panel slideshow — active screen centered with scaled/dimmed left and right previews visible. Clicking the previews or arrows navigates, with swipe support and smooth transitions. On small screens the previews hide gracefully.

