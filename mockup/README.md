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

## Deploy (WF1)

WF1 does not run npm or deploy `mockup/dist/` from n8n. It reads `source.*` from Drive `app.json`, triggers the prepared Vercel mockup project via GitHub `gitSource`, polls until ready, then merge-writes `mockup.previewUrl`, `deployment.mockup.url`, `deployment.mockup.deploymentUrl`, `deployment.mockup.vercelProjectId`, and `deployment.mockup.lastDeployedAt`.

The landing page never imports mockup source — only the deployed URL.
