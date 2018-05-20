import { IStoryState } from './state';
import { IStory }      from './IStory';

export interface IStoryMutations {
  ADD_STORY(state: IStoryState, story: IStory): void;

  UPDATE_STORY(state: IStoryState, story: IStory): void;

  SET_CURRENT_STORY(state: IStoryState, id: string): void;
}

export const StoryMutations: IStoryMutations = {
  ADD_STORY:         (state: IStoryState, story: IStory) => {
    state.stories.push(story);
  },
  UPDATE_STORY:      (state: IStoryState, story: IStory) => {
    const index: number = state.stories.findIndex((s: IStory) => s.id === story.id);

    state.stories[index] = story;
  },
  SET_CURRENT_STORY: (state: IStoryState, id: string) => {
    state.currentStory = id;
  },
};
