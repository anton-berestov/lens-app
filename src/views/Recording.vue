<template>
  <ion-page>
    <Header title="Запись к врачу" contact />
    <ion-content :fullscreen="true">
      <ion-item-group>
        <ion-item-divider>
          <ion-label>Выберите дату</ion-label>
        </ion-item-divider>
        <ion-datetime></ion-datetime>
      </ion-item-group>
      <ion-item-group>
        <ion-item-divider>
          <ion-label>Выберите время</ion-label>
        </ion-item-divider>

        <TimeSelect></TimeSelect>
      </ion-item-group>
      <ion-item-group id="service">
        <ion-item-divider>
          <ion-label>Выберите услугу</ion-label>
        </ion-item-divider>
        <ion-grid>
          <ion-row>
            <ion-col size="6">
              <ion-button>Подбор очковой коррекции</ion-button>
            </ion-col>
            <ion-col size="6">
              <ion-button fill="outline"
                >Подбор контактной коррекции</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item-group>
      <Button title="Продолжить" id="next-step"></Button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonItemGroup,
  IonDatetime,
  IonItemDivider,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import TimeSelect from '@/components/TimeSelect.vue';
import Button from '@/components/ui/Button.vue';

export default defineComponent({
  name: 'Recording',
  components: {
    Button,
    TimeSelect,
    IonContent,
    IonPage,
    Header,
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonDatetime,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
  },
});
</script>

<style lang="scss" scoped>
ion-item-divider {
  background: transparent;
  margin: 16px 0 12px 0;
}

ion-label {
  color: var(--ion-color-dark-contrast);
}

#service {
  ion-col {
    ion-button {
      width: 100%;
      white-space: pre-wrap;
      font-size: 12px;

      --padding-start: auto;
      --padding-end: auto;

      --padding-top: 5px;
      --padding-bottom: 5px;
    }

    &:first-child {
      margin-right: 0;
      padding-right: 0;

      ion-button {
        --border-radius: 5px 0 0 5px;
      }
    }

    &:last-child {
      margin-left: 0;
      padding-left: 0;

      ion-button {
        --border-radius: 0 5px 5px 0;
      }
    }
  }

  margin-bottom: 34px;
}

#next-step {
  width: 98%;
}
</style>
