<template>
  <ion-col class="ion-margin" style="padding: 0">
    <ion-row>
      <ion-col>
        <ion-label class="title">Диаметр</ion-label>
      </ion-col>
      <ion-col>
        <ion-title class="text">23</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-margin-top">
      <ion-col>
        <ion-label class="title">Производитель</ion-label>
      </ion-col>
      <ion-col>
        <ion-title class="text">Biofinity</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-margin-top">
      <ion-col>
        <ion-label class="title">Тип линз</ion-label>
      </ion-col>
      <ion-col>
        <ion-title class="text">астигматические</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-margin-top">
      <ion-col>
        <ion-label class="title">Бренд</ion-label>
      </ion-col>
      <ion-col>
        <ion-title class="text">Biofinity</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-margin-top" style="position: relative">
      <ion-col>
        <ion-label class="title">Срок замены</ion-label>
        <ion-buttons class="btn-question-period">
          <ion-button @click="openPopoverPeriod">
            <ion-icon
              icon="assets/icon/question.svg"
              slot="icon-only"
              class="icon"
            />
          </ion-button>
        </ion-buttons>
      </ion-col>
      <ion-col>
        <ion-title class="text">1 день</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-margin-top">
      <ion-col>
        <ion-label class="title">Материал</ion-label>
      </ion-col>
      <ion-col>
        <ion-title class="text">силикон</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-margin-top" style="position: relative">
      <ion-col>
        <ion-label class="title">Радиус кривизны</ion-label>
        <ion-buttons class="btn-question-radius">
          <ion-button @click="openPopoverPeriod">
            <ion-icon
              icon="assets/icon/question.svg"
              slot="icon-only"
              class="icon"
            />
          </ion-button>
        </ion-buttons>
      </ion-col>
      <ion-col>
        <ion-title class="text">8,6</ion-title>
      </ion-col>
    </ion-row>
  </ion-col>
  <Popover />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonRow,
  IonCol,
  IonLabel,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/vue';
import { mapMutations } from 'vuex';
import Popover from '@/components/ui/Popover.vue';

export default defineComponent({
  name: 'Specification',
  components: {
    Popover,
    IonRow,
    IonCol,
    IonLabel,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
  },
  props: {
    diameter: {
      type: String || Number,
      default: '',
    },
    producer: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    brand: {
      type: String,
      default: '',
    },
    period: {
      type: String,
      default: '',
    },
    material: {
      type: String,
      default: '',
    },
    radius: {
      type: String,
      default: '',
    },
  },
  methods: {
    ...mapMutations(['SET_POPOVER']),
    openPopoverPeriod() {
      this.SET_POPOVER({
        show: true,
        message: [
          'Максимальный срок использования линзы. После этого срока применять линзы нельзя, так как это может плохо сказаться на здоровье ваших глаз.',
        ],
      });
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #6f6f6f;
}

.text {
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-align: start;
  margin: 0;
  padding: 0;
}

.btn-question-period {
  position: absolute;
  margin: 0 auto;
  top: -15px;
  left: 86px;
}

.btn-question-radius {
  position: absolute;
  margin: 0 auto;
  top: -15px;
  left: 114px;
}

.icon {
  width: 15px;
  height: 15px;
}
</style>
