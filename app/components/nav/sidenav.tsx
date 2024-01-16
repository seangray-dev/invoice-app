import logo from '@/public/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import NavLinks from './nav-links';
import SignOutBtn from './sign-out-btn';

export default function NavBar() {
  return (
    <nav className="bg-nav flex justify-between 2xl:sticky 2xl:top-0 2xl:h-screen 2xl:flex-col 2xl:justify-between 2xl:rounded-r-[20px]">
      <div className="flex w-full gap-6 2xl:flex-col">
        <Link
          href={'/'}
          className="flex h-[72px] w-[72px] items-center justify-center rounded-r-[20px] bg-primary 2xl:h-[103px] 2xl:w-[103px]"
        >
          <Image priority width={28} height={26} src={logo} alt="logo" />
        </Link>
        <NavLinks />
      </div>
      <div className="flex items-center gap-6 2xl:flex-col 2xl:gap-0">
        <ModeToggle />
        <SignOutBtn />
      </div>
    </nav>
  );
}
