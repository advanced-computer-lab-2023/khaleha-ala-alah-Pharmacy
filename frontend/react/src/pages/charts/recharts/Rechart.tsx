import React from 'react';

import { Alert, Card } from 'antd';
import { BarChartOutlined } from '@ant-design/icons/lib';

import SimpleAreaChart from './charts/SimpleAreaChart';
import PercentAreaChart from './charts/PercentAreaChart';
import AreaChartFillByValue from './charts/AreaChartFillByValue';
import StackedAreaChart from './charts/StackedAreaChart';
import SimpleLineChart from './charts/SimpleLineChart';
import VerticalLineChart from './charts/VerticalLineChart';
import SimpleBarChart from './charts/SimpleBarCharts';
import WithCustomShape from './charts/CustomShapeBarChart';
import WithCustomActiveShape from './charts/CustomActiveShapeChart';
import TwoLevelPieChart from './charts/TwoLevelPieChart';

import { usePageData } from '../../../hooks/usePage';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Recharts',
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
      title: 'Recharts'
    }
  ]
};

const RechartsPage = () => {
  usePageData(pageData);

  return (
    <>
      <h4 className='section-title'>Area charts</h4>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Card title='Simple area chart'>
            <SimpleAreaChart />
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Percent area chart'>
            <PercentAreaChart />
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Area chart fill by value'>
            <AreaChartFillByValue />
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Area chart fill by value'>
            <StackedAreaChart />
          </Card>
        </div>
      </div>

      <h4 className='section-title'>Line charts</h4>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Card title='Simple line chart'>
            <SimpleLineChart />
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Vertical line chart'>
            <VerticalLineChart />
          </Card>
        </div>
      </div>

      <h4 className='section-title'>Bar charts</h4>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Card title='Simple bar chart'>
            <SimpleBarChart />
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Custom shape bar chart'>
            <WithCustomShape />
          </Card>
        </div>
      </div>

      <h4 className='section-title'>Pie charts</h4>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Card title='Two level pie chart' className='mb-md-0'>
            <TwoLevelPieChart />
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Custom active shape' className='mb-0'>
            <WithCustomActiveShape />
          </Card>
        </div>
      </div>

      <Alert
        style={{ background: 'hsla(0,0%,92.2%,.3)' }}
        message={
          <span>
            <BarChartOutlined className='mr-2' style={{ fontSize: '1.8em' }} />
            More information can be found in <a href='https://recharts.org/en-US/'>official page</a>
          </span>
        }
      />
    </>
  );
};

export default RechartsPage;
