# App Package Starter

Reusable scaffold for a new app validation idea. Copy this folder, rename it to your `appId`, and fill in TODO placeholders.

**Spec:** [app-validation-spec](../app-validation-spec/APP_PACKAGE_SPEC.md) v1.3.0  
**Reference package:** [test-app-packages/human-lab](../test-app-packages/human-lab/)  
**Landing transform:** [landing-template/scripts/APP_PACKAGE_TRANSFORM.md](../landing-template/scripts/APP_PACKAGE_TRANSFORM.md)  
**WF1 blueprint:** [n8n-workflows/WF1-DEPLOY-PIPELINE-BLUEPRINT.md](../n8n-workflows/WF1-DEPLOY-PIPELINE-BLUEPRINT.md)

## How to copy

1. Duplicate this folder to `test-app-packages/{appId}/` (or your Google Drive app folder).
2. Rename the folder to match `appId` (kebab-case, e.g. `focus-timer`).
3. Replace every `your-app-id` in `app.json`, analytics IDs, and ad campaign names.
4. Fill TODO fields in `app.json`, `copy/`, and `docs/`.
5. Customize `mockup/src/App.jsx` for your screens.
6. Run from package root:

```bash
npm install
npm run dev
npm run build
```

7. Preview landing page (from `landing-template/`):

```bash
node scripts/generate-app-config.js ../test-app-packages/{appId}
npm run dev
```

Read [START_HERE.md](START_HERE.md) before using Cursor to generate content.

## Values needed before WF1

Collect these **up front** before running WF1 mockup deploy:

