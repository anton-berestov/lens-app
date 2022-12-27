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
          <ion-buttons>
            <ion-button fill="outline" class="btn">Однодневные</ion-button>
          </ion-buttons>
          <ion-buttons>
            <ion-button fill="outline" class="btn" style="margin-left: 16px"
              >На 2 недели
            </ion-button>
          </ion-buttons>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-buttons>
            <ion-button fill="outline" class="btn">На 1 месяц</ion-button>
          </ion-buttons>
          <ion-buttons>
            <ion-button fill="outline" class="btn" style="margin-left: 16px">
              На 3 месяца
            </ion-button>
          </ion-buttons>
        </ion-row>

        <ion-row class="ion-margin" style="position: relative">
          <ion-title class="text">Тип линз</ion-title>
          <ion-buttons class="btn-question">
            <ion-button>
              <ion-icon
                icon="assets/icon/question.svg"
                slot="icon-only"
                class="icon-for-type"
              />
            </ion-button>
          </ion-buttons>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-buttons>
            <ion-button fill="outline">Торические</ion-button>
          </ion-buttons>
          <ion-buttons>
            <ion-button fill="outline" style="margin-left: 16px"
              >Мультифокальные
            </ion-button>
          </ion-buttons>
          <ion-buttons>
            <ion-button fill="outline" style="margin-left: 16px"
              >Простые
            </ion-button>
          </ion-buttons>
        </ion-row>

        <ion-row class="ion-margin" :class="{ activeClass: isActive }">
          <ion-col style="padding-left: 0">
            <ion-title class="text">Сфера</ion-title>
            <Select
              :options="options"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openItems($event)"
            />
          </ion-col>
          <ion-col style="padding-right: 0">
            <ion-title class="text">Радиус кривизны</ion-title>
            <Select
              :options="options"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openItems($event)"
            />
          </ion-col>
        </ion-row>

        <ion-row class="ion-margin ion-justify-content-center">
          <Button title="Закрыть" @click="$emit('hide')" />
        </ion-row>

        <ion-row
          class="ion-margin ion-justify-content-between"
          style="margin-bottom: 200px"
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


export default defineComponent({
  name: 'Filter',
  props: {
    show: {
      type: Boolean,
      default: false,
    },

  },
  emits: ['hide', 'visible'],
  components: {
    Select,
    Button,
    IonModal,
    IonContent,
    IonRow,
    IonTitle,
    IonButtons,
    IonButton,
    IonCol,
    IonIcon
  },
  data: () => ({
    options: [
      {id: 1, value: '-20,00'},
      {id: 2, value: '-20,00'},
      {id: 3, value: '-20,00'},
      {id: 4, value: '-20,00'},
      {id: 5, value: '-20,00'},
      {id: 6, value: '-20,00'},
      {id: 7, value: '-20,00'},
      {id: 8, value: '-20,00'},
      {id: 9, value: '-20,00'},
      {id: 10, value: '-20,00'},
      {id: 11, value: '-20,00'},
      {id: 12, value: '-20,00'},
      {id: 13, value: '-20,00'},
    ],
    isActive: false,
  }),
  methods: {
    openItems(e) {
      this.isActive = e;
    },
  },
});
</script>

<style lang="scss">
.filter-modal {
  ion-content {
    --background: #ffffff !important;
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
