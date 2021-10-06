import { AudioItem, SimplePlaylist } from '.';

export interface Creator {
  id: string;
  fullName: string;
  avatar: string;
  isArtist: boolean;
}

export interface GetUserProfileResponse {
  userInfo: UserInfo;
  playlists: SimplePlaylist[];
  followers: SimpleUserProfile[];
  followings: SimpleUserProfile[];
  uploads: AudioItem[];
  recentPlays: AudioItem[];
}

export interface UserInfo {
  id: string;
  profileId: string;
  fullName: string;
  dob: string;
  avatar: string;
  cover: string;
}

export interface SimpleUserProfile {
  id: string;
  name: string;
  avatar?: string;
}