import React from 'react';
import { Card } from 'antd';

import CollSpan from './CollSpan';
import TableSize from './TableSize';
import Selection from './Selection';
import Operations from './Operations';
import NestedTable from './NestedTable';
import FilterReset from './FilterReset';
import CustomOptions from './CustomOptions';
import FilterAndSorting from './FilterAndSorting';

import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';

const pageData: IPageData = {
  title: 'Tables',
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
      title: 'Tables'
    }
  ]
};

const TablesPage = () => {
  usePageData(pageData);

  return (
    <>
      <Card title='With selection'>
        <Selection />
      </Card>

      <Card title='With selection and operations'>
        <Operations />
      </Card>

      <Card title='With filters and sorting'>
        <FilterAndSorting />
      </Card>

      <Card title='With filters and sorting reset'>
        <FilterReset />
      </Card>

      <Card title='Table sizes'>
        <TableSize />
      </Card>

      <Card title='Bordered with header and footer'>
        <CustomOptions />
      </Card>

      <Card title='With colSpan and rowSpan'>
        <CollSpan />
      </Card>

      <Card title='With nested tables' className='mb-0'>
        <NestedTable />
      </Card>
    </>
  );
};

export default TablesPage;
