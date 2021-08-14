import { FC } from 'react'
import { HomeView, LibraryView, LoginView, SignupView } from '../views'

interface IRouteDictionary {
  path: string;
  view: FC
}

export const paths = {
  Home: '/',
  Library: '/library',
  Login: '/login',
  Signup: '/signup',
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
  }
];