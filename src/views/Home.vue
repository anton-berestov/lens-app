<template>
  <ion-page>
    <Header title="Приморский центр охраны зрения" custom contact />
    <ion-content :fullscreen="true">
      <Card
        class="pressed"
        title="Заказать контактные линзы"
        img="assets/image/ordering_contact_lenses.png"
        @click="$router.push({ name: 'Catalog' })"
      />
      <Card
        class="pressed"
        title="Записаться к врачу"
        img="assets/image/recording_with_a_doctor.png"
        @click="$router.push({ name: 'Recording' })"
      />
      <Card
        class="pressed"
        title="Акции и новости"
        img="assets/image/actions_news.png"
        @click="$router.push({ name: 'ActionsNews' })"
        v-if="false"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Card from '@/components/ui/Card.vue';

export default defineComponent({
  name: 'Home',
  components: { Card, Header, IonContent, IonPage },
});
</script>

<style scoped lang="scss">
.pressed:hover {
  --background: #deeeea;
}
</style>
