<template>
  <ion-page id="params">
    <Header title="Параметры" contact back />
    <ion-content :fullscreen="true" class="params-content">
      <ion-row class="ion-margin">
        <ion-label>Для добавления в корзину выберите параметры линз</ion-label>
      </ion-row>
      <ion-row class="ion-padding">
        <Segment
          title-left="Одинаковые"
          title-right="Разные"
          @change="activeSegment"
        />
      </ion-row>

      <div>
        <ion-row class="ion-margin" :class="{ activeClass: isActive }">
          <ion-col style="padding-left: 0" class="ion-margin-end">
            <ion-title class="text">Сфера</ion-title>
            <Select
              :options="sphere"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openSelect"
              v-model="select.sphere"
            />
          </ion-col>
          <ion-col style="padding-right: 0">
            <ion-title class="text">Радиус кривизны</ion-title>
            <Select
              :options="radius"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openSelect"
              v-model="select.radius"
            />
          </ion-col>
        </ion-row>
        <ion-row
          class="ion-margin ion-justify-content-start ion-align-items-center"
          :class="{ openSelect: isActive }"
        >
          <ion-label class="text">Количество</ion-label>
          <div class="box ion-margin-start">
            <ion-button size="small" class="button" @click="countOneMinus">
              <ion-icon :icon="minus"></ion-icon>
            </ion-button>
            <ion-label>{{ countOne }}</ion-label>
            <ion-button size="small" class="button" @click="countOnePlus">
              <ion-icon :icon="plus"></ion-icon>
            </ion-button>
          </div>
        </ion-row>
      </div>

      <div v-if="different">
        <ion-row class="ion-margin" :class="{ activeClass: isActiveTwo }">
          <ion-col style="padding-left: 0" class="ion-margin-end">
            <ion-title class="text">Сфера</ion-title>
            <Select
              :options="sphere"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openSelectTwo"
              v-model="select.sphere2"
            />
          </ion-col>
          <ion-col style="padding-right: 0">
            <ion-title class="text">Радиус кривизны</ion-title>
            <Select
              :options="radius"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openSelectTwo"
              v-model="select.radius2"
            />
          </ion-col>
        </ion-row>
        <ion-row
          class="ion-margin ion-justify-content-start ion-align-items-center"
          :class="{ openSelectTwo: isActiveTwo }"
        >
          <ion-label class="text">Количество</ion-label>
          <div class="box ion-margin-start">
            <ion-button size="small" class="button" @click="countTwoMinus">
              <ion-icon :icon="minus"></ion-icon>
            </ion-button>
            <ion-label>{{ countTwo }}</ion-label>
            <ion-button size="small" class="button" @click="countTwoPlus">
              <ion-icon :icon="plus"></ion-icon>
            </ion-button>
          </div>
        </ion-row>
      </div>

      <ion-row class="row">
        <Button title="Применить" class="button" @click="apply" />
      </ion-row>
    </ion-content>
    <Popover button-ok="OK" @handler="closePopover" />
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonRow,
  IonLabel,
  IonContent,
  IonCol,
  IonTitle,
  IonButton,
  IonIcon,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Segment from '@/components/ui/Segment.vue';
import Select from '@/components/ui/Select.vue';
import { mapGetters, mapMutations } from 'vuex';
import { addOutline, removeOutline } from 'ionicons/icons';
import Button from '@/components/ui/Button.vue';
import {discountPrice} from "@/helpers/discountPrice";
import Popover from "@/components/ui/Popover.vue";

