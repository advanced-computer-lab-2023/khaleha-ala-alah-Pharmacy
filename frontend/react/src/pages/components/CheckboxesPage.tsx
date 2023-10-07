import React from 'react';

import { Card, Checkbox } from 'antd';

import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';

const pageData: IPageData = {
  fulFilled: true,
  title: 'Checkboxes',
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
      title: 'Checkboxes',
    },
  ],
};

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];

const CheckboxesPage = () => {
  usePageData(pageData);

  return (
    <>
      {' '}
      <Card title='Checkbox group'>
        <Checkbox.Group options={plainOptions} defaultValue={['Apple']} />
        <br />
        <br />
        <Checkbox.Group options={options} defaultValue={['Pear']} />
        <br />
        <br />
        <Checkbox.Group options={optionsWithDisabled} disabled defaultValue={['Apple']} />
      </Card>
      <Card title='Disabled checkboxes' className='mb-0'>
        <Checkbox defaultChecked={false} disabled />
        <br />
        <Checkbox defaultChecked disabled />
      </Card>
    </>
  );
};

export default CheckboxesPage;
