<template>
  <ion-app>
    <ion-router-outlet :animated="false" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/vue';
import { defineComponent } from 'vue';
import { StatusBar, Style } from '@capacitor/status-bar';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  methods: {
    ...mapMutations(['SET_TOKEN', 'SET_USER']),
  },
  async mounted() {
    if (!isPlatform('mobileweb')) {
      await StatusBar.setStyle({ style: Style.Light });
    }
    this.SET_TOKEN(localStorage.getItem('jwt'));
    const user = localStorage.getItem('user');
    if (user) {
      this.SET_USER(JSON.parse(user));
    }
  },
});
</script>

<style lang="scss">
@import 'theme/main.scss';

@font-face {
  font-family: 'Montserrat';
  src: url('../public/assets/fonts/Montserrat-Regular.ttf');
}
</style>
