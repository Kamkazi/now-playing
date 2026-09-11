# Now Playing — retro music player UI

A mobile-first, single-screen music player. No tabs, no feeds. The app opens straight onto the player, paused exactly where you left off.

This plan builds the complete interface with realistic sample music data. Connecting a real Navidrome/Subsonic server is a follow-up step: the settings screen and the data layer are shaped for it, but no live server calls are made yet.

## Look and feel

- Warm analog palette: cream paper background, deep brown chassis, burnt orange accents, muted amber highlights.
- Condensed retro display type for titles and the app name, clean grotesque for meta text.
- Chunky, fully rounded buttons with real press states (subtle inset shadow + scale down on tap).
- Grain/paper texture overlay and soft warm shadows so it feels like an object, not a web page.

## Screens

**1. Now Playing (the home screen, `/`)**
- Top bar: search button (left), "Now Playing" centered, track info button (right). Small gear for settings tucked into the top bar.
- Large album art with a warm frame and soft shadow.
- Info strip: small round composer image, track title, and a rotating meta line that fades one item at a time in a loop — album (year), artists, composed by, genre.
- Scrubbable progress bar with elapsed and remaining time.
- Control cluster: heart (favourite) on top, rewind / play-pause / forward in the middle, airplay below, lyrics button bottom-left area, queue button right, repeat toggle bottom-left, shuffle toggle bottom-right — matching the mockup's dial layout.

**2. Search (full-screen sheet)**
- One search field, results in a single list grouped by labelled sections: Songs, Albums, Artists, Composers, Playlists, Genres.
- Tapping any result starts that collection in shuffle and returns to the player.
- Empty state ("No results") and an idle state before typing.

**3. Queue card (bottom sheet)**
- Titled "Up next in [collection name]".
- Reorder by drag handle, swipe or tap-to-delete, tap to jump to a track.

**4. Track information card (bottom sheet)**
- Full metadata list: title, album, year, artists, composer, genre, track number, duration, bitrate, format, file path — laid out as label/value rows.

**5. Settings (sheet)**
- Navidrome/Subsonic server URL, username, password, plus a "Test connection" button (shows a not-yet-connected notice for now).

Plus: a one-time music library permission prompt on first launch.

## Resume behaviour

Everything the player needs to resume is written to the device as it changes: current track, exact position in seconds, queue order, and repeat/shuffle state. On launch the player restores that snapshot and sits paused at the saved timestamp — press play and it continues. Playback keeps running while the app is backgrounded.

## Technical notes

- Routes: `/` renders the player; search, queue, info and settings are overlays/sheets over it, not separate pages, so the player is never left.
- Playback state lives in one React context with a reducer (track, position, queue, repeat, shuffle, isPlaying), backed by an `<audio>` element and a rAF/interval tick for position.
- Persistence: `localStorage` snapshot written on state change (throttled for position, ~1s). Restored on mount behind a hydration guard so SSR and client render match; audio `currentTime` is set on restore, always paused.
- Background playback: Media Session API for lock-screen metadata and transport controls; audio element keeps playing when the tab is hidden.
- Sample library: a local module of ~20 tracks with albums, artists, composers, genres and playlists so search, queue and metadata all behave realistically. Album/composer artwork generated as assets.
- Design tokens (all colors, shadows, radii, fonts) go in `src/styles.css` under `@theme inline`; no hardcoded colors in components. Retro fonts loaded via `<link>` in the root route.
- Queue reordering uses pointer-based drag on the list rows (no drag-and-drop library).
- Head metadata set on `/` with an app-specific title and description.
