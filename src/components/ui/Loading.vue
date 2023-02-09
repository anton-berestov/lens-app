<template>
  <ion-backdrop :visible="true" class="backdrop"></ion-backdrop>
  <ion-item lines="none" class="spinner">
    <ion-spinner></ion-spinner>
    <ion-label class="ion-margin-start">Загрузка...</ion-label>
  </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  // IonLoading,
  // IonContent,
  IonItem,
  IonBackdrop,
  IonSpinner,
  IonLabel,
} from '@ionic/vue';

export default defineComponent({
  name: 'Loading',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  components: {
    // IonLoading,
    // IonContent,
    IonItem,
    IonBackdrop,
    IonSpinner,
    IonLabel,
  },
});
</script>

<style>
.backdrop {
  opacity: 0.1;
}

.spinner {
  margin: auto;
}

ion-loading.loader {
  --spinner-color: #005944;
}
</style>
