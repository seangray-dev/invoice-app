import { Button } from '@/components/ui/button';

export default function InvoiceActions() {
  return (
    <div className="fixed bottom-0 w-full bg-card p-6 dark:bg-nav md:static md:p-0">
      <div className="flex justify-end gap-2">
        <Button
          variant={'secondary'}
          className="w-[73px] rounded-full py-6 font-bold"
        >
          Edit
        </Button>
        <Button
          variant={'destructive'}
          className="w-[89px] rounded-full py-6 font-bold"
        >
          Delete
        </Button>
        <Button className="w-[149px] rounded-full py-6 font-bold md:w-[131px]">
          Mark as Paid
        </Button>
      </div>
    </div>
  );
}
