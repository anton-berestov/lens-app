<template>
  <ion-page>
    <Header title="Вход" back />
    <ion-content :scroll-y="false" id="check-sms">
      <ion-list class="list">
        <ion-row class="ion-margin">
          <ion-label class="text">Введите код подтверждения из SMS</ion-label>
        </ion-row>
        <ion-row>
          <ion-item lines="none" class="input-item">
            <v-otp-input
              ref="code"
              input-classes="input"
              separator=""
              inputmode="tel"
              :num-inputs="6"
              :should-auto-focus="true"
              :is-input-num="true"
              :conditionalClass="['one', 'two', 'three', 'four']"
              @on-complete="handleOnComplete"
            />
          </ion-item>
        </ion-row>

        <ion-row class="ion-margin row" v-if="!repeat">
          <ion-label class="repeat-title">
            {{
              `Повторная отправка кода подтверждения возможна через ${currentTime} сек`
            }}
          </ion-label>
        </ion-row>
        <ion-row class="row" v-if="repeat">
          <Button
            title="Повторный код"
            class="button-code"
            @click="repeatCode"
          />
        </ion-row>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';
import VOtpInput from 'vue3-otp-input';
import { mapActions, mapGetters } from 'vuex';
import { PATH_BASKET_CHECK_SMS } from '@/router/constants';

export default defineComponent({
  name: 'CheckSms',
  components: {
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonRow,
    VOtpInput,
  },
  data() {
    return {
      repeat: false,
      currentTime: 60,
      timer: null,
    };
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.repeat = true;
        this.stopTimer();
      }
    },
  },
  computed: {
    ...mapGetters(['token', 'user']),
  },
  methods: {
    ...mapActions(['sendPhone', 'checkSmsCode']),
    setFocus() {
      this.$refs.code.focusInput(0);
    },
    async handleOnComplete(value) {
      const phone = localStorage.getItem('phone');
      await this.checkSmsCode({ phone, message: value });
      this.handlerRoute();
    },
    handlerRoute() {
      if (
        this.token &&
        this.user.firstname &&
        this.user.lastname &&
        this.user.patronymic
      ) {
        this.$router.replace({ name: 'Profile' });
      }
      if (
        (this.token &&
          this.user.firstname &&
          this.user.lastname &&
          this.user.patronymic,
        PATH_BASKET_CHECK_SMS)
      ) {
        this.$router.replace({ name: 'Pickup' });
      }
    },
    repeatCode() {
      this.currentTime = 60;
      this.startTimer();
      this.repeat = false;
      const phone = localStorage.getItem('phone');
      this.sendPhone({ phone });
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--;
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
    },
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => this.setFocus());
    }, 1000);
    this.startTimer();
  },
  unmounted() {
    this.stopTimer();
  },
});
</script>

<style lang="scss">
#check-sms {
  .list {
    height: 100%;

    .text {
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
    }

    .input-item {
      .input {
        border: none;
        border-bottom: 1px solid #dfdfdf;
        width: 25px;
        margin-right: 15px;
        text-align: center;
      }

      .input:focus {
        outline: none;
      }
    }

    .row {
      .button-code {
        width: 100%;
        margin: 0 5px;
      }

      .repeat-title {
        font-weight: 400;
        font-size: 12px;
        line-height: 130%;
        color: #6f6f6f;
      }
    }
  }
}
</style>
