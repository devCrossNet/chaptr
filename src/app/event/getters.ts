import { IEventState } from './state';
import { IEvent } from './IEvent';

export interface IEventGetters {
  getEventById(state: IEventState): any;

  getEventsByStoryId(state: IEventState): any;
}

export const EventGetters: IEventGetters = {
  getEventById: (state: IEventState) => (id: string): IEvent => {
    return state.events.find((event: IEvent) => event.id === id);
  },
  getEventsByStoryId: (state: IEventState) => (storyId: string): IEvent[] => {
    return state.events
      .filter((event: IEvent) => event.storyId === storyId)
      .sort((a: IEvent, b: IEvent) => a.storylineOrder - b.storylineOrder);
  },
};
