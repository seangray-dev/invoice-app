import { Card } from '@/components/ui/card';
import { fetchInvoiceById } from '@/lib/data';
import { statusStyles } from '@/lib/styles';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import InvoiceActions from './invoice-actions';

export default async function InvoiceDetails({ id }: { id: string }) {
  const invoice = await fetchInvoiceById(id);

  if (!invoice) return <div>Loading...</div>;

  const { card: cardStyle, text: textStyle } =
    statusStyles[invoice.status as keyof typeof statusStyles] || {};

  return (
    <>
      <div className="container mt-8">
        <Link className="mb-8 flex items-center gap-4 font-bold" href={'/'}>
          <ChevronLeft className="mb-1 text-primary" />
          <span className="transition-all duration-300 hover:text-primary">
            Go back
          </span>
        </Link>
        <Card className="mb-4 flex items-center justify-between border-none p-6 dark:bg-nav">
          <div className="md:mr-5">Status</div>
          <div className="w-[104px]">
            <div className={`flex justify-center rounded-sm py-3 ${cardStyle}`}>
              <p className={`font-bold capitalize ${textStyle}`}>
                • {invoice.status}
              </p>
            </div>
          </div>
          <InvoiceActions invoice={invoice} />
        </Card>
        <Card className="border-none p-6 dark:bg-nav md:p-8 2xl:p-12">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-8 flex flex-col">
              <h2 className="font-bold">
                <span className="text-muted-foreground">#</span>
                {invoice.id}
              </h2>
              <p className="text-sm text-muted-foreground">
                {invoice.description}
              </p>
            </div>
            <div className="mb-8 text-sm text-muted-foreground">
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>
          <div>
            <div className="mb-8 grid grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h6 className="text-sm text-muted-foreground">
                    Invoice Date
                  </h6>
                  <p className="font-bold">{invoice.createdAt}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <h6 className="text-sm text-muted-foreground">Payment Due</h6>
                  <p className="font-bold">{invoice.paymentDue}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h6 className="text-sm text-muted-foreground">Bill To</h6>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{invoice.clientName}</p>
                  <div className="text-sm text-muted-foreground">
                    <p>{invoice.clientAddress.street}</p>
                    <p>{invoice.clientAddress.city}</p>
                    <p>{invoice.clientAddress.postCode}</p>
                    <p>{invoice.clientAddress.country}</p>
                  </div>
                </div>
              </div>
              <div className="mb-9 flex flex-col gap-4">
                <h6 className="text-sm text-muted-foreground">Sent to</h6>
                <p className="font-bold">{invoice.clientEmail}</p>
              </div>
            </div>
          </div>
          <Card className="border-none bg-secondary">
            <div className="p-6 md:p-8">
              <div className="hidden md:block">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left">Item Name</th>
                      <th className="text-right">QTY.</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2">{item.name}</td>
                        <td className="text-right">{item.quantity}</td>
                        <td className="text-right">${item.price}</td>
                        <td className="text-right">${item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden">
                {/* Responsive design for smaller screens */}
                {invoice.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-t p-2"
                  >
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p>
                        {item.quantity} x ${item.price}
                      </p>
                    </div>
                    <div className="font-bold">${item.total}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full items-center justify-between rounded-b-md bg-nav p-6 text-background dark:bg-background dark:text-foreground md:p-8">
              <h6 className="text-sm">Amount Due</h6>
              <p className="text-2xl font-bold">{invoice.total}</p>
            </div>
          </Card>
        </Card>
      </div>
      <div className="md:hidden">
        <InvoiceActions invoice={invoice} />
      </div>
    </>
  );
}
