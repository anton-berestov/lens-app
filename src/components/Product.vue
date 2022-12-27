<template>
  <ion-card class="card">
    <ion-row class="ion-justify-content-center ion-align-items-center">
      <div class="image-box">
        <img :src="img" class="image" />
      </div>
    </ion-row>
    <ion-card-header class="header">
      <ion-card-title class="title">{{ title }}</ion-card-title>
      <ion-row class="ion-align-items-center row">
        <ion-card-subtitle class="price">{{ price }}</ion-card-subtitle>
        <ion-card-subtitle class="old-price" v-if="oldPrice"
          >{{ oldPrice }}
        </ion-card-subtitle>
      </ion-row>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonRow,
  IonCardSubtitle,
} from '@ionic/vue';

export default defineComponent({
  name: 'Product',
  props: {
    title: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: '',
    },
    oldPrice: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    sale: {
      type: String,
      default: '',
    },
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonRow,
    IonCardSubtitle,
  },
});
</script>

<style scoped lang="scss">
.card {
  width: 150px;
  height: 170px;
  margin: 12px 15px;

  .image-box {
    height: 85px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;

    .image {
      width: 100%;
    }
  }

  .header {
    padding: 10px 15px;

    .title {
      font-size: 12px;
      font-weight: 400;
    }

    .row {
      margin-top: 6px;

      .price {
        color: #000000;
        font-size: 14px;
        font-weight: 600;
      }

      .old-price {
        margin-left: 12px;
        font-size: 12px;
        text-decoration: line-through;
      }
    }
  }
}

.card:hover {
  --background: #deeeea;
}
</style>
