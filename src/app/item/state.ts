import { IItem } from '@/app/item/IItem';

export interface IItemState {
  items: IItem[];
}

export const ItemDefaultState = (): IItemState => {
  return {
    items: [],
  };
};
