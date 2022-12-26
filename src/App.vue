<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>

<style lang="scss">
@import './theme/main.scss';

@font-face {
  font-family: 'Montserrat';
  src: url('../public/assets/fonts/Montserrat-Regular.ttf');
}
</style>
