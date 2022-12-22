<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="home" href="/tabs/home">
					<ion-icon icon="assets/home.svg" />
					<ion-label>Главная</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="catalog" href="/tabs/catalog">
					<ion-icon icon="assets/catalog.svg" />
					<ion-label>Каталог</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="recording" href="/tabs/recording">
					<ion-icon icon="assets/recording.svg" />
					<ion-label>Запись</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="basket" href="/tabs/basket">
					<ion-icon icon="assets/basket.svg" />
					<ion-label>Корзина</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="profile" href="/tabs/profile">
					<ion-icon icon="assets/profile.svg" />
					<ion-label>Профиль</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import {
		IonTabBar,
		IonTabButton,
		IonTabs,
		IonLabel,
		IonIcon,
		IonPage,
		IonRouterOutlet,
	} from '@ionic/vue';


	export default defineComponent({
		name: 'FooterTabs',
		components: {
			IonLabel,
			IonTabs,
			IonTabBar,
			IonTabButton,
			IonIcon,
			IonPage,
			IonRouterOutlet,
		},
		setup() {
			return {

			};
		},
	});
</script>
