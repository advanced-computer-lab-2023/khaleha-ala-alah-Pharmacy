import { IAppSettings } from '../../interfaces/settings';

export const SET_SETTINGS = '[settings] Set settings';
export const RESET_SETTINGS = '[settings] Reset settings';
export const UPDATE_SETTINGS = '[settings] Update settings';
export const TOGGLE_SIDEBAR = '[User] Toggle navbar';

export interface SetSettingsAction {
  type: typeof SET_SETTINGS;
  payload: IAppSettings;
}

export interface ResetSettingsAction {
  type: typeof RESET_SETTINGS;
}

export interface UpdateSettingsAction {
  type: typeof UPDATE_SETTINGS;
  payload: IAppSettings;
}

export interface ToggleSidebarAction {
  type: typeof TOGGLE_SIDEBAR
}

export type SettingsActionTypes = SetSettingsAction | ResetSettingsAction | UpdateSettingsAction | ToggleSidebarAction;
