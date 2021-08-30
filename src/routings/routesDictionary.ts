import { FC } from 'react'
import { HomeView, LibraryView, LoginView, PlayingQueueView, SignupView, UploadedListView, UploadView, UserProfileView } from '../views'

interface IRouteDictionary {
  path: string;
  view: FC
}

export const paths = {
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
}

export const routesDictionary: IRouteDictionary[] = [
  {
    path: paths.Home,
    view: HomeView 
  },
  {
    path: paths.Library,
    view: LibraryView
  },
  {
    path: paths.Login,
    view: LoginView
  },
  {
    path: paths.Signup,
    view: SignupView
  },
  {
    path: paths.Profile,
    view: UserProfileView
  },
  {
    path: paths.UploadedList,
    view: UploadedListView
  },
  {
    path: paths.Upload,
    view: UploadView
  },
  {
    path: paths.Queue,
    view: PlayingQueueView
  },
];