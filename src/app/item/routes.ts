import { RouteConfig } from 'vue-router/types/router';

export const ItemRoutes: RouteConfig[] = [
  {
    path: '/item/edit/:id?',
    component: () => import(/* webpackChunkName: "editItem" */ './EditItem/EditItem.vue').then((m) => m.default),
  },
  {
    path: '/item',
    component: () => import(/* webpackChunkName: "item" */ './Item/Item.vue').then((m) => m.default),
  },
];
