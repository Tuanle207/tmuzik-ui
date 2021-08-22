import { FC } from 'react'
import { HomeView, LibraryView, LoginView, SignupView } from '../views'
import { UserProfileView } from '../views/UserProfileView';

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
  Profile: '/user/:userId'
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
  }
];