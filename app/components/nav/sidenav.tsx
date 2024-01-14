import NavLinks from '@/app/components/nav/nav-links';
import SliceBooksLogo from '@/app/components/nav/slicebooks-logo';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import SignOutBtn from './sign-out-btn';

export default function SideNav() {
  return (
    <nav className="flex h-full w-full flex-col">
      <div className="bg-nav flex h-[72px] h-full justify-between 2xl:h-full 2xl:flex-col">
        <div className="flex items-center gap-6 2xl:flex-col">
          <div className="flex w-full justify-center bg-primary 2xl:rounded-r-none">
            <Link className="flex p-6" href="/">
              <SliceBooksLogo />
            </Link>
          </div>
          <NavLinks />
        </div>
        <div className="flex items-center gap-6 2xl:flex-col">
          <div className="flex h-full w-full items-center border-muted-foreground">
            <ModeToggle />
          </div>
          <SignOutBtn />
        </div>
      </div>
      <div className="container mt-4 flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 2xl:hidden"></div>
    </nav>
  );
}
