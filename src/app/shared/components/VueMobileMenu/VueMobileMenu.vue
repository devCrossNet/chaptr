<template>
  <div :class="$style.vueMobileMenu">
    <div :class="$style.buttons">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VueMobileMenu',
  components: {},
  props: {},
  data(): any {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" module>
@import '../../design-system';

.vueMobileMenu {
  background: $brand-primary-gradient;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 100vh;

  .buttons {
    display: flex;
    flex-direction: column;

    button {
      display: block;
      flex: 1 0 $space-32 * 2;
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
}
</style>
