import React from 'react';

import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';
import { Button, Card } from 'antd';
import {
  DeleteOutlined,
  PrinterOutlined,
  SearchOutlined,
  SendOutlined,
  SettingOutlined
} from '@ant-design/icons';

const pageDate: IPageData = {
  title: 'Buttons',
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
      title: 'Buttons'
    }
  ]
};

const ButtonsPage = () => {
  usePageData(pageDate);

  return (
    <>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Card title='Size'>
            <div className='elem-list'>
              <Button size='small'>Small button</Button>
              <Button>Default button</Button>
              <Button size='large'>Large button</Button>
            </div>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Shape'>
            <div className='elem-list'>
              <Button className='rounded-full'>Round button</Button>
              <Button>Default button</Button>
              <Button className='rounded-none'>Square button</Button>
            </div>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Types'>
            <div className='elem-list'>
              <Button type='default'>Default</Button>
              <Button danger>Danger</Button>
              <Button type='dashed'>Dashed</Button>
              <Button type='link'>Link</Button>
              <Button type='primary'>Primary</Button>
            </div>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Outline'>
            <div className='elem-list'>
              <Button type='default' ghost>
                Default
              </Button>
              <Button danger ghost>
                Danger
              </Button>
              <Button type='dashed' ghost>
                Dashed
              </Button>
              <Button type='primary' ghost>
                Primary
              </Button>
            </div>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Width'>
            <div className='elem-list'>
              <Button style={{ width: '50%' }}>50% Width</Button>
              <Button block>Block button</Button>
              <Button>Default button</Button>
            </div>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Align'>
            <div className='elem-list'>
              <Button className='text-left' block>
                Left
              </Button>
              <Button className='text-center' block>
                Center
              </Button>
              <Button className='text-right' block>
                Right
              </Button>
            </div>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Disabled'>
            <div className='elem-list'>
              <Button disabled type='default'>
                Default
              </Button>
              <Button disabled danger>
                Danger
              </Button>
              <Button disabled type='dashed'>
                Dashed
              </Button>
              <Button disabled type='link'>
                Link
              </Button>
              <Button disabled type='primary'>
                Primary
              </Button>
            </div>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Loading'>
            <div className='elem-list'>
              <Button loading type='default'>
                Default
              </Button>
              <Button loading danger>
                Danger
              </Button>
              <Button loading type='dashed'>
                Dashed
              </Button>
              <Button loading type='primary'>
                Primary
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Card title='With icons' className='mb-0'>
        <div className='elem-list'>
          <Button type='primary' icon={<SearchOutlined />}>
            Search
          </Button>
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
          <Button icon={<PrinterOutlined />}>Print</Button>
          <Button icon={<SettingOutlined />}>Settings</Button>
          <Button type='primary' icon={<SendOutlined />}>
            Send
          </Button>
          <Button shape='circle' type='primary' icon={<SearchOutlined />} />
          <Button shape='circle' danger icon={<DeleteOutlined />} />
          <Button shape='circle' icon={<SettingOutlined />} />
        </div>
      </Card>
    </>
  );
};

export default ButtonsPage;
