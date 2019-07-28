import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueCard from './VueCard.vue';
import VueButton from '../VueButton/VueButton.vue';

const story = storiesOf('Molecules|Card', module) as any;

story.add(
  'Default',
  withInfo({ propTablesExclude: [VueButton] })(() => ({
    components: {
      VueCard,
      VueButton,
    },
    template: `<vue-card>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
</vue-card>`,
  })),
);
