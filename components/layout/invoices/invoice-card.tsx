import { Card, CardContent } from '@/components/ui/card';
import { Invoice } from '@/lib/definitions';

const statusStyles = {
  pending: {
    card: 'bg-orange-100',
    text: 'text-orange-600',
  },
  paid: {
    card: 'bg-green-100',
    text: 'text-green-600',
  },
  draft: {
    card: 'bg-gray-100',
    text: 'text-gray-600',
  },
};

export default function InvoiceCard(invoice: Invoice) {
  const { id, clientName, dueDate, status, amount } = invoice;
  const { card: cardStyle, text: textStyle } =
    statusStyles[status as keyof typeof statusStyles] || {};

  return (
    <Card className="dark:bg-nav border-none pt-6">
      <CardContent className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="text-muted-foreground">
            #<span className="font-bold text-foreground">{id}</span>
          </div>
          <div className="muted-foreground text-sm">{clientName}</div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Due {dueDate}</div>
            <div className="font-bold">{amount}</div>
          </div>
          <div>
            <Card className={`border-none ${cardStyle}`}>
              <CardContent className="py-4">
                <p className={`font-bold capitalize ${textStyle}`}>
                  • {status}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
