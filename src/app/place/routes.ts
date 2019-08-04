import { RouteConfig } from 'vue-router/types/router';

export const PlaceRoutes: RouteConfig[] = [
  {
    path: '/place/edit/:id?',
    component: () => import(/* webpackChunkName: "editPlace" */ './EditPlace/EditPlace.vue').then((m) => m.default),
  },
  {
    path: '/place',
    component: () => import(/* webpackChunkName: "place" */ './Place/Place.vue').then((m) => m.default),
  },
];
