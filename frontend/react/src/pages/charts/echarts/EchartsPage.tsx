import React from 'react';

import { Alert, Card } from 'antd';
import { BarChartOutlined } from '@ant-design/icons/lib';

import ReactEcharts from 'echarts-for-react';

import {
  areaOptions,
  line2Options,
  lineOptions,
  pi2Options,
  pieOptions,
  barFactoryOptions
} from './charts-options';

import { usePageData } from '../../../hooks/usePage';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Echarts',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Home',
      route: 'default-dashboard'
    },
    {
      title: 'UI Kit ',
      route: 'default-dashboard'
    },
    {
      title: 'Echarts'
    }
  ]
};

const barOptions = barFactoryOptions();

const EchartsPage = () => {
  usePageData(pageData);

  return (
    <>
      <Card title='Area chart'>
        <ReactEcharts option={areaOptions} />
      </Card>

      <Card title='Bar chart'>
        <ReactEcharts option={barOptions} />
      </Card>

      <Card title='Line chart'>
        <ReactEcharts option={lineOptions} />
      </Card>

      <Card title='Line chart with points'>
        <ReactEcharts option={line2Options} />
      </Card>

      <div className='row'>
        <div className='col-lg-6 col-md-12'>
          <Card title='Pie chart'>
            <ReactEcharts option={pieOptions} />
          </Card>
        </div>

        <div className='col-lg-6 col-md-12'>
          <Card title='Hole pie chart'>
            <ReactEcharts option={pi2Options} />
          </Card>
        </div>
      </div>

      <Alert
        style={{ background: 'hsla(0,0%,92.2%,.3)' }}
        message={
          <span>
            <BarChartOutlined className='mr-2' style={{ fontSize: '1.8em' }} />
            More information can be found in{' '}
            <a href='https://echarts.apache.org/en/index.html'>official page</a>
          </span>
        }
      />
    </>
  );
};

export default EchartsPage;
