import React from 'react';
import ReactEcharts from 'echarts-for-react';

import { Card } from 'antd';

import AppointmentsTable from '../../../layout/components/appointmentsTable/AppointmentsTable';
import hospitalOptions from './charts/hospital-options';

import { incomeInWeek, incomeInMonth } from './charts/income-options';

import {
  patientsGenderOptions,
  departmentsOptions,
  patientsAgeOptions
} from './charts/patients-options';

import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import { IAppointment } from '../../../interfaces/patient';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Dashboards',
      route: 'default-dashboard'
    },
    {
      title: 'Default'
    }
  ]
};

const DashboardPage = () => {
  const [appointments] = useFetchPageData<IAppointment[]>('./data/last-appointments.json', []);
  usePageData(pageData);

  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-first-aid-alt'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Appointments</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  213
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-wheelchair'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>New patients</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  213
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-blood'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Operations</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  23
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-dollar-true'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Earnings</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  $5238
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card title='Hospital survey'>
        <ReactEcharts className='chart-container container-h-400' option={hospitalOptions} />
      </Card>

      <div className='row'>
        <div className='col-sm-12 col-md-6'>
          <Card>
            <h4 className='mt-0 mb-1'>$25038</h4>
            <p className='mb-0' style={{ color: '#9d9d9d' }}>
              Income in current month
            </p>

            <ReactEcharts className='chart-container' option={incomeInMonth} />
          </Card>
        </div>

        <div className='col-sm-12 col-md-6'>
          <Card>
            <h4 className='mt-0 mb-1'>$2195</h4>
            <p className='mb-0' style={{ color: '#9d9d9d' }}>
              Income in current week
            </p>

            <ReactEcharts className='chart-container' option={incomeInWeek} />
          </Card>
        </div>
      </div>

      <div className='row'>
        <div className='col-12 col-md-4'>
          <Card title={'patients age'}>
            <ReactEcharts className='chart-container container-h-300' option={patientsAgeOptions} />
          </Card>
        </div>

        <div className='col-12 col-md-4'>
          <Card title={'patients gender'}>
            <ReactEcharts className='chart-container container-h-300' option={patientsGenderOptions} />
          </Card>
        </div>

        <div className='col-12 col-md-4'>
          <Card title={'Departments'}>
            <ReactEcharts className='chart-container container-h-300' option={departmentsOptions} />
          </Card>
        </div>
      </div>

      <Card title='Last appointments' className='mb-0'>
        <AppointmentsTable data={appointments} />
      </Card>
    </>
  );
};

export default DashboardPage;
