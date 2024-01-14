import { deleteInvoice } from '@/app/lib/actions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function CreateInvoice() {
  return (
    <Button className="flex w-[90px] items-center gap-2 rounded-full p-4 md:w-[150px] md:gap-4">
      <div>
        <div className="-ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <PlusIcon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="flex flex-1 gap-1 font-bold">
        <span>New</span>
        <span className="hidden md:block">Invoice</span>
      </div>
    </Button>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function ViewInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}`}
      className="group hover:cursor-pointer"
    >
      <div className="flex justify-end">
        <ChevronRightIcon
          size={16}
          className="text-primary transition-all duration-150 group-hover:scale-150"
        />
      </div>
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
