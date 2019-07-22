<template>
  <div :class="$style.vueCardHeader">
    <img :src="image" v-if="image" :class="$style.image" :alt="title" />
    <div v-if="color" :class="$style.image" :style="{ backgroundColor: color }">{{ title.substr(0, 1) }}</div>
    <div :class="$style.titleSection">
      <div :class="$style.title" v-if="title">{{ title }}</div>
      <div :class="$style.subtitle" v-if="subtitle">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VueCardHeader',
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    image: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  methods: {},
};
</script>

<style lang="scss" module>
@import '../../../design-system';

.vueCardHeader {
  padding: $card-header-padding;
  display: flex;
  flex-direction: row;

  .image {
    width: $card-header-image-size;
    height: $card-header-image-size;
    border-radius: $card-header-image-border-radius;
    flex-shrink: 0;
    display: block;
    margin: $card-header-image-margin;
    text-align: center;
    font-size: $font-size-h3;
    text-transform: uppercase;
    padding-top: $space-8;
  }

  .titleSection {
    flex: 1 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .title {
    font-size: $card-header-title-font-size;
    font-weight: $card-header-title-font-weight;
    line-height: 1.5;
  }

  .subtitle {
    font-size: $card-header-subtitle-font-size;
    font-weight: $card-header-subtitle-font-weight;
    color: $card-header-subtitle-color;
  }
}
</style>
