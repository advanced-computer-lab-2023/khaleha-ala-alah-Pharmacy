import React from 'react';
import { IAppointment } from '../../../interfaces/patient';
import AppointmentForm from './AppointmentForm';
import { Modal } from 'antd';

type Props = {
  onEdited: (IAppointment) => void;
  appointment: IAppointment;
  visible: boolean;
  onClose: () => void;
};

const EditAppointment = ({ appointment, visible, onClose, onEdited }: Props) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      destroyOnClose
      footer={null}
      title={<h3 className='title'>Edit appointment</h3>}
    >
      <AppointmentForm
        onCancel={onClose}
        onSubmit={onEdited}
        appointment={appointment}
        submitText='Edit appointment'
      />
    </Modal>
  );
};

export default EditAppointment;
