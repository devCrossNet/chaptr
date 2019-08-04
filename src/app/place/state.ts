import { IPlace } from '@/app/place/IPlace';

export interface IPlaceState {
  places: IPlace[];
}

export const PlaceDefaultState = (): IPlaceState => {
  return {
    places: [],
  };
};
