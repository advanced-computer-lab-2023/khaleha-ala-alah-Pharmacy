import React, { useState } from 'react';

import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';
import { Button, Card, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';

type RadioValues = {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
};

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const pageData: IPageData = {
  title: 'Radio buttons',
  fulFilled: true,
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
      title: 'Radio Buttons',
    },
  ],
};

const RadiosPage = () => {
  usePageData(pageData);

  const [disabled, setDisabled] = useState(false);
  const [values, setValues] = useState<RadioValues>({
    first: 1,
    second: 1,
    third: 1,
    fourth: 1,
    fifth: 1,
  });

  const handleChange = (name: keyof RadioValues) => ({ target }: RadioChangeEvent) => {
    setValues({ ...values, [name]: target.value });
  };

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  return (
    <>
      <Card title='Radio group'>
        <h6 className='mt-0'>Without label</h6>
        <Radio.Group onChange={handleChange('first')} value={values.first}>
          <Radio value={1} />
          <Radio value={2} />
          <Radio value={3} />
        </Radio.Group>

        <h6>With labels</h6>

        <Radio.Group onChange={handleChange('second')} value={values.second}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
        </Radio.Group>

        <h6>Disabled option</h6>

        <Radio.Group onChange={handleChange('fourth')} value={values.fourth}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio disabled value={3}>
            C
          </Radio>
        </Radio.Group>

        <h6>Vertical</h6>

        <Radio.Group onChange={handleChange('third')} value={values.third}>
          <Radio style={radioStyle} value={1}>
            First option
          </Radio>
          <Radio style={radioStyle} value={2}>
            Second option
          </Radio>
          <Radio style={radioStyle} value={3}>
            Third options
          </Radio>
          <Radio style={radioStyle} value={4}>
            Fourth options
          </Radio>
        </Radio.Group>
      </Card>

      <Card title='Toggle disabled' className='mb-0'>
        <Radio.Group onChange={handleChange('fifth')} value={values.fifth}>
          <Radio disabled={disabled} style={radioStyle} value={1}>
            First option
          </Radio>
          <Radio disabled={disabled} style={radioStyle} value={2}>
            Second option
          </Radio>
          <Radio disabled={disabled} style={radioStyle} value={3}>
            Third options
          </Radio>
        </Radio.Group>
        <br />
        <br />
        <Button type='primary' onClick={toggleDisabled}>
          Toggle disabled
        </Button>
      </Card>
    </>
  );
};

export default RadiosPage;
