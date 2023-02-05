<template>
  <ion-app>
    <ion-router-outlet :animated="false" />
  </ion-app>
</template>

<script>
import {
  alertController,
  IonApp,
  IonRouterOutlet,
  isPlatform,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { StatusBar, Style } from '@capacitor/status-bar';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  computed: {
    ...mapGetters(['error']),
  },
  watch: {
    error(newError, prevError) {
      if (newError && newError !== prevError) {
        if (typeof newError === 'string') {
          this.presentAlert();
        } else if (typeof newError === 'object') {
          // if (newError?.type === 'Unauthorized') {
          //   this.$toast(this.$t('PLEASE-LOGIN'), 4000);
          //   this.logout();
          //   this.$router.replace('/');
          // }
          if (newError?.type === 'Network') {
            const { method } = newError;
            const message =
              method === 'post' || method === 'delete' || method === 'put'
                ? 'Ошибка при отправке данных, проверьте ваше интернет-соединение'
                : 'Ошибка при получении данных, проверьте ваше интернет-соединение';
            this.$toast(message, 4000);
          }
        }
      }
    },
  },
  methods: {
    ...mapMutations(['SET_TOKEN', 'SET_USER']),
    async presentAlert() {
      try {
        const alert = await alertController.create({
          message: this.error,
          buttons: ['OK'],
        });
        await alert.present();
        await alert.onDidDismiss();
        this.clearError();
      } catch (e) {
        console.error(e);
      }
    },
    clearError() {
      window.$store.dispatch('setError', null);
    },
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
