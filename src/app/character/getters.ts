import { ICharacterState } from './state';
import { ICharacter } from './ICharacter';

export interface ICharacterGetters {
  allCharacters(state: ICharacterState): ICharacter[];
  getCharacterById(state: ICharacterState): any;
}

export const CharacterGetters: ICharacterGetters = {
  allCharacters(state) {
    return state.characters;
  },
  getCharacterById: (state) => (id: string) => {
    return state.characters.find((char: ICharacter) => char.id === id);
  },
};
