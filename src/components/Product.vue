<template>
  <ion-card class="card">
    <ion-row class="ion-justify-content-center ion-align-items-center">
      <div class="image-box">
        <swiper
          ref="swiper"
          :options="slideOpts"
          :modules="modules"
          :pagination="true"
          :autoplay="true"
          class="swiper"
        >
          <swiper-slide v-for="(image, index) in img" :key="index">
            <img :src="image" class="image" />
          </swiper-slide>
        </swiper>
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
  IonicSlides,
} from '@ionic/vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/vue/css/ionic-swiper.css';
import {
  Autoplay,
  Controller,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';

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
      type: Array,
      default: () => [],
    },
    sale: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      slideOpts: {
        initialSlide: 1,
        speed: 400,
      },
      modules: [
        Pagination,
        Controller,
        Autoplay,
        Keyboard,
        Scrollbar,
        Zoom,
        IonicSlides,
      ],
    };
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonRow,
    IonCardSubtitle,
    Swiper,
    SwiperSlide,
  },
});
</script>

<style scoped lang="scss">
.card {
  width: 150px;
  height: 170px;
  margin: 10px 10px;

  .image-box {
    height: 100%;
    width: 100%;
    padding: 5px;

    .swiper-pagination {
      bottom: -3px !important;
    }
    .swiper {
      .image {
        width: 100%;
        height: 85px;
      }
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

@media (max-width: 360px) {
  .card {
    width: 145px;
    margin: 10px 5px;
  }
}

.card:hover {
  --background: #deeeea;
}
</style>
