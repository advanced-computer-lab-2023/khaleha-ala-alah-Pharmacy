import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { IInvoicePreview } from '../../interfaces/invoice';
import { Table } from 'antd';

const InvoiceStatus = ({ status }: Pick<IInvoicePreview, 'status'>) => {
  if (status === 'Paid')
    return (
      <span className='color-green nowrap'>
        <i className='icofont icofont-check-circled mr-2' />
        Paid
      </span>
    );

  return (
    <span className='color-error nowrap'>
      <i className='icofont icofont-close-circled mr-2' />
      Un-Paid
    </span>
  );
};

const columnsConfig: ColumnProps<IInvoicePreview>[] = [
  {
    key: 'icon',
    title: '#',
    dataIndex: 'icon',
    render: (icon) => <span style={{ fontSize: '50px' }} className={`icofont ${icon} text-large`} />
  },
  {
    key: 'date',
    title: 'Date',
    sorter: (curent, next) => {
      if (curent.date === next.date) return 0;

      return curent.date > next.date ? 1 : -1;
    },
    render: ({ date }) => (
      <span className='text-muted nowrap'>
        <i className='icofont-clock-time' />
        <span className='text-muted ml-2'>{date}</span>
      </span>
    )
  },
  {
    key: 'recipient',
    title: 'Recipient',
    render: ({ recipient }) => <strong>{recipient}</strong>
  },
  {
    key: 'status',
    title: 'Status',
    render: ({ status }) => <InvoiceStatus status={status} />
  },
  {
    key: 'amount',
    title: 'Amount',
    render: ({ amount }) => <span className='text-right'>{amount}</span>,
    sorter: (cur, next) => (cur.amount > next.amount ? 1 : -1)
  }
];

const InvoicesTable = ({ invoices }) => (
  <Table rowKey='icon' columns={columnsConfig} dataSource={invoices} />
);

export default InvoicesTable;
