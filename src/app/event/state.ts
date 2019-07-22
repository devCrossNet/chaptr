import { IEvent } from './IEvent';

export interface IEventState {
  events: IEvent[];
}

export const EventDefaultState = (): IEventState => ({
  events: [],
});
