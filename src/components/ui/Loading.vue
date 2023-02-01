<template>
  <ion-content>
    <ion-loading
      ref="loader"
      :is-open="isOpen"
      cssClass="loader"
      message="Загрузка..."
      :duration="3000"
      @didDismiss="isOpen"
    >
    </ion-loading>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonLoading, IonContent } from '@ionic/vue';

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
    IonLoading,
    IonContent,
  },
});
</script>

<style>
ion-loading.loader {
  --spinner-color: #005944;
}
</style>
