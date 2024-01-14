import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '../ui/button';

export default function FilterSelect() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'ghost'}
          className="flex items-center gap-2 p-0 text-base"
        >
          <div className="flex gap-1 font-bold">
            <span>Filter</span>
            <span className="hidden md:block">by status</span>
          </div>
          <div>
            <ChevronDownIcon
              size={16}
              strokeWidth={2.25}
              className="-mt-1 text-primary"
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
        // checked={showPaid}
        // onCheckedChange={setShowPaid}
        >
          Paid
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
        // checked={showPending}
        // onCheckedChange={setShowPending}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
        // checked={showDraft}
        // onCheckedChange={setShowDraft}
        >
          Draft
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
