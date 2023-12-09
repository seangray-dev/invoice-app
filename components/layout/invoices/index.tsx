import { fetchAllInvoices, fetchHeaderData } from '@/lib/data';
import InvoiceContainer from './invoice-container';

export default async function Invoices() {
  const numberOfInvoices = await fetchHeaderData();
  const invoices = await fetchAllInvoices();

  return (
    <div>
      <InvoiceContainer
        numberOfInvoices={numberOfInvoices}
        invoices={invoices}
      />
    </div>
  );
}
