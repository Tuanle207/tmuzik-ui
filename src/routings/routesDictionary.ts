import { FC } from 'react'
import { HomeView, LibraryView, LoginView, PlayingQueueView,
  PlaylistView, SignupView, UploadedListView, UploadView, UserProfileView, SearchView } from '../views'
import { ArtistView } from '../views/ArtistView';
import { ClaimArtistView } from '../views/ClaimArtistView';

interface IRouteDictionary {
  path: string;
  view: FC
}

export const routes = {
  // Main
  Home: '/',
  Search: '/search',
  Library: '/library',
  Login: '/login',
  Signup: '/signup',
  // User
  Profile: '/user/:userId',
  UploadedList: '/upload/list',
  Upload: '/upload',
  Queue: '/queue',
  Playlist: '/playlist/:playlistId',

  ClaimArtistView: '/claim-artist',
  ArtistView: '/artist/:artistId',
}

export const routesDictionary: IRouteDictionary[] = [
  {
    path: routes.Home,
    view: HomeView 
  },
  {
    path: routes.Search,
    view: SearchView
  },
  {
    path: routes.Library,
    view: LibraryView
  },
  {
    path: routes.Login,
    view: LoginView
  },
  {
    path: routes.Signup,
    view: SignupView
  },
  {
    path: routes.Profile,
    view: UserProfileView
  },
  {
    path: routes.UploadedList,
    view: UploadedListView
  },
  {
    path: routes.Upload,
    view: UploadView
  },
  {
    path: routes.Queue,
    view: PlayingQueueView
  },
  {
    path: routes.Playlist,
    view: PlaylistView
  },
  {
    path: routes.ClaimArtistView,
    view: ClaimArtistView
  },
  {
    path: routes.ArtistView,
    view: ArtistView
  }
];