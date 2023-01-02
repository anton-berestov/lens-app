<template>
  <div class="wrapper">
    <div class="vector">
      <img :src="icon" />
    </div>
    <div class="text">
      <p class="title">{{ title }}</p>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Info',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  .vector {
    background: url('../../public/assets/image/Vector.png');
    background-repeat: no-repeat;
    width: 160px;
    height: 145px;
    margin: 24px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    margin: 0 27px;

    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      margin: 0;
    }
    .description {
      font-weight: 400;
      font-size: 14px;
      line-height: 135%;
      text-align: center;
    }
  }
}
</style>
