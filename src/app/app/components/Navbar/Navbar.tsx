'use client';

import Button from '@/components/Button/Button';
import { useAuthContext } from '@/contexts/AuthContext';
import { MenuSVGIcon } from '@react-md/material-icons';
import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {}

interface LinkItem {
  label: string;
  path: string;
}

export default function Navbar({}: NavbarProps) {
  const { loggedUser } = useAuthContext();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const links: LinkItem[] = [
    {
      label: 'Home',
      path: `/app`
    },
    {
      label: 'Monitoramentos',
      path: `/field-observers`
    }
  ];

  const toggleMenu = () => setMenuIsOpen((mio) => !mio);
  const closeMenu = () => setMenuIsOpen(false);

  const accountName = loggedUser?.name;

  return (
    <nav className="fixed z-[999] top-0 flex h-12 w-full flex-col items-end justify-center bg-primary shadow-sm md:items-center">
      {/* logo */}
      <Link href="/app" className="absolute left-3 top-2">
        <img src="/images/logo.png" alt="logo" className="h-8" />
      </Link>

      {/* mobile button menu */}
      <Button
        className="z-20 md:hidden w-16 bg-transparent px-4 py-1 fill-white"
        onClick={toggleMenu}
        icon={MenuSVGIcon}
        theme="light"
      />

      {/* mobile menu */}
      {menuIsOpen && (
        <ul className="absolute top-0 flex w-full list-none flex-col items-center bg-primary p-0">
          {links.map((link, i) => (
            <li key={i} className="w-full border-b border-neutral-100 p-3 ps-7">
              <Link
                className="text-white no-underline"
                href={link.path}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="w-full border-b border-neutral-100 p-3 ps-7">
            <Link
              className="text-white font-bold no-underline"
              href="/app/account"
              onClick={closeMenu}
            >
              {accountName}
            </Link>
          </li>
        </ul>
      )}

      {/* desktop items */}
      <ul className="gap-5 p-0 hidden md:flex">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              className="text-white no-underline transition-all"
              href={link.path}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* right items */}
      <div className="absolute right-3 top-2 flex items-center gap-4">
        <Link
          className="text-white font-bold no-underline transition-all hidden md:block"
          href="/app/account"
        >
          {accountName}
        </Link>
      </div>
    </nav>
  );
}
