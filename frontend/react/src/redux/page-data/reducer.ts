import { PageActionsTypes, RESET_PAGE_DATA, UPDATE_PAGE_DATA, SET_PAGE_DATA } from './types';
import { IPageData } from '../../interfaces/page';

const initialState: IPageData = {
  title: '',
  fulFilled: true,
  breadcrumbs: [{ route: 'default-dashboard', title: 'Home' }, { title: 'Dashboard' }],
};

export const pageDataReducer = (state: IPageData = initialState, action: PageActionsTypes) => {
  switch (action.type) {
    case SET_PAGE_DATA:
      return { ...action.payload, fullFilled: true };
    case UPDATE_PAGE_DATA:
      return { ...state, ...action.payload };
    case RESET_PAGE_DATA:
      return { ...initialState };
    default:
      return { ...state };
  }
};
