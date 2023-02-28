<template>
  <ion-page id="check-recording">
    <Header back title="Визит к врачу" />
    <Loading v-if="loading" />
    <ion-content :scroll-y="false" v-if="!loading">
      <CardInfo
        v-if="date && handlerTime"
        title="Дата и время визита"
        icon="assets/icon/calendar-pickup.svg"
        :description="formatDate(date, 'DD MMMM YYYY')"
        :subdescription="handlerTime.time"
      />
      <Skeleton
        v-if="!date && handlerTime"
        class="ion-margin-start ion-margin-end"
      />

      <CardInfo
        v-if="handlerOpticAddress.city"
        title="Адрес оптики"
        icon="assets/icon/location-profile.svg"
        :description="`г. ${handlerOpticAddress.city}, ул. ${handlerOpticAddress.street}, ${handlerOpticAddress.number} пом. ${handlerOpticAddress.apartment}`"
      />
      <Skeleton
        v-if="!handlerOpticAddress.city"
        class="ion-margin-start ion-margin-end"
      />

      <ion-card class="card-info" v-if="handlerAvatar">
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
                  {{ handlerDoctor.name }}
                </ion-label>
                <ion-label class="description" style="margin-top: 8px">
                  {{ handlerDoctor.phone }}
                </ion-label>
              </ion-row>
            </ion-row>
            <ion-avatar style="width: 40%; height: 100%">
              <img :src="handlerAvatar" />
            </ion-avatar>
          </ion-row>
        </ion-card-content>
      </ion-card>
      <Skeleton v-if="!handlerAvatar" class="ion-margin-start ion-margin-end" />

      <ion-row class="ion-margin-start" v-if="handlerData">
        <ion-text class="text"
          >Оформляя заказ, вы даете согласие на
          <a href="#">обработку персональных данных</a></ion-text
        >
      </ion-row>

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
  IonText,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import CardInfo from '@/components/CardInfo.vue';
import Button from '@/components/ui/Button.vue';
import Loading from '@/components/ui/Loading.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { formatDate } from '@/helpers/formatter';
import { sendRecord } from '@/api/recording';
import Skeleton from '@/components/ui/Skeleton.vue';

export default defineComponent({
  name: 'CheckRecording',
  components: {
    Skeleton,
    Loading,
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
    IonText,
  },
  computed: {
    ...mapGetters([
      'token',
      'time',
      'date',
      'optic_address',
      'user',
      'service',
      'doctor',
    ]),
    handlerAvatar() {
      return this.handlerDoctor.avatar
        ? `${process.env.VUE_APP_API_PUBLIC}${this.handlerDoctor.avatar}`
        : 'https://ionicframework.com/docs/img/demos/avatar.svg';
    },
    handlerOpticAddress() {
      return this.opticAddress;
    },
    handlerData() {
      return (
        this.token &&
        this.user.id &&
        this.user.firstname &&
        this.user.lastname &&
        this.user.patronymic
      );
    },
    handlerDoctor() {
      return this.doctor;
    },
    handlerTime() {
      return this.time;
    },
    handlerDate() {
      return this.date;
    },
  },
  data() {
    return {
      loading: false,
      address: {},
    };
  },
  methods: {
    ...mapActions(['getAddress', 'getDoctor']),
    formatDate,
    async recording() {
      if (!this.token) {
        this.$router.push({ name: 'Auth', params: { redirect: 'Recording' } });
      }
      if (this.token && !this.handlerData) {
        this.$router.replace({ name: 'CheckData' });
      }
      if (this.handlerData) {
        this.loading = true;
        await sendRecord({
          date: this.handlerDate,
          reserved: true,
          doctor: this.handlerDoctor.id,
          optic: this.handlerDoctor.optica.data.id,
          recording: this.handlerTime.id,
          service: this.service,
          user: this.user.id,
        });
        this.$router.replace({ name: 'OrderRecording' });
        this.loading = false;
      }
    },
  },
  async mounted() {
    this.loading = true;
    await this.getDoctor();
    this.loading = false;
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

  .text {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #6f6f6f;

    a {
      color: #097ac6;
      text-decoration: none;
    }
  }
}
</style>
