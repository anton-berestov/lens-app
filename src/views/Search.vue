<template>
  <ion-page>
    <Header back>
      <template #search>
        <ion-row class="ion-align-items-center">
          <ion-searchbar
            placeholder="Поиск в каталоге"
            class="search"
            v-model="search"
          ></ion-searchbar>
        </ion-row>
      </template>
    </Header>
    <ion-content :fullscreen="true">
      <Info
        v-if="search.length && !products.length"
        icon="assets/icon/empty.svg"
        title="Ничего не найдено"
        description="Напишите по-другому название товара или перейдите в каталог"
      />
      <ion-list class="ion-margin-top list">
        <ion-item v-for="(product, index) in products" :key="index">
          <ion-thumbnail slot="start">
            <ion-img :src="product.image" />
          </ion-thumbnail>
          <ion-title class="title"> {{ product.name }}</ion-title>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonSearchbar,
  IonRow,
  IonList,
  IonItem,
  IonContent,
  IonImg,
  IonTitle,
  IonThumbnail,
} from '@ionic/vue';
import Header from '@/components/Header.vue';
import products from '../../public/mocha/products/products.json';
import Info from '@/components/Info.vue';

export default defineComponent({
  name: 'Search',
  components: {
    Info,
    Header,
    IonPage,
    IonSearchbar,
    IonRow,
    IonList,
    IonItem,
    IonContent,
    IonImg,
    IonTitle,
    IonThumbnail,
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    products() {
      return this.search.length
        ? products.filter((product) =>
            product.name.toLowerCase().includes(this.search.toLowerCase())
          )
        : products;
    },
  },
});
</script>

<style scoped lang="scss">
.search {
  padding-bottom: 0;
}

.list {
  .title {
    text-align: start;
    padding: 0;
  }
}
</style>
