# Bubble Mind Stage 3 — Galaxy Workspace

This is the **assistant's Stage 3 build**, separate from `/stage2/` and the user-owned `/original/` version.

## Test address

https://readyplayer99.github.io/BUBBLE-MIND/stage3/

## Included

- Layered offline galaxy/starfield CSS background.
- Current bubble mind map expands to use available phone/desktop screen height.
- Quick Notes bottom sheet on the currently opened bubble.
- Expand Notes to a full-screen writing editor (Markdown-formatting insertion tools).
- Autosave notes to browser localStorage after a short pause and on blur/close.
- Search bubble titles, descriptions and notes.
- Nested outline to navigate ideas.
- Notes indicators on bubbles containing notes.
- Prior Stage 2 bubble tools, layouts, relationships and Tab child shortcut carried forward.

## Storage

Stage 3 uses the separate key `bubble-mind-stage3-v1`. On first visit it **copies** the assistant Stage 2 data from `bubble-mind-stage2-v1` if available in the same browser origin; it does not edit that source. This is browser-local only; there is no cross-device sync or export in this release. The user-owned original `/original/` app is not imported or modified.

## Limitations / test checklist

1. Check blank first launch, create a project, enter a bubble, and ensure the map fills the device screen.
2. Open Notes, type, close and reopen, reload the tab and check your text.
3. Expand Notes full screen and try the heading/bold/list insertion tools. These insert Markdown plain-text markers, not rendered rich-text styling.
4. Search for words inside saved notes; open a result.
5. View an outline of nested bubbles and navigate from it.
6. Confirm Stage 2 `/stage2/` and user original `/original/` are unchanged.

**Not yet included:** AI, cloud sync, 3D solar-system navigation, image attachments, offline install packaging, document import/export, or validated testing on a physical Android phone. Do not use this prototype as the sole storage location for irreplaceable ideas.
