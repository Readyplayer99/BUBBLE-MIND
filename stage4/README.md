# Bubble Mind — Stage 4

Independent test app: https://readyplayer99.github.io/BUBBLE-MIND/stage4/

Stage 4 is a separate evolution of Stage 3. The original app and earlier stages are not modified.

## Data protection
- Browser-local key: `bubble-mind-stage4-v1`.
- On first load, copies Stage 3 data from `bubble-mind-stage3-v1` if present on the same browser and origin.
- Complete JSON backup, Markdown outline export and CSV table export.
- JSON import validated before confirmation: merge or replace.
- Previous Stage 4 copy stored in `bubble-mind-stage4-pre-restore-v1` before restore.
- No cloud sync. Export JSON to protect your data independently of browser storage.

## Installation
- Manifest, icons and service worker limited to `stage4/` scope.
- Browser-menu installation when supported, or Add to Home Screen.
- Open Stage 4 online once after publishing to cache assets; previously cached app can load offline.
- Data stays local on each device. Restore via downloaded JSON on other devices.

## Manual tests
1. Confirm Stage 3 data was copied into Stage 4, not removed from Stage 3.
2. Export JSON and open it, inspect counts and notes.
3. Export Markdown/CSV and verify notes/relationships.
4. Import a JSON backup with merge and confirm bubble and note counts.
5. Import with replace then recover the prior Stage 4 copy.
6. Try invalid JSON and cancel without changing data.
7. Install to home screen or desktop (device/browser support differs).
8. After initial online open, disable internet and test app launch.
