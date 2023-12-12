import InvoiceDetails from '@/components/layout/invoices/invoice-details';
import NavBar from '@/components/layout/navigation/NavBar';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <NavBar />
      <InvoiceDetails id={params.id} />
    </>
  );
}
