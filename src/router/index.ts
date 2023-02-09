import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import {
  PATH_ACTIONS_NEWS,
  PATH_AUTH,
  PATH_BASKET,
  PATH_CATALOG,
  PATH_CHAT,
  PATH_CHECK_PROFILE,
  PATH_CHECK_SMS,
  PATH_EDIT_PROFILE,
  PATH_FILL_PROFILE,
  PATH_HISTORY_ORDER,
  PATH_HISTORY_RECORD,
  PATH_HOME,
  PATH_MAP,
  PATH_ORDER,
  PATH_PARAMS,
  PATH_PICKUP,
  PATH_PRODUCT,
  PATH_PROFILE,
  PATH_RECORDING,
  PATH_SEARCH,
} from '@/router/constants';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/LayoutHome.vue'),
    redirect: '/home',
    children: [
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
          {
            path: PATH_PARAMS,
            name: 'Params',
            props: true,
            component: () => import('@/views/Params.vue'),
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
  {
    path: PATH_MAP,
    name: 'Map',
    component: () => import('@/views/Map.vue'),
  },
  {
    path: PATH_CHAT,
    name: 'Chat',
    component: () => import('@/views/Chat.vue'),
  },
  {
    path: PATH_AUTH,
    name: 'Auth',
    props: true,
    component: () => import('@/views/Auth.vue'),
  },
  {
    path: PATH_CHECK_SMS,
    name: 'CheckSms',
    props: true,
    component: () => import('@/views/CheckSms.vue'),
  },
  {
    path: PATH_HISTORY_RECORD,
    name: 'RecordHistory',
    component: () => import('@/views/RecordHistory.vue'),
  },
  {
    path: PATH_HISTORY_ORDER,
    name: 'OrderHistory',
    component: () => import('@/views/OrderHistory.vue'),
  },
  {
    path: PATH_EDIT_PROFILE,
    name: 'EditProfile',
    component: () => import('@/views/EditProfile.vue'),
  },
  {
    path: PATH_CHECK_PROFILE,
    name: 'CheckProfile',
    props: true,
    component: () => import('@/views/CheckProfile.vue'),
  },
  {
    path: PATH_FILL_PROFILE,
    name: 'FillProfile',
    props: true,
    component: () => import('@/views/FillProfile.vue'),
  },
  {
    path: PATH_PICKUP,
    name: 'Pickup',
    props: true,
    component: () => import('@/views/Pickup.vue'),
  },
  {
    path: PATH_ORDER,
    name: 'Order',
    component: () => import('@/views/Order.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
