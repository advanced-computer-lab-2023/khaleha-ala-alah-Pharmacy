export interface IInvoicePreview {
  icon: string;
  date: string;
  recipient: string;
  status: 'Paid' | 'Un-Paid';
  amount: string;
}

export interface IInvoice {
  senderName: string;
  senderAddress: string;
  senderCity: string;
  senderFax: string;

  customerName: string;
  customerAddress: string;
  customerCity: string;
  customerFax: string;

  invoiceDate: string;
  dueTo: string;

  records?: IInvoiceRecord[];

  total?: number;
  vat?: number;
}

export interface IInvoiceRecord {
  num: string;
  groupName: string;
  quantity: number;
  cost: number;
  total: boolean;
}
