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
        v-if="search.length && !onProducts.length"
        icon="assets/icon/empty.svg"
        title="Ничего не найдено"
        description="Напишите по-другому название товара или перейдите в каталог"
        @update="update"
      />
      <ion-list class="ion-margin-top list">
        <ion-item
          v-for="product in onProducts"
          :key="product.id"
          @click="$router.push({ name: 'Product', params: { id: product.id } })"
        >
          <ion-thumbnail slot="start">
            <ion-img :src="product.image[0].thumbnailUrl" />
          </ion-thumbnail>

          <ion-row class="ion-wrap">
            <ion-label class="title"> {{ product.title }}</ion-label>
            <ion-label class="title"> {{ product.short_title }}</ion-label>
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
  IonLabel
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Info from '@/components/ui/Info.vue';
import {mapGetters} from "vuex";

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
    IonLabel
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
    ...mapGetters(['products']),
    onProducts() {
      return this.search.length
          ? this.products.filter((product) =>
              product.title.toLowerCase().includes(this.search.toLowerCase()) || product.short_title.toLowerCase().includes(this.search.toLowerCase())
          )
          : this.products;
    },
  },
  methods: {
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
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
  }
}
</style>
