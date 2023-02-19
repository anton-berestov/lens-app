<template>
  <ion-card class="card">
    <ion-card-content class="content">
      <ion-label class="title"
        >Заказ № {{ order }} от {{ formatDate(date, 'LL') }}</ion-label
      >
      <ion-row class="container-text">
        <ion-label class="ion-margin-end text">{{ count }} товар</ion-label>
        <ion-label class="ion-margin-end text">{{ price }} ₽</ion-label>
        <ion-label class="text" style="border: none">{{ pickup }}</ion-label>
      </ion-row>
      <ion-item lines="none">
        <ion-badge slot="start">{{ status }}</ion-badge>
      </ion-item>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonLabel,
  IonRow,
  IonItem,
  IonBadge,
} from '@ionic/vue';
import { formatDate } from '@/helpers/formatter';

export default defineComponent({
  name: 'CardOrder',
  props: {
    order: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    count: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: '',
    },
    pickup: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
  },
  components: {
    IonCard,
    IonCardContent,
    IonLabel,
    IonRow,
    IonItem,
    IonBadge,
  },
  methods: {
    formatDate,
  },
});
</script>

<style lang="scss">
.card {
  .content {
    padding: 10px;

    .title {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }

    .container-text {
      margin-top: 8px;

      .text {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #737373;
        border-right: 1px solid #737373;
        padding-right: 16px;
      }
    }
  }

  ion-item::part(native) {
    padding: 0;
  }

  ion-badge {
    --padding-bottom: 5px;
    --background: #4dac97;
  }
}
</style>
