import { signOut } from '@/auth';
import { LogOutIcon } from 'lucide-react';

export default function SignOutBtn() {
  return (
    <div className="flex 2xl:py-6">
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
        className="flex h-full pr-6 md:pr-8 2xl:pr-0"
      >
        <button title="Sign Out" className="flex items-center justify-center">
          <LogOutIcon className="h-5 w-5 text-muted-foreground 2xl:h-10" />
        </button>
      </form>
    </div>
  );
}
