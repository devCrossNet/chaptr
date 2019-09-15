import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import EditItem from './EditItem.vue';
import { i18n } from '@/app/shared/plugins/i18n/i18n';
import { IItem } from '@/app/item/IItem';
import { AppModule } from '@/app/app/module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('EditItem.vue', () => {
  let storeModules: any;
  const item: IItem = {
    id: 'foo',
    name: 'foo bar',
    images: [],
    type: '',
    location: '',
    notes: '',
  };

  beforeEach(() => {
    storeModules = {
      item: {
        namespaced: true,
        getters: {
          getItemById: jest.fn().mockReturnValueOnce((): IItem => item),
        },
        actions: {
          addItem: jest.fn(),
          updateItem: jest.fn(),
        },
      },
      app: AppModule,
    };
  });

  test('renders component', () => {
    const store = new Vuex.Store({ modules: storeModules });
    mount(EditItem, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          params: {},
        },
      },
    });

    expect(storeModules.item.getters.getItemById).not.toHaveBeenCalled();
  });

  test('renders component with item', () => {
    const store = new Vuex.Store({ modules: storeModules });
    mount(EditItem, {
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

    expect(storeModules.item.getters.getItemById).toHaveBeenCalled();
  });

  test('should add item', () => {
    storeModules.item.getters.getItemById = jest.fn().mockReturnValueOnce(
      (): IItem => {
        return {
          id: null,
        } as IItem;
      },
    );
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditItem, {
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
    expect(storeModules.item.actions.addItem).toHaveBeenCalled();
    expect($router.push).not.toHaveBeenCalled();
  });

  test('should update item', () => {
    storeModules.item.getters.getItemById = jest.fn().mockReturnValueOnce(
      (): IItem => {
        return {
          id: 'foo',
        } as IItem;
      },
    );
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditItem, {
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
    expect(storeModules.item.actions.updateItem).toHaveBeenCalled();
    expect($router.push).not.toHaveBeenCalled();
  });
});
