import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { ChevronRightIcon } from 'lucide-react';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <>
      <TableRow className="w-full content-normal border-b">
        {/* ID */}
        <TableCell className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex items-center gap-3">
            <div className="h-6 w-24 animate-pulse bg-muted"></div>
          </div>
        </TableCell>
        {/* Date */}
        <TableCell className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 animate-pulse bg-muted"></div>
        </TableCell>
        {/* Name */}
        <TableCell className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 animate-pulse bg-muted"></div>
        </TableCell>
        {/* Amount */}
        <TableCell className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 animate-pulse bg-muted"></div>
        </TableCell>
        {/* Status */}
        <TableCell className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 animate-pulse bg-muted"></div>
        </TableCell>
        {/* Actions */}
        <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex justify-end">
            <ChevronRightIcon size={16} className="text-primary" />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      {/* Top section for ID and Name */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center">
          <div className="h-6 w-24 animate-pulse rounded bg-muted"></div>{' '}
          {/* ID */}
        </div>
        <div className="flex flex-col">
          <div className="mb-2 h-6 w-36 animate-pulse rounded bg-muted"></div>{' '}
          {/* Name */}
        </div>
      </div>

      {/* Bottom section for Date, Amount, and Status */}
      <div className="flex w-full items-center justify-between pt-4">
        <div className="flex flex-col gap-2">
          <div className="h-6 w-36 animate-pulse rounded bg-muted"></div>{' '}
          {/* Date */}
          <div className="h-6 w-24 animate-pulse rounded bg-muted"></div>{' '}
          {/* Amount */}
        </div>
        <div className="h-10 w-24 animate-pulse rounded bg-muted"></div>{' '}
        {/* Status */}
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="md:hidden">
          <InvoicesMobileSkeleton />
          <InvoicesMobileSkeleton />
          <InvoicesMobileSkeleton />
          <InvoicesMobileSkeleton />
          <InvoicesMobileSkeleton />
          <InvoicesMobileSkeleton />
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
              <TableHead
                scope="col"
                className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
              >
                <span className="sr-only">Edit</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
