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
          <div>
            <Link
              className="h-full flex-grow focus:outline-primary 2xl:w-full"
              key={link.name}
              title={link.name}
              href={link.href}
            >
              <div
                className={clsx(
                  'flex h-full items-center text-muted-foreground transition-all duration-300 hover:text-primary md:gap-2 md:pr-6 2xl:flex-col 2xl:pb-6 2xl:pr-0',
                  {
                    'text-primary': pathname === link.href,
                  },
                )}
              >
                <LinkIcon className="mb-2 h-5 w-5" />
                <p className="hidden text-center md:block">{link.name}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
