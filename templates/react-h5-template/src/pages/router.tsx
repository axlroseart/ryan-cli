import * as React from 'react';
import { RouteProps } from 'react-router-dom';

const PageNotFound = React.lazy(() => import('../components/pageNotFound'));
const Index = React.lazy(() => import('./index'));

export const routes:RouteProps[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
];
