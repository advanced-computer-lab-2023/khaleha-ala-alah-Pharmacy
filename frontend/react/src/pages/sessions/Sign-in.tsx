import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Switch } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';
import { useForm } from 'antd/es/form/Form';
import PublicLayout from '../../layout/public/Public';
import { useNavigateHome } from '../../utils/use-navigate-home';

const SignIn = () => {
  const [form] = useForm();
  const navigateHome = useNavigateHome();

  const login = () => {
    form
      .validateFields()
      .then(() => navigateHome())
      .catch(() => null);
  };

  return (
    <PublicLayout bgImg={`${window.origin}/content/login-page.jpg`}>
      <h4 className='mt-0 mb-1'>Login form</h4>

      <p className='text-color-200'>Login to access your Account</p>

      <Form form={form} layout='vertical' className='mb-4'>
        <Form.Item name='login' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Login' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Password' type='password' />
        </Form.Item>

        <div className='d-flex align-items-center mb-4'>
          <Switch defaultChecked /> <span className='ml-2'>Remember me</span>
        </div>

        <Button
          block={false}
          type='primary'
          onClick={login}
          htmlType='submit'
          icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}
        >
          Login
        </Button>
      </Form>
      <br />
      <p className='mb-1'>
        <a href='#'>Forgot password?</a>
      </p>

      <p>
        Don't have an account? <Link to='../sign-up'>Sign up!</Link>
      </p>
    </PublicLayout>
  );
};

export default SignIn;
