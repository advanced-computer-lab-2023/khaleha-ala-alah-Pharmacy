import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Button, Dropdown } from 'antd';

import { INotification } from '../../../interfaces/notification';

const defaultNotifications = [
  {
    text: 'Sara Crouch liked your photo',
    icon: 'icofont-heart',
    time: '17 minutes ago'
  },
  {
    text: 'New user registered',
    icon: 'icofont-users-alt-6',
    time: '23 minutes ago'
  },
  {
    text: 'Amanda Lie shared your post',
    icon: 'icofont-share',
    time: '25 minutes ago'
  },
  {
    text: 'New user registered',
    icon: 'icofont-users-alt-6',
    time: '32 minutes ago'
  },
  {
    text: 'You have a new message',
    icon: 'icofont-ui-message',
    time: '58 minutes ago'
  }
];

type Props = {
  data?: INotification[];
};

const homeRoute = 'vertical/default-dashboard';

const Notifications = ({ data = defaultNotifications }: Props) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setNotifications(data);
  }, [data]);

  const handleClearAll = (e) => {
    e.preventDefault();
    setNotifications([]);
  };

  const notificationsMenu = () => (
    <ul className='actions-menu' style={{ minWidth: '280px' }}>
      <li className='dropdown-header' key='header-item'>
        <h3 className='dropdown-title'>Notifications</h3>

        <a href="#" onClick={handleClearAll} className='text-danger'>
          Clear all
        </a>
      </li>

      {notifications.length > 0 &&
        notifications.map((item, index) => (
          <li className='action-item' key={index}>
            <NavLink className='d-flex w-100' to={homeRoute}>
              <span className={`icon mr-3 ${item.icon}`} />
              <span className='text'>
                <span className='message'>{item.text}</span>
                <span className='sub-text'>{item.time}</span>
              </span>
            </NavLink>
          </li>
        ))}

      {!notifications.length && (
        <li className='empty-item'>No notifications</li>
      )}

      {notifications.length > 0 && (
        <li className='dropdown-actions' key='actions-item'>
          <Button type='primary' className='w-100'>
            View all notifications
            <span
              style={{ fontSize: '1.2rem' }}
              className='icofont-calendar ml-3'
            />
          </Button>
        </li>
      )}
    </ul>
  );
  return (
    <Dropdown
      className='mr-3'
      dropdownRender={notificationsMenu}
      trigger={['click']}
      open={visible}
      onOpenChange={setVisible}
      placement='bottomRight'
    >
      <Badge className='action-badge' count={notifications.length}>
        <span
          className={`notification-icon icofont-notification ${
            visible ? 'active' : null
          }`}
          style={{ fontSize: '22px', cursor: 'pointer' }}
        />
      </Badge>
    </Dropdown>
  );
};

export default Notifications;
