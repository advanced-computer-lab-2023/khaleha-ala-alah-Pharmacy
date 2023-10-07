import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => (
      <a onClick={e => e.preventDefault()} href='#'>
        {text}
      </a>
    )
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '$30,000.00',
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '$1,256.00',
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '$12,000.00',
    address: 'Sidney No. 1 Lake Park'
  }
];

const CustomOptions: React.FC = () => {
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      bordered
      title={() => 'Header'}
      footer={() => 'Footer'}
    />
  );
};

export default CustomOptions;
