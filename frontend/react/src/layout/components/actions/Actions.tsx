import React from 'react';

import './Actions.scss';

import Notifications from './Notifications';
import SettingsDropdown from './SettingsDropdown';

const Actions = () => (
  <div className='actions'>
    <Notifications />

    <SettingsDropdown />
  </div>
);

export default Actions;
