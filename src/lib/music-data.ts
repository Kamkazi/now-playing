import solsticeArt from "@/assets/album-solstice.jpg";
import nightLinesArt from "@/assets/album-night-lines.jpg";
import circularArt from "@/assets/album-circular.jpg";
import maraPortrait from "@/assets/composer-mara.jpg";

export type Track = {
  id: number;
  title: string;
  album: string;
  year: number;
  artist: string;
  composer: string;
  genre: string;
  duration: number;
  art: string;
  track: number;
};

export const tracks: [Track, ...Track[]] = [
  { id: 1, title: "Sun Through Static", album: "Signal / Solstice", year: 1976, artist: "The Meridian Assembly", composer: "Mara Venn", genre: "Experimental Soul", duration: 253, art: solsticeArt, track: 1 },
  { id: 2, title: "Copper Horizon", album: "Signal / Solstice", year: 1976, artist: "The Meridian Assembly", composer: "Mara Venn", genre: "Experimental Soul", duration: 218, art: solsticeArt, track: 2 },
  { id: 3, title: "Antenna Bloom", album: "Signal / Solstice", year: 1976, artist: "The Meridian Assembly", composer: "Mara Venn", genre: "Experimental Soul", duration: 287, art: solsticeArt, track: 3 },
  { id: 4, title: "Night Lines", album: "Blue Hour Geometry", year: 1968, artist: "Calder Reed Quartet", composer: "Calder Reed", genre: "Modal Jazz", duration: 326, art: nightLinesArt, track: 1 },
  { id: 5, title: "Second Platform", album: "Blue Hour Geometry", year: 1968, artist: "Calder Reed Quartet", composer: "Calder Reed", genre: "Modal Jazz", duration: 301, art: nightLinesArt, track: 2 },
  { id: 6, title: "Amber Transit", album: "Blue Hour Geometry", year: 1968, artist: "Calder Reed Quartet", composer: "Mara Venn", genre: "Modal Jazz", duration: 274, art: nightLinesArt, track: 3 },
  { id: 7, title: "Circular Motion I", album: "Objects in Motion", year: 1973, artist: "Venn Chamber Ensemble", composer: "Mara Venn", genre: "Modern Classical", duration: 365, art: circularArt, track: 1 },
  { id: 8, title: "Circular Motion II", album: "Objects in Motion", year: 1973, artist: "Venn Chamber Ensemble", composer: "Mara Venn", genre: "Modern Classical", duration: 298, art: circularArt, track: 2 },
  { id: 9, title: "A Room of Echoes", album: "Objects in Motion", year: 1973, artist: "Venn Chamber Ensemble", composer: "Mara Venn", genre: "Modern Classical", duration: 242, art: circularArt, track: 3 },
];

export const composerPortrait = maraPortrait;

export const searchCollections = [
  { type: "Albums", name: "Signal / Solstice", detail: "The Meridian Assembly · 1976", art: solsticeArt, trackId: 1 },
  { type: "Albums", name: "Blue Hour Geometry", detail: "Calder Reed Quartet · 1968", art: nightLinesArt, trackId: 4 },
  { type: "Albums", name: "Objects in Motion", detail: "Venn Chamber Ensemble · 1973", art: circularArt, trackId: 7 },
  { type: "Artists", name: "The Meridian Assembly", detail: "Artist · 3 albums", art: solsticeArt, trackId: 1 },
  { type: "Artists", name: "Calder Reed Quartet", detail: "Artist · 5 albums", art: nightLinesArt, trackId: 4 },
  { type: "Composers", name: "Mara Venn", detail: "Composer · 18 works", art: maraPortrait, trackId: 1 },
  { type: "Playlists", name: "After Midnight", detail: "Playlist · 24 songs", art: nightLinesArt, trackId: 4 },
  { type: "Genres", name: "Experimental Soul", detail: "Genre · 42 songs", art: solsticeArt, trackId: 1 },
  { type: "Genres", name: "Modern Classical", detail: "Genre · 67 songs", art: circularArt, trackId: 7 },
];