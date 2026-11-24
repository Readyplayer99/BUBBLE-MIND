# Bubble Mind — Stage 5 Foundation

This is the approved compact mobile-layout baseline copied into a new, separate Stage 5 app. No AI integrations are enabled yet.

URL: https://readyplayer99.github.io/BUBBLE-MIND/stage5/

Stage 5 uses its own localStorage key (`bubble-mind-stage5-v1`) and recovery key. On its first visit in the same browser, it copies data from the previous mobile-layout test (`bubble-mind-stage4-mobile-v1`), if present. The original app and all completed stages remain unchanged.

Includes the existing backup/export/restore functions and a separately scoped install manifest and offline worker.

Future Stage 5 AI development will be optional and should require explicit user authorization before API credentials or external services are used.
