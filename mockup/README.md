# Mockup source

Interactive prototype referenced by `app.json` → `mockup`.

## Layout

```txt
mockup/
├── package.json
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx          ← main mockup component — customize screens here
    └── styles/global.css
```

## Commands

From **package root** (recommended):

```bash
npm install
npm run dev
npm run build
npm run preview
```

## app.json fields

| Field | Starter value |
|-------|---------------|
| `type` | `interactive` |
| `framework` | `react-vite` |
| `sourcePath` | `mockup/` |
| `entryPoint` | `mockup/src/App.jsx` |
| `baseWidth` / `baseHeight` | `375` / `820` |
| `clipBottomPx` | `0` |
| `previewUrl` | `null` until n8n deploys |

## Embed mode

The landing page embeds the deployed mockup with `?embed=1`. `App.jsx` detects iframe/embed mode and adjusts layout.

## Deploy (future n8n)

1. Run `installCommand` and `buildCommand`
2. Deploy `mockup/dist/` (e.g. Vercel)
3. Write `mockup.previewUrl`, `deployment.mockup.url`, `deployment.mockup.vercelProjectId`, and `deployment.mockup.lastDeployedAt` back to `app.json`

The landing page never imports mockup source — only the deployed URL.
