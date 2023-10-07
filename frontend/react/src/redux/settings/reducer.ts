import {
  SettingsActionTypes,
  SET_SETTINGS,
  RESET_SETTINGS,
  UPDATE_SETTINGS,
  TOGGLE_SIDEBAR
} from './types';

import { IAppSettings } from '../../interfaces/settings';
import { DEFAULT_SETTINGS } from './settings';

const initialState: IAppSettings = DEFAULT_SETTINGS;

export const settingsReducer = (
  state: IAppSettings = initialState,
  action: SettingsActionTypes
): IAppSettings => {
  switch (action.type) {
    case SET_SETTINGS:
      return { ...action.payload };
    case UPDATE_SETTINGS:
      return { ...state, ...action.payload };
    case RESET_SETTINGS:
      return { ...initialState };
    case TOGGLE_SIDEBAR:
      return { ...state, sidebarOpened: !state.sidebarOpened };
    default:
      return { ...state };
  }
};
