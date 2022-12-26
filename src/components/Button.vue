<template>
  <ion-buttons>
    <ion-button fill="solid" class="custom-btn">{{ title }}</ion-button>
  </ion-buttons>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButton, IonButtons } from '@ionic/vue';

export default defineComponent({
  name: 'Button',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  components: {
    IonButton,
    IonButtons,
  },
});
</script>

<style scoped>
.custom-btn {
  width: 320px;
  height: 41px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}
</style>
