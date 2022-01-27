export interface IInvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface IInvoice {
  _id?: string;
  streetAddress?: string;
  city?: string;
  postCode?: string;
  country?: string;
  clientName?: string;
  clientEmail?: string;
  clientStreetAddress?: string;
  clientCity?: string;
  clientPostCode?: string;
  clientCountry?: string;
  date: Date;
  paymentTerms: string;
  projectDescription?: string;
  status?: string;
  items: Array<IInvoiceItem>;
}

export interface IDropdownOption {
  id: string;
  value: string;
  label: string;
}
