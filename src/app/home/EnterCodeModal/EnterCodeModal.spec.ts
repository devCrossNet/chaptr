import { createLocalVue, mount } from '@vue/test-utils';
import EnterCodeModal from './EnterCodeModal.vue';
import { i18n } from '@shared/plugins/i18n/i18n';

const localVue = createLocalVue();

describe('EnterCodeModal.vue', () => {
  test('renders component', () => {
    const wrapper = mount<any>(EnterCodeModal, {
      localVue,
      i18n,
      propsData: {
        show: true,
      },
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
