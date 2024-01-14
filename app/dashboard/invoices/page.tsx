import { CreateInvoice } from '@/app/components/invoices/buttons';
import FilterSelect from '@/app/components/invoices/filter-select';
import Pagination from '@/app/components/invoices/pagination';
import Search from '@/app/components/invoices/search';
import Table from '@/app/components/invoices/table';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between"></div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Invoices</h1>
          {/* TODO: fetch number of all invoices here  */}
          <p className="text-muted-foreground">7 Invoices</p>
        </div>
        <div className="flex gap-6">
          <FilterSelect />
          <CreateInvoice />
        </div>
      </div>
      <div className="mt-6">
        <Search placeholder="Search invoices..." />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
