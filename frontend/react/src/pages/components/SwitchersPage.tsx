import React, { useState } from 'react';

import { usePageData } from '../../hooks/usePage';

import { IPageData } from '../../interfaces/page';
import { Button, Card, Switch } from 'antd';

const pageData: IPageData = {
  title: 'Switchers',
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
      title: 'Switchers',
    },
  ],
};

const SwitchersPage = () => {
  usePageData(pageData);

  const [disabled, setDisabled] = useState(false);
  const toggle = () => setDisabled(!disabled);

  return (
    <>
      <Card title='Basic switchers'>
        <div className='elem-list flex-column'>
          <Switch />
          <div className='field-with-label'>
            <Switch />
            <span className='label'>Switch label</span>
          </div>

          <div className='field-with-label'>
            <Switch defaultChecked />
            <span className='label'>Checked</span>
          </div>

          <div className='field-with-label'>
            <Switch disabled />
            <span className='label'>Disabled</span>
          </div>

          <div className='field-with-label'>
            <Switch defaultChecked disabled />
            <span className='label'>Checked </span>
          </div>
        </div>
      </Card>

      <Card title='Toggle disabled' className='mb-0'>
        <div className='elem-list flex-column'>
          <Switch disabled={disabled} defaultChecked />
          <br />
          <Button type='primary' onClick={toggle}>
            Toggle disabled
          </Button>
        </div>
      </Card>
    </>
  );
};

export default SwitchersPage;
