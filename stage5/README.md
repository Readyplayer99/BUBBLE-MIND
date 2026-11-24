# Bubble Mind — Stage 5 Foundation

This is the approved compact mobile-layout baseline copied into a new, separate Stage 5 app. No AI integrations are enabled yet.

URL: https://readyplayer99.github.io/BUBBLE-MIND/stage5/

Stage 5 uses its own localStorage key (`bubble-mind-stage5-v1`) and recovery key. On its first visit in the same browser, it copies data from the previous mobile-layout test (`bubble-mind-stage4-mobile-v1`), if present. The original app and all completed stages remain unchanged.

Includes the existing backup/export/restore functions and a separately scoped install manifest and offline worker.

Future Stage 5 AI development will be optional and should require explicit user authorization before API credentials or external services are used.

## Optional OpenRouter AI tools
- Open **AI Ideas** from the desktop header or phone menu.
- Enter your own OpenRouter API key and a current model ID. The app does not store the key in localStorage, backup files, URL, or service-worker cache.
- Choose a bubble and a task: brainstorming, expanding notes, suggesting labelled connections, or organizing existing ideas.
- Preview exactly what task and context will be sent, check consent, then generate suggestions. No data is transmitted before Generate.
- Review and Apply each proposal individually; changes remain undoable through the regular map history. Model outputs are untrusted data, not instructions.
- OpenRouter may incur usage charges depending on model/account. No API request is made without your action; the key is kept in tab memory until reload or using Forget key.
- The selected idea context is limited to a small set of bubble summaries and at most 400 characters of the selected note.
- Live OpenRouter calls require an internet connection. Existing offline mind-map features still work.

## Story Studio — Document Import and Brainstorming
- Use **Story Studio** from the header or compact mobile menu.
- Import TXT, Markdown, DOCX, or selectable-text PDF; or paste text. DOCX and PDF readers load code from external CDNs when needed, but document bytes are read locally.
- Long documents up to 210,000 characters are processed in 12,000-character sections with multiple OpenRouter calls (usage may cost money). Source fidelity depends on the model; verify the review before creating the bubbles.
- Brainstorm in multiple AI turns and press Build Bubble Map to create a structured parent story bubble with sections for Plot, Characters, Worldbuilding, Themes, Timeline, etc. when supported by the discussion.
- Review and edit every proposed bubble title, description, and note. One Create Bubble Map confirmation adds all nodes with one undoable history action. Existing projects are never replaced.
- The conversation and uploaded text remain in memory and are not persisted until an approved bubble map is created. Reloading loses unsaved conversation/text.
- Separate Story Studio JS/CSS files are part of the Stage 5 offline cache; OpenRouter and remote document-library fetching still require internet.
