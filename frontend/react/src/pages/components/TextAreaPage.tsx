import React from 'react';

import { Card, Form, Input } from 'antd';

import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';

const TextArea = Input.TextArea;

const pageData: IPageData = {
  fulFilled: true,
  title: 'Text Area',
  breadcrumbs: [
    {
      title: 'UI Kit',
      route: 'default-dashboard'
    },
    {
      title: 'Components',
      route: 'default-dashboard'
    },
    {
      title: 'Textareas'
    }
  ]
};

const TextareasPage = () => {
  usePageData(pageData);

  return (
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <Card title='Basic text area' className='mb-md-0'>
          <Form layout='vertical'>
            <Form.Item>
              <TextArea defaultValue='With value' rows={3} />
            </Form.Item>

            <Form.Item>
              <TextArea placeholder='With placeholder' rows={3} />
            </Form.Item>

            <Form.Item label='Input label'>
              <TextArea placeholder='With label' rows={3} />
            </Form.Item>

            <Form.Item extra='Description' className='mb-0'>
              <TextArea placeholder='With description' rows={3} />
            </Form.Item>
          </Form>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Text area sizing' className='mb-0'>
          <Form layout='vertical'>
            <Form.Item>
              <TextArea defaultValue='Fixed size' rows={5} />
            </Form.Item>

            <Form.Item>
              <TextArea defaultValue='Default input' autoSize rows={3} />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default TextareasPage;
