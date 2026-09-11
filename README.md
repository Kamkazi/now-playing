# Now Playing

A retro-inspired, mobile-first music player interface for iPhone — built as a web prototype to guide a future Xcode / Swift implementation.

## The idea

Now Playing is a deliberately simple music player. There are no tabs, no recommendations, no home feed, and no social features. The app opens straight to the Now Playing screen, like picking up a retro cassette player and pressing play. It is the only screen the user ever needs to return to.

The signature behaviour is **automatic resume**: playback always restarts exactly where the user left off — same track, same timestamp, same queue, same repeat/shuffle state — even after closing the app or rebooting the phone. The player launches in a paused “mid-tape” state; the user just hits play to continue.

## What’s in this prototype

- **Now Playing screen** — album art, track title, rotating metadata (album/year, artist, composer, genre), progress scrubber, and playback controls.
- **Universal Search** — one search bar finds songs, albums, artists, composers, playlists, and genres. Tapping any result starts playing that collection in shuffle mode and returns to Now Playing.
- **Up Next queue** — view, reorder, and remove upcoming tracks.
- **Track Information** — full metadata display (title, album, year, artist, composer, genre, track number, duration, bitrate, format, file path).
- **Settings** — Navidrome / Subsonic server connection details (server name, URL, username, password) with a test-connection action.
- **Local state persistence** — current track, position, queue order, repeat/shuffle, and favourite status are saved to `localStorage` and restored on reload in a paused state.

## Design direction

- Single dark theme only — no light mode.
- Warm analog colour palette reinterpreted into deep charcoal and cream tones.
- Embossed, tactile buttons with pressed states.
- Vintage-inspired display typography.
- Fixed portrait layout; no landscape support.

## Data

The prototype uses static, locally-defined sample data representing real 1990s Hindi film music:

- **Aashiqui** (1990) — Nadeem–Shravan
- **Rangeela** (1995) — A. R. Rahman
- **Dilwale Dulhania Le Jayenge** (1995) — Jatin–Lalit

Album artwork is originally generated retro-styled art inspired by 90s cassette covers. Audio playback is represented in the UI only; no real streaming is implemented in this prototype.

## Tech stack

- [TanStack Start](https://tanstack.com/start)
- React 19 + TypeScript
- Tailwind CSS v4
- Lucide icons

## Future iOS handoff notes

When rebuilding this in Xcode / SwiftUI:

1. The layout is fixed in portrait orientation.
2. There is no light mode.
3. All dynamic text must stay within its designated space in one line; overflow should be trimmed gracefully with `...`.
4. Buttons should use embossed / inset styling and trigger haptic feedback via `UIImpactFeedbackGenerator` on press.
5. Playback state (track, position, queue, repeat, shuffle, favourite) must be persisted and restored across app launches.
6. The app will stream from a Navidrome / Subsonic server; no local music library permission is required.

## Development

```sh
npm i
npm run dev
```

Open the project in the [Lovable editor](https://lovable.dev) to keep building.
