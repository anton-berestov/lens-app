<template>
  <ion-page id="pickup">
    <Header title="Оформление заказа" back />
    <ion-content>
      <ion-row class="ion-padding-top ion-padding-start ion-padding-end">
        <Segment title-left="Самовывоз" title-right="Курьер" />
      </ion-row>
      <Address title="Адрес получения" />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonRow } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Segment from '@/components/ui/Segment.vue';
import Address from '@/components/Address.vue';

export default {
  name: 'Pickup',
  components: {
    Address,
    Segment,
    Header,
    IonPage,
    IonContent,
    IonRow,
  },
};
</script>

<style scoped lang="scss">
#pickup {
}
</style>
