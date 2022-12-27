<template>
  <ion-modal
    :is-open="show"
    :initial-breakpoint="0.7"
    @didDismiss="$emit('hide')"
    class="filter-modal"
  >
    <ion-content scroll-y>
      <ion-col>
        <ion-row class="ion-justify-content-center">
          <ion-icon icon="assets/icon/line-menu.svg" class="show-hide-icon" />
          <ion-title class="title">Фильтры</ion-title>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-title class="text">Срок замены</ion-title>
        </ion-row>
        <ion-row class="ion-margin">
          <MultipleButton
            v-model="filter.period"
            :options="periods"
            :checked="filter.period"
          />
        </ion-row>

        {{ filter.period }}

        <ion-row class="ion-margin" style="position: relative">
          <ion-title class="text">Тип линз</ion-title>
        </ion-row>
        <ion-row class="ion-margin">
          <MultipleButton
            :options="types"
            :checked="filter.type"
            v-model="filter.type"
          />
        </ion-row>

        <ion-row class="ion-margin" :class="{ activeClass: isActive }">
          <ion-col style="padding-left: 0">
            <ion-title class="text">Сфера</ion-title>
            <Select
              :options="sphere"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openItems($event)"
            />
          </ion-col>
          <ion-col style="padding-right: 0">
            <ion-title class="text">Радиус кривизны</ion-title>
            <Select
              :options="radius"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openItems($event)"
            />
          </ion-col>
        </ion-row>

        <ion-row
          class="ion-margin ion-justify-content-center"
          v-if="!selectedPeriod.length"
        >
          <Button
            title="Закрыть"
            @click="$emit('hide')"
            class="ion-margin-top"
          />
        </ion-row>

        <ion-row
          class="ion-margin ion-justify-content-between"
          style="margin-bottom: 200px"
          v-if="selectedPeriod.length"
        >
          <ion-buttons>
            <ion-button
              fill="solid"
              style="color: #ffffff"
              class="action-button"
              >Применить
            </ion-button>
          </ion-buttons>
          <ion-buttons>
            <ion-button fill="outline" class="action-button"
              >Сбросить
            </ion-button>
          </ion-buttons>
        </ion-row>
      </ion-col>
    </ion-content>
  </ion-modal>
  <Popover :types="types" />
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {
  IonModal,
  IonContent,
  IonRow,
  IonTitle,
  IonButtons,
  IonButton,
  IonCol,
  IonIcon,
} from '@ionic/vue';
import Select from '@/components/Select.vue';
import Button from '@/components/Button.vue'
import Popover from "@/components/Popover.vue";
import MultipleButton from "@/components/MultipleButton.vue";
import {mapMutations} from "vuex";
import types from '../../public/mocha/types.json';
import periods from '../../public/mocha/periods.json';
import sphere from '../../public/mocha/sphere.json';
import radius from '../../public/mocha/radius.json';


export default defineComponent({
  name: 'Filter',
  props: {
    show: {
      type: Boolean,
      default: false,
    },

  },
  emits: ['hide'],
  components: {
    Select,
    MultipleButton,
    Button,
    IonModal,
    IonContent,
    IonRow,
    IonTitle,
    IonButtons,
    IonButton,
    IonCol,
    IonIcon,
    Popover
  },
  data: () => ({
    isActive: false,
    types: types,
    periods: periods,
    sphere: sphere,
    radius: radius,
    filter: {
      period: [],
      type: [],
    },
    selectedPeriod: [],
    activePeriod: false
  }),
  methods: {
    ...mapMutations(['SET_POPOVER']),
    openItems(e) {
      this.isActive = e;
    },
    openPopover() {
      this.SET_POPOVER(true)
    },
  },
});
</script>

<style lang="scss">
.filter-modal {
  ion-content {
    --background: #ffffff !important;
  }

  .buttons {
    margin: 8px;
  }

  .show-hide-icon {
    width: 46px;
    height: 3px;
    margin-top: -5px;
    margin-bottom: 10px;
  }

  .title {
    display: contents;
    font-size: 14px;
    font-weight: 600;
  }

  .text {
    text-align: start;
    display: contents;
    font-size: 14px;
    font-weight: 500;
  }

  ion-button {
    color: #000000;
  }

  .btn {
    width: 130px;
  }

  .select {
    width: 150px;

    .icon-check-mark {
      width: 8px;
      height: 4px;
    }
  }

  .action-button {
    width: 150px;
    height: 40px;
    border-radius: 5px;
    font-weight: 600;
    font-size: 14px;
  }

  .active {
    background: #005944;
  }

  .btn-question {
    position: absolute;
    margin: 0 auto;
    left: 60px;
    top: -17px;

    .icon-for-type {
      width: 15px;
      height: 15px;
    }
  }

  .activeClass {
    margin-bottom: 170px;
  }
}

.button-outline {
  border: 1px solid #e7e7e7 !important;
  border-radius: 10px !important;
}

.button-native {
  border: none !important;
}
</style>
