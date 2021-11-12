import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }:any) => {
  if (isLoading) {
    return <div />;
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};
export const _loadable = (loadFunc:any) => Loadable({
  loader: loadFunc,
  loading: MyLoadingComponent,
  delay: 200,
});
export const routes:RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: _loadable(async() => (await import('./index/index'))),
  },
  {
    component: _loadable(async() => (await import('../components/pageNotFound'))),
  },
];
