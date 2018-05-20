import { ICharacter } from './ICharacter';

export interface ICharacterState {
  characters: ICharacter[];
}

export const CharacterDefaultState: ICharacterState = {
  characters: [],
};
