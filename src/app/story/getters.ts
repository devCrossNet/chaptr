import { IStoryState } from './state';
import { IStory }      from './IStory';

export interface IStoryGetters {
  allStories(state: IStoryState): IStory[];

  getStoryById(state: IStoryState): any;

  currentStory(state: IStoryState): string;
}

export const StoryGetters: IStoryGetters = {
  allStories(state: IStoryState): IStory[] {
    return state.stories;
  },
  getStoryById: (state: IStoryState) => (id: string): IStory => {
    return state.stories.find((story: IStory) => story.id === id);
  },
  currentStory(state: IStoryState): string {
    return state.currentStory;
  },
};
