# Trait Ranker

Drag-and-drop pairwise ranking on desktop and mobile. Heap-sort surfaces a top-7, then merge-sort produces the final order — minimising the comparisons users have to make.

**[Try it](https://trait-ranker.nmaass.dev/)**

![Desktop drag interaction](https://github.com/NMaass/trait-ranker/blob/master/src/Assets/DesktopDrag.gif)
![Mobile drag interaction](https://github.com/NMaass/trait-ranker/blob/master/src/Assets/MobileDrag.gif)

## What it does

You're given a list of traits and asked to rank them. Naively that means n² comparisons. Trait Ranker uses two algorithms back-to-back:

1. **Heap-sort surfaces the top 7** with the fewest pairwise comparisons needed to identify the top-k of an unordered set.
2. **Merge-sort produces the final ordering** of those 7, so the user only ever compares pairs they haven't already ruled on.

The result is a comfortably short interaction (typically 25–35 comparisons for a list of 30 traits) that produces a properly ordered top-7 instead of the usual "drag everything around" ranking UI.

## Social loop

After you finish your ranking, you can share a link with friends. They guess your top traits before the reveal — turning a personality exercise into a small game with feedback for both sides.

## Tech

TypeScript · React · Firebase (anonymous auth + Firestore) · Vite

Anonymous Firebase sessions, exportable results, no account required.

## Performance

Lighthouse 99/100 across all four categories on production. LCP under 1 s on desktop, CLS effectively zero.

## Running locally

```sh
npm install
cp .env.example .env  # fill in your Firebase credentials
npm run dev
```
