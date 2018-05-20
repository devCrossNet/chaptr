import Vue                      from 'vue';
import Vuex, { Store }          from 'vuex';
import { DefaultState, IState } from './state';
import { VuexPersist }          from './shared/plugins/vuex-persist/vuex-persist';
import { PersistLocalStorage }  from './shared/plugins/vuex-persist/PersistLocalStorage';
import { PersistCookieStorage } from './shared/plugins/vuex-persist/PersistCookieStorage';
import { AppModule }            from './app/module';
import { StoryModule }          from './story/module';
import { CharacterModule }      from './character/module';
import { EventModule }          from './event/module';

Vue.use(Vuex);

const state: IState = (CLIENT && window.__INITIAL_STATE__) || DefaultState;

/* istanbul ignore next */
const beforePersistLocalStorage = (localState: IState): IState => {
  return localState;
};

/* istanbul ignore next */
const beforePersistCookieStorage = (localState: IState): IState => {
  delete localState.app.config;
  delete localState.app.defaultMessages;
  delete localState.app.redirectTo;

  return localState;
};

export const store: Store<IState> = new Vuex.Store(
  {
    state,
    plugins: [
      VuexPersist(
        [
          new PersistLocalStorage(['story', 'character', 'event'], beforePersistLocalStorage),
          new PersistCookieStorage(
            ['app'],
            {
              cookieOptions: {
                expires: 365,
              },
              beforePersist: beforePersistCookieStorage,
            },
          ),
        ],
      ),
    ],
  },
);

store.registerModule(['app'], AppModule, { preserveState: true });
store.registerModule(['story'], StoryModule, { preserveState: true });
store.registerModule(['character'], CharacterModule, { preserveState: true });
store.registerModule(['event'], EventModule, { preserveState: true });
