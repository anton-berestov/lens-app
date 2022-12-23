<template>
  <ion-page>
    <Header title="Каталог"/>
    <ion-content :fullscreen="true">
      <ion-row
          class="ion-justify-content-between ion-nowrap ion-margin-end ion-margin-start ion-align-items-center search">
        <ion-searchbar class="search" placeholder="Поиск в каталоге" ></ion-searchbar>
        <ion-buttons style="padding-bottom: 6px">
          <ion-button class="filter" @click="!filter">
            <ion-icon icon="assets/filter.svg" class="icon-filter"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-row>

      <div class="wrapper">
        <Product title="Biofinity toric (3 шт)" price="1 200 ₽" class="product"/>
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
  IonRow,
  IonButton,
  IonIcon,
  IonButtons,
  IonSearchbar
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
    IonRow,
    IonIcon,
    IonButton,
    IonButtons,
    IonSearchbar
  },
  data: () => ({
    filter: false
  })
});
</script>

<style lang="scss">
.search {
  .searchbar-input-container .sc-ion-searchbar-ios {
    height: 30px !important;
    font-size: 12px !important;
  }

  .filter {
    background: #ffffff;
    height: 24px !important;
    width: 24px !important;
    border-radius: 5px !important;


    .icon-filter {
      height: 12px;
      width: 13px;
    }
  }
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .product{

  }
}

</style>
