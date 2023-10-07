import React from 'react';

import { Button, Card, Table } from 'antd';
import { PrinterOutlined } from '@ant-design/icons/lib';

import { useFetchPageData, usePageData } from '../../hooks/usePage';
import { useGetInvoice } from '../../hooks/useGetInvoices';

import { IPageData } from '../../interfaces/page';
import { IInvoice, IInvoiceRecord } from '../../interfaces/invoice';

const pageData: IPageData = {
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Apps',
      route: 'default-dashboard'
    },
    {
      title: 'Service pages',
      route: 'default-dashboard'
    },
    {
      title: 'Invoices',
      route: 'invoices'
    },
    {
      title: 'Invoice'
    }
  ]
};

const InvoiceInfo = ({
  customerAddress,
  customerCity,
  customerFax,
  customerName,
  dueTo,
  invoiceDate,
  senderAddress,
  senderCity,
  senderFax,
  senderName
}: IInvoice) => {
  return (
    <div className='row info-block'>
      <div className='col-md-3 col-sm-6 col-12'>
        <div className='sender'>
          <h5 className='title'>Invoice from</h5>

          <div className='info'>
            <span className='info-label'>{senderName}</span>
            <br />
            <span className='info-label'>{senderAddress}</span> <br />
            <span className='info-label'>{senderCity}</span> <br />
            <span className='info-label'>{senderFax}</span>
          </div>
        </div>
      </div>

      <div className='col-md-3 col-sm-6 col-12'>
        <h5 className='title'>Invoice to</h5>

        <div className='info'>
          <span className='info-label'>{customerName}</span>
          <br />
          <span className='info-label'>{customerAddress}</span> <br />
          <span className='info-label'>{customerCity}</span> <br />
          <span className='info-label'>{customerFax}</span>
        </div>
      </div>

      <div className='col-md-3 col-sm-6 col-12'>
        <h5 className='title'>Invoice Date</h5>

        <div className='info'>
          <span className='info-label'>{invoiceDate}</span>
        </div>
      </div>

      <div className='col-md-3 col-sm-6 col-12'>
        <h5 className='title'>Due to</h5>

        <div className='info'>
          <span className='info-label'>{dueTo}</span>
        </div>
      </div>
    </div>
  );
};

const InvoiceTable = ({ records = [] }) => {
  if (!records) return <></>;

  const invoiceTotal = records
    .filter(({ cost, quantity }) => !isNaN(cost) && !isNaN(quantity))
    .map((el) => el.cost * el.quantity)
    .reduce((cost, acc) => acc + cost, 0);

  const vat = Math.floor(invoiceTotal / 10);

  const columns = [
    {
      title: '#',
      dataIndex: 'num',
      key: '#'
    },
    {
      title: 'GROUP NAME',
      dataIndex: 'groupName',
      key: 'group',
      render: (name) => (name !== 'total' ? name : null)
    },
    {
      title: 'QUANTITY',
      dataIndex: 'quantity',
      key: 'qnt'
    },
    {
      title: 'COST',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => (cost !== 'total' ? '$' + cost : null)
    },
    {
      title: 'Total',
      key: 'total',
      render: ({ total, quantity, cost }) =>
        !total ? `$${quantity * cost}` : <span style={{ fontSize: 30 }}>${invoiceTotal + vat}</span>
    }
  ];

  return (
    <Table
      rowKey='num'
      pagination={{ hideOnSinglePage: true }}
      columns={columns}
      dataSource={records}
    />
  );
};

const InvoicePage = () => {
  const [records] = useFetchPageData<IInvoiceRecord[]>('./data/invoice.json', []);
  const invoice = useGetInvoice();

  usePageData(pageData);

  return (
    <Card title='Invoice #INV-17'>
      <div className='stack'>
        <InvoiceInfo {...invoice} />
        <InvoiceTable records={records} />

        <div className='d-flex align-items-center justify-content-end w-100'>
          <a href='' className='mr-4'>
            <PrinterOutlined style={{ fontSize: '25px' }} />
          </a>
          <Button type='primary'>Send invoice</Button>
        </div>
      </div>
    </Card>
  );
};

export default InvoicePage;
