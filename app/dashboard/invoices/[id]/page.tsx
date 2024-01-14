import Breadcrumbs from '@/app/components/invoices/breadcrumbs';
import Form from '@/app/components/invoices/edit-form';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'View Invoice',
};

export default async function ViewInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'View Invoice',
            href: `/dashboard/invoices/${id}`,
            active: true,
          },
        ]}
      />
    </main>
  );
}
