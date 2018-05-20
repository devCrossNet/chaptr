import { storiesOf } from '@storybook/vue';
import VueInfoAddon  from 'storybook-addon-vue-info';
import VueTextarea   from './VueTextarea.vue';

const story = (storiesOf('VueTextarea', module) as any);

story.addDecorator(VueInfoAddon);

story.add('Default', () => ({
  components: { VueTextarea },
  data() {
    return {
      text: 'VueTextarea',
    };
  },
  template:   `<vue-textarea v-model="text"></vue-textarea>`,
}));
