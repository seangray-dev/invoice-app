'use client';

import { Invoice } from '@/lib/definitions';
import { useState } from 'react';
import Header from './header';
import InvoicesTable from './invoices-table';
import NoInvoices from './no-invoices';

type InvoiceContainerProps = {
  numberOfInvoices: number;
  invoices: Invoice[];
};

export default function InvoiceContainer({
  numberOfInvoices,
  invoices,
}: InvoiceContainerProps) {
  const [showPaid, setShowPaid] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showDraft, setShowDraft] = useState(false);

  const filteredInvoices = invoices.filter((invoice) => {
    // If no filters are active, include all invoices
    if (!showPaid && !showPending && !showDraft) {
      return true;
    }

    return (
      (showPaid && invoice.status === 'paid') ||
      (showPending && invoice.status === 'pending') ||
      (showDraft && invoice.status === 'draft')
    );
  });

  return (
    <div>
      <Header
        numberOfInvoices={numberOfInvoices}
        showPaid={showPaid}
        setShowPaid={setShowPaid}
        showPending={showPending}
        setShowPending={setShowPending}
        showDraft={showDraft}
        setShowDraft={setShowDraft}
      />
      {numberOfInvoices === 0 ? (
        <NoInvoices />
      ) : (
        <InvoicesTable invoices={filteredInvoices} />
      )}
    </div>
  );
}
