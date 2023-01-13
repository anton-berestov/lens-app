<template>
  <ion-page>
    <Header title="Профиль" contact />
    <Loading v-if="loading" />
    <Content v-if="!loading">
      <ion-card class="contact">
        <ion-card-content class="content">
          <ion-list>
            <ion-item>
              <ion-row class="user-info">
                <ion-label
                  class="user-name"
                  style="display: flex; align-items: center"
                  >{{ `${user.firstname} ${user.lastname}` }}
                  <ion-buttons>
                    <ion-button
                      @click="
                        $router.replace({
                          name: 'EditProfile',
                          params: { id: user.id },
                        })
                      "
                    >
                      <ion-icon
                        size="small"
                        slot="icon-only"
                        icon="assets/icon/edit.svg"
                      ></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-label>
                <ion-label class="user-phone">
                  {{ `+${user.phone}` }}
                </ion-label>
              </ion-row>
              <ion-row></ion-row>
            </ion-item>
            <ion-item>
              <ion-row class="item-row">
                <ion-col class="icon-col">
                  <ion-icon
                    icon="assets/icon/my-order.svg"
                    class="ion-margin-end icon"
                  ></ion-icon>
                </ion-col>
                <ion-col
                  class="text-col ion-justify-content-between ion-align-items-center"
                  style="display: flex"
                  @click="$router.push({ name: 'OrderHistory' })"
                >
                  <ion-label class="text">Мои заказы</ion-label>
                  <ion-icon icon="assets/icon/arrow.svg"></ion-icon>
                </ion-col>
              </ion-row>
            </ion-item>
            <ion-item lines="none">
              <ion-row class="item-row">
                <ion-col class="icon-col">
                  <ion-icon
                    icon="assets/icon/my-record.svg"
                    class="ion-margin-end icon"
                  ></ion-icon>
                </ion-col>
                <ion-col
                  class="text-col ion-justify-content-between ion-align-items-center"
                  style="display: flex"
                  @click="$router.push({ name: 'RecordHistory' })"
                >
                  <ion-label class="text">Мои обращения к врачу</ion-label>
                  <ion-icon icon="assets/icon/arrow.svg"></ion-icon>
                </ion-col>
              </ion-row>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-card class="contact">
        <ion-card-content class="content">
          <ion-list>
            <ion-item lines="none">
              <ion-label class="title">Адрес оптики</ion-label>
            </ion-item>

            <ion-item lines="none">
              <ion-row class="ion-align-items-start ion-nowrap">
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
            </ion-item>

            <ion-item>
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
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-card class="contact">
        <ion-card-content class="content">
          <ion-list>
            <ion-item lines="none">
              <ion-label class="title">Связаться с нами:</ion-label>
            </ion-item>

            <ion-item>
              <ion-row class="item-row">
                <ion-col class="icon-col">
                  <ion-icon
                    icon="assets/icon/call-profile.svg"
                    class="icon"
                  ></ion-icon>
                </ion-col>
                <ion-col class="text-col">
                  <a
                    href="tel:+79502822722"
                    class="ion-margin-start text"
                    style="color: #17a1fa"
                    >+7 950 282 27 22</a
                  >
                </ion-col>
              </ion-row>
            </ion-item>

            <ion-item lines="none">
              <ion-row class="item-row">
                <ion-col class="icon-col">
                  <ion-icon
                    icon="assets/icon/message-profile.svg"
                    class="ion-margin-end icon"
                  ></ion-icon>
                </ion-col>
                <ion-col
                  class="text-col ion-justify-content-between ion-align-items-center"
                  style="display: flex"
                  @click="chat"
                >
                  <ion-label class="text">Написать в чат</ion-label>
                  <ion-icon icon="assets/icon/arrow.svg"></ion-icon>
                </ion-col>
              </ion-row>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-row class="row" v-if="!Object.keys(user).length">
        <ion-row class="ion-margin swiper-slide-shadow-bottom">
          <ion-label class="text-no-auth"
            >Войдите в профиль для оформления заказов или записи к врачу
          </ion-label>
        </ion-row>
        <Button
          title="Войти"
          class="auth-button"
          @click="$router.push({ name: 'Auth' })"
        />
      </ion-row>
    </Content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonRow,
  IonIcon,
  IonLabel,
  IonCol,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Content from '@/components/ui/Content.vue';
import Button from '@/components/ui/Button.vue';
import { mapActions, mapGetters } from 'vuex';
import Loading from '@/components/ui/Loading.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    Loading,
    Button,
    Content,
    Header,
    IonPage,
    IonCard,
    IonCardContent,
    IonRow,
    IonIcon,
    IonLabel,
    IonCol,
    IonList,
    IonItem,
    IonButtons,
    IonButton,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['getUser']),
    chat() {
      const win: Window = window;
      win.location = 'https://wa.me/79502822722';
    },
  },
  async mounted() {
    this.loading = true;
    await this.getUser();
    this.loading = false;
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
  }

  .user-info {
    flex-direction: column;

    .user-name {
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      margin: 10px 0 4px 0;
    }

    .user-phone {
      font-weight: 400;
      font-size: 12px;
      line-height: 130%;
      color: #a0a0a0;
      margin: 4px 0 10px 0;
    }
  }

  .content {
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;

    .item-row {
      width: 100%;
    }

    .icon-col {
      width: 32px;
      display: contents;

      .icon {
        width: 24px;
        height: 24px;
      }
    }

    .text-col {
      .text {
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        text-decoration: none;
        white-space: pre-wrap;
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

.row {
  .text-no-auth {
    font-weight: 300;
    font-size: 14px;
    line-height: 130%;
    text-align: center;
  }

  .auth-button {
    margin: 0 10px;
    width: 100%;
  }
}
</style>
