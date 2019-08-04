import { ActionContext } from 'vuex';
import { ICharacterState } from './state';
import { ICharacter } from './ICharacter';
import { IState } from '@/app/state';

export interface ICharacterActions {
  addCharacter(context: ActionContext<ICharacterState, IState>, character: ICharacter): void;

  updateCharacter(context: ActionContext<ICharacterState, IState>, character: ICharacter): void;
}

export const CharacterActions: ICharacterActions = {
  addCharacter({ commit }, character): void {
    commit('ADD_CHARACTER', character);
  },
  updateCharacter({ commit }, character): void {
    commit('UPDATE_CHARACTER', character);
  },
};
