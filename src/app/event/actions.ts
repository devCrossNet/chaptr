import { ActionContext } from 'vuex';
import { IEventState } from './state';
import { IEvent } from './IEvent';

export interface IEventActions {
  addEvent(context: ActionContext<IEventState, IEventState>, event: IEvent): void;

  updateEvent(context: ActionContext<IEventState, IEventState>, event: IEvent): void;
}

export const EventActions: IEventActions = {
  addEvent({ commit }: ActionContext<IEventState, IEventState>, event: IEvent): void {
    commit('ADD_EVENT', event);
  },
  updateEvent({ commit }: ActionContext<IEventState, IEventState>, event: IEvent): void {
    commit('UPDATE_EVENT', event);
  },
};
