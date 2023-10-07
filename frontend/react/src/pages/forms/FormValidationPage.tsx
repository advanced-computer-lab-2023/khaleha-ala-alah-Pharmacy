import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import {
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  ReloadOutlined,
  SendOutlined,
  UserOutlined
} from '@ant-design/icons/lib';
import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';


const { Item } = Form;

const rules = {
  required: { required: true, message: 'Please input value!' } as Rule,
  email: { type: 'email', message: 'The input is not valid E-mail!' } as Rule
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};

const BasicLoginForm = () => (
  <Form layout='vertical'>
    <Form.Item name='First name' rules={[rules.required]}>
      <Input placeholder='First Name' />
    </Form.Item>

    <Form.Item name='Last name' rules={[rules.required]}>
      <Input placeholder='Last Name' />
    </Form.Item>

    <Form.Item name='Email' rules={[rules.required, rules.email]}>
      <Input placeholder='Email' />
    </Form.Item>

    <Form.Item name='Comment' rules={[rules.required]}>
      <Input.TextArea placeholder='Comment' rows={4} />
    </Form.Item>

    <Form.Item rules={[rules.required]}>
      <Button htmlType='submit' type='primary' block>
        Send Form
      </Button>
    </Form.Item>
  </Form>
);

const FormWithLabels = () => (
  <Form {...formItemLayout}>
    <Form.Item label='First name' name='First name' rules={[rules.required]}>
      <Input prefix={<IdcardOutlined />} placeholder='First Name' />
    </Form.Item>

    <Form.Item label='Last name' name='Last name' rules={[rules.required]}>
      <Input prefix={<UserOutlined />} placeholder='Last Name' />
    </Form.Item>

    <Form.Item label='Email' name='Email' rules={[rules.required, rules.email]}>
      <Input prefix={<MailOutlined />} placeholder='Email' />
    </Form.Item>

    <Form.Item label='Password' name='Password' rules={[rules.required]}>
      <Input.Password prefix={<LockOutlined />} placeholder='Password' />
    </Form.Item>

    <Button htmlType='submit' type='primary' block icon={<SendOutlined />}>
      Send Form
    </Button>
  </Form>
);

const FormWithMessages = () => {
  const [form] = Form.useForm();

  const resetForm = () => form.resetFields();

  return (
    <Form form={form} layout='vertical'>
      <Form.Item
        label='First name'
        name='First name'
        rules={[{ ...rules.required, message: 'First name is required' }]}
      >
        <Input suffix={<IdcardOutlined />} placeholder='First Name' />
      </Form.Item>

      <Form.Item
        label='Last name'
        name='Last name'
        rules={[{ ...rules.required, message: 'Last name is required' }]}
      >
        <Input suffix={<UserOutlined />} placeholder='Last Name' />
      </Form.Item>

      <Form.Item
        label='Email'
        name='Email'
        rules={[
          { ...rules.required, message: 'Email is required' },
          { ...rules.email, message: 'Enter valid email' }
        ]}
      >
        <Input suffix={<MailOutlined />} placeholder='Email' />
      </Form.Item>

      <Form.Item
        label='Password'
        name='Password'
        rules={[
          { ...rules.required, message: 'Password is required' },
          { min: 6, message: 'Password must be at least 6 char long' }
        ]}
      >
        <Input.Password placeholder='Password' />
      </Form.Item>

      <div className='d-flex justify-content-end'>
        <div className='elem-list'>
          <Button onClick={resetForm} ghost danger icon={<ReloadOutlined />}>
            Reset form
          </Button>

          <Button type='primary' icon={<SendOutlined />}>
            Send Form
          </Button>
        </div>
      </div>
    </Form>
  );
};

const pageData: IPageData = {
  title: 'Form validation',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Home',
      route: 'default-dashboard'
    },
    {
      title: 'UI Kit ',
      route: 'default-dashboard'
    },
    {
      title: 'Form validation'
    }
  ]
};

const FormValidationPage = () => {
  usePageData(pageData);
  return (
    <>
      <div className='row'>
        <div className='col-sm-12 col-md-6'>
          <Card title='Login form'>
            <BasicLoginForm />
          </Card>
        </div>
        <div className='col-sm-12 col-md-6'>
          <Card title='With labels'>
            <FormWithLabels />
          </Card>
        </div>
      </div>
      <Card title='Validation with messages' className='mb-0'>
        <FormWithMessages />
      </Card>
    </>
  );
};

export default FormValidationPage;
