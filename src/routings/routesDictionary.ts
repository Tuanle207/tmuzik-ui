import { FC } from 'react'
import { HomeView, LibraryView, LoginView, PlayingQueueView, PlaylistView, SignupView, UploadedListView, UploadView, UserProfileView } from '../views'
import { ClaimArtistView } from '../views/ClaimArtistView';

interface IRouteDictionary {
  path: string;
  view: FC
}

export const routes = {
  // Main
  Home: '/',
  Library: '/library',
  Login: '/login',
  Signup: '/signup',
  // User
  Profile: '/user/:userId',
  UploadedList: '/upload/list',
  Upload: '/upload',
  Queue: '/queue',
  Playlist: '/playlist/:playlistId',

  ClaimArtistView: '/claim-artist'
}

export const routesDictionary: IRouteDictionary[] = [
  {
    path: routes.Home,
    view: HomeView 
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
  }
];