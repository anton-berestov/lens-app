<template>
  <ion-page>
    <Header title="Мои данные" back />
    <Loading v-if="loading" :is-open="loading" />
    <ion-content id="my-data">
      <ion-list class="ion-margin-end">
        <ion-item class="ion-margin-top">
          <ion-input
            v-model="fields.firstname"
            label-placement="floating"
            label="Фамилия*"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            v-model="fields.lastname"
            label-placement="floating"
            label="Имя*"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            v-model="fields.patronymic"
            label-placement="floating"
            label="Отчество*"
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

      <Button title="Сохранить" class="button" @click="saveUser" />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonList, IonItem, IonInput } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Loading from '@/components/ui/Loading.vue';

export default defineComponent({
  name: 'EditProfile',
  components: {
    Loading,
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonInput,
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
    ...mapActions(['updateUser']),
    saveUser() {
      this.loading = true;
      this.SET_USER(this.fields);
      this.$router.replace({ name: 'Profile' });
      this.updateUser(this.fields);
      this.loading = false;
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

  .button {
    margin: 0 10px;
    position: fixed;
    bottom: 30px;
    left: 0;
    right: 0;
  }
}
</style>
