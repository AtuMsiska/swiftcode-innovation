# Project / client logos

Logos shown on the case-study cards (corner badge) and on each case-study page
(hero lock-up). Rendered by `ProjectLogo` in `src/components/logo-img.tsx`.

| File | Project | Treatment |
| --- | --- | --- |
| `aiducate.png` | AIDucate | **tile** (`logoTile: true` — square logo with its own navy background) |
| `tectarch.png` | TectArch (Pty) Ltd | white plate (wide wordmark) |
| `mute-it.png` | Mute IT (Pty) Ltd | white plate (wide wordmark) |

- Each project's `logo:` path (and optional `logoTile`) is set in `src/lib/site.ts`.
- Wide wordmarks on transparent backgrounds → white plate (default).
- Square logos that carry their own background → set `logoTile: true` so they render
  as a rounded tile instead of being shrunk onto a white plate.
- A missing file degrades gracefully (nothing renders — no broken-image icon).
- ~600px on the long edge is plenty; they're displayed small.