| # | Value | Where to put it |
|---|-------|-----------------|
| 1 | `appId` (kebab-case, folder name) | Root `appId` field; folder name must match |
| 2 | App display name | `identity.appName` |
| 3 | GitHub repo for mockup (`org/repo`) | `source.mockupGithubRepo` |
| 4 | GitHub branch | `source.mockupBranch` (e.g. `main`) |
| 5 | Mockup root directory in repo | `source.mockupRootDirectory` (e.g. `mockup`) |
| 6 | Vercel mockup project ID or name | `source.vercelMockupProjectId` and/or `source.vercelMockupProjectName` |
| 7 | Drive package location | Upload folder to `App Validation/{appId}/` (parent folder ID in n8n Config Set) |
| 8 | Status before WF1 | `"status": "ready"` when package + infra are complete |
| 9 | Customize from starter | See [What to customize](#what-to-customize) below |
| 10 | Leave null until automation | `deployment.*`, `mockup.previewUrl`, `tracking.webhookUrl` |
| 11 | Secrets | **Never** in `app.json` — Vercel/Google tokens go in **n8n Credentials** only |

### One-time infrastructure checklist (before first WF1 run)

1. **GitHub:** Create repo; push `mockup/` code to `source.mockupBranch`.
2. **Vercel:** Create project → import GitHub repo → set Root Directory = `source.mockupRootDirectory` → deploy once manually.
3. **Drive:** Upload `{appId}/` to `App Validation/`; fill `source.*` in `app.json`; set `status: "ready"`.
4. **n8n:** Run WF1 manual trigger with `appId`.

## What to customize

| Area | Files / fields |
|------|----------------|
| Identity & audience | `app.json` → `identity`, `audience`, `commerce`, `branding` |
| Landing structure | `app.json` → `landingPage`, `copy/*.md` |
| Experiment & ads | `app.json` → `experiment`, `ads`, `analytics` |
| Mockup UI | `mockup/src/App.jsx`, `mockup/` assets |
| Media | `media/*`, paths in `app.json` → `media` |
| Deploy infrastructure | `app.json` → `source.*` (human sets before WF1) |
| Internal planning | `docs/` (not validated by pipeline) |

## What automation writes later (leave null)

| Field | Written by |
|-------|------------|
| `deployment.mockup.vercelProjectId` | WF1 |
| `deployment.mockup.url` | WF1 |
| `deployment.mockup.lastDeployedAt` | WF1 |
| `mockup.previewUrl` | WF1 (must equal `deployment.mockup.url`) |
| `deployment.landing.*` | WF2 (future) |
| `tracking.webhookUrl` | WF3 (future) |

Do not put API tokens, PATs, or service account JSON in `app.json`.

## Folder layout

```txt
{appId}/
├── START_HERE.md       # Cursor onboarding — read first
├── README.md           # This file
├── app.json            # Canonical manifest
├── package.json        # Delegates to mockup/
├── copy/               # Landing copy (consumed by transform)
├── docs/               # Internal planning (not validated)
├── media/              # Icons, screenshots, OG image
└── mockup/             # React + Vite interactive prototype
```

Internal folder names stay **generic** (`copy/`, `media/`, `mockup/`) for every app. Record framework in `app.json` → `mockup.framework` only.

## How n8n will consume this

### WF1 v1 (mockup deploy only)

When `status` is `ready` and `source.*` is populated, **WF1** will:

1. Read `{appId}/app.json` from Google Drive (manual trigger with `appId`)
2. Validate `source.*` mockup deploy metadata
3. Trigger Vercel deployment API against the pre-provisioned project (GitHub → Vercel build)
4. Merge-write `deployment.mockup.*` and `mockup.previewUrl` back to Drive `app.json`
5. Leave `status` as `ready`

WF1 does **not** create GitHub repos, create Vercel projects, download `mockup/` from Drive, deploy landing, provision webhooks, or write Google Sheets.

### Future workflows

| Workflow | Scope |
|----------|-------|
| **WF2** | Landing transform + deploy → `deployment.landing.*` |
| **WF3** | Webhooks + Google Sheets analytics |
| **WF-Ads** | Meta ads from `ads.*` |

Lifecycle for full pipeline: `draft` → `provisioning` → `ready` → `validating` → `winner` / `killed` / `built`.

For **WF1 v1**, you may set `status: ready` directly when the package and mockup infrastructure are ready — `tracking.webhookUrl` is not a WF1 gate.

## How the landing transform consumes this

`landing-template/scripts/generate-app-config.js` **translates** package data only — it does not own app-specific content.

| Package source | Landing config |
|----------------|----------------|
| `app.json` | Identity, audience, commerce, branding, sections, SEO, webhooks |
| `copy/hero.md` | Hero headline, subheadline, body |
| `copy/benefits.md` | Benefit bullets |
| `copy/features.md` | Features list |
| `copy/faq.md` | FAQ items |
| `media/screenshots/*.png` | Screenshot gallery |

Never hardcode landing copy in the transform script.

## Screenshots

1. Declare paths in `app.json` → `media.screenshots`
2. Place PNGs in `media/screenshots/` (see [media/screenshots/README.md](media/screenshots/README.md))
3. Capture from mockup at ~375px width: welcome → feature → result
4. Re-run the transform to copy images into `landing-template/app-data/images/`

## Webhook placeholders (WF3 — not required for WF1)

| Field | Role |
|-------|------|
| `tracking.webhookUrl` | **Canonical** unified landing-event webhook (WF3 provisions) |
| `tracking.webhooks.validationComplete` | Package passes validation |
| `tracking.webhooks.deployComplete` | Mockup and landing page are live |
| `tracking.webhooks.emailCaptured` | Legacy fallback for `email_captured` |
| `tracking.webhooks.buyNowClicked` | Legacy fallback for `buy_now_clicked` |

Landing events use `eventType` (`page_view`, `buy_now_clicked`, `email_captured`, `mockup_interacted`) in the webhook payload.

## Draft → ready checklist

Before setting `status` to `ready` for WF1:

1. Replace all TODO placeholders in `app.json` and `copy/`
2. Complete `experiment` (hypothesis, budget, success criteria, decision rules)
3. Complete `ads` and analytics IDs (`experimentRunId`, `landingVariantId`, `mockupVersionId`)
4. Add real screenshot PNGs matching `media.screenshots` paths
5. Verify mockup builds: `npm run build`
6. Provision GitHub repo + Vercel project; fill `source.*`
7. Upload package to Drive `App Validation/{appId}/`

Keep `status` as `draft` until the package content and deploy infrastructure are complete.
