<template>
  <ion-page id="params">
    <Header :title="$t('OPTIONS')" contact back />
    <Loading v-if="loading" />
    <ion-content v-if="!loading" class="params-content">
      <ion-row class="ion-margin">
        <ion-label>{{ $t('OPTIONS-TITLE') }}</ion-label>
      </ion-row>
      <ion-row class="ion-padding">
        <Segment
          :title-left="$t('IDENTICAL')"
          :title-right="$t('DIFFERENT')"
          :value="segment"
          @change="activeSegment"
        />
      </ion-row>

      <div>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            class="ion-margin-end"
            :class="{ sphereRadiusClass: isSphere }"
            v-if="sphere.length"
          >
            <ion-title class="text">{{ $t('SPHERE') }}</ion-title>
            <Select
              :options="sphere"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openSphere"
              v-model="select.sphere"
            />
          </ion-col>
          <ion-col
            style="padding-right: 0"
            :class="{ sphereRadiusClass: isRadius }"
            v-if="radius.length"
          >
            <ion-title class="text">{{ $t('RADIUS-CURVATURE') }}</ion-title>
            <Select
              :options="radius"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openRadius"
              v-model="select.radius"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            class="ion-margin-end"
            v-if="adds.length"
            :class="{ axAddClass: isAdd }"
          >
            <ion-title class="text">{{ $t('ADDS') }}</ion-title>
            <Select
              :options="adds"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openAdd"
              v-model="select.add"
            />
          </ion-col>
          <ion-col
            style="padding-right: 0"
            v-if="axes.length"
            :class="{ axAddClass: isAx }"
          >
            <ion-title class="text">{{ $t('AXES') }}</ion-title>
            <Select
              :options="axes"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openAx"
              v-model="select.ax"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            :class="{ cylinderClass: isCylinder }"
            v-if="cylinders.length"
          >
            <ion-title class="text">{{ $t('CYLINDERS') }}</ion-title>
            <Select
              :options="cylinders"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openCylinder"
              v-model="select.cylinder"
            />
          </ion-col>
          <ion-col
            style="padding-left: 0"
            :class="{ dominantClass: isDominant }"
            v-if="dominants.length"
          >
            <ion-title class="text">{{ $t('DOMINANT') }}</ion-title>
            <Select
              :options="dominants"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openDominant"
              v-model="select.dominant"
            />
          </ion-col>
        </ion-row>
        <ion-row
          class="ion-margin ion-justify-content-start ion-align-items-center"
        >
          <ion-label class="text">{{ $t('QUANTITY') }}</ion-label>
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

      <div v-if="different" class="ion-margin-top ion-padding-top">
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            class="ion-margin-end"
            :class="{ sphereRadiusClassTwo: isSphereTwo }"
            v-if="sphere.length"
          >
            <ion-title class="text">{{ $t('SPHERE') }}</ion-title>
            <Select
              :options="sphere"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openSphereTwo"
              v-model="select.sphere2"
            />
          </ion-col>
          <ion-col
            style="padding-right: 0"
            :class="{ sphereRadiusClassTwo: isRadiusTwo }"
            v-if="radius.length"
          >
            <ion-title class="text">{{ $t('RADIUS-CURVATURE') }}</ion-title>
            <Select
              :options="radius"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openRadiusTwo"
              v-model="select.radius2"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            class="ion-margin-end"
            v-if="adds.length"
            :class="{ axAddClassTwo: isAddTwo }"
          >
            <ion-title class="text">{{ $t('ADDS') }}</ion-title>
            <Select
              :options="adds"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openAddTwo"
              v-model="select.add"
            />
          </ion-col>
          <ion-col
            style="padding-right: 0"
            v-if="axes.length"
            :class="{ axAddClassTwo: isAxTwo }"
          >
            <ion-title class="text">{{ $t('AXES') }}</ion-title>
            <Select
              :options="axes"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openAxTwo"
              v-model="select.ax"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            :class="{ cylinderClassTwo: isCylinderTwo }"
            v-if="cylinders.length"
          >
            <ion-title class="text">{{ $t('CYLINDERS') }}</ion-title>
            <Select
              :options="cylinders"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openCylinderTwo"
              v-model="select.cylinder"
            />
          </ion-col>
          <ion-col
            style="padding-left: 0"
            :class="{ dominantClassTwo: isDominantTwo }"
            v-if="dominants.length"
          >
            <ion-title class="text">{{ $t('DOMINANT') }}</ion-title>
            <Select
              :options="dominants"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openDominant"
              v-model="select.cylinder"
            />
          </ion-col>
        </ion-row>
        <ion-row
          class="ion-margin ion-justify-content-start ion-align-items-center"
        >
          <ion-label class="text">{{ $t('QUANTITY') }}</ion-label>
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
        <Button :title="$t('APPLY')" class="button" @click="apply" />
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
import Loading from '@/components/ui/Loading.vue';
import { getMetaProducts} from '@/api/products'

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
    Loading
  },
  props: {
    id: {
      type: String || Number,
      default: '',
    },
  },
  data() {
    return {
      isCylinder: false,
      isAx: false,
      isAdd: false,
      isRadius: false,
      isSphere: false,
      isDominant: false,
      isCylinderTwo: false,
      isAxTwo: false,
      isAddTwo: false,
      isRadiusTwo: false,
      isSphereTwo: false,
      isDominantTwo: false,
      radius: [],
      sphere: [],
      select: {
        radius: {},
        sphere: {},
        cylinder: {},
        add: {},
        ax:{},
        radius2: {},
        sphere2: {},
      },
      adds: [],
      axes: [],
      cylinders: [],
      dominants: [],
      plus: addOutline,
      minus: removeOutline,
      different: false,
      segment: 'left',
      countOne: 1,
      countTwo: 1,
      product: {},
    };
  },
  async mounted() {
    this.SET_LOADING(true)
    const meta = await getMetaProducts(this.id)
    await this.getMeta(meta);
    this.SET_LOADING(false)
  },
  computed: {
    ...mapGetters(['products', 'loading']),
  },
  methods: {
    ...mapMutations(['SET_POPOVER', 'SET_ORDER_PRODUCT_DETAILS', 'SET_BASKET_COUNT', 'SET_TOTAL_AMOUNT', 'SET_TOTAL_DISCOUNT', 'SET_LOADING']),
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
        this.SET_POPOVER({ show: true, message: [this.$t('OPTIONS-MESSAGE')] });
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
      this.segment = val
    },
    openSphere(e) {
      this.isSphere = e
    },
    openRadius (e) {
      this.isRadius = e
    },
    openCylinder(e) {
      this.isCylinder = e
    },
    openAx(e) {
      this.isAx = e
    },
    openAdd(e) {
      this.isAdd = e
    },
    openDominant(e) {
      this.isDomonant = e
    },
    openSphereTwo(e) {
      this.isSphereTwo = e
    },
    openRadiusTwo (e) {
      this.isRadiusTwo = e
    },
    openCylinderTwo(e) {
      this.isCylinderTwo = e
    },
    openAxTwo(e) {
      this.isAxTwo = e
    },
    openAddTwo(e) {
      this.isAddTwo = e
    },
    openDominantTwo(e) {
      this.isDomonant = e
    },
    getMeta(meta) {
      console.log(meta)
      this.radius = meta.radiuses
      this.sphere = meta.spheres
      this.axes = meta.axis
      this.cylinders = meta.cylinders
      this.dominants = meta.dominants
      this.adds = meta.adds
    }
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

    .sphereRadiusClass {
      margin-bottom: 170px;
    }

    .axAddClass {
      margin-bottom: 170px;
    }

    .cylinderClass {
      margin-bottom: 170px;
    }

    .dominantClass {
      margin-bottom: 170px;
    }
    .sphereRadiusClassTwo {
      margin-bottom: 170px;
    }

    .axAddClassTwo {
      margin-bottom: 170px;
    }

    .cylinderClassTwo {
      margin-bottom: 170px;
    }

    .dominantClassTwo {
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
