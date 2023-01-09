<template>
  <ion-page>
    <Header title="Профиль" contact />
    <Content>
      <ion-card class="contact">
        <ion-card-subtitle class="title"> Адрес оптики</ion-card-subtitle>
        <ion-card-content class="content">
          <ion-row class="ion-align-items-start">
            <ion-col class="icon-col">
              <ion-icon
                icon="assets/icon/location-profile.svg"
                class="ion-margin-end icon"
              ></ion-icon>
            </ion-col>
            <ion-col class="text-col">
              <ion-label class="text"
                >г. Владивосток, ул. Енисейская, 23Д пом. 102
              </ion-label>
              <div>
                <a
                  herf="#"
                  class="link-view-card"
                  @click="$router.push({ name: 'Map' })"
                  >Посмотреть на карте</a
                >
              </div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-align-items-center">
            <ion-col class="icon-col">
              <ion-icon
                icon="assets/icon/alarm-profile.svg"
                class="ion-margin-end icon"
              ></ion-icon>
            </ion-col>
            <ion-col class="text-col">
              <ion-label class="text">пн-вс: 09:00-20:00</ion-label>
            </ion-col>
          </ion-row>
        </ion-card-content>
      </ion-card>

      <ion-card class="contact">
        <ion-card-subtitle class="title">Связаться с нами:</ion-card-subtitle>
        <ion-card-content class="content">
          <ion-row class="ion-align-items-center">
            <ion-col class="icon-col">
              <ion-icon
                icon="assets/icon/call-profile.svg"
                class="ion-margin-end icon"
              ></ion-icon>
            </ion-col>
            <ion-col class="text-col">
              <a href="tel:+79502822722" class="text" style="color: #17a1fa"
                >+7 950 282 27 22</a
              >
            </ion-col>
          </ion-row>

          <ion-row class="ion-margin-top ion-align-items-center">
            <ion-col class="icon-col">
              <ion-icon
                icon="assets/icon/message-profile.svg"
                class="ion-margin-end icon"
              ></ion-icon>
            </ion-col>
            <ion-col
              class="text-col ion-justify-content-between ion-align-items-center"
              style="display: flex"
              @click="$router.push({ name: 'Chat' })"
            >
              <ion-label class="text">Написать в чат</ion-label>
              <ion-icon icon="assets/icon/arrow.svg"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-card-content>
      </ion-card>
    </Content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonRow,
  IonIcon,
  IonLabel,
  IonCol,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Content from '@/components/ui/Content.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    Content,
    Header,
    IonPage,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonRow,
    IonIcon,
    IonLabel,
    IonCol,
  },
});
</script>

<style scoped lang="scss">
.contact {
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    text-transform: none;
    margin: 10px 14px;
  }

  .content {
    padding: 0;
    margin-left: 14px;
    margin-bottom: 15px;

    .icon-col {
      width: 32px;
      display: contents;

      .icon {
        width: 24px;
        height: 24px;
      }
    }

    .text-col {
      margin-right: 16px;

      .text {
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        text-decoration: none;
      }

      .link-view-card {
        font-weight: 300;
        font-size: 12px;
        line-height: 130%;
        color: #6f6f6f;
      }
    }
  }
}
</style>
