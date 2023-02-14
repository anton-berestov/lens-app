<template>
  <ion-page id="check-recording">
    <Header back title="Визит к врачу" />
    <ion-content :scroll-y="false">
      <CardInfo
        title="Дата и время визита"
        icon="assets/icon/calendar-pickup.svg"
        description="21 октября 2022"
        subdescription="11:00"
      />
      <CardInfo
        title="Адрес оптики"
        icon="assets/icon/location-profile.svg"
        description="ул. Енисейская, 23Д пом. 102"
      />

      <ion-card class="card-info">
        <ion-card-content class="content">
          <ion-row class="ion-nowrap ion-align-items-center">
            <ion-row>
              <ion-row class="ion-align-items-center">
                <ion-icon
                  icon="assets/icon/doctor.svg"
                  class="ion-margin-end icon"
                />
                <ion-label class="title">Врач</ion-label>
              </ion-row>

              <ion-row class="description-row">
                <ion-label class="description">
                  Иванова Анастасия Игоревна
                </ion-label>
                <ion-label class="description" style="margin-top: 8px">
                  +7 999 999-99-99
                </ion-label>
              </ion-row>
            </ion-row>
            <ion-avatar style="width: 40%; height: 100%">
              <img src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </ion-avatar>
          </ion-row>
        </ion-card-content>
      </ion-card>

      <Button title="Записаться" class="recording-button" @click="recording" />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonRow,
  IonIcon,
  IonLabel,
  IonAvatar,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import CardInfo from '@/components/CardInfo.vue';
import Button from '@/components/ui/Button.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'CheckRecording',
  components: {
    Button,
    CardInfo,
    Header,
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonRow,
    IonIcon,
    IonLabel,
    IonAvatar,
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    recording() {
      if (!this.token) {
        this.$router.push({ name: 'Auth', params: { redirect: 'Recording' } });
      } else {
        this.$router.replace({ name: 'CheckData' });
      }
    },
  },
});
</script>

<style lang="scss">
#check-recording {
  .recording-button {
    left: 0;
    position: absolute;
    bottom: 30px;
    right: 0;
    margin: 0 10px;
  }
}
</style>
