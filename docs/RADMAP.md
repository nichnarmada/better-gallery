# Better Gallery – Roadmap (Non-AI / Non-ML)

**Legend**
🟢 Done 🟡 In Progress ⚪ Planned

| Phase | Sprint(s) | Goal                          | Key Deliverables                                                                          | Status |
| ----- | --------- | ----------------------------- | ----------------------------------------------------------------------------------------- | ------ |
| 0     | 0-1       | **Foundations**               | • Monorepo setup (pnpm + Cargo)`<br>`• CI pipeline (Rust, Vitest)                         | 🟡     |
| 1     | 2-3       | **Universal Metadata Engine** | • Final DB schema`<br>`• Folder scanner CLI `<br>`• Tauri command `scan_folder`           | 🟡     |
| 2     | 3-4       | **Metadata Editor**           | • Inspector sidebar CRUD`<br>`• Side-car XMP write-back                                   | ⚪     |
| 3     | 4-5       | **File-System Watcher**       | • Cross-platform watcher`<br>`• Incremental DB sync                                       | ⚪     |
| 4     | 4-6       | **Core UI Shell**             | • Timeline grid (virtualised)`<br>`• Map, Albums routes `<br>`• Global state & IPC bridge | ⚪     |
| 5     | 6-7       | **Onboarding & Progress**     | • First-run wizard`<br>`• Progress overlay & events                                       | ⚪     |
| 6     | 7-8       | **Performance & Throttling**  | • Job queue with resource caps`<br>`• User settings panel                                 | ⚪     |
| 7     | 8-9       | **Backup & Portability**      | • Export/Import ZIP flow`<br>`• Integrity checks                                          | ⚪     |
| 8     | 9-10      | **Accessibility & i18n**      | • Keyboard nav audit`<br>`• Dark/HC themes `<br>`• Locale framework                       | ⚪     |
| 9     | 10-12     | **Packaging & Updates**       | • Signed Windows installer`<br>`• Auto-update channel `<br>`• Beta release                | ⚪     |

_Note:_ AI/ML milestones are tracked separately in `AI-roadmap.md`.
