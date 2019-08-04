import { ActionContext } from 'vuex';
import { IItemState } from '@/app/item/state';
import { IItem } from '@/app/item/IItem';
import { IState } from '@/app/state';

export interface IItemActions {
  addItem(context: ActionContext<IItemState, IState>, item: IItem): void;

  updateItem(context: ActionContext<IItemState, IState>, item: IItem): void;
}

export const ItemActions: IItemActions = {
  addItem({ commit }, item): void {
    commit('ADD_ITEM', item);
  },
  updateItem({ commit }, item): void {
    commit('UPDATE_ITEM', item);
  },
};
