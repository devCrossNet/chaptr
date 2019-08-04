import { IItemState } from '@/app/item/state';
import { IItem } from '@/app/item/IItem';

export interface IItemGetters {
  allItems(state: IItemState): IItem[];
  getItemById(state: IItemState): any;
}

export const ItemGetters: IItemGetters = {
  allItems(state) {
    return state.items;
  },
  getItemById: (state) => (id: string) => {
    return state.items.find((char: IItem) => char.id === id);
  },
};
