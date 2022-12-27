<template>
  <ul class="multiple-buttons">
    <li v-for="(option, index) in options" :key="index">
      <label :class="{ checked: checked.includes(option) }">
        <input type="checkbox" :value="option.name" @click="onChange(option)" />
        <span>{{ option.name }}</span>
      </label>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'MultipleButton',
  props: ['checked', 'options', 'type'],
  emits: ['update:modelValue'],
  methods: {
    ...mapMutations(['SET_FILTER']),
    onChange(value) {
      let checked = [].concat(this.checked);
      if (checked.includes(value)) {
        checked.splice(checked.indexOf(value), 1);
      } else {
        checked.push(value);
      }
      this.SET_FILTER({ type: this.type, value: checked });

      this.$emit('update:modelValue', checked);
    },
  },
});
</script>

<style scoped lang="scss">
.checked {
  background: #005944;
  color: #ffffff;
  border: 1px solid #ffffff;
}

.multiple-buttons {
  padding: 0;
  margin: 0;
}

ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;

  li {
    margin: 0 10px 0 0;
  }

  label {
    border: 1px solid #e7e7e7;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 10px;

    span {
      padding: 10px;
      user-select: none;
      white-space: nowrap;
    }
  }

  input[type='checkbox'] {
    visibility: hidden;
    display: none;
  }
}

.orange {
  background: #ffb005;
}

.pink {
  background: #ff298a;
}

.darkblue {
  background: #00152f;
}
</style>
