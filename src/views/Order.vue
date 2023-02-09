<template>
  <ion-page id="order">
    <Loading v-if="!order" :is-open="!order ? true : false" />
    <ion-content :scroll-y="false" v-if="order">
      <Info
        icon="assets/icon/check.svg"
        :title="`Ваш заказ № ${order} успешно оформлен!`"
        description="Ожидайте звонка оператора для подтверждения заказа"
      />
    </ion-content>
    <Button
      title="Перейти на главную"
      class="button"
      @click="toHome"
      v-if="order"
    />
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { mapGetters, mapMutations } from 'vuex';
import Info from '@/components/ui/Info.vue';
import Loading from '@/components/ui/Loading.vue';
import Button from '@/components/ui/Button.vue';

export default defineComponent({
  name: 'Order',
  components: {
    Button,
    Info,
    Loading,
    IonPage,
    IonContent,
  },
  computed: {
    ...mapGetters(['order']),
  },
  methods: {
    ...mapMutations(['SET_ORDER']),
    toHome() {
      this.$router.push({ name: 'Home' });
      this.SET_ORDER('');
    },
  },
});
</script>

<style lang="scss">
#order {
  ion-content {
    --background: #ffffff;
  }
  .button {
    bottom: 10px;
    position: relative;
  }
}
</style>
