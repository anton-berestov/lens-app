<template>
  <ion-page>
    <Header title="Каталог" />
    <Content @refresh="refresh">
      <div class="container" style="margin: 5px">
        <ion-row class="ion-nowrap ion-justify-content-between search">
          <ion-searchbar
            class="search"
            placeholder="Поиск в каталоге"
            @ionFocus="$router.push({ name: 'Search' })"
          ></ion-searchbar>
          <ion-buttons style="padding-bottom: 6px; padding-right: 10px">
            <ion-button class="filter" @click="isFilter = true">
              <ion-icon
                icon="assets/icon/filter.svg"
                class="icon-filter"
              ></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-row>
        <ion-row
          class="ion-margin-start ion-nowrap filter-element"
          v-if="filter"
        >
          <FilterElement
            :options="filter.type"
            parent="type"
            v-if="filter.type.length"
            @close="close"
          />
          <FilterElement
            :options="filter.period"
            parent="period"
            v-if="filter.period.length"
            @close="close"
          />
          <FilterElement
            :options="filter.sphere"
            parent="sphere"
            type
            v-if="Object.keys(filter.sphere).length"
            @close="close"
          />
          <FilterElement
            :options="filter.radius"
            parent="radius"
            type
            v-if="Object.keys(filter.radius).length"
            @close="close"
          />
        </ion-row>

        <div class="wrapper">
          <Product
            v-for="product in products"
            :key="product.id"
            :title="product.short_title"
            :price="product.price"
            :img="product.image"
            :discount="product.discount"
            class="product"
            @click="
              $router.push({
                name: 'Product',
                params: {
                  id: product.id,
                },
              })
            "
          />
        </div>
      </div>
      <FilterModal :show="isFilter" @hide="hide" />
    </Content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonRow,
  IonButton,
  IonIcon,
  IonButtons,
  IonSearchbar,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Product from '@/components/Product.vue';
import FilterModal from '@/components/FilterModal.vue';
import FilterElement from '@/components/FilterElement.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Content from '@/components/ui/Content.vue';

export default defineComponent({
  name: 'Catalog',
  components: {
    Content,
    FilterElement,
    FilterModal,
    Product,
    Header,
    IonPage,
    IonRow,
    IonIcon,
    IonButton,
    IonButtons,
    IonSearchbar,
  },
  data: () => ({
    isFilter: false,
  }),
  computed: {
    ...mapGetters(['filter', 'products']),
  },
  async mounted() {
    await this.getProducts({ populate: '*' });
    await this.getMetaProducts();
    console.log('allMeta', await this.getMeta());
  },
  methods: {
    ...mapMutations(['SET_FILTER', 'SET_META_PRODUCTS']),
    ...mapActions(['getProducts', 'getProduct', 'getMeta']),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async refresh(complete = () => {}) {
      try {
        await this.getProducts({ populate: '*' });
      } finally {
        complete();
      }
    },
    async getMetaProducts() {
      const meta = {
        type: [],
        period: [],
        radius: [],
        sphere: [],
      };
      meta.type = await this.getMeta({ filters: { key: { $eq: 'type' } } });
      meta.period = await this.getMeta({ filters: { key: { $eq: 'period' } } });
      meta.radius = await this.getMeta({ filters: { key: { $eq: 'radius' } } });
      meta.sphere = await this.getMeta({ filters: { key: { $eq: 'sphere' } } });
      this.SET_META_PRODUCTS(meta);
    },
    onFilter(products: any[]) {
      let a: any = [];
      if (this.filter.type.length && !this.filter.period.length) {
        let b = this.filter.type.map((type: any) =>
          products.filter((el: any) => el.type_id.includes(type.id))
        );
        if (b.length > 0) {
          b.map((el: any) => {
            el.map((e: any) => {
              a.push(e);
            });
          });
        }
      } else if (!this.filter.type.length && this.filter.period.length) {
        let b = this.filter.period.map((period: any) =>
          products.filter((el: any) => el.period_id.includes(period.id))
        );
        if (b.length > 0) {
          b.map((el: any) => {
            el.map((e: any) => {
              a.push(e);
            });
          });
        }
      }

      return a.length ? a : products;
    },
    hide() {
      this.isFilter = false;
    },
    close(el: any) {
      const a = { ...this.filter };

      if (el.parent === 'sphere' || el.parent === 'radius') {
        for (let key in a[el.parent]) {
          delete a[el.parent][key];
        }
        this.onFilter(this.products);
        this.SET_FILTER(a);
      }

      if (el.parent === 'type' || el.parent === 'period') {
        a[el.parent] = a[el.parent].filter((e: any) => e.id !== el.value.id);
        this.onFilter(this.products);
        this.SET_FILTER(a);
      }
    },
  },
});
</script>

<style lang="scss">
.search {
  .searchbar-input-container .sc-ion-searchbar-ios {
    height: 30px !important;
    font-size: 12px !important;
    --background: #ffffff;
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

.filter-element {
  overflow-y: auto;
  margin-left: 30px;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .product:after {
    --background: #deeeea;
  }
}
</style>
