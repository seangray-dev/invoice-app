import { ViewInvoice } from '@/app/components/invoices/buttons';
import InvoiceStatus from '@/app/components/invoices/status';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="md:hidden">
          {invoices?.map((invoice) => (
            <div
              key={invoice.id}
              className="mb-2 w-full rounded-md bg-white p-4"
            >
              <div className="flex items-center justify-between pb-6">
                <div>
                  <div className="mb-2 flex items-center">
                    <p className="font-bold">
                      <span className="text-muted-foreground">#</span>
                      {invoice.id}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center text-sm text-muted-foreground">
                    <p>{invoice.name}</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">
                    Date {formatDateToLocal(invoice.date)}
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(invoice.amount)}
                  </p>
                </div>
                <InvoiceStatus status={invoice.status} />
              </div>
            </div>
          ))}
        </div>
        <Table className="hidden min-w-full rounded-t-lg bg-card md:table">
          <TableHeader className="text-left text-sm">
            <TableRow>
              <TableHead scope="col" className="px-4 py-5 sm:pl-6">
                ID
              </TableHead>
              <TableHead scope="col" className="px-3 py-5">
                Date
              </TableHead>
              <TableHead scope="col" className="px-3 py-5">
                Name
              </TableHead>
              <TableHead scope="col" className="px-3 py-5">
                Amount
              </TableHead>
              <TableHead scope="col" className="px-3 py-5">
                Status
              </TableHead>
              <TableHead scope="col" className="relative py-3 pl-6 pr-3">
                <span className="sr-only">Edit</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices?.map((invoice) => (
              <TableRow key={invoice.id} className="bg-card">
                <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p className="font-bold">
                      <span className="text-muted-foreground">#</span>
                      {invoice.id}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                  Due {formatDateToLocal(invoice.date)}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                  {invoice.name}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-3 font-bold">
                  {formatCurrency(invoice.amount)}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-3">
                  <InvoiceStatus status={invoice.status} />
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                  <ViewInvoice id={invoice.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
