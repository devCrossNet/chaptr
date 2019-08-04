import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { ActionTree, GetterTree, Store } from 'vuex';
import { PlaceGetters, IPlaceGetters } from '../getters';
import { PlaceDefaultState, IPlaceState } from '../state';
import { PlaceActions, IPlaceActions } from '../actions';
import Place from './Place.vue';
import { i18n } from '@/app/shared/plugins/i18n/i18n';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Place.vue', () => {
  let store: Store<IPlaceState>;
  let getters: GetterTree<IPlaceState, IPlaceGetters>;
  let actions: ActionTree<IPlaceState, IPlaceActions>;
  let state: IPlaceState;

  beforeEach(() => {
    getters = {
      ...PlaceGetters,
    };
    actions = {
      ...PlaceActions,
      increment: jest.fn(),
      decrement: jest.fn(),
    };
    state = {
      ...PlaceDefaultState(),
    };

    store = new Vuex.Store({
      modules: {
        place: {
          namespaced: true,
          getters,
          actions,
          state,
        },
      },
    } as any);
  });

  test('renders component', () => {
    const wrapper = mount<any>(Place, {
      store,
      localVue,
      i18n,
    });

    expect(wrapper.find('h1').text()).toBe('Places');
  });
});
