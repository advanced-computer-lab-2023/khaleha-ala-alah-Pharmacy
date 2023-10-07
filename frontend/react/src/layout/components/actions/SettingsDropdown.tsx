import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';

const accountItems = [
  { text: 'Edit account', icon: 'icofont-ui-home', route: '/vertical/edit-account' },
  { text: 'User profile', icon: 'icofont-ui-user', route: '/vertical/user-profile' },
  { text: 'Calendar', icon: 'icofont-ui-calendar', route: '/vertical/events-calendar' },
  { text: 'Settings', icon: 'icofont-ui-settings', route: '/vertical/settings' },
  { text: 'Log Out', icon: 'icofont-logout', route: '/public/sign-in' }
];

const SettingsDropdown = () => {
  const accountMenu = () => (
    <ul className='actions-menu' style={{ minWidth: '180px' }}>
      {accountItems.map((item, index) => (
        <li className='action-item' key={index}>
          <NavLink className='d-flex w-100' to={item.route} replace>
            <span className={`icon mr-3 ${item.icon}`} />
            <span className='text'>{item.text}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <Dropdown dropdownRender={accountMenu} trigger={['click']} placement='bottomRight'>
      <div className='item'>
        <Avatar
          size={40}
          className='mr-1'
          src={`${window.location.origin}/content/user-40-2.jpg`}
        />
        <span className='icofont-simple-down' />
      </div>
    </Dropdown>
  );
};

export default SettingsDropdown;
