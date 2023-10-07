import {
  RESET_SETTINGS,
  SET_SETTINGS,
  UPDATE_SETTINGS,
  TOGGLE_SIDEBAR
} from './types';

import { IAppSettings } from '../../interfaces/settings';

export const setSettings = (data: IAppSettings) => ({
  type: SET_SETTINGS,
  payload: data
});

export const updateSettings = (data: IAppSettings) => ({
  type: UPDATE_SETTINGS,
  payload: data
});

export const resetSettings = () => ({
  type: RESET_SETTINGS
});

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
});
