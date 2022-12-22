<template>
  <ion-page>
    <Header title="Каталог"/>
    <ion-content :fullscreen="true">

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {
  IonPage,
  IonContent,
} from '@ionic/vue';
import Header from "@/components/Header.vue";

export default defineComponent({
  name: 'Catalog',
  components: {
    Header,
    IonContent,
    IonPage,
  },
});
</script>
