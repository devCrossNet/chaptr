import { Module } from 'vuex';
import { IState } from '@/app/state';
import { PlaceDefaultState, IPlaceState } from './state';
import { PlaceActions } from './actions';
import { PlaceGetters } from './getters';
import { PlaceMutations } from './mutations';

export const PlaceModule: Module<IPlaceState, IState> = {
  namespaced: true,
  actions: {
    ...PlaceActions,
  },
  getters: {
    ...PlaceGetters,
  },
  state: {
    ...PlaceDefaultState(),
  },
  mutations: {
    ...PlaceMutations,
  },
};
