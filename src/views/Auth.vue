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

        <ion-row>
          <Button
            title="Получить код"
            :disabled="disabled"
            class="button-code"
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
      if (this.phone.length === 18) {
        this.disabled = false;
      }
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
  .button-code {
    width: 100%;
  }
}
</style>
