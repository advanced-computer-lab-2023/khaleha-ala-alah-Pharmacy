import React from 'react';
import { Table } from 'antd';
import { ColumnProps, TableProps } from 'antd/es/table';
import { IBilling } from '../../../interfaces/patient';

const columns: ColumnProps<IBilling>[] = [
  {
    key: 'billNo',
    title: 'Bill #',
    sorter: (a, b) => a.billNo - b.billNo,
    className: 'text-align-rigth',
    render: ({ billNo }) => <span className='text-right text-color-200'>{billNo}</span>
  },
  {
    key: 'patient',
    title: 'Patient',
    sorter: (a, b) => a.patient.localeCompare(b.patient),
    render: ({ patient }) => <span className='text-align-left'>{patient}</span>
  },
  {
    key: 'doctor',
    title: 'Doctor',
    sorter: (a, b) => a.doctor.localeCompare(b.doctor),
    render: ({ doctor }) => <span className='text-left'>{doctor}</span>
  },
  {
    key: 'billDate',
    title: 'Date',
    className: 'nowrap',
    sorter: (a, b) => a.billDate.localeCompare(b.billDate),
    render: ({ billDate }) => <span className='text-align-left text-color-200'>{billDate.split('T')[0]}</span>
  },
  {
    key: 'charges',
    title: 'Charges',
    render: ({ charges }) => charges
  },
  {
    key: 'tax',
    title: 'Tax',
    render: ({ tax }) => tax
  },
  {
    key: 'discount',
    title: 'Discount',
    render: ({ discount }) => discount
  },
  {
    key: 'total',
    title: 'Total',
    render: ({ total }) => <b>{total}</b>
  }
];

type Props = {
  billings: IBilling[];
  pagination?: TableProps<any>['pagination'];
  type?: 'accent' | 'none';
};

const tableClasses = {
  accent: 'accent-header',
  none: ''
};

const BillingTable = ({ billings, pagination = false, type = 'none' }: Props) => {
  const tableClass = tableClasses[type];

  return (
    <Table
      className={tableClass}
      pagination={pagination}
      rowKey='billNo'
      dataSource={billings}
      columns={columns}
    />
  );
};

export default BillingTable;
