# Project / client logos

Drop the official logo files here with these **exact filenames** and the site
will pick them up automatically (case-study cards + case-study hero). Until a
file is present, the logo simply doesn't render — no broken images.

| Save as                    | Logo you provided              |
| -------------------------- | ------------------------------ |
| `public/logos/aiducate.png` | Aiducate Logo.png             |
| `public/logos/tectarch.png` | TECTARCH 2022 Orange.png       |
| `public/logos/mute-it.png`  | MUTE IT Logo.png              |

Tips:
- **PNG with transparent background** works best (they're shown on a white plate).
- Aim for ~600px on the long edge; they're displayed small so file size stays low.
- Prefer `.png`. If you only have `.svg`, save it here and update the `logo:`
  path for that project in `src/lib/site.ts`.

The paths are wired in `src/lib/site.ts` (each project's `logo:` field).
