import { Module }                             from 'vuex';
import { StoryDefaultState, IStoryState } from './state';
import { StoryActions }                     from './actions';
import { StoryGetters }                     from './getters';
import { StoryMutations }                   from './mutations';

export const StoryModule: Module<IStoryState, IStoryState> = {
  namespaced: true,
  actions:    {
    ...StoryActions,
  },
  getters:    {
    ...StoryGetters,
  },
  state:      {
    ...StoryDefaultState,
  },
  mutations:  {
    ...StoryMutations,
  },
};
