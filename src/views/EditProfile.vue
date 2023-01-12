<template>
  <ion-page>
    <Header title="Мои данные" back />
    <ion-content id="my-data">
      <ion-list class="ion-margin-end">
        <ion-item class="ion-margin-top">
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
        <ion-item>
          <ion-label position="floating" class="label">Email</ion-label>
          <ion-input v-model="fields.email" type="email"></ion-input>
        </ion-item>
      </ion-list>

      <Button title="Сохранить" class="button" @click="saveUser" />
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
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'EditProfile',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  components: {
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
  },
  data() {
    return {
      fields: {
        firstname: '',
        lastname: '',
        patronymic: '',
        phone: '',
        birthday: '',
        email: '',
      },
    };
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
  methods: {
    ...mapMutations(['SET_USER']),
    saveUser() {
      this.SET_USER(this.fields);
      this.$router.push({ name: 'Profile' });
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
});
</script>

<style scoped lang="scss">
#my-data {
  --background: #ffffff;

  .label {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #bbbbbb;
    margin-top: 16px;
  }

  .button {
    margin: 0 10px;
    position: fixed;
    bottom: 30px;
    left: 0;
    right: 0;
  }
}
</style>
