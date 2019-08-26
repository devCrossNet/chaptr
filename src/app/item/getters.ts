import { IItemState } from '@/app/item/state';
import { IItem } from '@/app/item/IItem';

export interface IItemGetters {
  allItems(state: IItemState): IItem[];
  getItemById(state: IItemState): any;
}

export const ItemGetters: IItemGetters = {
  allItems /* istanbul ignore next */(state) {
    return state.items;
  },
  getItemById /* istanbul ignore next */: (state) => (id: string) => {
    return state.items.find((char: IItem) => char.id === id);
  },
};
