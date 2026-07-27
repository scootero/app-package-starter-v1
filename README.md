# App Package Starter

Reusable scaffold for a new app validation idea. Copy this folder, rename it to your `appId`, and fill in TODO placeholders.

**Spec:** [app-validation-spec](../app-validation-spec/APP_PACKAGE_SPEC.md) v1.5.0  
**Workflow index:** [n8n-workflows/README.md](../n8n-workflows/README.md)  
**Reference package:** [test-app-packages/human-lab](../test-app-packages/human-lab/)  
**Landing transform:** [landing-template/scripts/APP_PACKAGE_TRANSFORM.md](../landing-template/scripts/APP_PACKAGE_TRANSFORM.md)  
**WF0 blueprint:** [n8n-workflows/WF0-PROVISIONING-PIPELINE-BLUEPRINT.md](../n8n-workflows/WF0-PROVISIONING-PIPELINE-BLUEPRINT.md)  
**WF1 blueprint:** [n8n-workflows/WF1-DEPLOY-PIPELINE-BLUEPRINT.md](../n8n-workflows/WF1-DEPLOY-PIPELINE-BLUEPRINT.md)

## Author Provision Checklist

### What Cursor must ask

App name, `appId`, tagline, **`identity.contactEmail`**, **`identity.privacyEffectiveDate`**, audience, pain points, features, benefits, pricing/CTAs, theme, mockup flow, screenshot captions, FAQ (use `[Privacy Policy](/privacy)` when linking the policy), experiment hypothesis/budget, ad copy, and GitHub/Vercel `source.*` values. See [START_HERE.md](START_HERE.md) for the full table.

Replace starter placeholders `your-privacy-email@example.com` and `privacyEffectiveDate` before Meta advertising. Footer copyright only — Privacy / Data Deletion / Contact links are provided by the landing template.

### What the human must provision

| Item | Detail |
|------|--------|
| Full GitHub app repo | `mockup/` (Vercel root), `media/`, package/Vite files; **no** `node_modules/` or `dist/` |
| Vercel project | Root Directory = `mockup` (`source.mockupRootDirectory`) |
| WF2 landing repo/project | Landing repo and Vercel project created after approval; Vercel Root Directory = repository root/default |
| Google Drive | Upload **`app.json` ONLY** to `App Validation/{appId}/` |

Do not upload `copy/`, `media/`, `mockup/`, or `docs/` to Drive. Local `copy/*.md` are authoring aids — convert into `landingPage.content` + inline sections before Drive sync.

### What stays null for automation

| Field | Owner |
|-------|-------|
| `tracking.webhookUrl` | WF0 |
| `deployment.mockup.*`, `mockup.previewUrl` | WF1 |
| `deployment.landing.*`, `deployment.githubRepoUrl` | WF2 |
| `ads.meta.*` | WF-Ads |
| `validation.*` | WF-Decision |

## How to copy

1. Duplicate this folder to `test-app-packages/{appId}/` (or your local working tree).
2. Rename the folder to match `appId` (kebab-case, e.g. `focus-timer`).
3. Replace every `your-app-id` in `app.json`, analytics IDs, and ad campaign names.
4. Fill TODO fields in `app.json` (including `landingPage.content` and inline sections).
5. Optionally draft in `copy/*.md`, then convert into `app.json` before Drive sync.
6. Customize `mockup/src/App.jsx` for your screens.
7. Run from package root:

```bash
npm install
npm run dev
npm run build
```

8. Preview landing page (from `landing-template/`):

```bash
node scripts/generate-app-config.js ../test-app-packages/{appId}
npm run dev
```

Read [START_HERE.md](START_HERE.md) before using Cursor to generate content.

## Values needed before WF0

When the package is complete, set `status: "provisioning"` and run **WF0** to provision `tracking.webhookUrl` and promote to `ready`.

| # | Value | Where to put it |
|---|-------|-----------------|
| 1 | Full `experiment` section | `experiment.*` |
| 2 | Analytics IDs | `analytics.projectId`, `experimentId`, `experimentRunId`, variant IDs |
| 3 | Ad copy + optional targeting | `ads.*`, `ads.targeting` (not `ads.meta`) |
| 4 | Inline landing + `githubPath` media | `landingPage`, `media`, optional `ads.media` |
| 5 | Status to trigger WF0 | `"status": "provisioning"` |

## Values needed before WF1

