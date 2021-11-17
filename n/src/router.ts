import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { Index } from './views/index';
import { PageNotFound } from './views/404';

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
