<template>
  <ion-page>
    <Header back>
      <template #search>
        <ion-row class="ion-align-items-center">
          <ion-searchbar
            ref="inputRef"
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
        @update="update"
      />
      <ion-list class="ion-margin-top list">
        <ion-item
          v-for="(product, index) in products"
          :key="index"
          @click="$router.push({ name: 'Product', params: { id: product.id } })"
        >
          <ion-thumbnail slot="start">
            <ion-img :src="product.image[0]" />
          </ion-thumbnail>

          <ion-row class="ion-wrap">
            <ion-title class="title">
              {{ product.name }} {{ onBrand(product.brand_id) }}
            </ion-title>
          </ion-row>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {
  IonPage,
  IonSearchbar,
  IonRow,
  IonList,
  IonItem,
  IonContent,
  IonImg,
  IonThumbnail,
  IonTitle
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Info from '@/components/ui/Info.vue';
import products from '../../public/mocha/products/products.json';
import brand from '../../public/mocha/brand.json';

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
    IonThumbnail,
    IonTitle
  },
  data() {
    return {
      search: '',
    };
  },
  mounted() {
    setTimeout(() => this.$refs.inputRef.$el.setFocus(), 20);
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
  methods: {
    onBrand(id) {
      const el = brand.find((el) => el.id === id) || ''
      return el.name
    },
    update() {
      this.$router.push({name: 'Catalog'});
      this.search = '';
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
