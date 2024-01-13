import { signOut } from '@/auth';
import { LogOutIcon } from 'lucide-react';

export default function SignOutBtn() {
  return (
    <>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
        className="flex h-full items-center pr-6 md:pr-8 2xl:pb-6 2xl:pr-0"
      >
        <button title="Sign Out" className="flex items-center justify-center">
          <LogOutIcon className="h-5 w-5 text-muted-foreground" />
        </button>
      </form>
    </>
  );
}
