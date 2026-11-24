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

## OpenRouter model discovery
- In AI Ideas or Story Studio, enter your OpenRouter API key and select **Load My Models**.
- The app requests `GET https://openrouter.ai/api/v1/models/user` with the provided key to retrieve models permitted by your account's settings. **All Models** uses the public `/models` catalog; listed models may not be available under your account limits.
- Search by name or ID, filter to **Free only**, and choose a model. Pricing is shown as approximate USD per million input/output tokens, plus context length. Model catalog and prices can change.
- The selected ID fills the existing model field and is shared by AI Ideas and Story Studio in the current tab. Manual model-ID entry is retained.
- Model lists are fetched on demand, not automatically; a network connection is required.
- API keys are not stored in project backups or browser localStorage.

## Unified AI Chat (Stage 5)
- **AI Chat** is now the only AI entry point, replacing the earlier AI Ideas and Story Studio screens.
- Natural multi-turn conversation about any idea, not only books. Conversation history is kept in sessionStorage (this tab/session) with no API key, and can be cleared with **New Chat** or copied with **Copy Chat**. Unsaved conversations are not added to Bubble Mind project backups.
- Attach TXT, Markdown, DOCX or text-based PDF. Reading is local; DOCX/PDF parsing requires downloading public JavaScript libraries. Click **Analyze Document** and explicitly approve paid OpenRouter requests before any content is sent. Very large documents must be split.
- **Build Bubble Map** generates a hierarchy from the conversation or analyzed document. The user reviews, edits, includes/excludes bubbles, selects the destination and explicitly confirms **Approve & Create Bubbles**. No AI change is applied automatically.
- One save action creates the selected parent/child hierarchy with notes. Existing projects stay unchanged; undo is available through Bubble Mind's edit history.
- Model discovery remains in the collapsible AI Settings panel. Credentials stay in app memory and are not in localStorage, sessionStorage or backups.
- The actual OpenRouter model responses and phone layout require user testing. Models may charge for requests.

## AI Chat v2 and detail sub-nodes
- **AI Chat** is a dedicated full-screen workspace with its own **Settings** panel.
- Send a normal message without an approval checkbox. **Analyze Document** and **Approve & Create Bubbles** retain separate deliberate actions; no automatic bubble changes.
- OpenRouter settings include **Remember API key on this device** (opt-in). Saved credentials use browser localStorage in plain text. **Security note:** scripts running under the same GitHub Pages origin, third-party libraries, and browser extensions may be able to access it. Use a spending-limited key, not a management key. Settings include **Forget saved API key**. Credentials are never exported with mind maps.
- Chat messages are stored locally for continuity across reloads. Earlier messages remain in local chat history. When context gets too long, the app sends earlier excerpts to the model to form a rolling summary before continuing; this can involve paid API calls and may lose some nuance, so check important details.
- Conversation replies stream into the chat. If output is cut off due to model output limits, up to six continuation requests are attempted. If still unfinished, the app preserves the received text and displays a warning; no implementation can guarantee third-party replies never end prematurely.
- Detail **sub-nodes** are not structural child bubbles. Each bubble can have several, displayed on its parent map as a small "Details" chip only when they exist. Clicking opens an information editor; long text stays off the galaxy view.
- To create a detail sub-node for a location, tap the location's ellipsis → **Detail sub-node**. A central bubble also offers **Detail sub-node** in its toolbar.
- Detail sub-nodes are included in JSON backups, merge/restore, markdown, CSV and undo/redo and are copied/deleted with their owning branches.
- AI bubble-map proposals may include detail sub-nodes. Each proposed sub-node can be reviewed, edited or excluded before bulk import.
- Installed Stage 5 will update offline cache version v6 on next online visit; refresh once to load the new files.
