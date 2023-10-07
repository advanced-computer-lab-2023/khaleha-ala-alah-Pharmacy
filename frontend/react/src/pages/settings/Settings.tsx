import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SettingsForm from '../../layout/components/settings/SettingsForm';

import { resetSettings, updateSettings } from '../../redux/settings/actions';
import { usePageData } from '../../hooks/usePage';

import { IAppState } from '../../interfaces/app-state';
import { IPageData } from '../../interfaces/page';

const pageData: IPageData = {
  title: 'Settings',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Home',
      route: 'default-dashboard'
    },
    {
      title: 'Settings'
    }
  ]
};

const SettingsPage = () => {
  const settings = useSelector((state: IAppState) => state.settings);
  const dispatch = useDispatch();

  usePageData(pageData);

  const onResetSettings = () => {
    dispatch(resetSettings());
  };

  const onUpdateSettings = (settings) => {
    dispatch(updateSettings(settings));
  };

  return (
    <div className='row'>
      <div className='col-md-6'>
        <SettingsForm
          onResetSettings={onResetSettings}
          onUpdateSetting={onUpdateSettings}
          settings={settings}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
