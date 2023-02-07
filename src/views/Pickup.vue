<template>
  <ion-page id="pickup">
    <Header title="Оформление заказа" back />
    <ion-content>
      <ion-row class="ion-padding-top ion-padding-start ion-padding-end">
        <Segment
          title-left="Самовывоз"
          title-right="Курьер"
          @change="handlerSegment($event)"
          :disabled="handlerAmountDiscount"
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
            <ion-input
              v-model="delivery.street"
              label-placement="floating"
              label="Улица,дом*"
            ></ion-input>
          </ion-item>
          <ion-row class="ion-nowrap">
            <ion-item>
              <ion-input
                v-model="delivery.apartment"
                label-placement="floating"
                label="Квартира"
              ></ion-input>
            </ion-item>
            <ion-item class="ion-margin-start">
              <ion-input
                v-model="delivery.entrance"
                label-placement="floating"
                label="Подъезд"
              ></ion-input>
            </ion-item>
            <ion-item class="ion-margin-start">
              <ion-input
                v-model="delivery.floor"
                label-placement="floating"
                label="Этаж"
              ></ion-input>
            </ion-item>
          </ion-row>

          <ion-item>
            <ion-input
              v-model="delivery.comment"
              label-placement="floating"
              label="Комментарий курьеру"
            ></ion-input>
          </ion-item>

          <ion-item lines="none" class="ion-margin-top">
            <ion-checkbox
              slot="end"
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
        <ItemInput lines :error="errorFields.firstname">
          <ion-input
            v-model="fields.firstname"
            :error="errorFields.firstname"
            label-placement="floating"
            label="Фамилия*"
            required
          ></ion-input>
        </ItemInput>

        <ItemInput lines :error="errorFields.lastname">
          <ion-input
            v-model="fields.lastname"
            label-placement="floating"
            label="Имя*"
            required
          ></ion-input>
        </ItemInput>

        <ItemInput lines :error="errorFields.patronymic">
          <ion-input
            v-model="fields.patronymic"
            label-placement="floating"
            label="Отчество*"
            required
          ></ion-input>
        </ItemInput>

        <ItemInput lines>
          <ion-input
            v-model="fields.birthday"
            label-placement="floating"
            label="Дата рождения"
          ></ion-input>
        </ItemInput>

        <ItemInput lines>
          <ion-input
            v-model="fields.email"
            type="email"
            label-placement="floating"
            label="Email"
          ></ion-input>
        </ItemInput>
        <Button title="Оформить заказ" class="button-checkout" @click="send" />

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
    <Popover button-ok="OK" @handler="closePopover" />
  </ion-page>
</template>

<script lang="js">
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
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Popover from "@/components/ui/Popover.vue";
import {checkFields} from "@/helpers/from";
import ItemInput from "@/components/ui/ItemInput.vue";
import {sendOrderDetails} from "@/api/order";

export default {
  name: 'Pickup',
  components: {
    ItemInput,
    Popover,
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
  mounted() {
    this.fields.firstname = this.user.firstname;
    this.fields.lastname = this.user.lastname;
    this.fields.patronymic = this.user.patronymic;
    this.fields.birthday = this.user.birthday;
    this.fields.email = this.user.email;
    this.SET_BASKET_USER(this.user.id);
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
      fields: {
        firstname: null,
        lastname: null,
        patronymic: null,
        birthday: null,
        email: null,
      },
      errorFields: {},
      requiredFields: ['firstname', 'lastname', 'patronymic'],
    };
  },
  computed: {
    ...mapGetters(['user', 'basket']),
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
    handlerAmountDiscount() {
      return this.basket.total_discount < 2000
    }
  },
  methods: {
    checkFields,
    ...mapMutations(['SET_POPOVER', 'SET_USER', 'SET_BASKET_USER']),
    ...mapActions(['updateUser', 'sendOrderDetails']),
    async send() {
      if(this.handler === 'left' && !this.checkFields()) {
        const user = {...this.user}
        user.firstname = this.fields.firstname
        user.lastname = this.fields.lastname
        user.patronymic = this.fields.patronymic
        user.birthday = this.fields.birthday
        user.email = this.fields.email

        this.SET_USER(user)
        await this.updateUser(user)
        await this.sendOrderDetails(this.basket.order_product_details)
      }
    },
    handlerSegment(event) {
      if(event === 'right' && this.handlerAmountDiscount) {
        this.SET_POPOVER({
          show: true,
          message: [
            'Доставка курьером возможна при заказе от 2 000 ₽',
          ],
        });
      } else {
        this.handler = event
      }
    },
    closePopover() {
      this.SET_POPOVER({
        show: false,
        message: [],
      });
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

    input {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }
  }

  .button-checkout {
    margin: 0 2px 0 8px;
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
