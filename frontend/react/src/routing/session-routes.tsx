import { IRoute } from '../interfaces/routing';

import NotFound from '../pages/sessions/404';
import InternalError from '../pages/sessions/500';
import SignIn from '../pages/sessions/Sign-in';
import SignUp from '../pages/sessions/Sign-up';

export const sessionRoutes: IRoute[] = [
  {
    path: 'page-404',
    component: NotFound
  },
  {
    path: 'page-500',
    component: InternalError
  },
  {
    path: 'sign-in',
    component: SignIn
  },
  {
    path: 'sign-up',
    component: SignUp
  }
];
