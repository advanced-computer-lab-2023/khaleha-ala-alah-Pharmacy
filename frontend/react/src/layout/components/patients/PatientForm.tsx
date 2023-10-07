import React from 'react';

import { Button, Select, Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ImageLoader from './ImageLoader';
import { hasErrorFactory } from '../../../utils/hasError';

import { IPatient } from '../../../interfaces/patient';

const { TextArea } = Input;
type Props = {
  onSubmit: (patient: IPatient) => void;
  onCancel: () => void;
  patient?: IPatient;
  submitText?: string;
};

const defaultSubmitText = 'Add patient';
const emptyPatient = {
  name: null,
  address: null,
  status: null,
  age: null,
  number: null,
  gender: null,
  img: null
};

const patientScheme = Yup.object({
  name: Yup.string().required(),
  address: Yup.string().required(),
  status: Yup.string().required(),
  age: Yup.string().required(),
  number: Yup.string().required(),
  gender: Yup.string().required(),
  img: Yup.string().required()
});

const PatientForm = ({
  submitText = defaultSubmitText,
  patient = emptyPatient,
  onSubmit,
  onCancel
}: Props) => {
  const {
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleSubmit,
    setValues,
    handleBlur,
    resetForm,
    touched,
    values,
    errors,
    isValid
  } = useFormik<IPatient>({
    validationSchema: patientScheme,
    initialValues: patient,
    onSubmit: (values) => {
      onSubmit(values);
      onCancel();
    }
  });

  const handleGenderSelect = (value) => setFieldValue('gender', value);
  const handleStatusSelect = (value) => setFieldValue('status', value);

  const hasError = hasErrorFactory(touched, errors);

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleImageLoad = (img) => {
    setValues({ ...values, img });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <ImageLoader onLoad={handleImageLoad} src={values.img as string} />
        </div>

        <div className='form-group'>
          <Input
            placeholder='Name'
            name='name'
            type='text'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.name}
            className={hasError('name')}
          />
        </div>

        <div className='form-group'>
          <Input
            placeholder='Phone'
            name='number'
            type='phone'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.number}
            className={hasError('number')}
          />
        </div>

        <div className='row'>
          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <Input
                name='age'
                type='number'
                placeholder='Age'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.age}
                className={hasError('age')}
              />
            </div>
          </div>

          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <Select
                placeholder='Gender'
                defaultValue={values.gender}
                onChange={handleGenderSelect}
                className={hasError('gender')}
                onBlur={() => setFieldTouched('gender')}
              >
                <Select.Option value='Male'>Male</Select.Option>
                <Select.Option value='Female'>Female</Select.Option>
              </Select>
            </div>
          </div>
        </div>

        <div className='form-group'>
          <Select
            placeholder='Status'
            defaultValue={values.status}
            onChange={handleStatusSelect}
            className={hasError('status')}
            onBlur={() => setFieldTouched('status')}
          >
            <Select.Option value='Approved'>Approved</Select.Option>
            <Select.Option value='Pending'>Pending</Select.Option>
          </Select>
        </div>

        <div className='form-group'>
          <TextArea
            rows={3}
            name='address'
            placeholder='Address'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.address}
            className={hasError('address')}
          />
        </div>

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

export default PatientForm;
