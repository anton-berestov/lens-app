<template>
  <ion-page>
    <Header title="Приморский центр охраны зрения" custom contact />
    <ion-content :fullscreen="true">
      <Card
        :class="{ pressed: isCatalog }"
        title="Заказать контактные линзы"
        img="assets/image/ordering_contact_lenses.png"
        @click="toCatalog"
      />
      <Card
        :class="{ pressed: isRecording }"
        title="Записаться к врачу"
        img="assets/image/recording_with_a_doctor.png"
        @click="toRecording"
      />
      <Card
        :class="{ pressed: isActionNews }"
        title="Акции и новости"
        img="assets/image/actions_news.png"
        @click="toActionsNews"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Card from '@/components/Card.vue';

export default defineComponent({
  name: 'Home',
  components: { Card, Header, IonContent, IonPage },
  data() {
    return {
      isCatalog: false,
      isRecording: false,
      isActionNews: false,
    };
  },
  methods: {
    toCatalog() {
      this.isCatalog = !this.isCatalog;
      this.$router.push({
        name: 'Catalog',
      });
    },
    toRecording() {
      this.isRecording = !this.isRecording;
      this.$router.push({
        name: 'Recording',
      });
    },
    toActionsNews() {
      this.isActionNews = !this.isActionNews;
      this.$router.push({
        name: 'ActionsNews',
      });
    },
  },
});
</script>

<style scoped lang="scss">
.pressed:before {
  --background: #deeeea;
}
</style>
