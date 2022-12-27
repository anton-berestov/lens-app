<template>
  <ion-backdrop :visible="true"></ion-backdrop>
  <div class="ion-page" id="box">
    <ion-content :scroll-y="false">
      <p class="text">
        Торические линзы предназначены для людей с астигматизмом.
      </p>
      <p class="text">
        Мультифокальные линзы предназначены для людей с несколькими нарушениями
        зрения.
      </p>
      <p class="text">
        Простые предназначены для людей без вышеописанных нарушений зрения
      </p>

      <div class="btn-wrapper">
        <ion-buttons>
          <ion-button class="btn" @click="$emit('hide')">ОК</ion-button>
        </ion-buttons>
      </div>
      <div></div>
    </ion-content>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { IonBackdrop, IonButtons, IonButton, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'Popover',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['hide'],
  components: {
    IonBackdrop,
    IonButtons,
    IonButton,
    IonContent,
  },
});
</script>

<style lang="scss">
ion-backdrop {
  opacity: 0.9;
  background: rgba(37, 32, 32, 0.5);
  z-index: 99999 !important;
}

#box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ion-background-color, #fff);
  width: 90%;
  border-radius: 10px;
  flex-direction: column;

  .text {
    font-weight: 600;
    font-size: 12px;
    margin: 10px 10px;
    line-height: 140%;
  }

  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-right: 16px;
    margin-bottom: 6px;

    .btn {
      font-weight: 400;
      font-size: 12px;
      color: #17a1fa;
      line-height: 15px;
    }
  }
}
</style>
