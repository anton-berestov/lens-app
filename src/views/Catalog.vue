<template>
  <ion-page>
    <Header title="Каталог" />
    <ion-content :fullscreen="true">
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
            v-for="product in onFilter(products)"
            :key="product.id"
            :title="onProducer(product.producer_id)"
            :price="product.price"
            :img="product.image"
            :old-price="product.old_price"
            :sale="product.sale"
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
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {
  IonPage,
  IonContent,
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
import {mapActions, mapGetters, mapMutations} from 'vuex';

import products from '../../public/mocha/products/products.json';
import producer from '../../public/mocha/producer.json';

export default defineComponent({
  name: 'Catalog',
  components: {
    FilterElement,
    FilterModal,
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
    isFilter: false,
  }),
  computed: {
    ...mapGetters(['filter']),
    products() {
      return products
    },
    producer() {
      return producer
    }
  },
  async mounted() {
    await this.getProducts()
    await this.getProductsAndMeta()
  },
  methods: {
    ...mapMutations(['SET_FILTER']),
    ...mapActions(['getProducts', 'getProductsAndMeta']),
    onProducer(id) {
      const prod = this.producer.find((el) => el.id === id)
      return prod.name
    },
    onFilter(products) {
      let a = []
      if (this.filter.type.length && !this.filter.period.length) {
        let b = this.filter.type.map((type) => products.filter((el) => el.type_id.includes(type.id)))
        if (b.length > 0) {
          b.map((el) => {
            el.map((e) => {
              a.push(e)
            })
          })
        }
      } else if (!this.filter.type.length && this.filter.period.length) {
        let b = this.filter.period.map((period) => products.filter((el) => el.period_id.includes(period.id)))
        if (b.length > 0) {
          b.map((el) => {
            el.map((e) => {
              a.push(e)
            })
          })
        }
      }

      return a.length ? a : products
    },
    hide() {
      this.isFilter = false;
    },
    close(el) {
      const a = {...this.filter};

      if (el.parent === 'sphere' || el.parent === 'radius') {
        for (let key in a[el.parent]) {
          delete a[el.parent][key];
        }
        this.onFilter(this.products)
        this.SET_FILTER(a);

      }

      if (el.parent === 'type' || el.parent === 'period') {
        a[el.parent] = a[el.parent].filter((e) => e.id !== el.value.id);
        this.onFilter(this.products)
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
