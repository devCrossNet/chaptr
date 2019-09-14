import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueLayout from './VueLayout.vue';

const story = storiesOf('Design System|Layout', module) as any;

story.add(
  'Default',
  withInfo({})(() => ({
    components: { VueLayout },
    template: `<vue-layout>VueLayout</vue-layout>`,
  })),
);
