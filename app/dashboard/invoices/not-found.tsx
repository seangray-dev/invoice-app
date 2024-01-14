import { Button } from '@/app/components/ui/button';
import { FrownIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FrownIcon size={32} className="text-primary" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Button className="rounded-full">
        <Link className="font-bold" href="/dashboard/invoices">
          Go Back
        </Link>
      </Button>
    </main>
  );
}
