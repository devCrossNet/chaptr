import { createLocalVue, mount } from '@vue/test-utils';
import StoryList from './StoryList.vue';
import { i18n } from '@shared/plugins/i18n/i18n';

const localVue = createLocalVue();

describe('StoryList.vue', () => {
  test('renders component', () => {
    const wrapper = mount<any>(StoryList, {
      localVue,
      i18n,
      propsData: {
        stories: [],
      },
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
