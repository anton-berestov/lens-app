<template>
  <ion-page>
    <Header title="Мои данные" back />
    <Loading v-if="loading" :is-open="loading" />
    <ion-content id="my-data">
      <ion-list class="ion-margin-end">
        <ItemInput lines :error="errorFields.firstname" class="ion-margin-top">
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
      </ion-list>

      <Button title="Сохранить" class="button" @click="saveUser" />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonList, IonInput } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Loading from '@/components/ui/Loading.vue';
import ItemInput from '@/components/ui/ItemInput.vue';
import { checkFields, clearFields } from '@/helpers/from';

export default defineComponent({
  name: 'EditProfile',
  components: {
    ItemInput,
    Loading,
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
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
      errorFields: {},
      requiredFields: ['firstname', 'lastname', 'patronymic'],
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
    checkFields,
    clearFields,
    ...mapMutations(['SET_USER']),
    ...mapActions(['updateUser']),
    saveUser() {
      if (!this.checkFields()) {
        this.loading = true;
        this.SET_USER(this.fields);
        this.$router.replace({ name: 'Profile' });
        this.updateUser(this.fields);
        this.loading = false;
        this.clearFields();
      }
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
