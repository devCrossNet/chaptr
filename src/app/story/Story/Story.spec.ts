import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { i18n } from '@shared/plugins/i18n/i18n';
import Story from './Story.vue';
import { IEvent } from '../../event/IEvent';
import { AppModule } from '@/app/app/module';
import { CharacterModule } from '@/app/character/module';
import { PlaceModule } from '@/app/place/module';
import { ItemModule } from '@/app/item/module';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Story.vue', () => {
  let storeModules: any;
  const event: IEvent = {
    id: 'foo',
    date: '2001-01-01 01:01:01',
    storyline: 1,
    characters: [],
    chapter: 1,
    storyId: 'bar',
    notes: '',
    storylineOrder: 1,
    title: 'TEST',
    items: [],
    places: [],
  };
  beforeEach(() => {
    storeModules = {
      event: {
        namespaced: true,
        getters: {
          getEventsByStoryId: jest.fn().mockReturnValueOnce((): any => [
            event,
            {
              ...event,
              id: 'bar',
              date: '1999-09-09 09:09:09',
            },
          ]),
        },
      },
      story: {
        namespaced: true,
        getters: {
          getStoryById: jest.fn().mockReturnValueOnce((): any => {
            return {
              title: 'test',
            };
          }),
        },
        actions: {
          setCurrentStory: jest.fn(),
        },
      },
      app: AppModule,
      character: CharacterModule,
      place: PlaceModule,
      item: ItemModule,
    };
  });

  test('renders component', () => {
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(Story, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: { params: { id: 'foo' } },
      },
      stubs: ['router-link'],
    }) as any;

    expect(storeModules.story.getters.getStoryById).toHaveBeenCalled();
    expect(storeModules.story.actions.setCurrentStory).toHaveBeenCalled();
    expect(storeModules.event.getters.getEventsByStoryId).toHaveBeenCalled();
    expect(wrapper.vm.$options.metaInfo.call(wrapper.vm)).toEqual({ title: 'Chaptr | Story | test' });
  });

  test('should sort events by time', () => {
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(Story, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: { params: { id: 'foo' } },
      },
      stubs: ['router-link'],
    }) as any;

    expect(wrapper.vm.view).toBe('print');
    expect(wrapper.vm.orderedEvents).toEqual([
      {
        chapter: 1,
        characters: [],
        date: '2001-01-01 01:01:01',
        id: 'foo',
        notes: '',
        storyId: 'bar',
        storyline: 1,
        storylineOrder: 1,
        title: 'TEST',
        items: [],
        places: [],
      },
      {
        chapter: 1,
        characters: [],
        date: '1999-09-09 09:09:09',
        id: 'bar',
        notes: '',
        storyId: 'bar',
        storyline: 1,
        storylineOrder: 1,
        title: 'TEST',
        items: [],
        places: [],
      },
    ]);

    wrapper.vm.view = 'time';
    expect(wrapper.vm.view).toBe('time');
    expect(wrapper.vm.orderedEvents).toEqual([
      {
        chapter: 1,
        characters: [],
        date: '1999-09-09 09:09:09',
        id: 'bar',
        notes: '',
        storyId: 'bar',
        storyline: 1,
        storylineOrder: 1,
        title: 'TEST',
        items: [],
        places: [],
      },
      {
        chapter: 1,
        characters: [],
        date: '2001-01-01 01:01:01',
        id: 'foo',
        notes: '',
        storyId: 'bar',
        storyline: 1,
        storylineOrder: 1,
        title: 'TEST',
        items: [],
        places: [],
      },
    ]);
  });

  test('should change views', () => {
    const store = new Vuex.Store({ modules: storeModules });
    const wrapper = mount(Story, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: { params: { id: 'foo' } },
      },
      stubs: ['router-link'],
    }) as any;

    expect(wrapper.vm.view).toBe('print');

    wrapper
      .findAll('button')
      .at(8)
      .trigger('click');

    expect(wrapper.vm.view).toBe('storyline');

    wrapper
      .findAll('button')
      .at(8)
      .trigger('click');

    expect(wrapper.vm.view).toBe('time');

    wrapper
      .findAll('button')
      .at(8)
      .trigger('click');

    expect(wrapper.vm.view).toBe('print');
  });
});
