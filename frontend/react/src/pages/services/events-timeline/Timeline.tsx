import React from 'react';
import { Tag, Timeline } from 'antd';
import {
  AlertOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
  MonitorOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@ant-design/icons/lib';

export const OurTimeline = () => {
  const eventsList = [
    {
      dot: (
        <div className='timeline-head bg-color-indigo'>
          <UserOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <span className='text-lg'>Appointment</span>
          <span className='text-base text-color-100'>2m ago</span>
          <span className='text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
          </span>
        </div>
      )
    },
    {
      dot: (
        <div className='timeline-head bg-color-pink'>
          <ExperimentOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <span className='text-lg'>Medication</span>
          <span className='text-base text-color-100'>2h ago</span>
          <span className='text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
            veniam.
          </span>
        </div>
      )
    },
    {
      dot: (
        <div className='timeline-head bg-color-green'>
          <AlertOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <span className='text-lg'>Appointment</span>
          <span className='text-base text-color-100'>Yesterday</span>
          <span className='text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
          </span>
        </div>
      )
    },
    {
      dot: (
        <div className='timeline-head bg-color-blue'>
          <MedicineBoxOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <span className='text-lg'>Medication</span>
          <span className='text-base text-color-100'>Week ago</span>
          <span className='text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
            veniam.
          </span>
        </div>
      )
    }
  ];
  const meetingsList = [
    {
      dot: (
        <div className='timeline-head bg-color-yellow'>
          <UserAddOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <span className='text-lg'>New patient</span>
          <span className='text-base text-color-100'>Aug 3</span>
          <span className='text-base'>Lorem ipsum dolor sit.</span>
        </div>
      )
    },
    {
      dot: (
        <div className='timeline-head bg-color-teal'>
          <MonitorOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <span className='text-lg'>Examination</span>
          <span className='text-base text-color-100'>Jul 10</span>
          <span className='text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
            veniam.
          </span>
        </div>
      )
    },
    {
      dot: (
        <div className='timeline-head bg-color-orange'>
          <UsergroupAddOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <span className='text-lg'>New patient</span>
          <span className='text-base text-color-100'>Jul 1</span>
          <span className='text-base'>Lorem ipsum dolor sit.</span>
        </div>
      )
    }
  ];
  return (
    <>
      <Tag className='timeline-tag mb-5' color='#f56565' style={{ color: '#fff' }}>Events</Tag>
      <Timeline items={eventsList} className='ml-4' />

      <Tag className='timeline-tag mb-5' color='#48bb78' style={{ color: '#fff' }}>Meetings</Tag>
      <Timeline items={meetingsList} className='ml-4' />
    </>
  );
};
