import { IAppState } from './state';

export interface IAppMutations {
  CHANGE_LOCALE(state: IAppState, locale: string): void;

  SET_COOKIE_CONSENT_VERSION(state: IAppState, version: string): void;

  CHANGE_MENU_POSITION(state: IAppState): void;
}

export const AppMutations: IAppMutations = {
  CHANGE_LOCALE: (state, locale) => {
    state.locale = locale;
  },
  SET_COOKIE_CONSENT_VERSION: (state, version) => {
    state.cookieConsentVersion = version;
  },
  CHANGE_MENU_POSITION: (state) => {
    state.menuPosition = state.menuPosition === 'right' ? 'left' : 'right';
  },
};
