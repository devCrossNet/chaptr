import { IAppConfig } from '../config/IAppConfig';

export interface IAppState {
  locale: string;
  config: IAppConfig;
  defaultMessages: any;
  redirectTo: string;
  cookieConsentVersion: string;
  menuPosition: string;
}

export const AppDefaultState = (): IAppState => {
  return {
    locale: null,
    config: null,
    defaultMessages: {},
    redirectTo: null,
    cookieConsentVersion: '',
    menuPosition: 'right',
  };
};
