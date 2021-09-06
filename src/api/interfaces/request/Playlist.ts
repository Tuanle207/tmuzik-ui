export interface CreatePlaylistRequest {
  name: string;
  description: string;
  cover?: File;
}

export interface UpdatePlaylistRequest {
  id: string;
  name: string;
  description: string;
  cover?: File;
}

export interface AddPlaylistItemRequest {
  items: string[];
}

export interface RemovePlaylistItemRequest {
  items: string[];
}
