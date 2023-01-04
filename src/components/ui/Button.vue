<template>
  <ion-buttons class="btn">
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
  width: 100%;
  height: 41px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  margin: 30px 10px;
}
.custom-btn:hover {
  --background: #00795d;
}
</style>
