import { useEffect, useState } from 'react';

import { IInvoice, IInvoicePreview, IInvoiceRecord } from '../interfaces/invoice';
import axios from 'axios';

async function getInvoices() {
  const result = await axios.get('./data/invoices.json');
  return result.data as IInvoicePreview[];
}

export async function getInvoiceRecords(id: number = 0) {
  const result = await axios.get('./data/invoice.json');
  return result.data as IInvoiceRecord[];
}

export function useGetInvoice(): IInvoice {
  return {
    senderName: 'Forrest Ray',
    senderAddress: '191-103 Integer Rd.',
    senderCity: 'Corona New Mexico 08219',
    senderFax: '(404) 960-3807',
    customerName: 'Richard Knight',
    customerAddress: '711-2880 Nulla St.',
    customerCity: 'Mankato Mississippi 96522',
    customerFax: '(257) 563-7401',
    invoiceDate: 'May 15, 2020',
    dueTo: 'May 20, 2020'
  };
}

export function useGetInvoices(): IInvoicePreview[] {
  const [invoices, setInvoices] = useState<IInvoicePreview[]>([]);

  useEffect(() => {
    getInvoices().then((data) => {
      setInvoices(data);
    });
  }, []);

  return invoices;
}
