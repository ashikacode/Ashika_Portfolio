---
name: AnimatePresence mode=wait blank page on client nav (React 19)
description: Why client-side route navigation went blank with no console error, and the safe transition pattern.
---

Framer Motion `AnimatePresence mode="wait"` + React 19 StrictMode drops exit-completion tracking after the first client-side navigation. The next routed page mounts but stays stuck at `opacity:0` — blank screen, **no console error**.

**Why it only happened on nav, not full loads:** `AnimatePresence initial={false}` makes the first/full-load render skip the enter animation and show content immediately. Subsequent client navigations rely on the exit→enter cycle, which is what breaks.

**How to apply:** For page/route transitions in React 19 apps, avoid `AnimatePresence mode="wait"`. Use a keyed `motion.main` (`key={location}`) with `initial`/`animate` only (enter-only). Each route remounts and fades in reliably; tradeoff is losing the exit fade-out, which is acceptable. If exit animations are needed later, use a React-19-StrictMode-safe pattern that does not gate the next page's mount on exit completion.

Debug signal: "full page load works, clicking nav links shows blank, zero console errors" → suspect the page-transition animation, not a crash.
