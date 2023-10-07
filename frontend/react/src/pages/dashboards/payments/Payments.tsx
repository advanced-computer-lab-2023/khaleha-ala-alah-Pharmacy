import React, { useState } from 'react';

import { Button, DatePicker, Form, Input, Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BillingTable from '../../medic/components/BillingTable';
import PageAction from '../../../layout/components/page-action/PageAction';

import { hasErrorFactory } from '../../../utils/hasError';
import { useGetPayments } from '../../../hooks/useGetBillings';
import { usePageData } from '../../../hooks/usePage';

import { IPageData } from '../../../interfaces/page';
import dayjs from 'dayjs';

const pageData: IPageData = {
  title: 'Payments',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Payments'
    }
  ]
};

const Item = Form.Item;

const paymentScheme = Yup.object({
  billNo: Yup.string().required(),
  patient: Yup.string().required(),
  doctor: Yup.string().required(),
  billDate: Yup.string().required(),
  charges: Yup.string().required(),
  tax: Yup.string().required(),
  discount: Yup.string().required(),
  total: Yup.string().required()
});

const PaymentForm = ({ onSubmit, onClose }) => {
  const { handleSubmit, handleChange, isValid, errors, touched, handleBlur, setFieldValue } = useFormik<any>({
    initialValues: {},
    initialErrors: { empty: null },
    validationSchema: paymentScheme,
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    }
  });

  const hasError = hasErrorFactory(touched, errors);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Form layout='vertical'>
        <Form.Item>
          <Input
            type='number'
            name='billNo'
            placeholder='Bill NO'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('billNo')}
          />
        </Form.Item>

        <Form.Item>
          <Input
            name='patient'
            placeholder='Patient'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('patient')}
          />
        </Form.Item>

        <Form.Item>
          <Input
            name='doctor'
            placeholder='Doctor'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('doctor')}
          />
        </Form.Item>

        <Form.Item>
          <DatePicker
            name='billDate'
            placeholder='Date'
            onChange={(date) => setFieldValue('billDate', date ? date.toISOString() : null)}
            className={hasError('billDate')}
          />
        </Form.Item>

        <Form.Item>
          <Input
            name='charges'
            placeholder='Charges'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('charges')}
          />
        </Form.Item>

        <Form.Item>
          <Input
            name='tax'
            placeholder='Tax'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('tax')}
          />
        </Form.Item>

        <Form.Item>
          <Input
            name='discount'
            placeholder='Discount'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('discount')}
          />
        </Form.Item>

        <Form.Item>
          <Input
            name='total'
            placeholder='Total'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('total')}
          />
        </Form.Item>
      </Form>

      <div className='modal-footer d-flex justify-content-between mt-3'>
        <Button danger onClick={handleClose}>
          Cancel
        </Button>

        <Button htmlType='submit' disabled={!isValid} type='primary' onClick={() => handleSubmit()}>
          Add
        </Button>
      </div>
    </>
  );
};

const Payments = () => {
  const [visible, setVisibility] = useState<boolean>(false);
  const [billings, setBillings] = useGetPayments();
  usePageData(pageData);

  const handleSubmit = (payment) => {
    setBillings([payment, ...billings]);
  };

  const handleClose = () => setVisibility(false);

  return (
    <>
      <BillingTable billings={billings} type='none' pagination={{ hideOnSinglePage: true }} />
      <PageAction onClick={() => setVisibility(true)} icon='icofont-plus' type='primary' />

      <Modal
        title={<h5 className='m-0'>Add Payment</h5>}
        onCancel={handleClose}
        open={visible}
        destroyOnClose
        footer={null}
      >
        <PaymentForm onSubmit={handleSubmit} onClose={handleClose} />
      </Modal>
    </>
  );
};

export default Payments;
