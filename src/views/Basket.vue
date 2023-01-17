<template>
  <ion-page>
    <Header title="Корзина" />
    <ion-content :fullscreen="true"> </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'Basket',
  components: {
    Header,
    IonContent,
    IonPage,
  },
  methods: {
    ...mapMutations(['SET_TOTAL_AMOUNT', 'SET_TOTAL_DISCOUNT']),
  },
  mounted() {
    this.SET_TOTAL_AMOUNT();
    this.SET_TOTAL_DISCOUNT();
  },
});
</script>
