# START HERE

Read this before creating a new App Package with Cursor.

## What this folder is

A **copy-and-customize starter** for Spec **1.5.0**. After copying:

1. Rename the folder to `{appId}` (kebab-case)
2. Replace `your-app-id` everywhere in `app.json`
3. Fill TODO placeholders in `app.json`, optional local `copy/`, `docs/`, and `mockup/`
4. Convert local `copy/*.md` into `landingPage.content` + `sections[].inline` before Drive sync
5. Fill `source.*` when the full GitHub app repo and Vercel project are provisioned

## Author Provision Checklist

### What Cursor must ask first

Before generating or editing files, collect answers for:

| Topic | Goes in |
|-------|---------|
| App name (display) | `identity.appName` |
| `appId` (kebab-case, Drive folder name) | `appId`, `landingPage.slug`, analytics IDs |
| One-line tagline | `identity.tagline`, `sections[hero].inline` |
| Public privacy / contact email | `identity.contactEmail` — **required before Meta ads**; used for footer Contact + `/privacy` / `/data-deletion` |
| Privacy policy effective date (`YYYY-MM-DD`) | `identity.privacyEffectiveDate` — set when publishing Meta-required policy pages; do not invent at deploy time |
| Target audience (primary + short landing phrase) | `audience.primary`, `audience.landingPhrase` |
| Problems / pain points | `audience.painPoints`, hero body |
| Core features (3–5) | `landingPage.content.features` |
| Short benefits (3 bullets) | `landingPage.content.benefits` |
| Pricing model, price, trial | `commerce.pricing` |
| CTA button labels | `commerce.cta` |
| Theme (light/dark, colors, landing style) | `branding.theme` |
| Mockup screens and user flow | `mockup/src/App.jsx` |
| Screenshot captions (3 screens) | `media.screenshots` (`githubPath` + alt/title/description) |
| FAQ (4–6 questions) | `landingPage.content.faq` |
| Validation hypothesis | `experiment.hypothesis`, `docs/validation-plan.md` |
| Success criteria and budget | `experiment.*` |
| Ad headlines and angles | `ads.*` (copy + targeting only) |
| Full app GitHub repo (`org/repo`) | `source.mockupGithubRepo` |
| GitHub branch | `source.mockupBranch` |
| Optional separate assets repo/branch/root | `source.assetsGithubRepo`, `source.assetsBranch`, `source.assetsRootDirectory` |
| Mockup root directory | `source.mockupRootDirectory` → **`mockup`** |
| Vercel mockup project ID or name | `source.vercelMockupProjectId`, `source.vercelMockupProjectName` |
| Landing GitHub repo/project naming | WF2 setup values (normally `{org}/{appId}-landing` and `{appId}-landing`) |
| Vercel landing project ID/name after setup | WF2 setup values; written to `deployment.landing.*` after deploy |

### What the human must provision

1. **Full GitHub app repo** containing:
   - `mockup/` as the Vercel Root Directory (`source.mockupRootDirectory: "mockup"`)
   - `media/` binaries referenced via `githubPath` in `app.json`
   - Root/package/Vite files as needed
   - **Never** commit `node_modules/` or `dist/`
2. **Vercel project** linked to that repo with Root Directory = `mockup`
3. **WF2 landing GitHub repo** (empty or seeded from landing-template) and **Vercel landing project** with Root Directory unset/default repository root. Create these only after approval for external setup.
4. **Google Drive:** upload **`app.json` ONLY** to `App Validation/{appId}/`  
   Do **not** upload `copy/`, `media/`, `mockup/`, `docs/`, README, or lockfiles to Drive

### What stays null for automation

| Field | Owner |
|-------|-------|
| `tracking.webhookUrl` | **WF0** |
| `deployment.mockup.*`, `mockup.previewUrl` | **WF1** |
| `deployment.landing.*`, `deployment.githubRepoUrl` | **WF2** |
| `ads.meta.*` | **WF-Ads** |
| `validation.*` (metrics, recommendation, `latestReportUrl`) | **WF-Decision** |

Secrets never go in `app.json` — API tokens live in n8n Credentials only.

### Local `copy/*.md` are authoring aids

Optional local markdown scaffolds help drafting. **Before Drive sync**, convert them into:

