import Vue from 'vue';
import VueRouter from 'vue-router';
import Meta from 'vue-meta';
import { AppRoutes } from './app/routes';
import { HomeRoutes } from './home/routes';
import { StoryRoutes } from './story/routes';
import { CharacterRoutes } from './character/routes';
import { EventRoutes } from './event/routes';
import { PlaceRoutes } from './place/routes';
import { ItemRoutes } from './item/routes';

Vue.use(VueRouter);
Vue.use(Meta);

export const router: VueRouter = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    ...AppRoutes,
    ...HomeRoutes,
    ...StoryRoutes,
    ...CharacterRoutes,
    ...EventRoutes,
    ...PlaceRoutes,
    ...ItemRoutes,
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    }
    return savedPosition || { x: 0, y: 0 };
  },
});
