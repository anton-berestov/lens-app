<template>
  <ion-page>
    <Header title="Приморский центр охраны зрения" custom contact/>
    <ion-content :fullscreen="true">
      <Card title="Заказать контактные линзы" img="assets/image/ordering_contact_lenses.png"/>
      <Card title="Записаться к врачу" img="assets/image/recording_with_a_doctor.png"/>
      <Card title="Акции и новости" img="assets/image/actions_news.png" @click="$router.push({
              name: 'ActionsNews',
            })"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {IonPage, IonContent} from '@ionic/vue';
import Header from '@/components/Header.vue'
import Card from "@/components/Card.vue";

export default defineComponent({
  name: 'Home',
  components: {Card, Header, IonContent, IonPage}
});
</script>
