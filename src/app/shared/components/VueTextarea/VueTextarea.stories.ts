import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueTextarea from './VueTextarea.vue';
import VueButton from '../VueButton/VueButton.vue';
import VueModal from '../VueModal/VueModal.vue';

const story = storiesOf('Atoms|Textarea', module) as any;

story.add(
  'Default',
  withInfo({})(() => ({
    components: { VueTextarea },
    data() {
      return {
        model: '',
      };
    },
    template: `<vue-textarea placeholder="Name" name="name" id="name" v-model="model" />`,
  })),
);

story.add(
  'Disabled',
  withInfo({})(() => ({
    components: { VueTextarea },
    data() {
      return {
        model: '',
      };
    },
    template: `<vue-textarea placeholder="Name" name="name" id="name" v-model="model" :disabled="true" />`,
  })),
);

story.add(
  'Hint',
  withInfo({})(() => ({
    components: { VueTextarea },
    data() {
      return {
        model: '',
      };
    },
    template: `<vue-textarea placeholder="Name" name="name" id="name" v-model="model" message="description" />`,
  })),
);

story.add(
  'Validation/Error state',
  withInfo({})(() => ({
    components: { VueTextarea },
    data() {
      return {
        model: '',
      };
    },
    template: `<vue-textarea placeholder="Name" name="name" id="name" v-model="model" validation="required|integer" required message="please enter a number" errorMessage="This is not a number" />`,
  })),
);

story.add(
  'Readonly',
  withInfo({})(() => ({
    components: { VueTextarea },
    data() {
      return {
        model: '',
      };
    },
    template: `<vue-textarea placeholder="Name" name="name" id="name" value="foo" readonly />`,
  })),
);

story.add(
  'SPA autofocus',
  withInfo({ propTablesExclude: [VueButton, VueModal] })(() => ({
    components: { VueTextarea, VueButton, VueModal },
    data() {
      return {
        model: '',
        show: false,
      };
    },
    template: `<div>
  <vue-button @click="show = !show" color="primary">Login</vue-button>

  <vue-modal :show="show" @close="show = false">
    <vue-textarea autofocus placeholder="Name" name="name" id="name" v-model="model" />
    <vue-button ghost @click="show = !show">Close</vue-button>
  </vue-modal>
</div>`,
  })),
);
