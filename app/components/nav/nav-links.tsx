'use client';

import clsx from 'clsx';
import { BookOpenTextIcon, HomeIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: BookOpenTextIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UsersIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link className="h-full 2xl:w-full" key={link.name} href={link.href}>
            <div
              className={clsx(
                'flex h-full items-center gap-2 border-r border-muted-foreground pr-6 text-muted-foreground transition-all duration-300 hover:text-primary 2xl:flex-col 2xl:border-b 2xl:border-r-0 2xl:pb-6 2xl:pr-0',
                {
                  'text-primary': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="h-5 w-5" />
              <p className="hidden md:block">{link.name}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
