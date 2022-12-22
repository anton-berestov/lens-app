import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import FooterTabs from '../views/FooterTabs.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/main/home',
	},
	{
		path: '/main/',
		component: FooterTabs,
		children: [
			{
				path: '',
				redirect: '/main/home',
			},
			{
				path: 'home',
				component: () => import('@/views/Home.vue'),
			},
			{
				path: 'catalog',
				component: () => import('@/views/Catalog.vue'),
			},
			{
				path: 'recording',
				component: () => import('@/views/Recording.vue'),
			},
			{
				path: 'basket',
				component: () => import('@/views/Basket.vue'),
			},
			{
				path: 'profile',
				component: () => import('@/views/Profile.vue'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