export default defineComponent({
  name: 'Params',
  components: {
    Popover,
    Button,
    Segment,
    Select,
    Header,
    IonPage,
    IonRow,
    IonLabel,
    IonContent,
    IonCol,
    IonTitle,
    IonButton,
    IonIcon,
  },
  props: {
    id: {
      type: String || Number,
      default: '',
    },
  },
  data() {
    return {
      isActive: false,
      isActiveTwo: false,
      radius: [],
      sphere: [],
      select: {
        radius: {},
        sphere: {},
        radius2: {},
        sphere2: {},
      },
      plus: addOutline,
      minus: removeOutline,
      different: false,
      countOne: 1,
      countTwo: 1,
      product: {},
    };
  },
  mounted() {
    this.radius = this.products.find((el) => el.id == this.id).radius;
    this.sphere = this.products.find((el) => el.id == this.id).sphere;
    this.product = this.products.find((el) => el.id == this.id);
  },
  computed: {
    ...mapGetters(['products']),
  },
  methods: {
    ...mapMutations(['SET_POPOVER', 'SET_ORDER_PRODUCT_DETAILS', 'SET_BASKET_COUNT', 'SET_TOTAL_AMOUNT', 'SET_TOTAL_DISCOUNT']),
    apply() {
      if (
        !this.different &&
        Object.keys(this.select.radius).length &&
        Object.keys(this.select.sphere).length
      ) {
        const a = {
          product: this.product.id,
          radius: this.select.radius.id,
          sphere: this.select.sphere.id,
          product_count: this.countOne,
          product_amount: Number(this.product.price) * this.countOne,
          product_discount: discountPrice(this.product.price, this.product.discount ?? 0) * this.countOne
        };
        this.SET_ORDER_PRODUCT_DETAILS(a)
        this.SET_BASKET_COUNT()
        this.SET_TOTAL_AMOUNT();
        this.SET_TOTAL_DISCOUNT();
        this.$router.replace({name: 'Basket'})
      } else if (
        this.different &&
        Object.keys(this.select.radius2).length &&
        Object.keys(this.select.sphere2).length
      ) {
        const a = {
          product: this.product.id,
          radius: this.select.radius.id,
          sphere: this.select.sphere.id,
          product_count: this.countOne,
          product_amount: Number(this.product.price) * this.countOne,
          product_discount: discountPrice(this.product.price, this.product.discount ?? 0) * this.countOne
        };
        this.SET_ORDER_PRODUCT_DETAILS(a)

        const b = {
          product: this.product.id,
          radius: this.select.radius2.id,
          sphere: this.select.sphere2.id,
          product_count: this.countTwo,
          product_amount: Number(this.product.price) * this.countTwo,
          product_discount: discountPrice(this.product.price, this.product.discount ?? 0) * this.countTwo
        };
        this.SET_ORDER_PRODUCT_DETAILS(b)
        this.SET_BASKET_COUNT()
        this.$router.replace({name: 'Basket'})

      } else {
        this.SET_POPOVER({ show: true, message: ['Выберите параметры линз'] });
      }
    },
    closePopover() {
      this.SET_POPOVER({ show: false, message: [] });
    },
    countOnePlus() {
      this.countOne++;
    },
    countOneMinus() {
      if (this.countOne >= 1) {
        this.countOne--;
      }
    },
    countTwoPlus() {
      this.countTwo++;
    },
    countTwoMinus() {
      if (this.countTwo > 1) {
        this.countTwo--;
      }
    },
    activeSegment(val) {
      if (val === 'right') {
        this.different = true;
      } else {
        this.different = false;
      }
    },
    openSelect(e) {
      this.isActive = e;
    },
    openSelectTwo(e) {
      this.isActiveTwo = e;
    },
  },
});
</script>

<style scoped lang="scss">
#params {
  ion-content {
    --background: #ffffff;
  }

  .params-content {
    .text {
      text-align: start;
      display: contents;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
    }

    .box {
      background: rgba(77, 172, 151, 0.3);
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
    }

    .button:focus {
      --background: none;
    }

    .activeClass {
      margin-bottom: 170px;
    }

    .row {
      position: relative;
      left: 0;
      right: 0;
      margin: 0 8px;

      .button {
        width: 100%;
      }
    }
  }
}
</style>
