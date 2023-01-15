<template>
  <ion-page id="check-profile">
    <Header title="Проверка данных" />
    <ion-content class="container">
      <ion-list class="ion-margin-end">
        <ion-item lines="none">
          <ion-label class="title">Контактные данные</ion-label>
        </ion-item>
        <ion-item class="input-wrp">
          <input
            placeholder=" "
            id="phone"
            v-model="fields.phone"
            v-maska="{
              mask: '+7 (###) ###-##-##',
            }"
            class="input"
            @keyup="changePhone"
            @focus="fields.phone === '' ? (fields.phone = '+7 (') : null"
          />
          <span position="floating" class="label floating-label" for="phone"
            >Номер телефона*
          </span>
        </ion-item>
        <ion-item>
          <ion-label position="floating" class="label">Фамимлия*</ion-label>
          <ion-input v-model="fields.firstname"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating" class="label">Имя*</ion-label>
          <ion-input v-model="fields.lastname"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating" class="label">Отчество*</ion-label>
          <ion-input v-model="fields.patronymic"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating" class="label">Дата рождения</ion-label>
          <ion-input v-model="fields.birthday"></ion-input>
        </ion-item>
      </ion-list>
      <Button title="Сохранить" class="button" :disabled="disabled" />
      <ion-row>
        <ion-label class="ion-margin label data-text"
          >Оформляя заказ, вы даете согласие на
          <a href="#">обработку персональных данных</a></ion-label
        >
      </ion-row>
      <ion-row>
        <ion-label class="ion-margin label note"
          >* Поля, отмеченные звездочкой, обязательны к заполнению
        </ion-label>
      </ion-row>
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
  IonInput,
  IonRow,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import { mapGetters } from 'vuex';
import Button from '@/components/ui/Button.vue';

export default defineComponent({
  name: 'CheckProfile',
  components: {
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonRow,
  },
  data() {
    return {
      fields: {
        phone: '',
        firstname: '',
        lastname: '',
        patronymic: '',
        birthday: '',
      },
      disabled: true,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    changePhone() {
      this.fields.phone.length === 18
        ? (this.disabled = false)
        : (this.disabled = true);
    },
  },
  mounted() {
    this.fields = {
      phone: this.user.phone,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      patronymic: this.user.patronymic,
      birthday: this.user.birthday,
    };
  },
});
</script>

<style scoped lang="scss">
#check-profile {
  .container {
    --background: #ffffff;

    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
    }

    .label {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: #bbbbbb;
    }

    .data-text {
      font-size: 10px;
      margin-top: 0;

      a {
        color: #097ac6;
        text-decoration: none;
      }
    }

    .input {
      border: none;
      width: 100%;
    }

    .input:focus {
      outline: none;
    }

    .note {
      font-size: 10px;
      margin-top: 0;
    }

    .button {
      margin: 0 10px;
    }

    .input-wrp {
      --min-height: 68px;
      align-items: end;
    }

    .input-wrp .input {
      width: 100%;
      outline: none;
      border: none;
      box-shadow: none !important;
      background-color: transparent;
      height: 34px;
      padding-bottom: 8px;
    }

    .input-wrp .floating-label {
      position: absolute;
      pointer-events: none;
      transition: 0.3s ease all;
      padding-bottom: 8px;
    }

    .input-wrp input:not(:placeholder-shown) ~ .floating-label,
    .input-wrp input:focus ~ .floating-label {
      bottom: 50%;
      left: 0;
      font-size: 10px;
      opacity: 1;
    }
  }
}
</style>
