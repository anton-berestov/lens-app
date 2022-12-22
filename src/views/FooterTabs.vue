<template>
  <ion-page>
    <ion-tabs class="tab-bar">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/main/home">
          <ion-icon icon="assets/home.svg" class="icon"/>
          <ion-label>Главная</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="catalog" href="/main/catalog">
          <ion-icon icon="assets/catalog.svg/" class="icon"/>
          <ion-label>Каталог</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="recording" href="/main/recording">
          <ion-icon icon="assets/recording.svg" class="icon"/>
          <ion-label>Запись</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="basket" href="/main/basket">
          <ion-icon icon="assets/basket.svg" class="icon"/>
          <ion-label>Корзина</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/main/profile">
          <ion-icon icon="assets/profile.svg" class="icon"/>
          <ion-label>Профиль</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
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
    return {};
  },
});
</script>

<style scoped lang="scss">
.tab-bar {
  height: 70px;

  .icon {
    width: 20px;
    height: 20px;
  }
}

</style>
