
export interface ClaimArtistRequest {
  name: string;
  description: string;
  avatar?: File;
  cover?: File;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  photos: File[];
  certificates: File[];
}