import { IItemState } from '@/app/item/state';
import { IItem } from '@/app/item/IItem';

export interface IItemMutations {
  ADD_ITEM(state: IItemState, item: IItem): void;
  UPDATE_ITEM(state: IItemState, item: IItem): void;
}

export const ItemMutations: IItemMutations = {
  ADD_ITEM: (state, item) => {
    state.items.push(item);
  },
  UPDATE_ITEM: (state, item) => {
    const index: number = state.items.findIndex((c: IItem) => c.id === item.id);

    state.items.splice(index, 1, item);
  },
};
