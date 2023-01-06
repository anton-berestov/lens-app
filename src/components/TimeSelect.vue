<template>

  <ion-grid id='time-select-wrapper'>
    <ion-row>
      <ion-col class='time-item' :class='item.isFree ? "selectable" : "not-selectable"' v-for='item in timeItems' :key='item.time' :disabled='!item.isFree'>
        {{ item.time }}
      </ion-col>
    </ion-row>
  </ion-grid>
  <ion-card>
  </ion-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { IonCard, IonGrid, IonRow, IonCol } from '@ionic/vue';

export default defineComponent({
  name: 'TimeSelect',
  components: {
    IonCard, IonGrid, IonRow, IonCol
  },
  data() {
    return {
      timeItems: [
        { time: '10:00', isFree: true },
        { time: '11:00', isFree: false },
        { time: '12:00', isFree: true },
        { time: '13:00', isFree: true },
        { time: '14:00', isFree: true },
        { time: '15:00', isFree: true },
        { time: '16:00', isFree: true },
        { time: '17:00', isFree: false },
        { time: '18:00', isFree: true },
        { time: '19:00', isFree: false }
      ]
    };
  }
});
</script>

<style lang='scss' scoped>

#time-select-wrapper {

  .time-item {
    /* Component 5 */

    color: var(--body-color);
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    margin: 1px;
    gap: 10px;

    width: 50px;
    height: 25px;

    background: var(--body-bg);
    border: 1px solid #E7E7E7;
    border-radius: 2px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;

    &:hover, &:active {
      background: var(--ion-color-primary);
      color: var(--ion-color-primary-contrast);
    }

    &.not-selectable {
      background: var(--ion-color-danger-tint);
      color: var(--ion-color-primary-contrast);
    }
  }

}

/*ion-col {
  padding: 0;
  margin: 0;

  ion-item {
    padding: 5px 10px;
    margin: 0;
    font-size: 10px;
  }
}*/
</style>
