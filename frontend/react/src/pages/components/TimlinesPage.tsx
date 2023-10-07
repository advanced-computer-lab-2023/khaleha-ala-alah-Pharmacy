import React from 'react';

import { Card, Timeline } from 'antd';
import {
  ExperimentOutlined,
  MonitorOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons/lib';

import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';

const pageData: IPageData = {
  title: 'Vertical timeline',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'UI Kit',
      route: 'default-dashboard'
    },
    {
      title: 'Components',
      route: 'default-dashboard'
    },
    {
      title: 'Vertical timeline'
    }
  ]
};

const TimelinePage = () => {
  usePageData(pageData);

  const defaultItems = [
    {
      children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.'
    },
    {
      children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi'
    },
    {
      children: 'Lorem ipsum dolor sit.'
    },
    {
      children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi'
    },
  ];
  const iconsItems = [
    {
      dot: <div className='timeline-head bg-color-indigo'>
        <UserOutlined className='text-contrast-500' />
      </div>,
      children: (
        <div className='d-flex flex-column'>
          <span className='h5'>Appointment</span>
          <span className='text-base text-color-100'>2m ago</span>
          <span className='item-desc'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
          </span>
        </div>
      )
    },
    {
      dot: <div className='timeline-head bg-color-pink'>
        <ExperimentOutlined className='text-contrast-500' />
      </div>,
      children: (
        <div className='d-flex flex-column'>
          <span className='h5'>Medication</span>
          <span className='text-base text-color-100'>2h ago</span>
          <span className='item-desc'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.
          </span>
        </div>
      )
    },
    {
      dot: <div className='timeline-head bg-color-yellow'>
        <UserAddOutlined className='text-contrast-500' />
      </div>,
      children: (
        <div className='d-flex flex-column'>
          <span className='h5'>New patient</span>
          <span className='text-base text-color-100'>Jul 10</span>
          <span className='item-desc'>Lorem ipsum dolor sit.</span>
        </div>
      )
    },
    {
      dot: <div className='timeline-head bg-color-orange'>
        <MonitorOutlined className='text-contrast-500' />
      </div>,
      children: (
        <div className='d-flex flex-column'>
          <span className='h5'>Examination</span>
          <span className='text-base text-color-100'>Jul 1</span>
          <span className='item-desc'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.
          </span>
        </div>
      )
    },
  ];
  const rightItems = [
    {
      color: 'blue',
      children: <div className='d-flex flex-column'>
        <span className='h5'>Appointment</span>
        <span className='text-base text-color-100'>2m ago</span>
        <span className='item-desc'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
        </span>
      </div>
    },
    {
      color: 'pink',
      children: <div className='d-flex flex-column'>
        <span className='h5'>Medication</span>
        <span className='text-base text-color-100'>2h ago</span>
        <span className='item-desc'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.
        </span>
      </div>
    },
    {
      color: 'yellow',
      children: <div className='d-flex flex-column'>
        <span className='h5'>New patient</span>
        <span className='text-base text-color-100'>Jul 10</span>
        <span className='item-desc'>Lorem ipsum dolor sit.</span>
      </div>
    },
    {
      color: 'orange',
      children: <div className='d-flex flex-column'>
        <span className='h5'>Examination</span>
        <span className='text-base text-color-100'>Jul 1</span>
        <span className='item-desc'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.
        </span>
      </div>
    },
  ];
  const centerItems = [
    {
      dot: <div className='timeline-head bg-color-indigo'>
        <UserOutlined className='text-contrast-500' />
      </div>,
      children: (
        <div className='d-flex flex-column'>
          <span className='h5'>Appointment</span>
          <span className='text-base text-color-100'>2m ago</span>
          <span className='item-desc'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
          </span>
        </div>
      )
    },
    {
      dot: <div className='timeline-head bg-color-pink'>
        <ExperimentOutlined className='text-contrast-500' />
      </div>,
      children: (
        <div className='d-flex flex-column'>
          <span className='h5'>Medication</span>
          <span className='text-base text-color-100'>2h ago</span>
          <span className='item-desc'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.
          </span>
        </div>
      )
    },
    {
      dot: <div className='timeline-head bg-color-yellow'>
        <UserAddOutlined className='text-contrast-500' />
      </div>,
      children: (
        <div className='d-flex flex-column'>
          <span className='h5'>New patient</span>
          <span className='text-base text-color-100'>Jul 10</span>
          <span className='item-desc'>Lorem ipsum dolor sit.</span>
        </div>
      )
    },
    {
      dot: <div className='timeline-head bg-color-orange'>
        <MonitorOutlined className='text-contrast-500' />
      </div>,
      children: (
        <div className='d-flex flex-column'>
          <span className='h5'>Examination</span>
          <span className='text-base text-color-100'>Jul 1</span>
          <span className='item-desc'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.
          </span>
        </div>
      )
    },
  ];

  return (
    <>
      <Card title='Default'>
        <Timeline className='ml-3 mt-4' items={defaultItems} />
      </Card>

      <Card title='With icons'>
        <Timeline className='ml-3 mt-4' items={iconsItems} />
      </Card>

      <Card title='Right align'>
        <Timeline className='ml-3 mt-4' items={rightItems} mode="right" />
      </Card>

      <Card title='Centered'>
        <Timeline className='ml-3 mt-4' items={centerItems} mode="alternate" />
      </Card>
    </>
  );
}

export default TimelinePage;
