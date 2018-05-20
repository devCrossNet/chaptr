import { createLocalVue, mount } from '@vue/test-utils';
import VueMobileMenu             from './VueMobileMenu.vue';

const localVue = createLocalVue();

describe('VueMobileMenu.vue', () => {

  test('renders component', () => {
    const wrapper = mount(VueMobileMenu,
                          {
                            localVue,
                          },
    );

    expect(wrapper.findAll('.vueMobileMenu')).toHaveLength(1);
  });

});
