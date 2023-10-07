import React from 'react';
import { useFormik } from 'formik';
import { Button, Card, Form, Input, Select, Timeline } from 'antd';
import {
  ExperimentOutlined,
  MonitorOutlined,
  UserAddOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined
} from '@ant-design/icons/lib';
import ReactEcharts from 'echarts-for-react';
import { usePageData } from '../../hooks/usePage';
import { useGetDoctor } from '../../hooks/useGetDoctor';
import ImageLoader from '../../layout/components/patients/ImageLoader';
import Socials from '../../layout/components/socials/Socials';
import patientsOptions from '../chart-options/patients';
import { IPageData } from '../../interfaces/page';
import { IUser } from '../../interfaces/user';

const pageData: IPageData = {
  title: 'Doctor profile page',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Doctors',
      route: 'default-dashboard'
    },
    {
      title: 'Dr.Sophie'
    }
  ]
};

const FormItem = Form.Item;
const Option = Select.Option;

type DoctorFormProps = { doctor: Partial<IUser> };

const DoctorForm = ({ doctor }: DoctorFormProps) => {
  const { values } = useFormik({
    onSubmit: () => null,
    initialValues: { ...doctor }
  });

  return (
    <Form layout='vertical'>
      <FormItem label='First Name'>
        <Input defaultValue={values.name} placeholder='First Name' />
      </FormItem>

      <FormItem label='Last Name'>
        <Input defaultValue={values.lastName} placeholder='Last Name' />
      </FormItem>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <FormItem label='Speciality'>
            <Input defaultValue={values.role} placeholder='Speciality' />
          </FormItem>
        </div>
        <div className='col-md-6 col-sm-12'>
          <FormItem label='Gender'>
            <Select defaultValue={values.gender} placeholder='Gender'>
              <Option value='male'>Male</Option>
              <Option value='female'>Female</Option>
            </Select>
          </FormItem>
        </div>
      </div>

      <FormItem label='Address'>
        <Input.TextArea rows={4} defaultValue={values.address} placeholder='Address' />
      </FormItem>
    </Form>
  );
};

const DocTimeline = () => {
  const timelineItems = [
    {
      dot: (
        <div className='p-2 bg-color-indigo rounded-full'>
          <UserOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <h4 className='m-0'>New prescription</h4>
          <span className='text-base text-color-100'>Now</span>
          <span className='text-base'>
            Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula
            ut id elit.
          </span>
        </div>
      )
    },
    {
      dot: (
        <div className='p-2 bg-color-pink rounded-full'>
          <CalendarOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <h4 className='m-0'>Appointment</h4>
          <span className='text-base text-color-100'>2m ago</span>
          <span className='text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.
          </span>
        </div>
      )
    },
    {
      dot: (
        <div className='p-2 bg-color-red rounded-full'>
          <MedicineBoxOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <h4 className='m-0'>Medication</h4>
          <span className='text-base text-color-100'>2h ago</span>
          <span className='text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.
          </span>
        </div>
      )
    },
    {
      dot: (
        <div className='p-2 bg-color-success rounded-full'>
          <ExperimentOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <h4 className='m-0'>Operation</h4>
          <span className='text-base text-color-100'>15h ago</span>
          <span className='text-base'>
            Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula
            ut id elit.
          </span>
        </div>
      )
    },
    {
      dot: (
        <div className='p-2 bg-color-yellow rounded-full'>
          <UserAddOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <h4 className='m-0'>New patient</h4>
          <span className='text-base text-color-100'>Jul 10</span>
          <span className='text-base'>Lorem ipsum dolor sit.</span>
        </div>
      )
    },
    {
      dot: (
        <div className='p-2 bg-color-orange rounded-full'>
          <MonitorOutlined className='text-contrast-500' />
        </div>
      ),
      children: (
        <div className='d-flex flex-column'>
          <h4 className='m-0'>Examination</h4>
          <span className='text-base text-color-100'>Jul 1</span>
          <span className='text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.
          </span>
        </div>
      )
    }
  ];

  return (
    <Timeline items={timelineItems} mode='right' />
  )
};

const DoctorProfilePage = () => {
  const { doctor } = useGetDoctor('Dr. Sophie');
  usePageData(pageData);

  return (
    doctor && (
      <>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <div className='header'>
              <Card title={<h6 className='my-0'>Photo</h6>}>
                <ImageLoader src={doctor.img} size={100} />
              </Card>
            </div>

            <div className='info'>{doctor && <DoctorForm doctor={doctor} />}</div>

            <div className='social-networks stack'>
              <Socials links={doctor.social} />

              <Button type='primary' style={{ width: '100%' }}>
                Save changes
              </Button>
            </div>
          </div>

          <div className='col-md-6 col-sm-12'>
            <Card>
              <DocTimeline />
            </Card>
          </div>
        </div>

        <div className='patients-graph'>
          <Card title='Patients' className='mb-0'>
            <ReactEcharts className='chart-container container-h-400' option={patientsOptions} />
          </Card>
        </div>
      </>
    )
  );
};

export default DoctorProfilePage;
