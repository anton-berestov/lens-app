<template>
  <ion-page>
    <Header title="Профиль" />
    <ion-content :fullscreen="true">

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
} from '@ionic/vue';
import Header from "@/components/Header.vue";

export default defineComponent({
  name: 'Profile',
  components: {
    Header,
    IonContent,
    IonPage,
  },
});
</script>
