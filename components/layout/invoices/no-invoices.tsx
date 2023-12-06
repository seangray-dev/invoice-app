import NoInvoiceImage from '@/public/assets/illustration-empty.svg';
import Image from 'next/image';

export default function NoInvoices() {
  return (
    <section className="mt-[102px] flex flex-col gap-[42px]">
      <Image
        src={NoInvoiceImage}
        width={206}
        height={278}
        alt="no invoices"
        className="mx-auto"
      ></Image>
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-2xl font-bold">There is nothing here</h2>
        <p className="mx-auto max-w-[176px] text-[13px] text-muted-foreground">
          Create an invoice by clicking the{' '}
          <span className="font-bold">New </span>button and get started
        </p>
      </div>
    </section>
  );
}
