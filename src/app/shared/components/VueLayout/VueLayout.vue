<template>
  <div :class="[$style.vueLayout, position === 'left' ? $style.left : '']">
    <div :class="$style.content">
      <div>
        <slot />
      </div>
    </div>
    <div :class="$style.sidebar">
      <vue-button @click="$emit('position')" :class="$style.switch">
        <vue-icon-exchange />
      </vue-button>
      <slot name="sidebar" />
    </div>
  </div>
</template>

<script lang="ts">
import VueButton from '@components/VueButton/VueButton.vue';
import VueIconBook from '@components/icons/VueIconBook/VueIconBook.vue';
import VueIconExchange from '@components/icons/VueIconExchange/VueIconExchange.vue';

export default {
  name: 'VueLayout',
  components: { VueIconExchange, VueIconBook, VueButton },
  props: {
    position: {
      type: String,
      default: 'right',
    },
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.vueLayout {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.content {
  flex: 1 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  max-height: 100vh;

  > div {
    margin-bottom: $space-32;
  }
}
.sidebar {
  position: relative;

  .switch {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: block;
    height: $space-32 * 2;
    cursor: pointer;
    margin: 0;
    border-radius: 0;
    width: $space-32 * 2;
    background-color: transparent;
    border: none;
    color: $brand-text-color-inverse;

    &:hover {
      background-color: transparent;
      border: none;
      color: $brand-text-color-inverse;
    }

    i {
      height: $space-24;
      width: $space-24;
    }
  }
}
.left {
  flex-direction: row-reverse;
}
</style>
