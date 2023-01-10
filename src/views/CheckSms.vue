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
            <input
              inputmode="tel"
              ref="code1"
              class="input"
              maxlength="1"
              v-model="smsCode1"
              @keyup="changeCode"
            />
            <input
              inputmode="tel"
              ref="code2"
              class="input"
              maxlength="1"
              v-model="smsCode2"
              @keyup="changeCode"
            />
            <input
              inputmode="tel"
              ref="code3"
              class="input"
              maxlength="1"
              v-model="smsCode4"
              @keyup="changeCode"
            />
            <input
              inputmode="tel"
              ref="code4"
              class="input"
              maxlength="1"
              v-model="smsCode4"
              @keyup="changeCode"
            />
          </ion-item>
        </ion-row>

        <ion-row class="row">
          <Button title="Повторный код" class="button-code" />
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
  },
  data() {
    return {
      smsCode1: '',
      smsCode2: '',
      smsCode3: '',
      smsCode4: '',
    };
  },
  methods: {
    setFocus: function () {
      this.$refs.code1.focus();
    },
    changeCode() {
      return this.smsCode1.length
        ? this.$refs.code2.focus()
        : this.smsCode2.length
        ? this.$refs.code3.focus()
        : this.smsCode3.length
        ? this.$refs.code4.focus()
        : this.$refs.code1.focus();
    },
  },

  created() {
    setTimeout((x) => {
      this.$nextTick(() => this.setFocus());
    }, 1000);
  },
});
</script>

<style scoped lang="scss">
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
    }
  }
}
</style>
