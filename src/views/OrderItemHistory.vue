<template>
  <ion-page>
    <Header :title="$t('ORDER')" back />
    <Loading v-if="loading" />
    <ion-content :scroll-y="false" id="order-item-history" v-if="!loading">
      <ion-row>
        <ion-label class="ion-margin-top ion-margin-start title"
          >{{ $t('ORDER_NUMBER') }} {{ order_item.id }} от
          {{ formatDate(order_item.date, 'LL') }}
        </ion-label>
      </ion-row>

      <ion-item lines="none" style="--background: #ecebeb">
        <ion-badge slot="start">Получено</ion-badge>
      </ion-item>

      <ion-row
        class="wrapper"
        v-for="(item, index) in order_item.order_product_details"
        :key="index"
      >
        <ion-card class="card" style="margin-top: 10px">
          <ion-card-content class="card-content">
            <ion-row>
              <ion-col style="flex: 1">
                <img :src="imageHandler(item.product.img[0])" />
              </ion-col>

              <ion-col class="ion-margin-start" style="flex: 2">
                <ion-row>
                  <ion-label class="title">
                    {{ item.product.title }} {{ item.product.short_title }}
                  </ion-label>
                </ion-row>
                <ion-row class="ion-margin-top">
                  <ion-label class="label"
                    >{{ $t('SPHERE') }}
                    <span class="text">{{ item.sphere.title }}</span></ion-label
                  >
                  <ion-label class="ion-margin-start label"
                    >{{ $t('RADIUS') }}
                    <span class="text">{{ item.radius.title }}</span></ion-label
                  >
                </ion-row>
                <ion-row class="ion-margin-top row-price">
                  <ion-label class="ion-margin-end price"
                    >{{ item.product.price }} {{ $t('RUBLE_SIGN') }}</ion-label
                  >
                  <ion-label class="ion-margin-end"
                    >{{ item.count }} {{ $t('PACKAGING') }}</ion-label
                  >
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-card-content>
        </ion-card>
      </ion-row>

      <ion-row class="ion-margin ion-align-items-center">
        <ion-col>
          <ion-label class="text">{{ $t('ORDER_PRICE') }}</ion-label>
        </ion-col>
        <ion-col>
          <ion-label class="text-value"
            >{{ order_item.total_discount }} {{ $t('RUBLE_SIGN') }}</ion-label
          >
        </ion-col>
      </ion-row>

      <ion-row class="ion-margin ion-align-items-center">
        <ion-col>
          <ion-label class="text">{{ $t('DELIVERY_METHOD') }}</ion-label>
        </ion-col>
        <ion-col>
          <ion-label v-if="!order_item.deliverTo" class="text-value">{{
            $t('PICKUP')
          }}</ion-label>
          <ion-label v-if="order_item.deliverTo" class="text-value">
            {{ $t('COURIER') }}</ion-label
          >
        </ion-col>
      </ion-row>

      <ion-row
        class="ion-margin ion-align-items-center"
        v-if="order_item.deliverTo"
      >
        <ion-col>
          <ion-label class="text">{{ $t('DELIVERY_ADDRESS') }}</ion-label>
        </ion-col>
        <ion-col>
          <ion-label class="text-value">
            {{ order_item.deliverTo.city }}
            {{ order_item.deliverTo.street }}</ion-label
          >
        </ion-col>
      </ion-row>

      <Button :title="$t('REPEAT_ORDER')" class="repeat-button" />
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
  IonBadge,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Loading from '@/components/ui/Loading.vue';
import Button from '@/components/ui/Button.vue';
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
    IonBadge,
    Button,
  },
  data() {
    return {
      loading: false,
      order_item: null,
      products: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    formatDate,
    imageHandler(image) {
      return image.length
        ? `${process.env.VUE_APP_API_PUBLIC}${image}`
        : 'assets/image/no-image.png';
    },
  },
  async created() {
    this.loading = true;
    this.order_item = await getOrderById(this.id);
    console.log(this.order_item);
    this.loading = false;
  },
});
</script>

<style lang="scss">
#order-item-history {
  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
  }

  .card {
    width: 100%;

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

  .text {
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #6f6f6f;
  }

  .text-value {
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #000000;
  }

  .repeat-button {
    margin: 0 8px;
  }

  ion-badge {
    --padding-bottom: 5px;
    --background: #4dac97;
  }
}
</style>
