<template>
  <ion-page>
    <Header title="Параметры" contact back />
    <ion-content class="params-content">
      <ion-row class="ion-margin">
        <ion-label>Для добавления в корзину выберите параметры линз</ion-label>
      </ion-row>
      <ion-row class="ion-padding">
        <Segment
          title-left="Одинаковые"
          title-right="Разные"
          @change="activeSegment"
        />
      </ion-row>

      <div>
        <ion-row class="ion-margin" :class="{ activeClass: isActive }">
          <ion-col style="padding-left: 0" class="ion-margin-end">
            <ion-title class="text">Сфера</ion-title>
            <Select
              :options="sphere"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openSelect"
              v-model="select.sphere"
            />
          </ion-col>
          <ion-col style="padding-right: 0">
            <ion-title class="text">Радиус кривизны</ion-title>
            <Select
              :options="radius"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openSelect"
              v-model="select.radius"
            />
          </ion-col>
        </ion-row>
        <ion-row
          class="ion-margin ion-justify-content-start ion-align-items-center"
          :class="{ openSelect: isActive }"
        >
          <ion-label class="text">Количество</ion-label>
          <div class="box ion-margin-start">
            <ion-button size="small" class="button">
              <ion-icon :icon="minus"></ion-icon>
            </ion-button>
            <ion-label>1</ion-label>
            <ion-button size="small" class="button">
              <ion-icon :icon="plus"></ion-icon>
            </ion-button>
          </div>
        </ion-row>
      </div>

      <div v-if="different">
        <ion-row class="ion-margin" :class="{ activeClass: isActiveTwo }">
          <ion-col style="padding-left: 0" class="ion-margin-end">
            <ion-title class="text">Сфера</ion-title>
            <Select
              :options="sphere"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openSelectTwo"
              v-model="select.sphere"
            />
          </ion-col>
          <ion-col style="padding-right: 0">
            <ion-title class="text">Радиус кривизны</ion-title>
            <Select
              :options="radius"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openSelectTwo"
              v-model="select.radius"
            />
          </ion-col>
        </ion-row>
        <ion-row
          class="ion-margin ion-justify-content-start ion-align-items-center"
          :class="{ openSelectTwo: isActiveTwo }"
        >
          <ion-label class="text">Количество</ion-label>
          <div class="box ion-margin-start">
            <ion-button size="small" class="button">
              <ion-icon :icon="minus"></ion-icon>
            </ion-button>
            <ion-label>1</ion-label>
            <ion-button size="small" class="button">
              <ion-icon :icon="plus"></ion-icon>
            </ion-button>
          </div>
        </ion-row>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonRow,
  IonLabel,
  IonContent,
  IonCol,
  IonTitle,
  IonButton,
  IonIcon,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Segment from '@/components/ui/Segment.vue';
import Select from '@/components/ui/Select.vue';
import { mapGetters } from 'vuex';
import { addOutline, removeOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'Params',
  components: {
    Segment,
    Select,
    Header,
    IonPage,
    IonRow,
    IonLabel,
    IonContent,
    IonCol,
    IonTitle,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      isActive: false,
      isActiveTwo: false,
      select: {
        radius: {},
        sphere: {},
      },
      plus: addOutline,
      minus: removeOutline,
      different: false,
    };
  },
  computed: {
    ...mapGetters(['radius', 'sphere']),
  },
  methods: {
    activeSegment(val) {
      if (val === 'right') {
        this.different = true;
      } else {
        this.different = false;
      }
    },
    openSelect(e) {
      this.isActive = e;
    },
    openSelectTwo(e) {
      this.isActiveTwo = e;
    },
  },
});
</script>

<style scoped lang="scss">
ion-content {
  --background: #ffffff;
}

.params-content {
  .text {
    text-align: start;
    display: contents;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }

  .box {
    background: rgba(77, 172, 151, 0.3);
    border-radius: 2px;
    width: 84px;
    height: 32px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .button {
    --background: none;
    color: #1e2023;
    --background-activated: none;
  }
  .button:focus {
    --background: none;
  }
  .activeClass {
    margin-bottom: 170px;
  }
}
</style>
