<template>
  <ion-page id="order-history">
    <Header back title="История заказов" />
    <Content id="order-history">
      <Info
        v-if="false"
        icon="assets/icon/empty-cart.svg"
        title="Вы еще ничего не заказывали"
      />
      <CardOrder />
    </Content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Content from '@/components/ui/Content.vue';
import Info from '@/components/ui/Info.vue';
import CardOrder from '@/components/CardOrder.vue';

export default defineComponent({
  name: 'OrderHistory',
  components: {
    CardOrder,
    IonPage,
    Header,
    Content,
    Info,
  },
});
</script>

<style lang="scss">
#order-history {
  ion-content {
    --background: #ffffff;
  }
}
</style>
