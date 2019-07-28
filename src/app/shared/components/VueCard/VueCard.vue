<template>
  <div :class="$style.vueCard">
    <div :class="$style.content">
      <div :class="$style.header">
        <slot name="header" />
      </div>
      <div :class="$style.body">
        <slot />
      </div>
    </div>

    <div :class="$style.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VueCard',
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.vueCard {
  background: $card-bg;
  box-shadow: $card-shadow;
  border: $card-border;
  border-radius: $card-border-radius;
  margin: $card-margin;
  color: $card-color;
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .header {
    padding: $card-header-padding;
    font-size: $card-header-font-size;
    font-weight: $card-header-font-weight;
  }

  .body {
    padding: $card-body-padding;
    font-size: $card-body-font-size;
  }

  .footer {
    padding: 0;
    flex: 0;

    button,
    a {
      flex: 1;
      margin: 0;
      display: flex;
      height: 100%;
      align-content: center;
      justify-items: center;
      justify-content: center;
      border-radius: 0 $button-border-radius $button-border-radius 0;
      padding: 0 $space-16;

      i {
        height: $space-20;
        width: $space-20;
        top: 50%;
        position: relative;
        transform: translate(0, -50%);
      }
    }
  }
}
</style>
