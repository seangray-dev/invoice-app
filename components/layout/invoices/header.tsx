'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, PlusIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type HeaderProps = {
  numberOfInvoices: number;
  showPaid: boolean;
  setShowPaid: Dispatch<SetStateAction<boolean>>;
  showPending: boolean;
  setShowPending: Dispatch<SetStateAction<boolean>>;
  showDraft: boolean;
  setShowDraft: Dispatch<SetStateAction<boolean>>;
};

export default function Header({
  numberOfInvoices,
  showPaid,
  setShowPaid,
  showPending,
  setShowPending,
  showDraft,
  setShowDraft,
}: HeaderProps) {
  return (
    <section className="container mt-9 flex justify-between md:mt-[61px] 2xl:mt-[77px]">
      <div>
        <h1 className="text-2xl font-bold md:mb-[6px] md:text-4xl">Invoices</h1>
        <p className="text-sm text-muted-foreground">
          <span className="hidden md:inline-block">There are</span>{' '}
          <span>{numberOfInvoices}</span>{' '}
          <span className="hidden md:inline-block">total </span>{' '}
          <span>Invoices</span>
        </p>
      </div>
      <div className="flex items-center gap-2 md:gap-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              className="flex items-center gap-2 text-base"
            >
              <div className="flex gap-1 font-bold">
                <span>Filter</span>
                <span className="hidden md:block">by status</span>
              </div>
              <div>
                <ChevronDownIcon
                  size={16}
                  strokeWidth={2.25}
                  className="text-primary"
                />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showPaid}
              onCheckedChange={setShowPaid}
            >
              Paid
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPending}
              onCheckedChange={setShowPending}
            >
              Pending
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showDraft}
              onCheckedChange={setShowDraft}
            >
              Draft
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="flex max-w-[90px] items-center gap-2 rounded-3xl py-6 md:max-w-[150px]">
          <PlusIcon size={16} className="rounded-full bg-white text-primary" />
          <div className="flex gap-1 font-bold">
            <span>New</span>
            <span className="hidden md:block">Invoice</span>
          </div>
        </Button>
      </div>
    </section>
  );
}
