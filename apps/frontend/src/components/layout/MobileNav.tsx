'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconCategory, IconChartBar, IconCoin } from '@tabler/icons-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: '/entries',
      label: '入出金',
      icon: <IconCoin className="w-8 h-8" />,
    },
    {
      href: '/categories',
      label: 'カテゴリ',
      icon: <IconCategory className="w-8 h-8" />,
    },
    {
      href: '/summary',
      label: 'レポート',
      icon: <IconChartBar className="w-8 h-8" />,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-3 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
