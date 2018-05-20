import { Module }                             from 'vuex';
import { CharacterDefaultState, ICharacterState } from './state';
import { CharacterActions }                     from './actions';
import { CharacterGetters }                     from './getters';
import { CharacterMutations }                   from './mutations';

export const CharacterModule: Module<ICharacterState, ICharacterState> = {
  namespaced: true,
  actions:    {
    ...CharacterActions,
  },
  getters:    {
    ...CharacterGetters,
  },
  state:      {
    ...CharacterDefaultState,
  },
  mutations:  {
    ...CharacterMutations,
  },
};