- `landingPage.sections[].inline` (hero, features, faq, cta, …)
- `landingPage.content` (`benefits`, `features`, `faq`, optional `testimonials`)

Production Drive packages must use `source: "inline"` (or `media` for screenshots) — not `source: "file"`.

## Rules for Cursor

### Single source of truth (production)

- **Drive control plane:** `app.json` only (`landingPage.content` + `sections[].inline` + `githubPath` media refs)
- **GitHub:** mockup source, media binaries, package/Vite files, and generated per-app landing repos
- **Never** hardcode app-specific copy into `landing-template/scripts/generate-app-config.js`
- The landing transform **translates** package data → `app-config.json` only

### Folder conventions (local / GitHub)

- Keep internal folder names generic: `copy/`, `media/`, `mockup/`, `docs/`
- Do not rename folders per app
- Record mockup toolchain in `app.json` → `mockup.framework` (`react-vite` for this starter)

### Mockup

- **`mockup/src/App.jsx`** is the main mockup component
- Default stack: React + Vite (`mockup.framework`: `react-vite`)
- Support embed mode (`?embed=1` or iframe)
- No backend — client-only prototype
- Commands from **package root**: `npm install`, `npm run dev`, `npm run build`
- Push mockup code to `source.mockupGithubRepo` before WF1
- Push every declared `media.*.githubPath` asset to `source.assetsGithubRepo ?? source.mockupGithubRepo` before WF2

### Copy file formats (local authoring only)

| File | Maps to | Format |
|------|---------|--------|
| `copy/hero.md` | `sections[hero].inline` | `## Headline`, `## Subheadline`, optional `## Body` |
| `copy/benefits.md` | `content.benefits` | `## Benefit N`, `**Title:**`, optional `**Icon:**` |
| `copy/features.md` | `content.features` | `## Feature N`, `**Title:**`, description |
| `copy/faq.md` | `content.faq` | `## Question?` as H2, answer below |

### Proven app.json fields (spec 1.5.0)

- `identity.badgeText`, `audience.landingPhrase`
- `identity.contactEmail`, `identity.privacyEffectiveDate` (Meta / WF4 launch readiness when advertising)
- `branding.theme.landingStyle`, `branding.theme.accentName`
- `mockup.baseWidth`, `baseHeight`, `clipBottomPx`
- `landingPage.content` + inline sections
- `media.*.githubPath` (not `path` on Drive)
- `validation.latestReportUrl` (nullable until WF-Decision)
- `source.*` with `mockupRootDirectory: "mockup"`

Landing template always ships `/privacy` and `/data-deletion` after WF2. Footer links (Privacy Policy, Data Deletion, Contact) come from the landing shell — keep `sections[footer].inline.body` as copyright text only. FAQ answers may use the safe link form `[Privacy Policy](/privacy)` only (no HTML).

Keep `status: draft` until the package is complete and reviewed.

## Workflow after customization

```bash
# From package root
npm install
npm run dev          # mockup at localhost:5173
npm run build        # output to mockup/dist/

# From landing-template/
node scripts/generate-app-config.js ../test-app-packages/{appId}
npm run dev          # preview landing page
```

## Draft → provisioning → ready

1. Complete package content, inline landing copy, and `source.*`
2. Provision GitHub full app repo + Vercel mockup project (Root Directory = `mockup`)
3. Upload **only** `app.json` to Drive `App Validation/{appId}/`
4. Set `status: provisioning` → **WF0** writes `tracking.webhookUrl` and sets `ready`
5. Run WF1 and verify public mockup alias
6. Provision the WF2 landing repo + Vercel landing project after approval; Vercel Root Directory must be empty/default repository root
7. Then WF2 → WF-Ads → WF-Decision

## Reference

- Spec: [app-validation-spec/APP_PACKAGE_SPEC.md](../app-validation-spec/APP_PACKAGE_SPEC.md)
- WF0–WF-Decision blueprints: [n8n-workflows/](../n8n-workflows/)
- Working example: [test-app-packages/human-lab](../test-app-packages/human-lab/)
- Transform docs: [landing-template/scripts/APP_PACKAGE_TRANSFORM.md](../landing-template/scripts/APP_PACKAGE_TRANSFORM.md)
