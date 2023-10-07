import React from 'react';

import { Modal } from 'antd';

import AppointmentForm from './AppointmentForm';
import { IAppointment } from '../../../interfaces/patient';

type Props = {
  onSubmit: (appointment: IAppointment) => void;
  visible: boolean;
  onClose: () => void;
};

const AddAppointment = ({ visible, onClose, onSubmit }: Props) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      destroyOnClose
      footer={null}
      title={<h3 className='title'>Add appointment</h3>}
    >
      <AppointmentForm onCancel={onClose} onSubmit={onSubmit} submitText='Add appointment' />
    </Modal>
  );
};

export default AddAppointment;
