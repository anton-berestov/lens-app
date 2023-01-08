<template>
  <ion-page>
    <Header title="Параметры" contact />
    <ion-content class="params-content">
      <ion-row class="ion-margin">
        <ion-label>Для добавления в корзину выберите параметры линз</ion-label>
      </ion-row>
      <ion-row class="ion-padding">
        <Segment
          title-left="Одинаковые"
          title-right="Разные"
          @change="activeSegment"
        />
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonRow, IonLabel, IonContent } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Segment from '@/components/ui/Segment.vue';

export default defineComponent({
  name: 'Params',
  components: {
    Segment,
    Header,
    IonPage,
    IonRow,
    IonLabel,
    IonContent,
  },
  methods: {
    activeSegment(val) {
      console.log(val);
    },
  },
});
</script>

<style scoped lang="scss">
ion-content {
  --background: #ffffff;
}
</style>
