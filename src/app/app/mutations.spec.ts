import { AppMutations } from './mutations';
import { AppDefaultState, IAppState } from './state';

describe('AppMutations', () => {
  let testState: IAppState;

  beforeEach(() => {
    testState = AppDefaultState();
  });

  test('it should change the locale', () => {
    AppMutations.CHANGE_LOCALE(testState, 'de');
    expect(testState.locale).toBe('de');
  });

  test('it should change the cookie consent version', () => {
    AppMutations.SET_COOKIE_CONSENT_VERSION(testState, '1.0.0');
    expect(testState.cookieConsentVersion).toBe('1.0.0');
  });

  test('it should change the menu position', () => {
    AppMutations.CHANGE_MENU_POSITION(testState);
    expect(testState.menuPosition).toBe('left');

    AppMutations.CHANGE_MENU_POSITION(testState);
    expect(testState.menuPosition).toBe('right');
  });
});
