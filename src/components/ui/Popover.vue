<template>
  <ion-modal :is-open="popover.show" class="popover" :animated="false">
    <div id="box">
      <div v-if="popover.message.length">
        <p
          class="text"
          v-for="(message, index) in popover.message"
          :key="index"
        >
          {{ message }}
        </p>
      </div>

      <div class="btn-wrapper">
        <ion-buttons>
          <ion-button class="btn" @click="hide">ОК</ion-button>
        </ion-buttons>
      </div>
    </div>
  </ion-modal>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButtons, IonButton, IonModal } from '@ionic/vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'Popover',
  components: {
    IonButtons,
    IonButton,
    IonModal,
  },
  computed: {
    ...mapGetters(['popover']),
  },
  methods: {
    ...mapMutations(['SET_POPOVER']),
    hide() {
      this.SET_POPOVER({ show: false, message: [] });
    },
  },
});
</script>

<style lang="scss">
.popover {
  --background: rgba(37, 32, 32, 0.5);
}

#box {
  position: fixed;
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
