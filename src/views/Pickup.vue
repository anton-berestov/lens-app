<template>
  <ion-page id="pickup">
    <Header title="Оформление заказа" back />
    <ion-content>
      <ion-row class="ion-padding-top ion-padding-start ion-padding-end">
        <Segment
          title-left="Самовывоз"
          title-right="Курьер"
          @change="handler = $event"
        />
      </ion-row>
      <Address title="Адрес получения" v-if="handler === 'left'" />

      <ion-card class="delivery" v-if="handler === 'right'">
        <ion-card-content class="content">
          <ion-row class="ion-align-items-center">
            <ion-icon
              icon="assets/icon/delivery.svg"
              class="ion-margin-end icon"
            />
            <ion-label class="title">Адрес доставки</ion-label>
          </ion-row>

          <ion-item>
            <ion-label position="floating" class="label">Улица,дом*</ion-label>
            <ion-input v-model="delivery.street"></ion-input>
          </ion-item>
          <ion-row class="ion-nowrap">
            <ion-item>
              <ion-label position="floating" class="label">Квартира</ion-label>
              <ion-input v-model="delivery.apartment"></ion-input>
            </ion-item>
            <ion-item class="ion-margin-start">
              <ion-label position="floating" class="label">Подъезд</ion-label>
              <ion-input v-model="delivery.entrance"></ion-input>
            </ion-item>
            <ion-item class="ion-margin-start">
              <ion-label position="floating" class="label">Этаж</ion-label>
              <ion-input v-model="delivery.floor"></ion-input>
            </ion-item>
          </ion-row>

          <ion-item>
            <ion-label position="floating" class="label"
              >Комментарий курьеру
            </ion-label>
            <ion-input v-model="delivery.comment"></ion-input>
          </ion-item>

          <ion-item lines="none" class="ion-margin-top">
            <ion-checkbox
              slot="start"
              v-model="delivery.rememberAddress"
            ></ion-checkbox>
            <ion-label class="checkbox-title">Запомнить адрес</ion-label>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <CardInfo
        title="Дата получения"
        :icon="handlerIconCalendar"
        description="16 октября - ориентировочная дата получения. Мы дополнительно сообщим вам о доставке."
      />

      <CardInfo
        title="Оплата"
        :icon="handlerIconPayment"
        description="Оплата товара при получении"
      />

      <ion-list class="contact-form">
        <ion-row class="ion-margin-top ion-margin-start">
          <ion-label class="title">Контактные данные</ion-label>
        </ion-row>
        <ion-item class="item">
          <ion-label position="floating" class="label">Фамимлия*</ion-label>
          <ion-input v-model="contact.firstname"></ion-input>
        </ion-item>
        <ion-item class="item">
          <ion-label position="floating" class="label">Имя*</ion-label>
          <ion-input v-model="contact.lastname"></ion-input>
        </ion-item>
        <ion-item class="item">
          <ion-label position="floating" class="label">Отчество*</ion-label>
          <ion-input v-model="contact.patronymic"></ion-input>
        </ion-item>
        <ion-item class="item">
          <ion-label position="floating" class="label">Дата рождения</ion-label>
          <ion-input v-model="contact.birthday"></ion-input>
        </ion-item>
        <ion-item class="item">
          <ion-label position="floating" class="label">Email</ion-label>
          <ion-input v-model="contact.email" type="email"></ion-input>
        </ion-item>

        <Button title="Оформить заказ" class="button-checkout" />

        <ion-row class="ion-margin">
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
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonRow,
  IonList,
  IonCard,
  IonCardContent,
  IonIcon,
  IonLabel,
  IonInput,
  IonItem,
  IonCheckbox,
  IonText,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Segment from '@/components/ui/Segment.vue';
import Address from '@/components/Address.vue';
import CardInfo from '@/components/CardInfo.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'Pickup',
  components: {
    Button,
    CardInfo,
    Address,
    Segment,
    Header,
    IonPage,
    IonContent,
    IonRow,
    IonList,
    IonCard,
    IonCardContent,
    IonIcon,
    IonLabel,
    IonInput,
    IonItem,
    IonCheckbox,
    IonText,
  },
  data() {
    return {
      handler: 'left',
      delivery: {
        street: '',
        apartment: '',
        entrance: '',
        floor: '',
        comment: '',
        rememberAddress: false,
      },
      contact: {
        firstname: '',
        lastname: '',
        patronymic: '',
        phone: '',
        birthday: '',
        email: '',
      },
    };
  },
  computed: {
    handlerIconCalendar() {
      return this.handler === 'left'
        ? 'assets/icon/calendar-pickup.svg'
        : 'assets/icon/calendar-courier.svg';
    },
    handlerIconPayment() {
      return this.handler === 'left'
        ? 'assets/icon/payment-pickup.svg'
        : 'assets/icon/payment-courier.svg';
    },
  },
};
</script>

<style lang="scss">
#pickup {
  .delivery {
    ion-item {
      --padding-start: 0;
    }

    .content {
      .icon {
        width: 24px;
        height: 24px;
      }

      .title {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
      }
    }

    .label {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: #bbbbbb;
      margin-top: 16px;
    }

    .checkbox-title {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: #000000;
    }

    ion-checkbox {
      --border-radius: 5px !important;
    }
  }

  .contact-form {
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }

    .item {
      padding-right: 20px;

      .label {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #bbbbbb;
        margin-top: 16px;
      }
    }
  }

  .button-checkout {
    margin: 0 10px 0 10px;
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
}
</style>
