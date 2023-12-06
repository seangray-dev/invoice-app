import { Invoice } from '@/lib/definitions';
import InvoiceCard from './invoice-card';

type InvoicesTableProps = {
  invoices: Invoice[];
};

export default function InvoicesTable({ invoices }: InvoicesTableProps) {
  return (
    <section className="container mt-8 flex flex-col gap-4">
      {invoices.map((invoice: Invoice) => (
        <InvoiceCard
          key={invoice.id}
          id={invoice.id}
          clientName={invoice.clientName}
          dueDate={invoice.dueDate}
          status={invoice.status}
          amount={invoice.amount}
        />
      ))}
    </section>
  );
}
