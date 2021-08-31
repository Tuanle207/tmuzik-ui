export interface IPlayingAudioItem {
  id: string;
  name: string;
  cover: string;
  length: number;
  url: string;
  albumTag: string;
  artist: string;
}

export type PlayingState = 'play' | 'pause' | 'changing';