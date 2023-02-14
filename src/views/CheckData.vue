<template>
  <ion-page id="check-data">
    <Header title="Проверка данных" />
    <ion-content :scroll-y="false" class="content">
      <ion-list class="ion-margin-end list">
        <ion-label class="ion-margin title">Контактные данные</ion-label>
        <ItemInput lines :error="errorFields.phone">
          <input
            inputmode="tel"
            ref="phone"
            class="input"
            v-model="fields.phone"
            v-maska="{
              mask: '+7 (###) ###-##-##',
            }"
          />
        </ItemInput>
        <ItemInput lines :error="errorFields.firstname">
          <ion-input
            v-model="fields.firstname"
            label-placement="floating"
            label="Фамилия*"
          ></ion-input>
        </ItemInput>

        <ItemInput lines :error="errorFields.lastname">
          <ion-input
            v-model="fields.lastname"
            label-placement="floating"
            label="Имя*"
          ></ion-input>
        </ItemInput>

        <ItemInput lines :error="errorFields.patronymic">
          <ion-input
            v-model="fields.patronymic"
            label-placement="floating"
            label="Отчество*"
          ></ion-input>
        </ItemInput>

        <ItemInput lines id="click-trigger" class="ion-align-items-end">
          <ion-input
            :value="formatDate(fields.birthday)"
            disabled
            label-placement="floating"
            label="Дата рождения"
          ></ion-input>
          <ion-icon icon="assets/icon/calendar-courier.svg" class="icon" />
        </ItemInput>

        <ItemDate v-model="fields.birthday" />
      </ion-list>

      <Button title="Сохранить" class="button" />

      <ion-row class="ion-margin-start">
        <ion-text class="text"
          >Оформляя заказ, вы даете согласие на
          <a href="#">обработку персональных данных</a></ion-text
        >
      </ion-row>
      <ion-row class="ion-margin">
        <ion-text class="text"
          >* Поля, отмеченные звездочкой, обязательны к заполнению
        </ion-text>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonInput,
  IonList,
  IonRow,
  IonText,
  IonLabel,
  IonIcon,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import ItemInput from '@/components/ui/ItemInput.vue';
import Button from '@/components/ui/Button.vue';
import { mapGetters } from 'vuex';
import { formatDate, formatPhone } from '@/helpers/formatter';
import ItemDate from '@/components/ui/ItemDate.vue';

export default defineComponent({
  name: 'CheckData',
  components: {
    ItemDate,
    Button,
    ItemInput,
    Header,
    IonPage,
    IonContent,
    IonInput,
    IonList,
    IonRow,
    IonText,
    IonLabel,
    IonIcon,
  },
  data() {
    return {
      fields: {
        id: 0,
        firstname: '',
        lastname: '',
        patronymic: '',
        phone: '',
        birthday: '',
        email: '',
      },
      loading: false,
      errorFields: {},
      requiredFields: ['phone', 'firstname', 'lastname', 'patronymic'],
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    formatDate,
    formatPhone,
    handlerPhone(event) {
      this.fields.phone = event;
    },
    openCalendar() {
      console.log('we');
    },
  },
  mounted() {
    this.fields = {
      id: this.user.id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      patronymic: this.user.patronymic,
      phone: this.user.phone,
      birthday: this.user.birthday,
    };
  },
});
</script>

<style scoped lang="scss">
#check-data {
  .content {
    --background: #ffffff;

    .list {
      margin-top: 35px;

      .title {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
      }

      .input {
        border: none;
        width: 100%;
        background: #ffffff;
      }

      .input:focus {
        outline: none;
      }

      .icon {
        margin-bottom: 4px;
      }
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

    .button {
      margin: 10px 16px 0 8px;
      left: 0;
      right: 0;
    }
  }
}

ion-popover {
  --width: 300px !important;
}
</style>
