import React from 'react';
import { Avatar, Table, Tag } from 'antd';
import { ColumnProps } from 'antd/es/table';

const lastClients = [
  {
    date: '23 May 2020',
    client: {
      name: 'Liam',
      img: '/content/user-40-1.jpg'
    }
  },
  {
    date: '22 May 2020',
    client: {
      name: 'Emma',
      img: '/content/user-40-2.jpg'
    }
  },
  {
    date: '21 May 2020',
    client: {
      name: 'Olivia',
      img: '/content/user-40-3.jpg'
    }
  },
  {
    date: '20 May 2020',
    client: {
      name: 'Ava',
      img: '/content/user-40-4.jpg'
    }
  },
  {
    date: '19 May 2020',
    client: {
      name: 'Sam',
      img: '/content/user-40-5.jpg'
    }
  }
];

const lastPayments = [
  {
    date: '24 May 2020',
    amount: '$155'
  },
  {
    date: '23 May 2020',
    amount: '$365'
  },
  {
    date: '22 Feb 2020',
    amount: '$234'
  },
  {
    date: '21 May 2020',
    amount: '$190'
  }
];

const renderClient = ({ client }) => (
  <div className='d-flex align-items-center'>
    <Avatar className='mr-4' src={window.location.origin + client.img} size={36} />
    <div className='name'>
      <strong>{client.name}</strong>
    </div>
  </div>
);

const renderPayment = ({ amount }) => (
  <div className='payment-block'>
    <Tag
      className='m-0'
      color='#b7ce63'
      style={{ color: '#fff', padding: '4px 20px', borderRadius: 0 }}
    >
      {amount}
    </Tag>
  </div>
);

const renderDate = ({ date }) => <span className='text-color-300'>{date}</span>;

const clientColumns: ColumnProps<any>[] = [
  {
    key: 'patient',
    title: 'Patient',
    render: renderClient
  },
  {
    key: 'date',
    title: 'Date',
    className: 'text-right',
    render: renderDate
  }
];

const paymentColumns: ColumnProps<any>[] = [
  {
    key: 'date',
    title: 'Date',
    render: renderDate
  },
  {
    key: 'amount',
    title: 'Amount',
    className: 'text-right',
    render: renderPayment
  }
];

export const LastClients = () => (
  <Table
    rowKey='date'
    style={{ minWidth: '200px' }}
    pagination={{ hideOnSinglePage: true }}
    columns={clientColumns}
    dataSource={lastClients}
  />
);

export const LastPayments = () => (
  <Table
    rowKey='date'
    columns={paymentColumns}
    dataSource={lastPayments}
    style={{ minWidth: '200px' }}
    pagination={{ hideOnSinglePage: true }}
  />
);
