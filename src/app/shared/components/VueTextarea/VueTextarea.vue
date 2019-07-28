<template>
  <div :class="$style.vueTextarea">
    <label :for="name"> {{ placeholder }}</label>
    <textarea :name="name" :id="id" :value="value" ref="input"></textarea>
  </div>
</template>

<script lang="ts">
import VueMarkdown from '@components/VueMarkdown/VueMarkdown.vue';
import VueTruncate from '@components/VueTruncate/VueTruncate.vue';
/* istanbul ignore next */
const SimpleMDE = CLIENT ? require('simplemde') : null;

export default {
  name: 'VueTextarea',
  components: { VueTruncate, VueMarkdown },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  computed: {},
  data(): any {
    return {
      editor: null,
    };
  },
  methods: {},
  mounted /* istanbul ignore next */() {
    if (CLIENT) {
      this.editor = new SimpleMDE({ element: this.$refs.input, spellChecker: false });
      this.editor.codemirror.on('change', () => {
        this.$emit('input', this.editor.value());
      });
      setTimeout(() => this.editor.value(this.value), 10);
    }
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.vueTextarea {
  position: relative;

  label {
    position: absolute;
    top: 0;
    left: $input-padding;
    font-size: $input-placeholder-active-font-size;
    margin-top: -$space-16 + $space-2;
    background-color: $brand-bg-color;
    color: $input-placeholder-dirty-font-color;
    height: auto;
    z-index: 2;
    padding: 0 $space-4;
    display: block;
  }

  :global {
    .editor-toolbar {
      background: $brand-bg-color;
      border-top: $input-border-dirty;
      border-left: $input-border-dirty;
      border-right: $input-border-dirty;
      border-top-left-radius: $input-border-radius;
      border-top-right-radius: $input-border-radius;
      opacity: 1;
    }

    .editor-toolbar a {
      color: $brand-text-color !important;
      &:hover,
      &.active {
        background: $brand-bg-color !important;
        border: 1px solid $brand-bg-color !important;
      }
      &.active {
        color: $brand-secondary !important;
      }
    }

    .editor-toolbar.disabled-for-preview a:not(.no-disable) {
      background: $brand-bg-color !important;
      border: 1px solid $brand-bg-color !important;
      opacity: 0.2;
    }

    .CodeMirror,
    .editor-preview,
    .editor-preview-side {
      background: $brand-bg-color;
      color: $brand-text-color;
      border: $input-border-dirty;
      border-bottom-left-radius: $input-border-radius;
      border-bottom-right-radius: $input-border-radius;

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: $font-family-headings;
        margin: $space-16 0 $space-4 0;
      }

      h1 {
        font-size: $font-size-h1;
        font-weight: $font-weight-h1;
        letter-spacing: $letter-spacing-h1;
        line-height: $line-height-h1;
      }

      h2 {
        font-size: $font-size-h2;
        font-weight: $font-weight-h2;
        letter-spacing: $letter-spacing-h2;
        line-height: $line-height-h2;
      }

      h3 {
        font-size: $font-size-h3;
        font-weight: $font-weight-h3;
        letter-spacing: $letter-spacing-h3;
        line-height: $line-height-h3;
      }

      h4 {
        font-size: $font-size-h4;
        font-weight: $font-weight-h4;
        letter-spacing: $letter-spacing-h4;
        line-height: $line-height-h4;
      }

      h5 {
        font-size: $font-size-h5;
        font-weight: $font-weight-h5;
        letter-spacing: $letter-spacing-h5;
        line-height: $line-height-h5;
      }

      h6 {
        font-size: $font-size-h6;
        font-weight: $font-weight-h6;
        letter-spacing: $letter-spacing-h6;
        line-height: $line-height-h6;
      }

      table {
        margin-bottom: $space-12;
        width: 100%;
        table-layout: fixed;
      }

      table tr {
        border: 1px solid $brand-border-color;
      }

      table td,
      table th {
        padding: $data-table-row-column-padding;
      }

      ul {
        margin-left: $space-4;
      }

      p {
        margin-bottom: $space-16;
      }
    }

    .editor-toolbar.fullscreen::before,
    .editor-toolbar.fullscreen::after {
      background: transparent;
    }
  }
}
</style>
