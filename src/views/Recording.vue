<template>
  <ion-page id="recording">
    <Header title="Запись к врачу" contact />
    <ion-content :fullscreen="true">
      <ion-row class="ion-margin">
        <ion-label class="ion-margin-bottom title">Выберите дату</ion-label>
        <ion-datetime
          presentation="date"
          locale="ru-RU"
          size="cover"
          ref="calendar"
        >
        </ion-datetime>
      </ion-row>

      <ion-row class="ion-margin time">
        <ion-label class="ion-margin-bottom title">Выберите время</ion-label>
        <TimeSelect />
      </ion-row>

      <ion-row class="ion-padding">
        <ion-label class="ion-margin-bottom title">Выберите услугу</ion-label>
        <Segment
          title-left="Подбор очковой коррекции"
          title-right="Подбор контактной коррекции"
        />
      </ion-row>

      <Button title="Продолжить" id="next-step"></Button>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {IonPage, IonContent, IonDatetime, IonLabel, IonRow} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import TimeSelect from '@/components/TimeSelect.vue';
import Button from '@/components/ui/Button.vue';
import Segment from '@/components/ui/Segment.vue';

export default defineComponent({
  name: 'Recording',
  components: {
    Segment,
    Button,
    TimeSelect,
    IonContent,
    IonPage,
    Header,
    IonLabel,
    IonDatetime,
    IonRow,
  },
  mounted() {
    setTimeout(() => {
      const shadow = this.$refs.calendar?.$el.shadowRoot;

      const days = shadow.querySelectorAll('.calendar-day');
      const day_of_week = shadow.querySelectorAll('.day-of-week')

      day_of_week.forEach((el) => {
        el.setAttribute('part', 'day-of-week')
      })

      days.forEach((day) => {
        day.setAttribute('part', 'day');
      });
    }, 100);
  },
});
</script>

<style lang="scss">
#recording {
  .title {
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #000000;
  }

  .time {
    flex-direction: column;
  }

  ion-datetime {
    --background: #ffffff;
    border-radius: 5px;
    min-height: 250px;
    --font-size: 11px !important;

    &::part(day) {
      font-weight: 400;
      font-size: 11px !important;
      color: #616161 !important;

      &::after {
        padding: 0;
        padding-inline: 0;
      }
    }

    &::part(day-of-week) {
      font-weight: 400;
      font-size: 11px !important;
      color: #616161 !important;
    }
  }
}
</style>
