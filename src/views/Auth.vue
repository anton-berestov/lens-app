<template>
  <ion-page>
    <Header title="Вход" back />
    <ion-content :scroll-y="false" id="auth">
      <ion-list class="list">
        <ion-row class="ion-margin">
          <ion-label class="text"
            >Для авторизации введите номер телефона
          </ion-label>
        </ion-row>
        <ion-row>
          <ion-item class="input-item">
            <input
              type="tel"
              ref="phone"
              class="input"
              v-model="phone"
              v-maska="{
                mask: '+7 (###) ###-##-##',
              }"
              @keyup="changePhone"
              @focus="phone === '' ? (phone = '+7 (') : null"
            />
          </ion-item>
        </ion-row>

        <ion-row class="row">
          <Button
            title="Получить код"
            :disabled="disabled"
            class="button-code"
          />
          <ion-label class="ion-margin-start ion-margin-end data-text"
            >Оформляя заказ, вы даете согласие на
            <a href="#">обработку персональных данных</a>
          </ion-label>
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
  IonRow,
  IonLabel,
  IonItem,
  // IonInput,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';

export default defineComponent({
  name: 'Auth',
  components: {
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
    IonRow,
    IonLabel,
    IonItem,
    // IonInput,
  },
  data() {
    return {
      phone: '',
      disabled: true,
    };
  },
  methods: {
    changePhone() {
      this.phone.length === 18
        ? (this.disabled = false)
        : (this.disabled = true);
    },
  },
});
</script>

<style scoped lang="scss">
#auth {
  .list {
    height: 100%;

    .text {
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
    }
  }

  .input-item {
    width: 94%;

    .input {
      border: none;
      width: 100%;
    }

    .input:focus {
      outline: none;
    }
  }

  .row {
    position: absolute;
    bottom: 30px;
    justify-content: center;
    width: 100%;
    display: flex;

    .button-code {
      width: 100%;
      margin: 0 5px;
    }

    .data-text {
      font-weight: 400;
      font-size: 12px;
      line-height: 130%;
      color: #6f6f6f;

      a {
        color: #097ac6;
        text-decoration: none;
      }
    }
  }
}
</style>
