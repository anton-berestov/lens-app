<template>
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-buttons slot="start" class="button-box" v-if="back">
        <ion-button @click.prevent="onBack">
          <ion-icon :icon="chevronBackOutline"/>
        </ion-button>
      </ion-buttons>

      <ion-title class="title" v-if="!custom">{{ title }}</ion-title>
      <div class="box" v-if="custom">
        <ion-icon icon="assets/logo_brand.svg" class="logo"/>
        <span class="custom-title">
        {{ title }}
      </span>
      </div>

      <ion-buttons slot="end" class="button-box" v-if="contact">
        <ion-button>
          <ion-icon icon="assets/location.svg"/>
        </ion-button>
        <ion-button>
          <ion-icon icon="assets/call.svg"/>
        </ion-button>
        <ion-button>
          <ion-icon icon="assets/message.svg"/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>

  </ion-header>
</template>


<script lang="ts">
import {defineComponent} from 'vue';
import {IonHeader, IonToolbar, IonTitle, IonIcon, IonButtons, IonButton} from '@ionic/vue';
import {chevronBackOutline} from 'ionicons/icons'

export default defineComponent({
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    },
    custom: {
      type: Boolean,
      default: false,
    },
    back: {
      type: Boolean,
      default: false
    },
    contact: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButtons,
    IonButton
  },
  data: () => ({
    chevronBackOutline
  }),
  methods: {
    onBack() {
      this.$router.back();
    }
  }
});
</script>

<style scoped lang="scss">
.box {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .logo {
    margin-left: 20px;
    width: 20px;
    height: 20px;
  }

  .custom-title {
    font-size: 12px;
    margin-left: 10px;
    color: var(--ion-color-primary);
    width: 130px;
    font-weight: 400;
  }
}

.title {
  font-size: 14px;
  font-weight: 600;
}

.button-box {
  margin-right: 10px;
}

</style>