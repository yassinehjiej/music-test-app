import chillHop from "../data/chillHop";

export type ChillHopType = ReturnType<typeof chillHop>;

export type Song = {
    name: string;
    cover: string;
    artist: string;
    audio: string;
    color: string[];
    id: any;
    active: boolean;
}

export interface MusicBoxProps {
  songs: ChillHopType;
  setSelectedItem: (song:Song) => void;
  selectedItem: Song | null;
}