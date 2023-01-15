<template>
  <ion-modal
    :is-open="show"
    :initial-breakpoint="0.7"
    @willPresent="onChange"
    @didDismiss="$emit('hide')"
    class="filter-modal"
  >
    <ion-content :scroll-y="true">
      <ion-col>
        <ion-row class="ion-justify-content-center">
          <ion-icon icon="assets/icon/line-menu.svg" class="show-hide-icon" />
          <ion-title class="title">Фильтры</ion-title>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-title class="text">Срок замены</ion-title>
        </ion-row>

        <ion-row class="ion-margin">
          <MultipleButton
            :options="period"
            :checked="filter.period"
            v-model="filter.period"
          />
        </ion-row>

        <ion-row class="ion-margin" style="position: relative">
          <ion-title class="text">Тип линз</ion-title>
          <ion-buttons class="btn-question">
            <ion-button @click="openPopover">
              <ion-icon
                icon="assets/icon/question.svg"
                slot="icon-only"
                class="icon-for-type"
              />
            </ion-button>
          </ion-buttons>
        </ion-row>
        <ion-row class="ion-margin">
          <MultipleButton
            :options="type"
            :checked="filter.type"
            v-model="filter.type"
          />
        </ion-row>

        <ion-row class="ion-margin" :class="{ activeClass: isActive }">
          <ion-col style="padding-left: 0" class="ion-margin-end">
            <ion-title class="text">Сфера</ion-title>
            <Select
              :options="sphere"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openSelect"
              v-model="filter.sphere"
            />
          </ion-col>
          <ion-col style="padding-right: 0">
            <ion-title class="text">Радиус кривизны</ion-title>
            <Select
              :options="radius"
              placeholder="Выбрать"
              class="ion-margin-top"
              @isOpen="openSelect"
              v-model="filter.radius"
            />
          </ion-col>
        </ion-row>
      </ion-col>

      <ion-row
        :class="{ openSelect: isActive }"
        class="ion-justify-content-center"
        v-if="
          !(
            filter.period.length ||
            filter.type.length ||
            Object.keys(filter.sphere).length ||
            Object.keys(filter.radius).length
          )
        "
      >
        <Button title="Закрыть" @click="$emit('hide')" />
      </ion-row>

      <ion-row
        class="ion-margin ion-justify-content-between"
        :class="{ openSelect: isActive }"
        v-if="
          !!(
            filter.period.length ||
            filter.type.length ||
            Object.keys(filter.sphere).length ||
            Object.keys(filter.radius).length
          )
        "
      >
        <ion-buttons>
          <ion-button
            fill="solid"
            style="color: #ffffff"
            class="action-button"
            @click="apply"
            >Применить
          </ion-button>
        </ion-buttons>
        <ion-buttons>
          <ion-button fill="outline" class="action-button" @click="clear"
            >Сбросить
          </ion-button>
        </ion-buttons>
      </ion-row>
    </ion-content>
  </ion-modal>
  <Popover />
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {
  IonModal,
  IonContent,
  IonRow,
  IonTitle,
  IonButtons,
  IonButton,
  IonCol,
  IonIcon,
} from '@ionic/vue';
import Select from '@/components/ui/Select.vue';
import Button from '@/components/ui/Button.vue'
import Popover from "@/components/ui/Popover.vue";
import MultipleButton from "@/components/ui/MultipleButton.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default defineComponent({
  name: 'Filter',
  props: {
    show: {
      type: Boolean,
      default: false,
    },

  },
  emits: ['hide'],
  components: {
    Select,
    MultipleButton,
    Button,
    IonModal,
    IonContent,
    IonRow,
    IonTitle,
    IonButtons,
    IonButton,
    IonCol,
    IonIcon,
    Popover
  },
  data: () => ({
    isActive: false,
    filter: {
      type: [],
      period: [],
      sphere: {},
      radius: {}
    },
  }),

  computed: {
    ...mapGetters({
      store_filter: 'filter',
      type: 'type',
      radius: 'radius',
      sphere: 'sphere',
      period: 'period'
    }),
  },

  methods: {
    ...mapMutations(['SET_POPOVER', 'SET_FILTER',]),
    ...mapActions(['filterProducts']),
    onChange() {
      this.filter = {...this.store_filter}
    },
    openSelect(e) {
      this.isActive = e;
    },
    openPopover() {
      const messages = []
      this.type.map((el) => {
        messages.push(el.description)
      })
      this.SET_POPOVER({show: true, message: messages})
    },
    apply() {
      this.SET_FILTER(this.filter)
      this.filterProducts()
      this.$emit('hide')
    },
    clear() {
      this.filter.type = []
      this.filter.period = []
      this.filter.sphere = {}
      this.filter.radius = {}
      this.SET_FILTER({
        type: [],
        period: [],
        sphere: {},
        radius: {}
      })

    }
  },
});
</script>

<style lang="scss">
.filter-modal {
  ion-content {
    --background: #ffffff !important;
  }

  .buttons {
    margin: 8px;
  }

  .show-hide-icon {
    width: 46px;
    height: 3px;
    margin-top: -5px;
    margin-bottom: 10px;
  }

  .title {
    display: contents;
    font-size: 14px;
    font-weight: 600;
  }

  .text {
    text-align: start;
    display: contents;
    font-size: 14px;
    font-weight: 500;
  }

  ion-button {
    color: #000000;
  }

  .btn {
    width: 100%;
  }

  .select {
    width: 150px;

    .icon-check-mark {
      width: 8px;
      height: 4px;
    }
  }

  .action-button {
    width: 150px;
    height: 40px;
    border-radius: 5px;
    font-weight: 600;
    font-size: 14px;
  }

  .active {
    background: #005944;
  }

  .btn-question {
    position: absolute;
    margin: 0 auto;
    left: 60px;
    top: -17px;

    .icon-for-type {
      width: 15px;
      height: 15px;
    }
  }

  .activeClass {
    margin-bottom: 170px;
  }

  .openSelect {
    margin-bottom: 250px;
  }
}

.button-outline {
  border: 1px solid #e7e7e7 !important;
  border-radius: 10px !important;
}

.button-native {
  border: none !important;
}
</style>
