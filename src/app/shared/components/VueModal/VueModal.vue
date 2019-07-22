<template>
  <transition @beforeEnter="beforeEnter" @enter="enter" @beforeLeave="beforeLeave" @leave="leave">
    <div :class="[$style.vueModal, fitContent ? $style.fitContent : '']" v-if="show" :aria-modal="show" ref="modal">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import anime from 'animejs';

export default {
  name: 'VueModal',
  props: {
    show: {
      type: Boolean,
    },
    fitContent: {
      type: Boolean,
    },
  },
  methods: {
    beforeEnter(el: HTMLElement) {
      el.style.opacity = '0';
    },
    enter(el: HTMLElement, done: any) {
      document.body.style.overflow = 'hidden';

      anime({
        targets: el,
        opacity: {
          value: '1',
          duration: 500,
          elasticity: 0,
        },
        complete: done,
      });
    },
    beforeLeave(el: HTMLElement) {
      el.style.opacity = '1';
    },
    leave(el: HTMLElement, done: any) {
      document.body.style.overflow = 'initial';

      anime({
        targets: el,
        opacity: {
          value: '0',
          duration: 500,
          elasticity: 0,
        },
        complete() {
          done();
        },
      });
    },
    handleDocumentClick(e: Event) {
      if (this.$refs.modal && this.$refs.modal.contains(e.target) === false) {
        this.$emit('close');
      }
    },
    handleDocumentKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.$emit('close');
      }
    },
  },
  beforeMount() {
    document.addEventListener('mousedown', this.handleDocumentClick);
    document.addEventListener('touchstart', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.handleDocumentClick);
    document.removeEventListener('touchstart', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.vueModal {
  position: fixed;
  top: $space-8;
  left: $space-8;
  bottom: $space-8;
  right: $space-8;
  background: $modal-bg;
  z-index: $modal-index;
  box-shadow: $modal-shadow;
  padding: $modal-padding;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  min-width: $modal-min-width;
  border-radius: $brand-border-radius;
  border: 1px solid $brand-border-color;

  @include mediaMin(tabletPortrait) {
    max-width: $modal-max-width;
    min-width: $modal-min-width * 2;
    max-height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    right: unset;
    bottom: unset;
    transform: translate(-50%, -50%);
  }
}

.fitContent {
  padding: 0;
  overflow-y: hidden;
  bottom: initial;
  min-width: auto !important;
}
</style>
