<template>
  <ion-page>
    <Header title="Каталог"/>
    <ion-content :fullscreen="true">
      <div class="wrapper">
        <Product title="Biofinity toric (3 шт)" price="1 200 ₽"/>
        <Product title="Biofinity toric (6 шт)" price="2 400 ₽"/>
        <Product title="Biofinity toric (3 шт)" price="1 200 ₽" old-price="1 500 ₽"/>
        <Product title="Acuvue (6 шт)" price="2 600 ₽"/>
        <Product title="Biofinity toric (30 шт)" price="5 100 ₽"/>
        <Product title="Biofinity toric (3 шт)" price="1200 ₽"/>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {
  IonPage,
  IonContent,
} from '@ionic/vue';
import Header from "@/components/Header.vue";
import Product from "@/components/Product.vue";

export default defineComponent({
  name: 'Catalog',
  components: {
    Product,
    Header,
    IonContent,
    IonPage,
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
