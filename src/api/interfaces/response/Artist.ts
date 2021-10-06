export interface SimpleArtist {
  id: string;
  name: string;
  avatar: string;
}

export interface ArtistInfo {
  id: string;
  name: string;
  description: string;
  avatar: string;
  cover: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  photo: {
    items: string[];
  };
  verified: boolean;
  plays: number;
  follows: number;
  creationTime: string;
}