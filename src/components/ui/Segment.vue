<template>
  <ion-segment
    value="left"
    @ionChange="changeSegment($event)"
    class="segment-container"
  >
    <ion-segment-button value="left" class="segment">
      <ion-label>{{ titleLeft }}</ion-label>
    </ion-segment-button>
    <ion-segment-button value="right" class="segment">
      <ion-label>{{ titleRight }}</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script>
import { defineComponent } from 'vue';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';

export default defineComponent({
  name: 'Segment',
  props: {
    titleLeft: {
      type: String,
      default: '',
    },
    titleRight: {
      type: String,
      default: '',
    },
  },
  emits: ['change'],
  components: {
    IonSegment,
    IonSegmentButton,
    IonLabel,
  },
  methods: {
    changeSegment(event) {
      this.$emit('change', event.detail.value);
    },
  },
});
</script>

<style lang="scss">
.segment-container {
  --background: #ffffff;
  border: 1px solid #005944;

  .segment {
    --border-color: #fffff;
    --indicator-box-shadow: none;
    margin: 0;
    padding: 0;
  }

  .segment-button-checked {
    color: #ffffff;
  }
}

ion-segment-button::part(indicator-background) {
  background: #005944 !important;
  color: #ffffff;
}

ion-segment-button::part(indicator) {
  padding-inline: 0;
}
</style>
