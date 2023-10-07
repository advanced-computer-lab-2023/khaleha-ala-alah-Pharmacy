import React, { useState } from 'react';
import { Button, Table } from 'antd';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
];

const FilterReset = () => {
  const [filters, setFilters] = useState<any>({});
  const [sortedInfo, setSorters] = useState<any>({});

  const handleChange = (pagination, filters, sorter) => {
    setFilters(filters);
    setSorters(sorter);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const clearAll = () => {
    setSorters({});
    setFilters({});
  };

  const setAgeSort = () => {
    setSorters({
      order: 'descend',
      columnKey: 'age'
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
      filteredValue: filters.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
      filteredValue: filters.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order
    }
  ];

  return (
    <>
      <div className='elem-list mb-4'>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </div>
      <Table pagination={false} columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default FilterReset;
