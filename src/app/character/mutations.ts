import { ICharacterState } from './state';
import { ICharacter } from './ICharacter';

export interface ICharacterMutations {
  ADD_CHARACTER(state: ICharacterState, character: ICharacter): void;
  UPDATE_CHARACTER(state: ICharacterState, character: ICharacter): void;
}

export const CharacterMutations: ICharacterMutations = {
  ADD_CHARACTER: (state, character) => {
    state.characters.push(character);
  },
  UPDATE_CHARACTER: (state, character) => {
    const index: number = state.characters.findIndex((c: ICharacter) => c.id === character.id);

    state.characters[index] = character;
  },
};
