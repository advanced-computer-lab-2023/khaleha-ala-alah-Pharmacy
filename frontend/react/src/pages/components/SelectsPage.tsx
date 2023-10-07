import React from 'react';

import { Card, Select } from 'antd';

import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';

const Option = Select.Option;

const pageData: IPageData = {
  title: 'Selects',
  fulFilled: true,
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
      title: 'Selects'
    }
  ]
};

const SelectsPage = () => {
  usePageData(pageData);

  const optionFilter = (input, option) =>
    option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <>
      <Card title='Selected option'>
        <div className='row'>
          <div className='col-md-12 col-lg-6'>
            <Select
              className='mb-lg-0 mb-4'
              defaultValue='lucy'
              placeholder='Select a person'
              optionFilterProp='children'
              filterOption={optionFilter}
            >
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </div>

          <div className='col-md-12 col-lg-6'>
            <Select
              defaultValue={['lucy']}
              placeholder='Select a person'
              optionFilterProp='children'
              mode='multiple'
              filterOption={optionFilter}
            >
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </div>
        </div>
      </Card>

      <Card title='With clear'>
        <div className='row'>
          <div className='col-md-12 col-lg-6'>
            <Select
              allowClear
              defaultValue='lucy'
              className='mb-lg-0 mb-4'
              placeholder='Select a person'
              optionFilterProp='children'
              filterOption={optionFilter}
            >
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </div>

          <div className='col-md-12 col-lg-6'>
            <Select
              allowClear
              defaultValue={['lucy']}
              placeholder='Select a person'
              optionFilterProp='children'
              mode='multiple'
              filterOption={optionFilter}
            >
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </div>
        </div>
      </Card>

      <Card title='With option filter'>
        <div className='row'>
          <div className='col-md-12 col-lg-6'>
            <Select
              showSearch
              className='mb-lg-0 mb-4'
              placeholder='Select a person'
              optionFilterProp='children'
              filterOption={optionFilter}
            >
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </div>

          <div className='col-md-12 col-lg-6'>
            <Select
              showSearch
              placeholder='Select a person'
              optionFilterProp='children'
              mode='multiple'
              filterOption={optionFilter}
            >
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </div>
        </div>
      </Card>

      <Card title='Select sizes' className='mb-0'>
        <div className='row'>
          <div className='col-md-12 col-lg-6'>
            <Select size='small' placeholder='Select a person'>
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
            <br />
            <br />
            <Select placeholder='Select a person'>
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
            <br />
            <br />
            <Select size='large' placeholder='Select a person' className='mb-lg-0 mb-4'>
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </div>

          <div className='col-md-12 col-lg-6'>
            <Select mode='multiple' size='small' placeholder='Select a person'>
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
            <br />
            <br />
            <Select mode='multiple' placeholder='Select a person'>
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
            <br />
            <br />
            <Select mode='multiple' size='large' placeholder='Select a person'>
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SelectsPage;
