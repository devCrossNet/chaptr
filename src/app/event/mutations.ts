import { IEventState } from './state';
import { IEvent } from './IEvent';

export interface IEventMutations {
  ADD_EVENT(state: IEventState, event: IEvent): void;

  UPDATE_EVENT(state: IEventState, event: IEvent): void;
}

export const EventMutations: IEventMutations = {
  ADD_EVENT: (state: IEventState, event: IEvent) => {
    state.events.push(event);
  },
  UPDATE_EVENT: (state: IEventState, event: IEvent) => {
    const index: number = state.events.findIndex((e: IEvent) => e.id === event.id);

    state.events.splice(index, 1, event);
  },
};
