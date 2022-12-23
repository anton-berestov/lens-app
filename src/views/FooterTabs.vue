<template>
  <ion-page>
    <ion-tabs >
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="tab-bar">
        <ion-tab-button :selected="checkPath(PATH_HOME)" @click.prevent="changePath(PATH_HOME)">
          <ion-icon :icon="changeHome" class="icon"/>
          <ion-label class="label">Главная</ion-label>
        </ion-tab-button>

        <ion-tab-button :selected="checkPath(PATH_CATALOG)" @click.prevent="changePath(PATH_CATALOG)">
          <ion-icon :icon="changeCatalog" class="icon"/>
          <ion-label class="label">Каталог</ion-label>
        </ion-tab-button>

        <ion-tab-button :selected="checkPath(PATH_RECORDING)" @click.prevent="changePath(PATH_RECORDING)">
          <ion-icon :icon="changeRecording" class="icon"/>
          <ion-label class="label">Запись</ion-label>
        </ion-tab-button>

        <ion-tab-button :selected="checkPath(PATH_BASKET)" @click.prevent="changePath(PATH_BASKET)">
          <ion-icon :icon="changeBasket" class="icon"/>
          <ion-label class="label">Корзина</ion-label>
        </ion-tab-button>

        <ion-tab-button :selected="checkPath(PATH_PROFILE)" @click.prevent="changePath(PATH_PROFILE)">
          <ion-icon :icon="changeProfile" class="icon"/>
          <ion-label class="label">Профиль</ion-label>
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
import {PATH_CATALOG, PATH_HOME, PATH_BASKET, PATH_RECORDING, PATH_PROFILE} from "@/router/constants";
import {RouteLocationRaw} from 'vue-router';


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
  data: () => ({
    PATH_HOME,
    PATH_CATALOG,
    PATH_BASKET,
    PATH_RECORDING,
    PATH_PROFILE
  }),
  computed: {
    changeHome() {
      return this.$route.path === PATH_HOME ? 'assets/home-active.svg' : 'assets/home.svg'
    },
    changeCatalog() {
      return this.$route.path === PATH_CATALOG ? 'assets/catalog-active.svg' : 'assets/catalog.svg'
    },
    changeRecording() {
      return this.$route.path === PATH_RECORDING ? 'assets/recording-active.svg' : 'assets/recording.svg'
    },
    changeBasket() {
      return this.$route.path === PATH_BASKET ? 'assets/basket-active.svg' : 'assets/basket.svg'
    },
    changeProfile() {
      return this.$route.path === PATH_PROFILE ? 'assets/profile-active.svg' : 'assets/profile.svg'
    }
  },
  methods: {
    checkPath(path: string) {
      return !!this.$route.matched.find((r) => r.path === path);
    },
    changePath(path: RouteLocationRaw) {
      this.$router.replace(path);
    },
  }
});
</script>

<style scoped lang="scss">
.tab-bar {
  height: 70px;

  .label {
    margin-top: 4px;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
}

</style>
