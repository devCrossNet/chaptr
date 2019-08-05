<template>
  <vue-modal :show="show">
    <form @submit.prevent="$emit('submit', code)">
      <vue-headline level="3">{{ $t('common.share.EnterCode' /* Enter Code */) }}</vue-headline>

      <vue-input
        name="code"
        id="code"
        placeholder="code"
        v-model="code"
        autofocus
        validation="required|integer|min:6|max:6"
      />

      <vue-button color="primary" :aria-label="$t('common.restore' /* Restore Stories */)" :disabled="isSubmitDisabled">
        {{ $t('common.restore' /* Restore Stories */) }}
      </vue-button>
      <vue-button ghost :aria-label="$t('common.cancel' /* Cancel */)" @click="show = false">
        {{ $t('common.cancel' /* Cancel */) }}
      </vue-button>
    </form>
  </vue-modal>
</template>

<script lang="ts">
import VueModal from '@components/VueModal/VueModal.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueInput from '@components/VueInput/VueInput.vue';
import VueButton from '@components/VueButton/VueButton.vue';

export default {
  $_veeValidate: {
    validator: 'new' as 'new',
  },
  name: 'EnterCodeModal',
  components: { VueButton, VueInput, VueHeadline, VueModal },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data(): any {
    return {
      code: '',
    };
  },
  computed: {
    hasErrors() {
      return this.errors && this.errors.items.length > 0;
    },
    isSubmitDisabled() {
      return this.hasErrors || (this.code.length <= 0 || this.code.length > 6);
    },
  },
  methods: {},
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.enterCodeModal {
  display: block;
}
</style>
