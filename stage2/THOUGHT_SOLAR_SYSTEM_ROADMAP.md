# Bubble Mind — Future 3D Thought Solar System

**Status:** Planned for a later stage. Not included in Stage 2.

## Concept
- Each current parent/central idea is a glowing **sun bubble**.
- Its child ideas are **planet bubbles**, with the same translucent bubble styling as the 2D view.
- Connections are visible as orbit guides or linking curves. Existing node hierarchy and labelled links remain exactly the same data in 2D and 3D.
- Users may switch between the current 2D workspace and a true navigable 3D view using an **on-screen 2D/3D toggle**, including an alternative accessible control.
- Desktop: WASD keys to move through the scene, mouse/trackpad for looking around, plus a clearly labelled shortcut to switch modes.
- Mobile: one-finger look/orbit, two-finger pan and pinch zoom, optional on-screen movement controls; avoid keyboard-only features.
- Selecting a planet bubble enters that idea with a smooth camera transition; Back returns to the parent solar system.
- A focus/recenter control, tooltips and selected-bubble panel keep the 3D view practical.
- Honour the same floating on/off, reduced-motion and static-mode preferences as 2D.
- Prefer a lazy-loaded WebGL renderer (e.g. Three.js) that falls back to 2D on unsupported or slow devices.
- Save camera angle/zoom per bubble if useful, but never fork the project's underlying bubble data.
- Keep bubble titles readable at all viewing distances. Limit simultaneously rendered planets for large worlds.

## Gate before implementation
Keep Stage 2's 2D interactions stable. Prototype 3D in an isolated feature branch and test on a mid-range Android phone before enabling it by default.

## Stage 2 deployed separately
- Assistant Stage 1: `/`
- User-owned original (OFF LIMITS): `/original/`
- Assistant Stage 2: `/stage2/`
