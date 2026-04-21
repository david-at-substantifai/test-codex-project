# test-codex-project

A small Tauri desktop demo that builds into a macOS app bundle in the project root.

## Scripts

- `npm install` installs the Tauri CLI for the project.
- `npm run dev` launches the desktop app in development mode.
- `npm run build` creates a macOS `.app` bundle and copies it to the project root.

## Build output

After a successful build, the app bundle is written to:

- `Test Codex Project.app`

Tauri also keeps the generated bundle under:

- `src-tauri/target/release/bundle/macos/Test Codex Project.app`
