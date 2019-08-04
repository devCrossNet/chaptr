import { Module } from 'vuex';
import { IState } from '@/app/state';
import { ItemDefaultState, IItemState } from './state';
import { ItemActions } from './actions';
import { ItemGetters } from './getters';
import { ItemMutations } from './mutations';

export const ItemModule: Module<IItemState, IState> = {
  namespaced: true,
  actions: {
    ...ItemActions,
  },
  getters: {
    ...ItemGetters,
  },
  state: {
    ...ItemDefaultState(),
  },
  mutations: {
    ...ItemMutations,
  },
};
