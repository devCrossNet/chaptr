import { createLocalVue, mount } from '@vue/test-utils';
import Vuex                      from 'vuex';
import { i18n }                  from '../../shared/plugins/i18n/i18n';
import EditStory                 from './EditStory.vue';
import { IStory }                from '../IStory';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('EditStory.vue', () => {
  let storeModules: any;
  const story: IStory = {
    id:       'foo',
    abstract: 'test',
    color:    'red',
    title:    'TEST',
  };

  beforeEach(() => {
    storeModules = {
      story: {
        namespaced: true,
        getters:    {
          getStoryById: jest.fn().mockReturnValueOnce((): any => {
            return story;
          }),
        },
        actions:    {
          addStory:    jest.fn(),
          updateStory: jest.fn(),
        },
      },
    };
  });

  test('renders component', () => {
    const store = new Vuex.Store({ modules: storeModules });
    mount(EditStory, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          params: {},
        },
      },
    });

    expect(storeModules.story.getters.getStoryById).not.toHaveBeenCalled();
  });

  test('renders component with story', () => {
    const store = new Vuex.Store({ modules: storeModules });
    mount(EditStory, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          params: { id: 'foo' },
        },
      },
    });

    expect(storeModules.story.getters.getStoryById).toHaveBeenCalled();
  });

  test('should add story', () => {
    storeModules.story.getters.getStoryById = jest.fn()
                                                  .mockReturnValueOnce((): IStory => {
                                                    return {
                                                      ...story,
                                                      id: null,
                                                    } as IStory;
                                                  });
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditStory, {
      store,
      localVue,
      i18n,
      mocks: {
        $router,
        $route: {
          params: {
            id: 'foo',
          },
        },
      },
    }) as any;

    wrapper.vm.onSubmit();
    expect(storeModules.story.actions.addStory).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalled();
  });

  test('should update story', () => {
    storeModules.story.getters.getStoryById = jest.fn()
                                                  .mockReturnValueOnce((): IStory => {
                                                    return story;
                                                  });
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditStory, {
      store,
      localVue,
      i18n,
      mocks: {
        $router,
        $route: {
          params: {
            id: 'foo',
          },
        },
      },
    }) as any;

    wrapper.vm.onSubmit();
    expect(storeModules.story.actions.updateStory).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalled();
  });
});
