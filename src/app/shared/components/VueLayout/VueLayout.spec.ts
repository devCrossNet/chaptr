import { createLocalVue, mount } from '@vue/test-utils';
import VueLayout from './VueLayout.vue';

const localVue = createLocalVue();

describe('VueLayout.vue', () => {
  test('renders component', () => {
    const wrapper = mount<any>(VueLayout, {
      localVue,
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
