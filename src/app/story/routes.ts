import { RouteConfig } from 'vue-router/types/router';

export const StoryRoutes: RouteConfig[] = [
  {
    path: '/story/edit/:id?',
    component: () => import(/* webpackChunkName: "editStory" */ './EditStory/EditStory.vue').then((m) => m.default),
  },
  {
    path: '/story/:id',
    component: () => import(/* webpackChunkName: "story" */ './Story/Story.vue').then((m) => m.default),
  },
];
