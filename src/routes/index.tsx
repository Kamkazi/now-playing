import { createFileRoute } from "@tanstack/react-router";
import {
  Airplay,
  Check,
  ChevronLeft,
  GripVertical,
  Heart,
  Info,
  ListMusic,
  MessageSquareQuote,
  Music2,
  Pause,
  Play,
  Repeat2,
  Search,
  Settings,
  Shuffle,
  SkipBack,
  SkipForward,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { composerPortrait, searchCollections, tracks, type Track } from "@/lib/music-data";
import { cn } from "@/lib/utils";

type Panel = "search" | "queue" | "info" | "settings" | "lyrics" | "airplay" | null;
type SavedPlayer = { trackId: number; position: number; queueIds: number[]; repeat: boolean; shuffle: boolean; favourite: boolean };

const initialQueue = tracks.map((track) => track.id);
const details = (track: Track) => [
  `${track.album} (${track.year})`,
  track.artist,
  `Composed by ${track.composer}`,
  track.genre,
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Now Playing — Retro Music Player" },
      { name: "description", content: "A tactile, mobile-first retro music player interface." },
      { property: "og:title", content: "Now Playing — Retro Music Player" },
      { property: "og:description", content: "A tactile, mobile-first retro music player interface." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NowPlaying,
});

function formatTime(total: number) {
  const safe = Math.max(0, Math.round(total));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function NowPlaying() {
  const [trackId, setTrackId] = useState(1);
  const [position, setPosition] = useState(94);
  const [queueIds, setQueueIds] = useState(initialQueue);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [metaIndex, setMetaIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState("");

  const track = tracks.find((item) => item.id === trackId) ?? tracks[0];
  const queue = queueIds.map((id) => tracks.find((item) => item.id === id)).filter((item): item is Track => Boolean(item));
  const nextTrack = useMemo(() => {
    const idx = queueIds.indexOf(trackId);
    const nextIdx = (idx + 1) % (queue.length || 1);
    return queue[nextIdx];
  }, [queue, queueIds, trackId]);


  useEffect(() => {
    const raw = localStorage.getItem("now-playing-state");
    if (raw) {
      try {
        const saved = JSON.parse(raw) as SavedPlayer;
        setTrackId(saved.trackId);
        setPosition(saved.position);
        setQueueIds(saved.queueIds);
        setRepeat(saved.repeat);
        setShuffle(saved.shuffle);
        setFavourite(saved.favourite);
      } catch {
        localStorage.removeItem("now-playing-state");
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const snapshot: SavedPlayer = { trackId, position, queueIds, repeat, shuffle, favourite };
    localStorage.setItem("now-playing-state", JSON.stringify(snapshot));
  }, [favourite, hydrated, position, queueIds, repeat, shuffle, trackId]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setPosition((current) => (current >= track.duration ? 0 : current + 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, track.duration]);

  useEffect(() => {
    const timer = window.setInterval(() => setMetaIndex((value) => (value + 1) % 4), 2800);
    return () => window.clearInterval(timer);
  }, []);

  const moveTrack = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= queueIds.length) return;
    setQueueIds((items) => {
      const next = [...items];
      const moving = next[index];
      if (moving === undefined) return items;
      next.splice(index, 1);
      next.splice(target, 0, moving);
      return next;
    });
  };

  const playTrack = (id: number, shuffled = false) => {
    const selected = tracks.find((item) => item.id === id);
    if (!selected) return;
    const collection = tracks.filter((item) => item.album === selected.album).map((item) => item.id);
    setTrackId(id);
    setPosition(0);
    setQueueIds(shuffled ? [id, ...collection.filter((item) => item !== id).reverse()] : collection);
    setShuffle(shuffled);
    setIsPlaying(true);
    setPanel(null);
  };

  const skip = (direction: -1 | 1) => {
    const currentIndex = queueIds.indexOf(trackId);
    const nextIndex = (currentIndex + direction + queueIds.length) % queueIds.length;
    setTrackId(queueIds[nextIndex] ?? trackId);
    setPosition(0);
  };

  return (
    <main className="min-h-dvh bg-background text-foreground sm:grid sm:place-items-center sm:px-6 sm:py-10">
      <section className="player-shell relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-card sm:min-h-[850px] sm:rounded-[42px] sm:border-[10px] sm:border-shell sm:shadow-player">
        <header className="grid grid-cols-[3rem_minmax(0,1fr)_3rem] items-center gap-3 px-5 pb-2 pt-[max(1.15rem,env(safe-area-inset-top))]">
          <Button aria-label="Search library" variant="player" size="control" onClick={() => setPanel("search")}><Search /></Button>
          <div className="min-w-0 text-center">
            <button onClick={() => setPanel("settings")} aria-label="Settings" className="mx-auto flex items-center gap-1.5 rounded-full px-2 py-0.5 font-display text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground">
              <Settings className="h-3 w-3" />
              SmartHub
            </button>
            <h1 className="truncate font-display text-2xl font-bold uppercase">Now Playing</h1>
          </div>
          <Button aria-label="Track information" variant="player" size="control" onClick={() => setPanel("info")}><Info /></Button>
        </header>

        <div className="relative px-5 pt-3">
          <div className="album-frame mx-auto aspect-square w-[min(76vw,315px)] overflow-hidden rounded-[10px]">
            <img key={track.art} src={track.art} alt={`Album art for ${track.album}`} width={1024} height={1024} className="h-full w-full object-cover animate-fade-in" />
          </div>
        </div>

        <section className="px-5 pt-4">
          <div className="flex items-center gap-3 border-y border-border py-3">
            <img src={composerPortrait} alt={`Composer ${track.composer}`} loading="lazy" width={768} height={768} className="h-11 w-11 shrink-0 rounded-full border-2 border-primary object-cover" />
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-display text-xl font-bold leading-none">{track.title}</h2>
              <p key={`${track.id}-${metaIndex}`} className="mt-1 truncate text-sm text-muted-foreground animate-fade-in">{details(track)[metaIndex]}</p>
            </div>
            <span className="shrink-0 rounded-full border border-border px-2 py-1 font-mono text-[10px] uppercase">Hi-Res</span>
          </div>
          <Slider aria-label="Track progress" value={[position]} max={track.duration} step={1} onValueChange={(value) => setPosition(value[0] ?? 0)} className="mt-4" />
          <div className="mt-1.5 flex justify-between font-mono text-xs text-muted-foreground"><span>{formatTime(position)}</span><span>−{formatTime(track.duration - position)}</span></div>
        </section>

        <section className="relative px-5 pb-[max(3rem,env(safe-area-inset-bottom))] pt-3">
          <div className="grid grid-cols-[3rem_1fr_3rem] items-center justify-items-center gap-3">
            <div className="grid gap-3">
              <Button aria-label="Show lyrics" variant="player" size="control" onClick={() => setPanel("lyrics")}><MessageSquareQuote className="h-5 w-5" /></Button>
              <Button aria-label={repeat ? "Repeat on" : "Repeat off"} variant={repeat ? "active" : "player"} size="control" onClick={() => setRepeat(!repeat)}><Repeat2 /></Button>
            </div>
            <div className="control-dial mx-auto grid h-[192px] w-[192px] grid-cols-3 grid-rows-3 place-items-center rounded-full border border-border">
              <Button aria-label={favourite ? "Remove favourite" : "Favourite"} variant="ghost" size="icon" className="col-start-2" onClick={() => setFavourite(!favourite)}><Heart className={cn("h-6 w-6", favourite && "fill-current text-primary")} /></Button>
              <Button aria-label="Previous track" variant="ghost" size="icon" className="col-start-1 row-start-2" onClick={() => skip(-1)}><SkipBack className="h-7 w-7 fill-current" /></Button>
              <Button aria-label={isPlaying ? "Pause" : "Play"} variant="primaryDial" size="dial" className="col-start-2 row-start-2" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <Pause className="h-9 w-9 fill-current" /> : <Play className="ml-1 h-9 w-9 fill-current" />}</Button>
              <Button aria-label="Next track" variant="ghost" size="icon" className="col-start-3 row-start-2" onClick={() => skip(1)}><SkipForward className="h-7 w-7 fill-current" /></Button>
              <Button aria-label="AirPlay options" variant="ghost" size="icon" className="col-start-2 row-start-3" onClick={() => setPanel("airplay")}><Airplay className="h-6 w-6" /></Button>
            </div>
            <div className="grid gap-3">
              <Button aria-label="Show queue" variant="player" size="control" onClick={() => setPanel("queue")}><ListMusic /></Button>
              <Button aria-label={shuffle ? "Shuffle on" : "Shuffle off"} variant={shuffle ? "active" : "player"} size="control" onClick={() => setShuffle(!shuffle)}><Shuffle /></Button>
            </div>
          </div>
          <button onClick={() => setPanel("queue")} className="mx-auto mt-4 block max-w-full truncate rounded-full border border-border px-3 py-1.5 text-center text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
            {nextTrack ? <><span className="font-semibold text-foreground">Up next:</span> {nextTrack.title}</> : <span className="font-semibold text-foreground">Queue empty</span>}
          </button>
        </section>

      </section>

      <PlayerPanel panel={panel} onClose={() => setPanel(null)} track={track} queue={queue} setQueueIds={setQueueIds} moveTrack={moveTrack} playTrack={playTrack} notice={notice} setNotice={setNotice} />
    </main>
  );
}

function PlayerPanel({ panel, onClose, track, queue, setQueueIds, moveTrack, playTrack, notice, setNotice }: {
  panel: Panel; onClose: () => void; track: Track; queue: Track[]; setQueueIds: React.Dispatch<React.SetStateAction<number[]>>; moveTrack: (index: number, direction: -1 | 1) => void; playTrack: (id: number, shuffled?: boolean) => void; notice: string; setNotice: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    const songResults = tracks.filter((item) => [item.title, item.album, item.artist, item.composer, item.genre].some((value) => value.toLowerCase().includes(needle))).map((item) => ({ type: "Songs", name: item.title, detail: `${item.artist} · ${item.album}`, art: item.art, trackId: item.id }));
    return [...songResults, ...searchCollections.filter((item) => `${item.name} ${item.detail}`.toLowerCase().includes(needle))];
  }, [query]);
  if (!panel) return null;
  const full = panel === "search";
  const title = { search: "Search", queue: "Up Next", info: "Track Information", settings: "Settings", lyrics: "Lyrics", airplay: "AirPlay" }[panel];

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-overlay/70 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-label={title} className={cn("panel-enter relative mt-auto w-full max-w-[430px] overflow-hidden bg-background shadow-panel", full ? "h-dvh sm:h-[850px] sm:rounded-[36px]" : "max-h-[88dvh] rounded-t-[28px] border-t border-border")}>
        {!full && <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-border" />}
        <header className="grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center px-5 py-4">
          <Button aria-label="Close" variant="ghost" size="icon" onClick={onClose}>{full ? <ChevronLeft /> : <X />}</Button>
          <h2 className="truncate text-center font-display text-xl font-bold uppercase">{title}</h2>
          <span />
        </header>
        {panel === "search" && <SearchPanel query={query} setQuery={setQuery} results={results} playTrack={playTrack} />}
        {panel === "queue" && <QueuePanel queue={queue} collectionName={track.album} setQueueIds={setQueueIds} moveTrack={moveTrack} playTrack={playTrack} />}
        {panel === "info" && <InfoPanel track={track} />}
        {panel === "settings" && <SettingsPanel notice={notice} setNotice={setNotice} passwordVisible={passwordVisible} setPasswordVisible={setPasswordVisible} />}
        {panel === "lyrics" && <LyricsPanel track={track} />}
        {panel === "airplay" && <AirplayPanel />}
      </section>
    </div>
  );
}

type Result = { type: string; name: string; detail: string; art: string; trackId: number };
function SearchPanel({ query, setQuery, results, playTrack }: { query: string; setQuery: (value: string) => void; results: Result[]; playTrack: (id: number, shuffled?: boolean) => void }) {
  const grouped = results.reduce<Record<string, Result[]>>((all, result) => ({ ...all, [result.type]: [...(all[result.type] ?? []), result] }), {});
  return <div className="h-[calc(100%-76px)] overflow-y-auto px-5 pb-8"><div className="relative"><Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" /><Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Songs, albums, artists…" className="h-12 rounded-full bg-muted pl-11 pr-11" />{query && <Button aria-label="Clear search" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setQuery("")}><X /></Button>}</div>{!query ? <Empty icon={<Music2 />} title="Your whole library" text="Search every song, album, artist, composer, playlist and genre." /> : results.length === 0 ? <Empty icon={<Search />} title="No results" text={`Nothing in your library matches “${query}”.`} /> : Object.entries(grouped).map(([group, items]) => <section key={group} className="mt-6"><h3 className="mb-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-primary">{group}</h3><div className="divide-y divide-border border-y border-border">{items.map((item) => <button key={`${item.type}-${item.name}`} onClick={() => playTrack(item.trackId, true)} className="grid w-full grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3 py-3 text-left"><img src={item.art} alt="" loading="lazy" width={80} height={80} className="h-12 w-12 rounded object-cover" /><span className="min-w-0"><strong className="block truncate text-sm">{item.name}</strong><small className="block truncate text-muted-foreground">{item.detail}</small></span><Shuffle className="h-4 w-4 text-primary" /></button>)}</div></section>)}</div>;
}

function QueuePanel({ queue, collectionName, setQueueIds, moveTrack, playTrack }: { queue: Track[]; collectionName: string; setQueueIds: React.Dispatch<React.SetStateAction<number[]>>; moveTrack: (index: number, direction: -1 | 1) => void; playTrack: (id: number) => void }) {
  return <div className="overflow-y-auto px-5 pb-8"><p className="mb-4 text-sm text-muted-foreground">Up next in <strong className="text-foreground">{collectionName}</strong></p><div className="divide-y divide-border border-y border-border">{queue.map((item, index) => <div key={item.id} className="grid grid-cols-[2rem_2.75rem_minmax(0,1fr)_auto] items-center gap-2 py-3"><button aria-label={`Move ${item.title}`} className="cursor-ns-resize text-muted-foreground" onClick={() => moveTrack(index, index === 0 ? 1 : -1)}><GripVertical className="h-5 w-5" /></button><img src={item.art} alt="" loading="lazy" width={80} height={80} className="h-11 w-11 rounded object-cover" /><button className="min-w-0 text-left" onClick={() => playTrack(item.id)}><strong className="block truncate text-sm">{item.title}</strong><small className="block truncate text-muted-foreground">{item.artist}</small></button><Button aria-label={`Remove ${item.title}`} variant="ghost" size="icon" onClick={() => setQueueIds((ids) => ids.filter((id) => id !== item.id))}><Trash2 /></Button></div>)}</div>{queue.length === 0 && <Empty icon={<ListMusic />} title="Queue is empty" text="Choose something from search to start a new queue." />}</div>;
}

function InfoPanel({ track }: { track: Track }) {
  const rows = [["Title", track.title], ["Album", track.album], ["Year", String(track.year)], ["Artist", track.artist], ["Composer", track.composer], ["Genre", track.genre], ["Track", `${track.track} of 3`], ["Duration", formatTime(track.duration)], ["Bitrate", "24-bit / 96 kHz"], ["Format", "FLAC"], ["Path", `/Music/${track.artist}/${track.album}/${String(track.track).padStart(2, "0")}.flac`]];
  return <div className="overflow-y-auto px-5 pb-8"><div className="mb-6 flex gap-4"><img src={track.art} alt={`Album art for ${track.album}`} loading="lazy" width={1024} height={1024} className="h-24 w-24 rounded-md object-cover" /><div className="min-w-0 self-center"><h3 className="font-display text-2xl font-bold leading-tight">{track.title}</h3><p className="mt-1 text-sm text-muted-foreground">{track.artist}</p></div></div><dl className="divide-y divide-border border-y border-border">{rows.map(([label, value]) => <div key={label} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 py-3 text-sm"><dt className="font-display uppercase text-muted-foreground">{label}</dt><dd className="break-words text-right font-medium">{value}</dd></div>)}</dl></div>;
}

function SettingsPanel({ notice, setNotice, passwordVisible, setPasswordVisible }: { notice: string; setNotice: (value: string) => void; passwordVisible: boolean; setPasswordVisible: (value: boolean) => void }) {
  return <div className="overflow-y-auto px-5 pb-8"><p className="mb-6 text-sm text-muted-foreground">Navidrome / Subsonic connection</p><div className="space-y-5"><label className="block text-sm font-semibold">Server Name<Input defaultValue="SmartHub" className="mt-2 h-12 bg-muted" /></label><label className="block text-sm font-semibold">Server URL<Input defaultValue="https://music.example.com" className="mt-2 h-12 bg-muted" /></label><label className="block text-sm font-semibold">Username<Input defaultValue="listener" className="mt-2 h-12 bg-muted" /></label><label className="block text-sm font-semibold">Password<div className="relative mt-2"><Input type={passwordVisible ? "text" : "password"} defaultValue="demopassword" className="h-12 bg-muted pr-20" /><button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-primary" onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? "Hide" : "Show"}</button></div></label><Button className="h-12 w-full rounded-full" onClick={() => setNotice("Static prototype — no server connection was attempted.")}>{notice ? <Check /> : null} Test connection</Button>{notice && <p role="status" className="rounded-md border border-border bg-muted p-3 text-sm">{notice}</p>}</div></div>;
}

function LyricsPanel({ track }: { track: Track }) {
  return <div className="px-7 pb-10 text-center"><p className="mb-7 text-xs font-bold uppercase tracking-[0.18em] text-primary">{track.title}</p><div className="space-y-5 font-display text-2xl font-bold leading-snug"><p className="text-muted-foreground">Shaam dhale, hawa chale</p><p>Dil kahin kho gaya</p><p className="text-primary">Tere bina, ye silsila</p><p className="text-muted-foreground">Adhoora so gaya</p></div><p className="mt-8 text-xs text-muted-foreground">Sample lyrics placeholder — real lyrics come from the server.</p></div>;
}

function AirplayPanel() {
  return <div className="px-5 pb-10"><p className="mb-5 text-sm text-muted-foreground">Choose where to play this music.</p><button className="flex w-full items-center gap-4 border-y border-border py-4 text-left"><span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground"><Music2 /></span><span className="flex-1"><strong className="block">This iPhone</strong><small className="text-muted-foreground">Current output</small></span><Check className="text-primary" /></button><p className="mt-6 text-center text-xs text-muted-foreground">Nearby AirPlay devices will appear here in the native iOS app.</p></div>;
}

function Empty({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="grid min-h-72 place-items-center text-center"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted text-primary">{icon}</span><h3 className="mt-4 font-display text-xl font-bold">{title}</h3><p className="mx-auto mt-2 max-w-64 text-sm text-muted-foreground">{text}</p></div></div>;
}