import { RouteConfig } from 'vue-router/types/router';

export const CharacterRoutes: RouteConfig[] = [
  {
    path:      '/character/edit/:id?',
    component: () => import(/* webpackChunkName: "editCharacter" */ './EditCharacter/EditCharacter.vue').then(m => m.default),
  },
  {
    path:      '/character',
    component: () => import(/* webpackChunkName: "character" */ './Character/Character.vue').then(m => m.default),
  },
];
