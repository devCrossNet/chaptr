import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { i18n } from '@shared/plugins/i18n/i18n';
import EditCharacter from './EditCharacter.vue';
import { ICharacter } from '../ICharacter';
import { AppModule } from '@/app/app/module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('EditCharacter.vue', () => {
  let storeModules: any;
  const character: ICharacter = {
    id: 'foo',
    name: 'foo bar',
    address: '',
    birthday: '',
    degree: '',
    eyeColor: '',
    hairColor: '',
    height: '',
    hobbies: '',
    skinColor: '',
    vitae: [''],
    weight: '',
  };

  beforeEach(() => {
    storeModules = {
      character: {
        namespaced: true,
        getters: {
          getCharacterById: jest.fn().mockReturnValueOnce((): ICharacter => character),
        },
        actions: {
          addCharacter: jest.fn(),
          updateCharacter: jest.fn(),
        },
      },
      app: AppModule,
    };
  });

  test('renders component', () => {
    const store = new Vuex.Store({ modules: storeModules });
    mount(EditCharacter, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          params: {},
        },
      },
    });

    expect(storeModules.character.getters.getCharacterById).not.toHaveBeenCalled();
  });

  test('renders component with character', () => {
    const store = new Vuex.Store({ modules: storeModules });
    mount(EditCharacter, {
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

    expect(storeModules.character.getters.getCharacterById).toHaveBeenCalled();
  });

  test('should add character', () => {
    storeModules.character.getters.getCharacterById = jest.fn().mockReturnValueOnce(
      (): ICharacter => {
        return {
          id: null,
        } as ICharacter;
      },
    );
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditCharacter, {
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
    expect(storeModules.character.actions.addCharacter).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalled();
  });

  test('should update character', () => {
    storeModules.character.getters.getCharacterById = jest.fn().mockReturnValueOnce(
      (): ICharacter => {
        return {
          id: 'foo',
        } as ICharacter;
      },
    );
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditCharacter, {
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
    expect(storeModules.character.actions.updateCharacter).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalled();
  });

  test('should go back to characters page', () => {
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditCharacter, {
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

    wrapper
      .findAll('button')
      .at(1)
      .trigger('click');
    wrapper
      .findAll('button')
      .at(3)
      .trigger('click');

    expect($router.push).toHaveBeenCalledTimes(2);
  });
});
