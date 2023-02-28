<template>
  <ion-page>
    <Header :title="$t('ORDER')" back />
    <Loading v-if='loading' />
    <ion-content :scroll-y='false' id='order-item-history' v-if='!loading'>
      <ion-row>
        <ion-label class='ion-margin-top ion-margin-start title'
        >{{ $t('ORDER_NUMBER') }} {{ order_item.id }} от
          {{ formatDate(order_item.date, 'LL') }}
        </ion-label>
      </ion-row>

      <ion-item lines='none' style='--background: #ecebeb'>
        <ion-badge slot='start'>Получено</ion-badge>
      </ion-item>

      <ion-row
        class='wrapper'
        v-for='(item, index) in order_item.order_product_details'
        :key='index'
      >
        <ion-card class='card' style='margin-top: 10px'>
          <ion-card-content class='card-content'>
            <ion-row>
              <ion-col style='flex: 1'>
                <img />
              </ion-col>
              <ion-col class='ion-margin-start' style='flex: 2'>
                <ion-row>
                  <ion-label class='title'>
                    {{ item.product.title }}
                  </ion-label>
                </ion-row>
                <ion-row class='ion-margin-top'>
                  <ion-label class='label'
                  >Сфера <span class='text'>sph</span></ion-label
                  >
                  <ion-label class='ion-margin-start label'
                  >Радиус <span class='text'>rad</span></ion-label
                  >
                </ion-row>
                <ion-row class='ion-margin-top row-price'>
                  <ion-label class='ion-margin-end price'>price ₽</ion-label>
                  <ion-label class='ion-margin-end'>count упк</ion-label>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-card-content>
        </ion-card>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonRow,
  IonCard,
  IonCardContent,
  IonCol,
  IonLabel,
  IonItem,
  IonBadge
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Loading from '@/components/ui/Loading.vue';
import { getOrderById } from '@/api/order';
import { formatDate } from '@/helpers/formatter';

export default defineComponent({
  name: 'OrderItemHistory',
  components: {
    Loading,
    Header,
    IonPage,
    IonContent,
    IonRow,
    IonCard,
    IonCardContent,
    IonCol,
    IonLabel,
    IonItem,
    IonBadge
  },
  data() {
    return {
      loading: false,
      order_item: null,
      products: []
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    formatDate
  },
  async created() {
    this.loading = true;
    this.order_item = await getOrderById(this.id);
    console.log(this.order_item);
    this.loading = false;
  }
});
</script>

<style lang='scss'>
#order-item-history {
  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
  }

  .card-content {
    .title {
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      color: #000000;
    }

    .label {
      .text {
        font-weight: 400;
        font-size: 12px;
        line-height: 130%;
        color: #1f1f1f;
      }
    }
  }
}
</style>