| # | Value | Where to put it |
|---|-------|-----------------|
| 1 | `appId` (kebab-case) | Root `appId`; Drive folder name must match |
| 2 | App display name | `identity.appName` |
| 3 | Full app GitHub repo (`org/repo`) | `source.mockupGithubRepo` |
| 4 | GitHub branch | `source.mockupBranch` (e.g. `main`) |
| 5 | Mockup root directory | `source.mockupRootDirectory` → **`mockup`** |
| 6 | Vercel mockup project ID or name | `source.vercelMockupProjectId` and/or `source.vercelMockupProjectName` |
| 7 | Drive control file | Upload **only** `app.json` to `App Validation/{appId}/` |
| 8 | Status before WF1 | `"status": "ready"` (set by WF0) |
| 9 | Leave null until automation | See checklist above |
| 10 | Secrets | **Never** in `app.json` — tokens in **n8n Credentials** only |

### One-time infrastructure checklist

1. **GitHub:** Create full app repo; push `mockup/` + `media/`; ignore `node_modules/` and `dist/`.
2. **Vercel:** Import repo → Root Directory = `mockup` → deploy once manually.
3. **Drive:** Upload **only** `app.json`; fill `source.*`; set `status: "provisioning"` for WF0.
4. **n8n:** Run WF0, then WF1 with `appId`; verify the public mockup URL.
5. **WF2 setup:** After approval, create the landing repo/project, then let WF2 push the generated landing repo and deploy it.

## What to customize

| Area | Files / fields |
|------|----------------|
| Identity & audience | `app.json` → `identity`, `audience`, `commerce`, `branding` |
| Landing structure & copy | `app.json` → `landingPage.content`, `landingPage.sections` (inline) |
| Experiment & ads | `app.json` → `experiment`, `ads` (copy/targeting), `analytics` |
| Mockup UI | `mockup/src/App.jsx`, `mockup/` assets |
| Media | GitHub `media/*`; refs via `githubPath` in `app.json` |
| Deploy infrastructure | `app.json` → `source.*` |
| Local authoring aids | `copy/*.md` → convert before Drive sync |
| Internal planning | `docs/` (not pipeline input) |

## Folder layout (local / GitHub)

```txt
{appId}/
├── START_HERE.md       # Cursor onboarding — read first
├── README.md           # This file
├── app.json            # Canonical manifest — ONLY file synced to Drive
├── package.json        # Delegates to mockup/
├── copy/               # Optional local authoring aid (not on Drive)
├── docs/               # Internal planning (not validated)
├── media/              # Binaries; referenced via githubPath
└── mockup/             # React + Vite prototype (Vercel root)
```

**Production Drive:** `App Validation/{appId}/app.json` only.

## How n8n will consume this

### WF0 → WF1 → WF2 → WF-Ads → WF-Decision

| Workflow | Reads | Writes |
|----------|-------|--------|
| **WF0** | Complete package at `provisioning` | `tracking.webhookUrl`, `status` → `ready` |
| **WF1** | `source.*` | `deployment.mockup.*`, `mockup.previewUrl` |
| **WF2** | `landingPage`, media refs, mockup URL, prepared landing repo/project | `deployment.landing.*`, `deployment.githubRepoUrl` |
| **WF-Ads** | `ads` copy + targeting, creatives | `ads.meta.*`, `status` → `validating` |
| **WF-Decision** | Meta + Sheets | `validation.*`, terminal `status` |

WF1 does **not** create GitHub repos, create Vercel projects, or download package folders from Drive.
WF2 reads Drive `app.json` only, resolves declared `url`/`githubPath` assets, pushes generated landing source to the prepared landing repo, deploys the prepared Vercel project, and writes only landing deployment fields.

Lifecycle: `draft` → `provisioning` → `ready` → `validating` → `winner` / `killed` / `built`.

## How the landing transform consumes this

`landing-template/scripts/generate-app-config.js` **translates** package data only.

| Package source | Landing config |
|----------------|----------------|
| `app.json` sections | Identity, audience, commerce, branding, SEO, webhooks |
| `landingPage.content` | Benefits, features, FAQ, testimonials |
| `landingPage.sections[].inline` | Hero, CTA, pricing headlines, etc. |
| `media.screenshots` (`githubPath` / `url`) | Screenshot gallery |

Local `copy/*.md` is a local-dev fallback only. Never hardcode landing copy in the transform script.

## Screenshots

1. Declare `githubPath` in `app.json` → `media.screenshots`
2. Place PNGs in GitHub `media/screenshots/`
3. Capture from mockup at ~375px width: welcome → feature → result
4. Re-run the transform/WF2 asset step to fetch declared assets into generated `app-data/images/`

## Draft → ready checklist

1. Replace all TODO placeholders in `app.json` (inline content + `landingPage.content`)
2. Complete `experiment`, `ads` copy, and analytics IDs
3. Use `githubPath` (or `url`) for every media asset; optional `ads.media`
4. Verify mockup builds: `npm run build`
5. Provision GitHub full app repo + Vercel (`mockup` root); fill `source.*`
6. Upload **only** `app.json` to Drive `App Validation/{appId}/`
7. Set `status: provisioning` for WF0

Keep `status` as `draft` until content and deploy infrastructure are complete.
