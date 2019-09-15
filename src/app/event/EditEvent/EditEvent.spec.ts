import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { i18n } from '@shared/plugins/i18n/i18n';
import EditEvent from './EditEvent.vue';
import { IEvent } from '../IEvent';
import { ICharacter } from '../../character/ICharacter';
import { StoryModule } from '@/app/story/module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('EditEvent.vue', () => {
  let storeModules: any;
  const event: IEvent = {
    id: 'foo',
    date: '2001-01-01 01:01:01',
    storyline: 1,
    characters: ['foo'],
    places: ['foo'],
    items: ['foo'],
    chapter: 1,
    storyId: 'bar',
    notes: '',
    storylineOrder: 1,
    title: 'TEST',
  };

  beforeEach(() => {
    storeModules = {
      event: {
        namespaced: true,
        getters: {
          getEventById: jest.fn().mockReturnValueOnce((): any => {
            return event;
          }),
          getEventsByStoryId: jest.fn().mockReturnValueOnce((): any => [event] as IEvent[]),
        },
        actions: {
          addEvent: jest.fn(),
          updateEvent: jest.fn(),
        },
      },
      character: {
        namespaced: true,
        getters: {
          allCharacters: jest.fn(),
          ntsByStoryId: jest.fn().mockReturnValueOnce((): any => [event] as IEvent[]),
          getCharacterById: jest.fn().mockReturnValueOnce((): any => {
            return {
              id: 'foo',
            };
          }),
        },
      },
      story: StoryModule,
    };
  });

  test('renders component', () => {
    const store = new Vuex.Store({ modules: storeModules });
    mount(EditEvent, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          params: {},
        },
      },
    });

    expect(storeModules.event.getters.getEventById).not.toHaveBeenCalled();
  });

  test('renders component with event', () => {
    const store = new Vuex.Store({ modules: storeModules });
    mount(EditEvent, {
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

    expect(storeModules.event.getters.getEventById).toHaveBeenCalled();
  });

  test('should add event', () => {
    storeModules.event.getters.getEventById = jest.fn().mockReturnValueOnce(
      (): IEvent => {
        return {
          ...event,
          id: null,
        } as IEvent;
      },
    );
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditEvent, {
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
    expect(storeModules.event.actions.addEvent).toHaveBeenCalled();
    expect($router.push).not.toHaveBeenCalled();
  });

  test('should update event', () => {
    storeModules.event.getters.getEventById = jest.fn().mockReturnValueOnce(
      (): IEvent => {
        return {
          ...event,
        } as IEvent;
      },
    );
    const $router: any = { push: jest.fn() };
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditEvent, {
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
    expect(storeModules.event.actions.updateEvent).toHaveBeenCalled();
    expect($router.push).not.toHaveBeenCalled();
  });

  test('should search for characters', () => {
    storeModules.character.getters.allCharacters = jest.fn().mockReturnValueOnce([
      {
        id: 'foo',
        name: 'foo bar',
      } as ICharacter,
      {
        id: 'baz',
        name: 'baz bar',
      } as ICharacter,
    ]);
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditEvent, {
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
    }) as any;

    wrapper.vm.getCharacters('foo');
    expect(wrapper.vm.characters).toEqual([]);

    wrapper.vm.getCharacters('baz');
    expect(wrapper.vm.characters).toEqual([{ label: 'baz bar', value: 'baz' }]);
  });

  test('should remove character', () => {
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(EditEvent, {
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
    }) as any;

    expect(wrapper.vm.event.characters).toEqual(['foo']);

    wrapper.vm.removeCharacter({ id: 'foo' });
    expect(wrapper.vm.event.characters).toEqual([]);
  });
});
