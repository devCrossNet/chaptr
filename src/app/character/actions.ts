import { ActionContext } from 'vuex';
import { ICharacterState } from './state';
import { ICharacter } from './ICharacter';

export interface ICharacterActions {
  addCharacter(context: ActionContext<ICharacterState, ICharacterState>, character: ICharacter): void;

  updateCharacter(context: ActionContext<ICharacterState, ICharacterState>, character: ICharacter): void;
}

export const CharacterActions: ICharacterActions = {
  addCharacter({ commit }: ActionContext<ICharacterState, ICharacterState>, character: ICharacter): void {
    commit('ADD_CHARACTER', character);
  },
  updateCharacter({ commit }: ActionContext<ICharacterState, ICharacterState>, character: ICharacter): void {
    commit('UPDATE_CHARACTER', character);
  },
};
