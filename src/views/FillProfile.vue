<template>
  <ion-page id="fill-profile">
    <Header title="Заполнение профиля" />
    <Loading v-if="loading" :is-open="loading" />
    <ion-content class="content">
      <ion-list class="ion-margin-end">
        <ion-item lines="none">
          <ion-label class="label"
            >Заполните профиль, чтобы в дальнейшнем делать покупки еще быстрее
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-input
            v-model="fields.firstname"
            label-placement="floating"
            label="Фамилия"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            v-model="fields.lastname"
            label-placement="floating"
            label="Имя"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            v-model="fields.patronymic"
            label-placement="floating"
            label="Отчество"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            v-model="fields.birthday"
            label-placement="floating"
            label="Дата рождения"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            v-model="fields.email"
            type="email"
            label-placement="floating"
            label="Email"
          ></ion-input>
        </ion-item>
      </ion-list>
      <ion-row class="ion-justify-content-around button">
        <Button title="Далее" class="btn" @click="saveUser" />
        <Button title="Заполнить позже" class="btn another" @click="later" />
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
  IonInput,
  IonLabel,
  IonRow,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';
import Loading from '@/components/ui/Loading.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default defineComponent({
  name: 'FillProfile',
  components: {
    Loading,
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonLabel,
    IonRow,
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
    };
  },
  computed: {
    ...mapGetters(['user']),
    redirect() {
      return this.$route.params.redirect;
    },
  },
  methods: {
    ...mapMutations(['SET_USER']),
    ...mapActions(['updateUser']),
    saveUser() {
      this.loading = true;
      this.SET_USER(this.fields);
      this.$router.replace({ name: this.redirect });
      this.updateUser(this.fields);
      this.loading = false;
    },
    later() {
      this.$router.replace({ name: this.redirect });
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
      email: this.user.email,
    };
  },
});
</script>

<style lang="scss">
#fill-profile {
  .content {
    --background: #ffffff;

    .label {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: #000000;
      white-space: pre-wrap;
    }

    .button {
      position: fixed;
      bottom: 30px;
      flex-wrap: nowrap;
      width: 100%;
      left: 0;
      right: 0;
      margin: 0;
      display: flex;
      .btn {
        width: 40%;
      }
      .another {
        .custom-btn {
          --background: #ffffff;
          border: 1px solid #00795d;
          color: #000000;
        }
      }
    }
  }
}
</style>
