<template>
  <ion-content>
    <ion-loading
      :is-open="isOpen"
      cssClass="loader"
      message="Загрузка..."
      @didDismiss="$emit('close')"
    >
    </ion-loading>
  </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import { IonLoading, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'Loading',
  props: {
    isOpen: {
      type: Boolean,
      default: true,
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
