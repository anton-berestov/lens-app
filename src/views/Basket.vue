<template>
  <ion-page id="basket">
    <Header title="Корзина" />
    <Info
      v-if="!order_product_details.length"
      title="Корзина пуста"
      description="Для заказа товара перейдите в каталог или воспользуйтесь поиском"
      icon="assets/icon/empty-basket.svg"
    />
    <ion-content :fullscreen="true" v-if="order_product_details.length">
      <ion-row class="ion-justify-content-end ion-margin">
        <ion-buttons>
          <ion-button class="clear-button" @click="clearBasket">
            <ion-icon icon="assets/icon/clear-basket.svg" class="icon" />
            <span>Очистить корзину</span>
          </ion-button>
        </ion-buttons>
      </ion-row>

      <ion-row
        class="ion-margin-top wrapper"
        v-for="order in orders"
        :key="order.id"
      >
        <ion-card class="card">
          <ion-card-content class="card-content">
            <ion-row>
              <ion-col style="flex: 1">
                <img :src="order.image[0].url" />
              </ion-col>
              <ion-col class="ion-margin-start" style="flex: 2">
                <ion-row>
                  <ion-label class="title"
                    >{{ `${order.title} ${order.short_title}` }}
                  </ion-label>
                </ion-row>
                <ion-row class="ion-margin-top">
                  <ion-label class="label"
                    >Сфера
                    <span class="text">{{
                      order.sphere.title
                    }}</span></ion-label
                  >
                  <ion-label class="ion-margin-start label"
                    >Радиус
                    <span class="text">{{
                      order.radius.title
                    }}</span></ion-label
                  >
                </ion-row>
                <ion-row class="ion-margin-top row-price">
                  <ion-label class="price">{{ `${order.price} ₽` }} </ion-label>
                  <div class="box ion-margin-start">
                    <ion-button size="small" class="button" @click="countMinus">
                      <ion-icon :icon="minus" class="icon"></ion-icon>
                    </ion-button>
                    <ion-label>{{ `${order.product_count}` }}</ion-label>
                    <ion-button size="small" class="button" @click="countPlus">
                      <ion-icon :icon="plus" class="icon"></ion-icon>
                    </ion-button>
                  </div>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-card-content>
        </ion-card>
      </ion-row>
      <ion-row class="basket-info-wrapper">
        <ion-card class="basket-info-card">
          <ion-card-content class="basket-info-card-content">
            <ion-row class="ion-align-items-center">
              <ion-icon icon="assets/icon/purchases.svg" class="icon" />
              <ion-label class="title">Ваши покупки</ion-label>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-label class="text"
                >Всего товаров:
                <span class="value">{{ basket_count }}</span></ion-label
              >
            </ion-row>
            <ion-row style="margin-top: 8px">
              <ion-label class="text"
                >Итого к оплате:
                <span class="value">{{ `${total_discount} ₽` }}</span>
                <span class="discount" v-if="total_discount !== total_amount">{{
                  `${total_amount} ₽`
                }}</span>
              </ion-label>
            </ion-row>
          </ion-card-content>
        </ion-card>
      </ion-row>
    </ion-content>
    <Button
      v-if="!order_product_details.length"
      title="Перейти в каталог"
      @click="$router.push({ name: 'Catalog' })"
    />
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonCard,
  IonRow,
  IonCardContent,
  IonCol,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
} from '@ionic/vue';
import { mapGetters, mapMutations } from 'vuex';
import { addOutline, removeOutline } from 'ionicons/icons';
import Header from '@/components/ui/Header.vue';
import Info from '@/components/ui/Info.vue';
import Button from '@/components/ui/Button.vue';

export default defineComponent({
  name: 'Basket',
  components: {
    Button,
    Info,
    Header,
    IonContent,
    IonPage,
    IonCard,
    IonRow,
    IonCardContent,
    IonCol,
    IonLabel,
    IonIcon,
    IonButton,
    IonButtons,
  },
  data() {
    return {
      plus: addOutline,
      minus: removeOutline,
    };
  },
  computed: {
    ...mapGetters([
      'order_product_details',
      'basket_count',
      'total_amount',
      'total_discount',
      'products',
    ]),
    orders() {
      return this.order_product_details.map((el) => {
        const prods = this.products.find((product) => {
          if (el.product === product.id) {
            return product;
          }
        });
        const a = prods.sphere.find((sph) => sph.id === el.sphere);
        const b = prods.radius.find((rad) => rad.id === el.radius);

        const prod = {
          ...prods,
          sphere: a,
          radius: b,
          product_count: el.product_count,
        };
        return prod;
      });
    },
  },
  methods: {
    ...mapMutations(['SET_TOTAL_AMOUNT', 'SET_TOTAL_DISCOUNT', 'SET_BASKET']),
    onMap(array, id) {
      array.find((el) => el.id === id);
    },
    clearBasket() {
      this.SET_BASKET({
        order_product_details: [],
        count: 0,
        total_amount: 0,
        total_discount: 0,
      });
    },
    countMinus() {
      console.log('sd');
    },
    countPlus() {
      console.log('sdf');
    },
  },
  mounted() {
    this.SET_TOTAL_AMOUNT();
    this.SET_TOTAL_DISCOUNT();
  },
});
</script>

<style lang="scss">
#basket {
  ion-content {
    --background: #ffffff;
  }
  .clear-button {
    color: #097ac6;
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;

    .icon {
      width: 13px;
      margin-right: 6px;
    }
  }

  .wrapper {
    .card {
      width: 100%;
      margin-bottom: 0;
      margin-top: 0;

      .card-content {
        padding: 12px;

        .label {
          font-weight: 400;
          font-size: 12px;
          line-height: 130%;
          color: #6f6f6f;

          .text {
            font-weight: 400;
            font-size: 12px;
            line-height: 130%;
            color: #1f1f1f;
          }
        }

        .title {
          font-weight: 400;
          font-size: 14px;
          line-height: 135%;
          color: #000000;
        }

        .row-price {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .price {
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #000000;
          }

          .box {
            border: 1px solid #4dac97;
            border-radius: 2px;
            width: 84px;
            height: 32px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
          }

          .button {
            --background: none;
            color: #1e2023;
            --background-activated: none;

            .icon {
              color: #005944;
            }
          }

          .button:focus {
            --background: none;
          }
        }
      }
    }
  }
  .basket-info-wrapper {
    .basket-info-card {
      width: 100%;

      .basket-info-card-content {
        background: rgba(77, 172, 151, 0.21);
        border-radius: 5px;

        .icon {
          width: 24px;
          height: 24px;
        }

        .title {
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #000000;
          margin-left: 5px;
        }

        .text {
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #5e5e5e;

          .value {
            font-weight: 600;
            font-size: 14px;
            line-height: 130%;
            color: #000000;
          }

          .discount {
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            text-decoration-line: line-through;
            color: #969696;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
