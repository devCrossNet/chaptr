<template>
  <div :class="$style.vueMobileMenu">
    <slot />
  </div>
</template>

<script lang="ts">
  export default {
    name:       'VueMobileMenu',
    components: {},
    props:      {},
    data(): any {
      return {};
    },
    computed:   {},
    methods:    {},
  };
</script>

<style lang="scss" module>
  @import "../../styles";

  .vueMobileMenu {
    position:   fixed;
    left:       0;
    right:      0;
    bottom:     $space-unit;
    text-align: center;

    button {
      height:        $space-unit * 6;
      width:         $space-unit * 6;
      min-width:     auto;
      padding:       0;
      border-radius: 50%;
      margin-right:  $space-unit;
    }
  }
</style>
