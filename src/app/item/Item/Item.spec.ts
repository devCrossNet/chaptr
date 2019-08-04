import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { ActionTree, GetterTree, Store } from 'vuex';
import { ItemGetters, IItemGetters } from '../getters';
import { ItemDefaultState, IItemState } from '../state';
import { ItemActions, IItemActions } from '../actions';
import Item from './Item.vue';
import { i18n } from '@/app/shared/plugins/i18n/i18n';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Item.vue', () => {
  let store: Store<IItemState>;
  let getters: GetterTree<IItemState, IItemGetters>;
  let actions: ActionTree<IItemState, IItemActions>;
  let state: IItemState;

  beforeEach(() => {
    getters = {
      ...ItemGetters,
    };
    actions = {
      ...ItemActions,
      increment: jest.fn(),
      decrement: jest.fn(),
    };
    state = {
      ...ItemDefaultState(),
    };

    store = new Vuex.Store({
      modules: {
        item: {
          namespaced: true,
          getters,
          actions,
          state,
        },
      },
    } as any);
  });

  test('renders component', () => {
    const wrapper = mount<any>(Item, {
      store,
      localVue,
      i18n,
    });

    expect(wrapper.find('h1').text()).toBe('Items');
  });
});
