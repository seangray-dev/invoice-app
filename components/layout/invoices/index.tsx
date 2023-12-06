import { fetchAllInvoices, fetchHeaderData } from '@/lib/data';
import Header from './header';
import InvoicesTable from './invoices-table';
import NoInvoices from './no-invoices';

export default async function Invoices() {
  const numberOfInvoices = await fetchHeaderData();
  const invoices = await fetchAllInvoices();

  return (
    <div>
      <Header numberOfInvoices={numberOfInvoices} />
      {numberOfInvoices === 0 ? (
        <NoInvoices />
      ) : (
        <InvoicesTable invoices={invoices} />
      )}
    </div>
  );
}
