<template>
  <ion-page>
    <Header :title="$t('ACTION')" back />
    <ion-content :fullscreen="true">
      <div class="wrapper">
        <div class="image-box">
          <img src="assets/image/action.png" class="image" />
        </div>
        <div class="text-box">
          <div class="header">
            <ion-icon icon="assets/icon/sale.svg" class="icon" />
            <p class="title">
              {{ $t('ACTION-TITLE') }}
            </p>
          </div>

          <span class="description">
            {{ $t('ACTION-DESCRIPTION') }}
          </span>
        </div>

        <ion-row class="ion-justify-content-center">
          <Button
            :title="$t('TO-CATALOG')"
            class="custom-btn"
            @click="
              $router.push({
                name: 'Catalog',
              })
            "
          />
        </ion-row>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonPage, IonIcon, IonRow } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';

export default defineComponent({
  name: 'ActionsNews',
  components: {
    Button,
    IonContent,
    IonPage,
    Header,
    IonIcon,
    IonRow,
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .image-box {
    margin: 16px 20px;

    .image {
      width: 100%;
      height: 100%;
    }
  }

  .text-box {
    margin: 0 20px;
    flex: 2;

    .header {
      display: flex;
      margin-bottom: 10px;

      .icon {
        width: 20px;
      }

      .title {
        margin: 0 10px;
        font-weight: 600;
        font-size: 14px;
      }
    }

    .description {
      font-size: 14px;
    }
  }
  .custom-btn {
    margin-bottom: 40px;
  }
}
</style>
