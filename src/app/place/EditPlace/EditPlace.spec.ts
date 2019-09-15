import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import EditPlace from './EditPlace.vue';
import { i18n } from '@/app/shared/plugins/i18n/i18n';
import { IPlace } from '@/app/place/IPlace';
import { AppModule } from '@/app/app/module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('EditPlace.vue', () => {
  let storeModules: any;
  const place: IPlace = {
    id: 'foo',
    name: 'foo bar',
    images: [],
    type: '',
    location: '',
    notes: '',
  };

  beforeEach(() => {
    storeModules = {
      place: {
        namespaced: true,
        getters: {
          getPlaceById: jest.fn().mockReturnValueOnce((): IPlace => place),
        },
        actions: {
          addPlace: jest.fn(),
          updatePlace: jest.fn(),
        },
      },
      app: AppModule,
    };
  });

  test('renders component', () => {
    const store = new Vuex.Store({ modules: storeModules });
    mount(EditPlace, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          params: {},
        },
      },
    });

    expect(storeModules.place.getters.getPlaceById).not.toHaveBeenCalled();
  });

  test('renders component with place', () => {
    const store = new Vuex.Store({ modules: storeModules });
    mount(EditPlace, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          params: {
            id: 'foo',
          },
        },
      },
    });

    expect(storeModules.place.getters.getPlaceById).toHaveBeenCalled();
  });

  test('should add place', () => {
    storeModules.place.getters.getPlaceById = jest.fn().mockReturnValueOnce(
      (): IPlace => {
        return {
          id: null,
        } as IPlace;
      },
    );
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditPlace, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          params: {
            id: 'foo',
          },
        },
        $router,
      },
    }) as any;

    wrapper.vm.onSubmit();
    expect(storeModules.place.actions.addPlace).toHaveBeenCalled();
    expect($router.push).not.toHaveBeenCalled();
  });

  test('should update place', () => {
    storeModules.place.getters.getPlaceById = jest.fn().mockReturnValueOnce(
      (): IPlace => {
        return {
          id: 'foo',
        } as IPlace;
      },
    );
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditPlace, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          params: {
            id: 'foo',
          },
        },
        $router,
      },
    }) as any;

    wrapper.vm.onSubmit();
    expect(storeModules.place.actions.updatePlace).toHaveBeenCalled();
    expect($router.push).not.toHaveBeenCalled();
  });
});
