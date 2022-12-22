<template>
  <ion-button class="custom-btn">{{ title }}</ion-button>
</template>

<script>
import {defineComponent} from "vue";
import {IonButton} from "@ionic/vue";

export default defineComponent({
  name: "Button",
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    IonButton
  }
})
</script>

<style scoped>
.custom-btn {
  width: 320px;
  border-radius: 5px;
}
</style>