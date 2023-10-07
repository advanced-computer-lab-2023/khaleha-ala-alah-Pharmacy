import React, { useState } from 'react';

import { AutoComplete, Card, Input } from 'antd';
import { BookOutlined, EditOutlined, FileTextOutlined, FontSizeOutlined } from '@ant-design/icons';

import { useFetchPageData, usePageData } from '../../hooks/usePage';

import { IPageData } from '../../interfaces/page';
import { IOption } from '../../interfaces/option';

type Limit = [number, number, number];

const pageData: IPageData = {
  title: 'Autocompletes',
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
      title: 'Autocompletes'
    }
  ]
};

const AutocompletePage = () => {
  const [dataSource] = useFetchPageData<IOption[]>('./data/autocomplete.json', []);
  usePageData(pageData);

  const [limits, setLimits] = useState<Limit>([0, 0, 0]);
  const [first, second, third] = limits;

  function setFirst(newLimit) {
    setLimits([newLimit, second, third]);
  }

  function setSecond(newLimit) {
    setLimits([first, newLimit, third]);
  }

  function setThird(newLimit) {
    setLimits([first, second, newLimit]);
  }

  const handleChange = (maxCount: number, setter) => (value: string) => {
    setter(maxCount - value.length);
  };

  return (
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <Card title='Basic'>
          <div className='elem-list'>
            <AutoComplete filterOption options={dataSource} defaultValue='USA' />
            <AutoComplete filterOption options={dataSource} placeholder='With placeholder' />
          </div>
        </Card>

        <Card title='Input sizes' className='mb-md-0'>
          <div className='elem-list'>
            <AutoComplete
              options={dataSource}
              filterOption
              className='custom'
              placeholder='Small input'
              size='small'
            />

            <AutoComplete
              filterOption
              options={dataSource}
              placeholder='Default input'
              className='custom'
            />

            <AutoComplete
              options={dataSource}
              filterOption
              placeholder='Large input'
              className='custom'
              size='large'
            />
          </div>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='With icons'>
          <div className='elem-list'>
            <AutoComplete options={dataSource} filterOption>
              <Input placeholder='Prefix icon' className='custom' prefix={<BookOutlined />} />
            </AutoComplete>

            <AutoComplete options={dataSource} filterOption>
              <Input placeholder='Suffix icon' className='custom' suffix={<EditOutlined />} />
            </AutoComplete>
          </div>
        </Card>

        <Card title='Char limiting' className='mb-0'>
          <div className='elem-list'>
            <AutoComplete options={dataSource} filterOption onSearch={handleChange(10, setFirst)} maxLength={10}>
              <Input
                placeholder='10 char limit'
                prefix={<FontSizeOutlined />}
                suffix={<span style={{ color: 'rgba(0,0,0,.2)' }}>{first}</span>}
              />
            </AutoComplete>

            <AutoComplete options={dataSource} filterOption onSearch={handleChange(20, setSecond)} maxLength={20}>
              <Input
                placeholder='20 char limit'
                prefix={<FileTextOutlined />}
                suffix={<span style={{ color: 'rgba(0,0,0,.2)' }}>{second}</span>}
              />
            </AutoComplete>

            <AutoComplete options={dataSource} filterOption onSearch={handleChange(30, setThird)} maxLength={30}>
              <Input
                placeholder='30 char limit'
                prefix={<EditOutlined />}
                suffix={<span style={{ color: 'rgba(0,0,0,.2)' }}>{third}</span>}
              />
            </AutoComplete>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AutocompletePage;
