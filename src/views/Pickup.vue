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

          <ItemInput lines :error="errorFields.street">
            <ion-input
              v-model="address.street"
              label-placement="floating"
              label="Улица,дом*"
            ></ion-input>
          </ItemInput>

          <ion-row class="ion-nowrap">
            <ItemInput lines>
              <ion-input
                v-model="address.apartment"
                label-placement="floating"
                label="Квартира"
                type="tel"
              ></ion-input>
            </ItemInput>
            <ItemInput lines class="ion-margin-start">
              <ion-input
                v-model="address.entrance"
                label-placement="floating"
                label="Подъезд"
                type="tel"
              ></ion-input>
            </ItemInput>
            <ItemInput lines class="ion-margin-start">
              <ion-input
                v-model="address.floor"
                label-placement="floating"
                label="Этаж"
                type="tel"
              ></ion-input>
            </ItemInput>
          </ion-row>

          <ItemInput lines>
            <ion-input
              v-model="address.comment"
              label-placement="floating"
              label="Комментарий курьеру"
            ></ion-input>
          </ItemInput>

          <ItemInput lines="none" class="ion-margin-top">
            <ion-checkbox
              v-model="address.rememberAddress"
              labelPlacement="end"
              justify="start"
            >
              <ion-label class="checkbox-title">Запомнить адрес</ion-label>
            </ion-checkbox>
          </ItemInput>
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
  IonCheckbox,
  IonText,
} from '@ionic/vue';
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Header from '@/components/ui/Header.vue';
import Segment from '@/components/ui/Segment.vue';
import Address from '@/components/Address.vue';
import CardInfo from '@/components/CardInfo.vue';
import Button from '@/components/ui/Button.vue';
import ItemInput from "@/components/ui/ItemInput.vue";
import Popover from "@/components/ui/Popover.vue";
import {checkFields, clearFields, checkFieldsAddress} from "@/helpers/from";
import {sendOrderDetails, sendOrder} from "@/api/order";


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
    IonCheckbox,
    IonText,
  },
  mounted() {
    this.fields.firstname = this.handlerUser.firstname;
    this.fields.lastname = this.handlerUser.lastname;
    this.fields.patronymic = this.handlerUser.patronymic;
    this.fields.birthday = this.handlerUser.birthday;
    this.fields.email = this.handlerUser.email;
    this.SET_BASKET_USER(this.handlerUser.id);
  },
  data() {
    return {
      handler: 'left',
      address: {
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
      requiredFieldsAddress: ['street']
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
    },
    handlerUser() {
      return this.user
    }
  },
  watch: {
    async created() {
      this.emptyFields = {...this.fields};
    },
  },
  methods: {
    checkFields,
    clearFields,
    checkFieldsAddress,
    ...mapMutations(['SET_POPOVER', 'SET_USER', 'SET_BASKET_USER', 'SET_BASKET', 'SET_ORDER']),
    ...mapActions(['updateUser', 'saveAddress', 'getAddress']),
    created() {
      this.emptyFields = {...this.fields};
    },
    async handlerAddress() {
      this.getAddress({
        type: 'user',
        id: this.user.id
      }).then((address) => {
        address.map(({attributes})=> {
          this.address.street = attributes.street
          this.address.apartment = attributes.apartment;
          this.address.entrance = attributes.entrance;
          this.address.floor = attributes.floor
        })

      }).catch((e)=> {
        console.error(e)
      })

    },
    async send() {
      if (this.handler === 'left' && !this.checkFields()) {
        const user = {...this.handlerUser}
        user.firstname = this.fields.firstname
        user.lastname = this.fields.lastname
        user.patronymic = this.fields.patronymic
        user.birthday = this.fields.birthday
        user.email = this.fields.email

        this.SET_USER(user)
        await this.updateUser(user)
        await sendOrderDetails(this.basket.order_product_details).then((data) => {
          sendOrder({
            order_details: data,
            order: this.basket,
          }).then(({data}) => {
            this.SET_ORDER(data.id)
            this.$router.push({name: 'Order'})
            this.clearBasket()
          }).catch((e) => {
            console.log(e)
          })
          console.log(data)
        }).catch((e) => {
          console.error(e)
        })
      }
      if (this.handler === 'right' && !this.checkFields() && !this.checkFieldsAddress()) {
        const user = {...this.handlerUser}
        user.firstname = this.fields.firstname
        user.lastname = this.fields.lastname
        user.patronymic = this.fields.patronymic
        user.birthday = this.fields.birthday
        user.email = this.fields.email

        this.SET_USER(user)
        await this.updateUser(user)
        await sendOrderDetails(this.basket.order_product_details).then((data) => {
          sendOrder({
            order_details: data,
            order: this.basket,
          }).then(({data}) => {
            this.SET_ORDER(data.id)
            const params = {
              type: 'order',
              street: this.address.street,
              apartment: this.address.apartment,
              entrance: this.address.entrance,
              floor: this.address.floor,
              order: data.id
            }
            this.saveAddress(params)
            if (this.address.rememberAddress) {
              const params = {
                type: 'user',
                street: this.address.street,
                apartment: this.address.apartment,
                entrance: this.address.entrance,
                floor: this.address.floor,
                user: this.handlerUser.id
              }
              this.saveAddress(params)
            }

            this.$router.push({name: 'Order'})
            this.clearBasket()
          }).catch((e) => {
            console.log(e)
          })
          console.log(data)
        }).catch((e) => {
          console.error(e)
        })
      }
    },
    clearBasket() {
      this.SET_BASKET({
        order_product_details: [],
        count: 0,
        total_amount: 0,
        total_discount: 0,
        user: 0,
      })
      this.clearFields();
    },
   async handlerSegment(event) {
      if (event === 'right' && this.handlerAmountDiscount) {
        this.SET_POPOVER({
          show: true,
          message: [
            'Доставка курьером возможна при заказе от 2 000 ₽',
          ],
        });
      } else {
        if (event === 'right') {
          await this.handlerAddress()
        }
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
