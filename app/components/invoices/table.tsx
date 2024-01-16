import { ViewInvoice } from '@/app/components/invoices/buttons';
import InvoiceStatus from '@/app/components/invoices/status';
import { Card, CardContent } from '@/app/components/ui/card';
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
import Link from 'next/link';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-8 flow-root">
      <div className="inline-block min-w-full align-middle">
        {/* Table for Mobile */}
        <div className="flex flex-col gap-4 md:hidden">
          {invoices?.map((invoice) => (
            <Link
              key={invoice.id}
              className="focus:outline-primary"
              title="View / Edit Invoice"
              href={`/dashboard/invoices/${invoice.id}`}
            >
              <Card className="dark:bg-nav bg-card pt-6 transition-all duration-200 hover:cursor-pointer hover:border hover:border-primary hover:bg-border hover:dark:bg-border">
                <CardContent>
                  <div className="flex items-center justify-between pb-6">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p className="font-bold">
                          <span className="text-muted-foreground">#</span>
                          {invoice.id.slice(0, 6)}...
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center text-sm">
                        <p>{invoice.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-muted-foreground">
                        Due {formatDateToLocal(invoice.date)}
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(invoice.amount)}
                      </p>
                    </div>
                    <InvoiceStatus status={invoice.status} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {/* Table For md screens and up */}
        {/* Have To Fix BG and Hover state for dark mode + Skeletons */}
        <Table className="dark:bg-nav hidden min-w-full rounded-t-lg bg-card md:table">
          <TableHeader className="text-left text-sm">
            <TableRow>
              <TableHead scope="col" className="px-4 py-5 sm:pl-6">
                ID
              </TableHead>
              <TableHead scope="col">Date</TableHead>
              <TableHead scope="col">Name</TableHead>
              <TableHead scope="col">Amount</TableHead>
              <TableHead scope="col">Status</TableHead>
              <TableHead scope="col" className="text-center">
                View / Edit
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices?.map((invoice) => (
              <TableRow key={invoice.id} className="dark:bg-nav bg-card">
                <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p className="font-bold">
                      <span className="text-muted-foreground">#</span>
                      {invoice.id.slice(0, 6)}...
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
