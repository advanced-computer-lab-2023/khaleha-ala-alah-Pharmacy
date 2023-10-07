import React, { useState } from 'react';

import { Card, Form, Input } from 'antd';
import {
  EditOutlined,
  FontSizeOutlined,
  InfoCircleOutlined,
  PushpinOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';

const pageData: IPageData = {
  fulFilled: true,
  title: 'Inputs',
  breadcrumbs: [
    {
      title: 'UI Kit',
      route: 'default-dashboard',
    },
    {
      title: 'Components',
      route: 'default-dashboard',
    },
    {
      title: 'Inputs',
    },
  ],
};

const InputsPage = () => {
  usePageData(pageData);

  const [firstChar, setFirstChar] = useState(0);
  const [secondChar, setSecondChar] = useState(0);
  const [thirdChar, setThirdChar] = useState(0);

  const handleChange = (maxCount: number, setter: (val) => void) => (event) => {
    const charLeft = maxCount - event.target.value.length;
    setter(charLeft);
  };

  return (
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <Card title='Basic inputs'>
          <Form layout='vertical'>
            <Form.Item>
              <Input defaultValue='With value' />
            </Form.Item>

            <Form.Item>
              <Input placeholder='With placeholder' />
            </Form.Item>

            <Form.Item label='Input label'>
              <Input placeholder='With label' />
            </Form.Item>

            <Form.Item extra='Description' className='mb-0'>
              <Input placeholder='With description' />
            </Form.Item>
          </Form>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Input types'>
          <Form layout='vertical'>
            <Form.Item>
              <Input placeholder='Text input' />
            </Form.Item>

            <Form.Item>
              <Input placeholder='Email input' type='email' />
            </Form.Item>

            <Form.Item>
              <Input placeholder='Number input' type='number' />
            </Form.Item>

            <Form.Item>
              <Input placeholder='Password input' type='password' />
            </Form.Item>

            <Form.Item className='mb-0'>
              <Input disabled placeholder='Disabled input' />
            </Form.Item>
          </Form>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Input sizes'>
          <Form layout='vertical'>
            <Form.Item>
              <Input defaultValue='Small input' size='small' />
            </Form.Item>

            <Form.Item>
              <Input defaultValue='Default input' />
            </Form.Item>

            <Form.Item className='mb-0'>
              <Input defaultValue='Large size' size='large' />
            </Form.Item>
          </Form>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Prefix/Suffix'>
          <Form layout='vertical'>
            <Form.Item>
              <Input
                defaultValue='With prefix'
                placeholder='Enter your username'
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </Form.Item>

            <Form.Item>
              <Input
                defaultValue='With suffix'
                placeholder='Enter your username'
                suffix={<InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
              />
            </Form.Item>

            <Form.Item className='mb-0'>
              <Input
                placeholder='Enter your username'
                defaultValue='Colored'
                prefix={<UserOutlined style={{ color: '#336cfb' }} />}
                suffix={<InfoCircleOutlined style={{ color: '#336cfb' }} />}
              />
            </Form.Item>
          </Form>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Char limiting' className='mb-md-0'>
          <Form layout='vertical'>
            <Form.Item>
              <Input
                placeholder='10 char limit'
                maxLength={10}
                onChange={handleChange(10, setFirstChar)}
                prefix={<FontSizeOutlined />}
                suffix={<span style={{ color: 'rgba(0,0,0,.2)' }}>{firstChar || 0}</span>}
              />
            </Form.Item>

            <Form.Item>
              <Input
                placeholder='20 char limit'
                maxLength={20}
                onChange={handleChange(20, setSecondChar)}
                prefix={<span style={{ color: 'rgba(0,0,0,.2)' }}>{secondChar || 0}</span>}
                suffix={<EditOutlined />}
              />
            </Form.Item>

            <Form.Item className='mb-0'>
              <Input
                placeholder='30 char limit'
                maxLength={30}
                onChange={handleChange(30, setThirdChar)}
                prefix={
                  <>
                    <span style={{ color: '#cd5447' }}>{thirdChar || 0}</span>
                  </>
                }
                suffix={<PushpinOutlined />}
              />
            </Form.Item>
          </Form>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Input shapes' className='mb-0'>
          <Form layout='vertical'>
            <Form.Item>
              <Input placeholder='Square' style={{ borderRadius: '0' }} />
            </Form.Item>
            <Form.Item>
              <Input placeholder='Rounded' style={{ borderRadius: '10px' }} />
            </Form.Item>
            <Form.Item className='mb-0'>
              <Input placeholder='Default' />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default InputsPage;
