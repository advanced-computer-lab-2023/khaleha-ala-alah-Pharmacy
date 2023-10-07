import React, { useEffect, useState } from 'react';
import { Button, DatePicker, TimePicker, Input, Form, DatePickerProps } from 'antd';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import ImageLoader from '../../../layout/components/patients/ImageLoader';
import { hasErrorFactory } from '../../../utils/hasError';
import { IAppointment } from '../../../interfaces/patient';

type Props = {
  appointment?: IAppointment;
  onSubmit: (appointment: IAppointment) => void;
  onCancel: () => void;
  submitText?: string;
};

const defaultSubmitText = 'Add Appointment';
const emptyAppointment = {
  date: null,
  doctor: '',
  email: '',
  img: '',
  injury: '',
  name: '',
  number: '',
  from: '',
  to: ''
};

const appointmentSchema = Yup.object().shape({
  date: Yup.string().required(),
  doctor: Yup.string().required(),
  email: Yup.string().required(),
  injury: Yup.string().required(),
  name: Yup.string().required(),
  number: Yup.string().required(),
  from: Yup.string().required(),
  to: Yup.string().required()
});

const AppointmentForm = ({
  submitText = defaultSubmitText,
  appointment = emptyAppointment,
  onSubmit,
  onCancel
}: Props) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setValues,
    isValid,
    errors,
    touched,
    resetForm,
    setFieldValue
  } = useFormik<IAppointment>({
    validationSchema: appointmentSchema,
    initialValues: appointment,
    onSubmit: (form) => {
      onSubmit({ ...form, img });
      resetForm();
    }
  });
  const [img, setImg] = useState(values.img);

  useEffect(() => {
    setValues({ ...values });
  }, [appointment]);

  const handleImageLoad = (image) => {
    setImg(image);
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const onDateChange: DatePickerProps['onChange'] = (date) => {
    setFieldValue('date', date ? date.toISOString() : null);
  };

  const hasError = hasErrorFactory(touched, errors);

  const timeFormat = 'HH:mm';

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <ImageLoader onLoad={handleImageLoad} src={img} />
        </div>

        <Form.Item>
          <Input
            name='name'
            placeholder='Name'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.name}
            className={hasError('name')}
          />
        </Form.Item>

        <Form.Item>
          <Input
            defaultValue={values.doctor}
            placeholder='Doctor'
            onBlur={handleBlur}
            name='doctor'
            onChange={handleChange}
            className={hasError('doctor')}
          />
        </Form.Item>

        <Form.Item>
          <Input
            defaultValue={values.email}
            placeholder='Email'
            name='email'
            type='email'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('email')}
          />
        </Form.Item>

        <Form.Item className='form-group'>
          <DatePicker
            defaultValue={values.date ? dayjs(values.date) : null}
            placeholder='Date'
            name='date'
            onChange={onDateChange}
            className={hasError('date')}
          />
        </Form.Item>

        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <Form.Item>
              <TimePicker
                defaultValue={values.from ? dayjs(values.from, timeFormat) : null}
                placeholder='From'
                name='from'
                format={timeFormat}
                onChange={(date, time) => setFieldValue('from', time ? time : null)}
                className={hasError('from')}
              />
            </Form.Item>
          </div>

          <div className='col-sm-12 col-md-6'>
            <Form.Item>
              <TimePicker
                defaultValue={values.to ? dayjs(values.to, timeFormat) : null}
                placeholder='To'
                name='to'
                format={timeFormat}
                onChange={(date, time) => setFieldValue('to', time ? time : null)}
                className={hasError('to')}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Input
            type='phone'
            name='number'
            onBlur={handleBlur}
            placeholder='Number'
            onChange={handleChange}
            defaultValue={values.number}
            className={hasError('number')}
          />
        </Form.Item>

        <Form.Item>
          <Input
            name='injury'
            placeholder='Injury'
            onChange={handleChange}
            defaultValue={values.injury}
            onBlur={handleBlur}
            className={hasError('injury')}
          />
        </Form.Item>

        <div className='d-flex justify-content-between buttons-list settings-actions'>
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>

          <Button disabled={!isValid} type='primary' htmlType='submit'>
            {submitText}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AppointmentForm;
