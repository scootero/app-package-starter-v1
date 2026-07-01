# START HERE

Read this before creating a new App Package with Cursor.

## What this folder is

A **copy-and-customize starter** for the automated app validation system. After copying:

1. Rename the folder to `{appId}` (kebab-case)
2. Replace `your-app-id` everywhere in `app.json`
3. Fill TODO placeholders in `app.json`, `copy/`, `docs/`, and `mockup/`

## Questions Cursor must ask first

Before generating or editing files, collect answers for:

| Topic | Goes in |
|-------|---------|
| App name (display) | `identity.appName` |
| `appId` (kebab-case, folder name) | `appId`, `landingPage.slug`, analytics IDs |
| One-line tagline | `identity.tagline`, `copy/hero.md` |
| Target audience (primary + short landing phrase) | `audience.primary`, `audience.landingPhrase` |
| Problems / pain points | `audience.painPoints`, `copy/hero.md` |
| Core features (3–5) | `copy/features.md` |
| Short benefits (3 bullets) | `copy/benefits.md` |
| Pricing model, price, trial | `commerce.pricing` |
| CTA button labels | `commerce.cta` |
| Theme (light/dark, colors, landing style) | `branding.theme` |
| Mockup screens and user flow | `mockup/src/App.jsx` |
| Screenshot captions (3 screens) | `media.screenshots` in `app.json` |
| FAQ (4–6 questions) | `copy/faq.md` |
| Validation hypothesis | `experiment.hypothesis`, `docs/validation-plan.md` |
| Success criteria and budget | `experiment.*` |
| Ad headlines and angles | `ads.*`, `docs/validation-plan.md` |

## Rules for Cursor

### Single source of truth

- **App-specific content lives in:** `app.json`, `copy/`, `docs/`, `media/`, `mockup/`
- **Never** hardcode app-specific copy into `landing-template/scripts/generate-app-config.js` or other transforms
- The landing transform **translates** package data → `app-config.json` only

### Folder conventions

- Keep internal folder names generic: `copy/`, `media/`, `mockup/`, `docs/`
- Do not rename folders per app (e.g. no `human-lab-copy/`)
- Record mockup toolchain in `app.json` → `mockup.framework` (`react-vite` for this starter)

### Mockup

- **`mockup/src/App.jsx`** is the main mockup component — add screens and flows here
- Default stack: React + Vite (`mockup.framework`: `react-vite`)
- Support embed mode (`?embed=1` or iframe) — starter includes `detectEmbedded()` pattern
- No backend — client-only prototype
- Commands must work from **package root**: `npm install`, `npm run dev`, `npm run build`

### Copy file formats

| File | Format |
|------|--------|
| `copy/hero.md` | `## Headline`, `## Subheadline`, optional `## Body` |
| `copy/benefits.md` | `## Benefit N`, `**Title:**`, optional `**Icon:**` (`sparkles`, `check`, `star`, `zap`, `shield`, `heart`, `phone`) |
| `copy/features.md` | `## Feature N`, `**Title:**`, description |
| `copy/faq.md` | `## Question?` as H2, answer below |

### Automation placeholders

Leave these **null** until n8n or deploy automation fills them:

- `deployment.mockup.*` and `deployment.landing.*` (all nested fields)
- `mockup.previewUrl`
- `tracking.webhookUrl`
- `tracking.webhooks.*` (optional legacy fallbacks)

Keep `status: draft` until the package is complete and reviewed.

### Proven app.json fields (spec 1.3.0)

Include when customizing:

- `identity.badgeText`
- `audience.landingPhrase`
- `branding.theme.landingStyle` (`liquid-glass`, `midnight`, etc.)
- `branding.theme.accentName` (`violet`, `emerald`, etc.)
- `mockup.baseWidth`, `baseHeight`, `clipBottomPx`
- `landingPage.sections[cta].inline.placeholder`
- `commerce.pricing.headlineLabel`

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

See [README.md](README.md) checklist. Set `status: provisioning` when the package is complete. Set `status: ready` only after n8n provisions `tracking.webhookUrl`.

## Reference

- Spec: [app-validation-spec/APP_PACKAGE_SPEC.md](../app-validation-spec/APP_PACKAGE_SPEC.md)
- Working example: [test-app-packages/human-lab](../test-app-packages/human-lab/)
- Transform docs: [landing-template/scripts/APP_PACKAGE_TRANSFORM.md](../landing-template/scripts/APP_PACKAGE_TRANSFORM.md)
