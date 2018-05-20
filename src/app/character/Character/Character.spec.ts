import { createLocalVue, mount } from '@vue/test-utils';
import Vuex                      from 'vuex';
import { i18n }                  from '../../shared/plugins/i18n/i18n';
import Character                   from './Character.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Character.vue', () => {

  test('renders component', () => {
    const store = new Vuex.Store({
                                   modules: {
                                     character: {
                                       namespaced: true,
                                       getters:    {
                                         allCharacters: () => [],
                                       },
                                     },
                                   },
                                 });
    const wrapper = mount(Character, {
      store,
      localVue,
      i18n,
    });

    expect(wrapper.find('h1').text()).toBe('Characters');
  });

});
