<template>
  <ion-page>
    <IonRouterOutlet />
  </ion-page>
</template>
<script>
import { IonRouterOutlet, IonPage } from '@ionic/vue';

export default {
  name: 'LayoutRouter',
  components: {
    IonRouterOutlet,
    IonPage,
  },
};
</script>
