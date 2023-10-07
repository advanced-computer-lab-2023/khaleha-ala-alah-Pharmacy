import React from 'react';
import { Alert, Card } from 'antd';

import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';

const pageData: IPageData = {
  title: 'Alerts',
  fulFilled: true,
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
      title: 'Alerts',
    },
  ],
};

const AlertsPage = () => {
  usePageData(pageData);

  return (
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <Card title='Basic'>
          <div className='elem-list'>
            <Alert message='This is Default alert. Lorem ipsum dolor sit amet.' />
            <Alert type='success' message='This is Default alert. Lorem ipsum dolor sit amet.' />
            <Alert type='warning' message='This is Default alert. Lorem ipsum dolor sit amet.' />
            <Alert type='error' message='This is Default alert. Lorem ipsum dolor sit amet.' />
          </div>
        </Card>

        <Card title='Shape' className='mb-md-0'>
          <div className='elem-list'>
            <Alert message='This is alert with default shape' />
            <Alert style={{ borderRadius: 0 }} type='error' message='This is square alert' />
            <Alert style={{ borderRadius: 10 }} type='success' message='This is rounded alerts.' />
            <Alert style={{ borderRadius: 50 }} type='warning' message='This is round alert.' />
          </div>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Removable'>
          <div className='elem-list'>
            <Alert closable message='This is Default alert. Lorem ipsum dolor sit amet.' />
            <Alert
              closable
              type='success'
              message='This is Default alert. Lorem ipsum dolor sit amet.'
            />
            <Alert
              closable
              type='warning'
              message='This is Default alert. Lorem ipsum dolor sit amet.'
            />
            <Alert
              closable
              type='error'
              message='This is Default alert. Lorem ipsum dolor sit amet.'
            />
          </div>
        </Card>

        <Card title='With icons' className='mb-0'>
          <div className='elem-list'>
            <Alert
              message='Success Tips'
              type='success'
              description='This is success alert'
              showIcon
            />
            <Alert message='Warning' type='warning' description='This is warning alert' showIcon />

            <Alert message='Oh snap!' type='error' description='This is error alert' showIcon />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AlertsPage;
