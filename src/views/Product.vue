<template>
  <ion-page>
    <Header back title="Линзы" />
    <ion-content> </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/Header.vue';
import products from '../../public/mocha/products/products.json';

export default defineComponent({
  name: 'Product',
  props: {
    id: {
      type: String || Number,
      default: null,
    },
  },
  components: {
    Header,
    IonPage,
    IonContent,
  },
  computed: {
    product() {
      return products.find((el) => el.id === this.id);
    },
  },
});
</script>

<style scoped></style>
