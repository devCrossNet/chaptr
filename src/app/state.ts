import { AppDefaultState, IAppState } from './app/state';
import { StoryDefaultState, IStoryState } from './story/state';
import { CharacterDefaultState, ICharacterState } from './character/state';
import { EventDefaultState, IEventState } from './event/state';
import { IPlaceState } from './place/state';
import { IItemState } from './item/state';

export interface IState {
  [key: string]: any;

  app?: IAppState;
  story?: IStoryState;
  character?: ICharacterState;
  event?: IEventState;
  place?: IPlaceState;
  item?: IItemState;
}

export const DefaultState: IState = {
  app: {
    ...AppDefaultState(),
  },
  story: {
    ...StoryDefaultState(),
  },
  character: {
    ...CharacterDefaultState(),
  },
  event: {
    ...EventDefaultState(),
  },
};
