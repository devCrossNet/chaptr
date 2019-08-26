import { IPlaceState } from '@/app/place/state';
import { IPlace } from '@/app/place/IPlace';

export interface IPlaceGetters {
  allPlaces(state: IPlaceState): IPlace[];
  getPlaceById(state: IPlaceState): any;
}

export const PlaceGetters: IPlaceGetters = {
  allPlaces /* istanbul ignore next */(state) {
    return state.places;
  },
  getPlaceById /* istanbul ignore next */: (state) => (id: string) => {
    return state.places.find((char: IPlace) => char.id === id);
  },
};
