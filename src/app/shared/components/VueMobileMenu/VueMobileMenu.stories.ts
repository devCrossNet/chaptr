import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueMobileMenu from './VueMobileMenu.vue';

const story = storiesOf('Molecules|MobileMenu', module) as any;

story.add(
  'Default',
  withInfo({})(() => ({
    components: { VueMobileMenu },
    template: `<vueMobileMenu>VueMobileMenu</vueMobileMenu>`,
  })),
);
