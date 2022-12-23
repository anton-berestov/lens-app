<template>
  <ion-modal
    :is-open="show"
    :initial-breakpoint="0.7"
    @didDismiss="$emit('hide')"
    class="filter-modal"
  >
    <Header title="Фильтры" />
    <ion-content class="ion-padding"> </ion-content>
    <IonRow>
      <IonTitle class="title">Срок замены</IonTitle>
    </IonRow>
  </ion-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonModal, IonContent, IonRow, IonTitle } from '@ionic/vue';
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
