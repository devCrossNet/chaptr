import { IStory } from './IStory';

export interface IStoryState {
  stories: IStory[];
  currentStory: string;
}

export const StoryDefaultState = (): IStoryState => ({
  stories: [],
  currentStory: null,
});
