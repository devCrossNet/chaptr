import { createLocalVue, mount } from '@vue/test-utils';
import StorylineView from './StorylineView.vue';

const localVue = createLocalVue();

describe('StorylineView.vue', () => {
  test('renders component', () => {
    const wrapper = mount(StorylineView, {
      localVue,
      propsData: {
        events: [],
      },
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
