import { createLocalVue, mount } from '@vue/test-utils';
import PrintView from './PrintView.vue';

const localVue = createLocalVue();

describe('PrintView.vue', () => {
  test('renders component', () => {
    const wrapper = mount<any>(PrintView, {
      localVue,
      propsData: {
        chapters: [],
        getCharacterById: jest.fn(),
      },
    });

    expect(wrapper.text()).toBe('');
  });
});
