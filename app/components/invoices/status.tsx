import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <div
      className={clsx(
        'flex w-[104px] justify-center rounded-sm py-3 font-bold',
        {
          'bg-pending/10 text-pending': status === 'pending',
          'bg-paid/10 text-paid': status === 'paid',
          'bg-draft/10 text-draft': status === 'draft',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          <span className="font-bold capitalize">• {status}</span>
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          <span className="font-bold capitalize">• {status}</span>
        </>
      ) : null}
      {status === 'draft' ? (
        <>
          <span className="font-bold capitalize">• {status}</span>
        </>
      ) : null}
    </div>
  );
}
