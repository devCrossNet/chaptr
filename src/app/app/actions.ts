import { ActionContext } from 'vuex';
import { IAppState } from './state';

export interface IAppActions {
  changeLocale(context: ActionContext<IAppState, IAppState>, locale: string): void;
  setCookieConsentVersion(context: ActionContext<IAppState, IAppState>, version: string): void;
  changeMenuPosition(context: ActionContext<IAppState, IAppState>): void;
}

export const AppActions: IAppActions = {
  changeLocale: ({ commit }, locale) => commit('CHANGE_LOCALE', locale),
  setCookieConsentVersion: ({ commit }, version) => commit('SET_COOKIE_CONSENT_VERSION', version),
  changeMenuPosition: ({ commit }) => commit('CHANGE_MENU_POSITION'),
};
