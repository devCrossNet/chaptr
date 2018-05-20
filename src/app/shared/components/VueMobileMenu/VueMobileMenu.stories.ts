import { storiesOf } from '@storybook/vue';
import VueInfoAddon  from 'storybook-addon-vue-info';
import VueMobileMenu           from './VueMobileMenu.vue';

const story = (storiesOf('VueMobileMenu', module) as any);

story.addDecorator(VueInfoAddon);

story.add('Default', () => ({
  components: { VueMobileMenu },
  template:   `<vueMobileMenu>VueMobileMenu</vueMobileMenu>`,
}));
