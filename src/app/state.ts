import { AppDefaultState, IAppState }         from './app/state';
import { StoryDefaultState, IStoryState }         from './story/state';
import { CharacterDefaultState, ICharacterState }         from './character/state';
import { EventDefaultState, IEventState }         from './event/state';

export interface IState {
  [key: string]: any;

  app?: IAppState;
  story?: IStoryState;
  character?: ICharacterState;
  event?: IEventState;
}

export const DefaultState: IState = {
  app:     {
    ...AppDefaultState,
  },
  story: {
    ...StoryDefaultState,
  },
  character: {
    ...CharacterDefaultState,
  },
  event: {
    ...EventDefaultState,
  },
};
