import React from 'react';

import { useFormik } from 'formik';
import { Form, Button, Input, Select, AutoComplete, Divider } from 'antd';
import * as Yup from 'yup';

import Socials from '../../../layout/components/socials/Socials';
import ImageLoader from '../../../layout/components/patients/ImageLoader';

import { hasErrorFactory } from '../../../utils/hasError';
import { useFetch } from '../../../hooks/useFetch';
import { IUser } from '../../../interfaces/user';

const { TextArea } = Input;

type Props = {
  onSubmit: (doctor: IUser) => void;
  onCancel: () => void;
};

const doctorScheme = Yup.object({
  role: Yup.string().required(),
  name: Yup.string().required(),
  lastName: Yup.string().required(),
  img: Yup.string().required(),
  gender: Yup.string().required(),
  address: Yup.string().required()
});

const initialValues = {
  role: null,
  name: null,
  lastName: null,
  img: null,
  gender: null,
  address: null,
  social: [
    {
      icon: 'icofont-instagram',
      link: '#'
    },
    {
      icon: 'icofont-facebook',
      link: '#'
    },
    {
      icon: 'icofont-twitter',
      link: '#'
    }
  ]
};

const DoctorForm = ({ onSubmit, onCancel }: Props) => {
  const [roles] = useFetch<{ value: string }[]>('./data/doctors-specialists.json', []);
  const {
    setFieldTouched,
    handleChange,
    handleBlur,
    values,
    setValues,
    isValid,
    errors,
    touched
  } = useFormik({
    initialValues,
    validationSchema: doctorScheme,
    validateOnMount: true,
    initialErrors: { name: null },
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  const handleGenderSelect = (gender) => {
    setValues({ ...values, gender });
  };

  const handleRoleSelect = (role) => {
    setValues({ ...values, role });
  };

  const handleImgLoad = (img) => {
    setValues({ ...values, img });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = () => {
    if (!isValid) return;

    onSubmit(values);
    onCancel();
  };

  const hasError = hasErrorFactory(touched, errors);

  return (
    <>
      <Form>
        <div className='form-group'>
          <ImageLoader onLoad={handleImgLoad} src={values.img} />
        </div>

        <div className='form-group'>
          <Input
            name='name'
            type='text'
            placeholder='First name'
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.name}
            className={hasError('name')}
          />
        </div>

        <div className='form-group'>
          <Input
            type='text'
            name='lastName'
            placeholder='Last name'
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.lastName}
            className={hasError('lastName')}
          />
        </div>

        <div className='row'>
          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <AutoComplete
                filterOption
                options={roles}
                placeholder='Speciality'
                onSelect={handleRoleSelect}
                onBlur={handleBlur}
                className={hasError('role')}
              />
            </div>
          </div>

          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <Select
                placeholder='Gender'
                onChange={handleGenderSelect}
                defaultValue={values.gender}
                className={hasError('gender')}
                onBlur={() => setFieldTouched('gender')}
              >
                <Select.Option value='Male'>Male</Select.Option>
                <Select.Option value='Female'>Female</Select.Option>
              </Select>
            </div>
          </div>
        </div>

        <TextArea
          rows={3}
          name='address'
          placeholder='Address'
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values.address}
          className={hasError('address')}
        />

        <Divider />

        <Socials links={values.social} />

        <div className='d-flex justify-content-between buttons-list settings-actions mt-4'>
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>

          <Button disabled={!isValid} onClick={handleSubmit} htmlType='submit' type='primary'>
            Add Doctor
          </Button>
        </div>
      </Form>
    </>
  );
};

export default DoctorForm;
