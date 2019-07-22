import { ActionContext } from 'vuex';
import { IStoryState } from './state';
import { IStory } from './IStory';

export interface IStoryActions {
  addStory(context: ActionContext<IStoryState, IStoryState>, story: IStory): void;

  updateStory(context: ActionContext<IStoryState, IStoryState>, story: IStory): void;

  setCurrentStory(context: ActionContext<IStoryState, IStoryState>, id: string): void;
}

export const StoryActions: IStoryActions = {
  addStory({ commit }: ActionContext<IStoryState, IStoryState>, story: IStory): void {
    commit('ADD_STORY', story);
  },
  updateStory({ commit }: ActionContext<IStoryState, IStoryState>, story: IStory): void {
    commit('UPDATE_STORY', story);
  },
  setCurrentStory({ commit }: ActionContext<IStoryState, IStoryState>, id: string): void {
    commit('SET_CURRENT_STORY', id);
  },
};
