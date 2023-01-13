<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
  },
  mounted() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.SET_TOKEN(token);
    }
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
