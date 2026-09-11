import aashiquiArt from "@/assets/album-aashiqui.jpg";
import rangeelaArt from "@/assets/album-rangeela.jpg";
import ddljArt from "@/assets/album-ddlj.jpg";
import composerPhoto from "@/assets/composer-portrait.jpg";

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
  { id: 1, title: "Ab Tere Bin Jee Lenge Hum", album: "Aashiqui", year: 1990, artist: "Kumar Sanu", composer: "Nadeem–Shravan", genre: "Filmi Romance", duration: 305, art: aashiquiArt, track: 1 },
  { id: 2, title: "Dheere Dheere Se Meri Zindagi", album: "Aashiqui", year: 1990, artist: "Kumar Sanu, Anuradha Paudwal", composer: "Nadeem–Shravan", genre: "Filmi Romance", duration: 388, art: aashiquiArt, track: 2 },
  { id: 3, title: "Nazar Ke Saamne", album: "Aashiqui", year: 1990, artist: "Kumar Sanu, Anuradha Paudwal", composer: "Nadeem–Shravan", genre: "Filmi Romance", duration: 341, art: aashiquiArt, track: 3 },
  { id: 4, title: "Tanha Tanha", album: "Rangeela", year: 1995, artist: "Asha Bhosle", composer: "A. R. Rahman", genre: "Filmi Pop", duration: 340, art: rangeelaArt, track: 1 },
  { id: 5, title: "Yaaro Sun Lo Zara", album: "Rangeela", year: 1995, artist: "Udit Narayan, K. S. Chithra", composer: "A. R. Rahman", genre: "Filmi Pop", duration: 351, art: rangeelaArt, track: 2 },
  { id: 6, title: "Hai Rama", album: "Rangeela", year: 1995, artist: "Hariharan, Swarnalatha", composer: "A. R. Rahman", genre: "Filmi Pop", duration: 310, art: rangeelaArt, track: 3 },
  { id: 7, title: "Tujhe Dekha To Ye Jaana Sanam", album: "Dilwale Dulhania Le Jayenge", year: 1995, artist: "Lata Mangeshkar, Kumar Sanu", composer: "Jatin–Lalit", genre: "Filmi Soundtrack", duration: 292, art: ddljArt, track: 1 },
  { id: 8, title: "Mehndi Laga Ke Rakhna", album: "Dilwale Dulhania Le Jayenge", year: 1995, artist: "Lata Mangeshkar, Udit Narayan", composer: "Jatin–Lalit", genre: "Filmi Soundtrack", duration: 380, art: ddljArt, track: 2 },
  { id: 9, title: "Ho Gaya Hai Tujhko To Pyar Sajna", album: "Dilwale Dulhania Le Jayenge", year: 1995, artist: "Lata Mangeshkar, Udit Narayan", composer: "Jatin–Lalit", genre: "Filmi Soundtrack", duration: 405, art: ddljArt, track: 3 },
];

export const composerPortrait = composerPhoto;

export const searchCollections = [
  { type: "Albums", name: "Aashiqui", detail: "Nadeem–Shravan · 1990", art: aashiquiArt, trackId: 1 },
  { type: "Albums", name: "Rangeela", detail: "A. R. Rahman · 1995", art: rangeelaArt, trackId: 4 },
  { type: "Albums", name: "Dilwale Dulhania Le Jayenge", detail: "Jatin–Lalit · 1995", art: ddljArt, trackId: 7 },
  { type: "Artists", name: "Kumar Sanu", detail: "Artist · 128 songs", art: aashiquiArt, trackId: 1 },
  { type: "Artists", name: "Asha Bhosle", detail: "Artist · 214 songs", art: rangeelaArt, trackId: 4 },
  { type: "Artists", name: "Lata Mangeshkar", detail: "Artist · 302 songs", art: ddljArt, trackId: 7 },
  { type: "Composers", name: "A. R. Rahman", detail: "Composer · 46 works", art: composerPhoto, trackId: 4 },
  { type: "Composers", name: "Nadeem–Shravan", detail: "Composer · 61 works", art: composerPhoto, trackId: 1 },
  { type: "Playlists", name: "90s Retro Hindi", detail: "Playlist · 32 songs", art: rangeelaArt, trackId: 4 },
  { type: "Genres", name: "Filmi Romance", detail: "Genre · 88 songs", art: aashiquiArt, trackId: 1 },
  { type: "Genres", name: "Filmi Pop", detail: "Genre · 54 songs", art: rangeelaArt, trackId: 4 },
];
