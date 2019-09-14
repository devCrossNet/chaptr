import { createLocalVue, mount } from '@vue/test-utils';
import VueImageGallery from './VueImageGallery.vue';

const localVue = createLocalVue();

describe('VueImageGallery.vue', () => {
  test('renders component', () => {
    const wrapper = mount<any>(VueImageGallery, {
      localVue,
      propsData: {
        imageUrls: [],
      },
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
