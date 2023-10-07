import React from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
import Logo from '../../../layout/components/logo/Logo';
import LogoSvg from '../../../assets/img/logo.svg';
import { chartOptions } from './chart-options';
import { OurTimeline } from './Timeline';
import { LastClients, LastPayments } from './Tables';
import { usePageData } from '../../../hooks/usePage';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Events timeline',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Apps',
      route: 'default-dashboard'
    },
    {
      title: 'Service pages',
      route: 'default-dashboard'
    },
    {
      title: 'Events timeline'
    }
  ]
};

const EventsTimelinePage = () => {
  usePageData(pageData);

  return (
    <>
      <Card
        className='custom-bg-color'
        style={{
          padding: '0 15px',
          backgroundImage:
            'linear-gradient(to right, rgb(243, 243, 244) 0%, rgb(225, 225, 226) 100%)',
          color: 'rgb(31, 32, 34)'
        }}
      >
        <div className='row'>
          <div className='col-12 col-md-6 mb-4 mb-md-0'>
            <Logo style={{ padding: 0 }} src={LogoSvg} />
            <h3>Medicine Clinic</h3>
            <p className='text-color-300'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus id perferendis
              unde voluptas voluptatem? Ad alias deleniti eum nulla tempore.
            </p>
          </div>

          <div className='col-12 col-md-6 text-right'>
            <h4 className='color-accent mt-0 mb-1'>$25038</h4>
            <p className='text-muted'>Income this week</p>
            <ReactEcharts option={chartOptions} className='chart-container container-h-100' />
          </div>
        </div>
      </Card>

      <div className='row'>
        <div className='col-12 col-md-4'>
          <Card
            style={{ padding: '5px 0' }}
            className='custom-bg-color bg-color-accent mb-md-0'
            title={
              <h3 className='mt-0 color-black' style={{ fontWeight: 400 }}>
                Introduction
              </h3>
            }
          >
            <h6 className='mt-0 mb-0'>Address</h6>
            <p className='color-white'>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
            <h6 className='mt-0 mb-0'>Email</h6>
            <p className='color-white'>denta@gmail.com</p>
            <h6 className='mt-0 mb-0'>Phone</h6>
            <p className='color-white'>0126596452</p>
          </Card>

          <h4 className='section-title'>Last clients</h4>
          <LastClients />

          <h4 className='section-title'>Last payments</h4>
          <LastPayments />
        </div>

        <div className='col-12 col-md-8'>
          <Card title='Our Timeline' className='mb-0'>
            <OurTimeline />
          </Card>
        </div>
      </div>
    </>
  );
};

export default EventsTimelinePage;
