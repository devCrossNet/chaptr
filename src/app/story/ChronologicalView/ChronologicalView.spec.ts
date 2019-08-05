import { createLocalVue, mount } from '@vue/test-utils';
import ChronologicalView from './ChronologicalView.vue';

const localVue = createLocalVue();

describe('ChronologicalView.vue', () => {
  test('renders component', () => {
    const wrapper = mount<any>(ChronologicalView, {
      localVue,
      propsData: {
        events: [],
        getCharacterById: jest.fn(),
      },
    });

    expect(wrapper.text()).toBe('');
  });
});
