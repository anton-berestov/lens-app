<template>
  <ion-card class="card">
    <ion-row class="ion-justify-content-center ion-align-items-center">
      <img src="assets/image/product.png" class="image"/>
    </ion-row>
    <ion-card-header class="header">
      <ion-card-title class="title">{{ title }}</ion-card-title>
      <ion-card-subtitle class="price">{{ price }}</ion-card-subtitle>
    </ion-card-header>
  </ion-card>

</template>

<script>
import {defineComponent} from "vue";
import {IonCard, IonCardHeader, IonCardTitle, IonRow} from "@ionic/vue";

export default defineComponent({
  name: "Product",
  props: {
    title: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    oldPrice: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    sale: {
      type: String,
      default: ''
    }
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonRow
  }
})
</script>

<style scoped lang="scss">
.card {
  width: 150px;
  height: 170px;

  .image {
    width: 100%;
    margin: 10px;
  }

  .header {
    padding: 10px 15px;

    .title {
      font-size: 12px;
      font-weight: 400;
    }

    .price {
      color: #000000;
      font-size: 14px;
      font-weight: 600;;
    }
  }
}

</style>