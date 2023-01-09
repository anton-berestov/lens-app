<template>
  <ion-page>
    <Header title="Чат" back />
    <ion-content>
      <div>CHAT</div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';

export default defineComponent({
  name: 'Chat',
  components: {
    Header,
    IonPage,
    IonContent,
  },
});
</script>

<style scoped></style>
