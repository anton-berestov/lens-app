<template>
  <ion-page>
    <Header title="Каталог" />
    <ion-content :fullscreen="true">
      <ion-row
        class="ion-justify-content-between ion-nowrap ion-margin-end ion-margin-start ion-align-items-center search"
      >
        <ion-searchbar
          class="search"
          placeholder="Поиск в каталоге"
        ></ion-searchbar>
        <ion-buttons style="padding-bottom: 6px">
          <ion-button class="filter" @click="filter = true">
            <ion-icon
              icon="assets/icon/filter.svg"
              class="icon-filter"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-row>

      <div class="wrapper">
        <Product
          v-for="products in products.data"
          :key="products.id"
          :title="products.name"
          :price="products.price"
          :img="products.image"
          :old-price="products.old_price"
          class="product"
        />
      </div>
      <Filter :show="filter" @hide="hide" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonRow,
  IonButton,
  IonIcon,
  IonButtons,
  IonSearchbar,
} from '@ionic/vue';
import Header from '@/components/Header.vue';
import Product from '@/components/Product.vue';
import Filter from '@/components/Filter.vue';
import json from '../../public/mocha/products/products.json';

export default defineComponent({
  name: 'Catalog',
  components: {
    Filter,
    Product,
    Header,
    IonContent,
    IonPage,
    IonRow,
    IonIcon,
    IonButton,
    IonButtons,
    IonSearchbar,
  },
  data: () => ({
    filter: false,
    products: json,
  }),
  methods: {
    hide() {
      this.filter = false;
    },
  },
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

  .product:after {
    --background: #deeeea;
  }
}
</style>
