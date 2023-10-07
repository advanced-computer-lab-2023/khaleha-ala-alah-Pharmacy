import React from 'react';

import { Button, Card, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons/lib';

import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';

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

const pageData: IPageData = {
  title: 'Form layouts',
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
      title: 'Form layouts'
    }
  ]
};

const FormLayoutsPage = () => {
  usePageData(pageData);
  return (
    <>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Card title='With labels'>
            <Form layout='vertical'>
              <Form.Item label='First name'>
                <Input placeholder='First name' />
              </Form.Item>
              <Form.Item label='Last name'>
                <Input placeholder='Last name' />
              </Form.Item>
              <Form.Item label='Email'>
                <Input placeholder='Email' />
              </Form.Item>
              <Form.Item label='Password'>
                <Input placeholder='Password' />
              </Form.Item>
              <Form.Item>
                <Button type='primary'>Submit</Button>
              </Form.Item>
            </Form>
          </Card>

          <Card title='Horizontal'>
            <Form labelAlign='left' layout='horizontal' {...formItemLayout}>
              <Form.Item label='First name'>
                <Input placeholder='First name' />
              </Form.Item>
              <Form.Item label='Last name'>
                <Input placeholder='Last name' />
              </Form.Item>
              <Form.Item label='Email'>
                <Input placeholder='Email' />
              </Form.Item>
              <Form.Item label='Password'>
                <Input placeholder='Password' />
              </Form.Item>
              <Form.Item wrapperCol={{ xs: 24 }}>
                <Button block type='primary'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>

        <div className='col-md-6 col-sm-12'>
          <Card title='Without labels'>
            <Form layout='vertical'>
              <Form.Item>
                <Input placeholder='First name' />
              </Form.Item>
              <Form.Item>
                <Input placeholder='Last name' />
              </Form.Item>
              <Form.Item>
                <Input placeholder='Email' />
              </Form.Item>
              <Form.Item>
                <Input placeholder='Password' />
              </Form.Item>
              <Form.Item>
                <Input.TextArea placeholder='About you' rows={4} />
              </Form.Item>
              <Form.Item>
                <Button block type='primary'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card title='Horizontal with icons'>
            <Form layout='horizontal' {...formItemLayout}>
              <Form.Item label='First name'>
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='First name'
                />
              </Form.Item>
              <Form.Item label='Last name'>
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Last name'
                />
              </Form.Item>
              <Form.Item label='Email'>
                <Input
                  prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Email'
                />
              </Form.Item>
              <Form.Item label='Password'>
                <Input
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item wrapperCol={{ xs: 24 }}>
                <Button block>Submit</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>

      <Card title='Inline' className='mb-0'>
        <Form>
          <div className='row'>
            <div className='col-md-3 col-sm-12'>
              <Input
                placeholder='First name'
                className='mb-md-0 mb-4'
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </div>
            <div className='col-md-3 col-sm-12'>
              <Input
                placeholder='Last name'
                className='mb-md-0 mb-4'
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </div>
            <div className='col-md-3 col-sm-12'>
              <Input
                placeholder='Password'
                className='mb-md-0 mb-4'
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </div>

            <div className='col-md-3 col-sm-12'>
              <Button block type='primary' htmlType='submit'>
                Log in
              </Button>
            </div>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default FormLayoutsPage;
