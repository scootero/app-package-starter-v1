# Media assets

Image and video files referenced by `app.json` → `media`.

## Expected files

| File | Purpose | Recommended size |
|------|---------|------------------|
| `icon.png` | App icon | 1024×1024 px |
| `logo.png` | Wordmark / logo | PNG or SVG, transparent background |
| `og-image.png` | Open Graph / social share | 1200×630 px |
| `screenshots/01-home.png` | Welcome screen | ~375px width |
| `screenshots/02-feature.png` | Key feature screen | ~375px width |
| `screenshots/03-results.png` | Results or outcome screen | ~375px width |
| `demo.mp4` | Optional product demo | ≤ 60 seconds |

## Screenshot captions

Set `title` and `description` on each entry in `app.json` → `media.screenshots`. The landing page screenshots section (`source: "media"`) uses those captions.

See [screenshots/README.md](screenshots/README.md) for capture steps.

## Draft phase

Binaries are not required while `status` is `draft`. Paths in `app.json` document the layout. The landing template shows placeholder cards until PNGs exist.

## Naming

- Lowercase kebab-case filenames
- Two-digit order prefix: `01-`, `02-`, `03-`
- Paths must match `app.json` exactly
