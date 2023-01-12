<template>
  <ion-page>
    <Header back title="История обращений" />
    <Content id="record-history">
      <Info
        icon="assets/icon/empty-history.svg"
        title="У вас не было обращений к врачу"
      />
    </Content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage } from '@ionic/vue';
import Content from '@/components/ui/Content.vue';
import Header from '@/components/ui/Header.vue';
import Info from '@/components/ui/Info.vue';

export default defineComponent({
  name: 'RecordHistory',
  components: { Header, Content, Info, IonPage },
});
</script>

<style scoped></style>
