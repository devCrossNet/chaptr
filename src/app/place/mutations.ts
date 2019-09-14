import { IPlaceState } from '@/app/place/state';
import { IPlace } from '@/app/place/IPlace';

export interface IPlaceMutations {
  ADD_PLACE(state: IPlaceState, place: IPlace): void;
  UPDATE_PLACE(state: IPlaceState, place: IPlace): void;
}

export const PlaceMutations: IPlaceMutations = {
  ADD_PLACE: (state, place) => {
    state.places.push(place);
  },
  UPDATE_PLACE: (state, place) => {
    const index: number = state.places.findIndex((c: IPlace) => c.id === place.id);

    state.places.splice(index, 1, place);
  },
};
