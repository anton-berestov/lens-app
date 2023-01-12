<template>
  <ion-page>
    <Header back title="История заказов" />
    <Content id="order-history">
      <Info
        icon="assets/icon/empty-cart.svg"
        title="Вы еще ничего не заказывали"
      />
    </Content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Content from '@/components/ui/Content.vue';
import Info from '@/components/ui/Info.vue';

export default defineComponent({
  name: 'OrderHistory',
  components: {
    IonPage,
    Header,
    Content,
    Info,
  },
});
</script>
