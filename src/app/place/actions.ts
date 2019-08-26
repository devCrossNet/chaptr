import { ActionContext } from 'vuex';
import { IState } from '@/app/state';
import { IPlaceState } from '@/app/place/state';
import { IPlace } from '@/app/place/IPlace';

export interface IPlaceActions {
  addPlace(context: ActionContext<IPlaceState, IState>, place: IPlace): void;

  updatePlace(context: ActionContext<IPlaceState, IState>, place: IPlace): void;
}

export const PlaceActions: IPlaceActions = {
  addPlace /* istanbul ignore next */({ commit }, place): void {
    commit('ADD_PLACE', place);
  },
  updatePlace /* istanbul ignore next */({ commit }, place): void {
    commit('UPDATE_PLACE', place);
  },
};
