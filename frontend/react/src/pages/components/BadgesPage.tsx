import React from 'react';

import { Card, Tag } from 'antd';
import {
  BugOutlined,
  NotificationOutlined,
  PaperClipOutlined,
  ShoppingCartOutlined,
  TagOutlined,
} from '@ant-design/icons';

import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';

const pageData: IPageData = {
  fulFilled: true,
  title: 'Badges',
  breadcrumbs: [
    {
      title: 'UI Kit',
      route: 'default-dashboard',
    },
    {
      title: 'Components',
      route: 'default-dashboard',
    },
    {
      title: 'Badges',
    },
  ],
};

const BadgesPage = () => {
  usePageData(pageData);

  return (
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <Card title='Style'>
          <div className='elem-list'>
            <Tag>Default</Tag>
            <Tag color={'#336cfb'}>Accent</Tag>
            <Tag color={'#b7ce63'}>Success</Tag>
            <Tag color={'#64B5F6'}>Info</Tag>
            <Tag color={'#e9e165'}>Warning</Tag>
            <Tag color={'#ed5564'}>Error</Tag>
          </div>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='With Icons'>
          <div className='elem-list'>
            <Tag color='#ed5564'>
              <BugOutlined className='mr-2' /> Bugs
            </Tag>

            <Tag color='#b7ce63'>
              <ShoppingCartOutlined className='mr-2' /> Cart
            </Tag>

            <Tag color='#64B5F6'>
              <PaperClipOutlined className='mr-2' /> Files
            </Tag>

            <Tag color='#336cfb'>
              Notification <NotificationOutlined className='ml-2' />
            </Tag>

            <Tag color='#E9D64A'>
              <TagOutlined className='mr-2' /> Label
            </Tag>
          </div>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Size' className='mb-md-0'>
          <div className='elem-list'>
            <Tag className='xs'>Extra small</Tag>
            <Tag className='sm'>Small</Tag>
            <Tag>Default</Tag>
            <Tag className='lg'>Large</Tag>
          </div>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Shape' className='mb-0'>
          <div className='elem-list'>
            <Tag>Default</Tag>
            <Tag className='br-0'>Square</Tag>
            <Tag className='br-25'>Rounded</Tag>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BadgesPage;
