<template>
  <ion-modal
    :is-open="show"
    :initial-breakpoint="0.7"
    @didDismiss="$emit('hide')"
    class="filter-modal"
  >
    <Header title="Фильтры" />
    <ion-content class="ion-padding">
      <ion-row>
        <IonTitle class="title">Срок замены</IonTitle>
      </ion-row>
      <ion-row class="ion-justify-content-between">
        <ion-buttons>
          <ion-button fill="outline">Однодневные</ion-button>
          <ion-button fill="outline">На 2 недели</ion-button>
        </ion-buttons>
        <ion-buttons>
          <ion-button fill="outline">На 1 месяц</ion-button>
          <ion-button fill="outline">На 3 месяца</ion-button>
        </ion-buttons>
      </ion-row>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonModal,
  IonContent,
  IonRow,
  IonTitle,
  IonButtons,
  IonButton,
} from '@ionic/vue';
import Header from '@/components/Header.vue';

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
    Header,
    IonModal,
    IonContent,
    IonRow,
    IonTitle,
    IonButtons,
    IonButton,
  },
});
</script>

<style lang="scss">
.filter-modal {
  ion-content {
    --background: #ffffff !important;
  }
  .title {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
