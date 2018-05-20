import { Module }                             from 'vuex';
import { EventDefaultState, IEventState } from './state';
import { EventActions }                     from './actions';
import { EventGetters }                     from './getters';
import { EventMutations }                   from './mutations';

export const EventModule: Module<IEventState, IEventState> = {
  namespaced: true,
  actions:    {
    ...EventActions,
  },
  getters:    {
    ...EventGetters,
  },
  state:      {
    ...EventDefaultState,
  },
  mutations:  {
    ...EventMutations,
  },
};
