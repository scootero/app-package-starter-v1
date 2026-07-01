# App Package Starter

Reusable scaffold for a new app validation idea. Copy this folder, rename it to your `appId`, and fill in TODO placeholders.

**Spec:** [app-validation-spec](../app-validation-spec/APP_PACKAGE_SPEC.md) v1.3.0  
**Reference package:** [test-app-packages/human-lab](../test-app-packages/human-lab/)  
**Landing transform:** [landing-template/scripts/APP_PACKAGE_TRANSFORM.md](../landing-template/scripts/APP_PACKAGE_TRANSFORM.md)

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

Lifecycle: `draft` → `provisioning` → `ready` → `validating`.

When `status` is `ready`, n8n (future) will:

1. Read `{appId}/app.json` and referenced files from Google Drive
2. Validate against [app.schema.json](../app-validation-spec/schemas/app.schema.json)
3. Build and deploy `mockup/` → write `deployment.mockup.url`, `deployment.mockup.vercelProjectId`, `deployment.mockup.lastDeployedAt`; sync `mockup.previewUrl`
4. Run the landing transform → deploy landing page → write `deployment.landing.url`, `deployment.landing.vercelProjectId`, `deployment.landing.deploymentUrl`, `deployment.landing.lastDeployedAt`
5. Create ads from `ads` section (destination: `deployment.landing.url`)
6. Track events via `tracking.webhookUrl` and evaluate `experiment.decisionRules`

During `provisioning`, n8n provisions `tracking.webhookUrl` and promotes the package to `ready`.

Leave nested `deployment.*` fields and `tracking.webhookUrl` as `null` until automation runs. Legacy `tracking.webhooks.emailCaptured` and `tracking.webhooks.buyNowClicked` are optional fallbacks only.

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

## Webhook placeholders

| Field | Role |
|-------|------|
| `tracking.webhookUrl` | **Canonical** unified landing-event webhook (required before `ready`) |
| `tracking.webhooks.validationComplete` | Package passes validation |
| `tracking.webhooks.deployComplete` | Mockup and landing page are live |
| `tracking.webhooks.emailCaptured` | Legacy fallback for `email_captured` |
| `tracking.webhooks.buyNowClicked` | Legacy fallback for `buy_now_clicked` |

Landing events use `eventType` (`page_view`, `buy_now_clicked`, `email_captured`, `mockup_interacted`) in the webhook payload.

## Draft → provisioning → ready checklist

Before setting `status` to `provisioning`:

1. Replace all TODO placeholders in `app.json` and `copy/`
2. Complete `experiment` (hypothesis, budget, success criteria, decision rules)
3. Complete `ads` and analytics IDs (`experimentRunId`, `landingVariantId`, `mockupVersionId`)
4. Add real screenshot PNGs matching `media.screenshots` paths
5. Verify mockup builds: `npm run build`
6. Verify landing transform: `node scripts/generate-app-config.js <path>` from `landing-template/`
7. Validate against schema (Phase 2 validator)

Before setting `status` to `ready`:

1. `tracking.webhookUrl` must be provisioned (n8n `provisioning` workflow)

Keep `status` as `draft` until the provisioning checklist is complete.
