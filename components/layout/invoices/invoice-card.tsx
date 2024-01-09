import { Card, CardContent } from '@/components/ui/card';
import { Invoice } from '@/lib/definitions';
import { statusStyles } from '@/lib/styles';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function InvoiceCard(invoice: Invoice) {
  const { id, clientName, dueDate, status, amount } = invoice;
  const { card: cardStyle, text: textStyle } =
    statusStyles[status as keyof typeof statusStyles] || {};

  return (
    <Link href={`/invoice/${invoice.id}`}>
      <Card className="bg-card pt-6 transition-all duration-200 hover:cursor-pointer hover:border hover:border-primary hover:bg-border dark:bg-nav hover:dark:bg-border">
        <CardContent className="flex flex-col justify-between gap-6 md:grid md:grid-cols-2 md:items-center">
          <div className="flex justify-between md:justify-normal md:gap-7">
            <div className="text-muted-foreground">
              #<span className="font-bold text-foreground">{id}</span>
            </div>
            <div className="text-sm text-muted-foreground">{clientName}</div>
          </div>
          <div className="flex justify-between md:items-center md:justify-end md:gap-6">
            <div className="flex flex-col gap-2 md:flex-row md:gap-6">
              <div className="text-sm text-muted-foreground">Due {dueDate}</div>
              <div className="font-bold">{amount}</div>
            </div>
            <div className="w-[104px]">
              <div
                className={`flex justify-center rounded-sm py-3 ${cardStyle}`}
              >
                <p className={`font-bold capitalize ${textStyle}`}>
                  • {status}
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <ChevronRightIcon className="text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
