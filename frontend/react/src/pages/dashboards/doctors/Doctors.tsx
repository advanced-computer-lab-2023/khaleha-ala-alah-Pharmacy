import React, { useState } from 'react';

import { Modal } from 'antd';

import className from '../../../utils/class-names';

import Contact from '../../../layout/components/doctor/Contact';
import PageAction from '../../../layout/components/page-action/PageAction';
import DoctorForm from './DoctorForm';

import { useFetchPageData, usePageData } from '../../../hooks/usePage';

import { IUser } from '../../../interfaces/user';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Doctors',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Doctors'
    }
  ]
};

const DoctorsPage = () => {
  usePageData(pageData);
  const [doctors, setDoctors] = useFetchPageData<IUser[]>('./data/doctors.json', []);
  const [addingDoctor, setAddingDoctor] = useState(false);

  const openModal = () => setAddingDoctor(true);
  const closeModal = () => setAddingDoctor(false);

  const addDoctor = (doctor: IUser) => setDoctors([doctor, ...doctors]);

  const getClass = (index: number, length: number) =>
    className({
      'mb-0': index === length - 1,
      'mb-md-0': index === length - 2 || index === length - 3
    });

  return (
    <div className='row'>
      {doctors.map((doctor, index) => (
        <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
          <Contact className={getClass(index, doctors.length)} {...doctor} />
        </div>
      ))}

      <PageAction onClick={openModal} icon='icofont-contact-add' />

      <Modal
        open={addingDoctor}
        onCancel={closeModal}
        title={<h3 className='title'>Add doctor</h3>}
        destroyOnClose
        footer={null}
      >
        <DoctorForm onSubmit={addDoctor} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default DoctorsPage;
