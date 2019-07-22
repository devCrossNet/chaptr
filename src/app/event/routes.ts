import { RouteConfig } from 'vue-router/types/router';

export const EventRoutes: RouteConfig[] = [
  {
    path: '/event/edit/:storyId/:id?',
    component: () => import(/* webpackChunkName: "event" */ './EditEvent/EditEvent.vue').then((m) => m.default),
  },
];
