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
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export default function Header({ numberOfInvoices }: { numberOfInvoices: number }) {
  const [showPaid, setShowPaid] = useState<Checked>(true);
  const [showPending, setShowPending] = useState<Checked>(false);
  const [showDraft, setShowDraft] = useState<Checked>(false);

  return (
    <section className="container mt-9 flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">
          <span>{numberOfInvoices} </span>Invoices
        </p>
      </div>
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              className="flex items-center gap-2  text-base"
            >
              <div className="font-bold">
                Filter <span className="hidden md:block">by status</span>
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
        <Button className="flex max-w-[90px] items-center gap-2 rounded-3xl">
          <PlusIcon size={16} className="rounded-full bg-white text-primary" />
          <span className="font-bold">New</span>
        </Button>
      </div>
    </section>
  );
}
