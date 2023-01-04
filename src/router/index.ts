import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import FooterTabs from '../views/FooterTabs.vue';
import {
  PATH_ACTIONS_NEWS,
  PATH_BASKET,
  PATH_CATALOG,
  PATH_HOME,
  PATH_PRODUCT,
  PATH_PROFILE,
  PATH_RECORDING,
  PATH_SEARCH,
} from '@/router/constants';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: FooterTabs,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: PATH_HOME,
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: PATH_CATALOG,
        component: () => import('@/layouts/LayoutRouter.vue'),
        children: [
          {
            path: PATH_CATALOG,
            name: 'Catalog',
            component: () => import('@/views/Catalog.vue'),
          },
          {
            path: PATH_SEARCH,
            name: 'Search',
            component: () => import('@/views/Search.vue'),
          },
          {
            path: PATH_PRODUCT,
            name: 'Product',
            props: true,
            component: () => import('@/views/Product.vue'),
          },
        ],
      },
      {
        path: PATH_RECORDING,
        name: 'Recording',
        component: () => import('@/views/Recording.vue'),
      },
      {
        path: PATH_BASKET,
        name: 'Basket',
        component: () => import('@/views/Basket.vue'),
      },
      {
        path: PATH_PROFILE,
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
      },
    ],
  },
  {
    path: PATH_ACTIONS_NEWS,
    name: 'ActionsNews',
    component: () => import('@/views/ActionsNews.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
