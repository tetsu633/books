'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import { APP_NAME } from '@/constants';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-extrabold text-gray-900">
              家計簿アプリ {APP_NAME}
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/entries" className="text-gray-700 hover:text-gray-900 transition-colors">
              入出金
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              カテゴリ
            </Link>
            <Link href="/summary" className="text-gray-700 hover:text-gray-900 transition-colors">
              月次収支
            </Link>
          </nav>

          {/* 未登録ユーザーにのみ表示 */}
          {!session && (
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  ログイン
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  新規登録
                </Button>
              </Link>
            </div>
          )}

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {isMenuOpen ? <IconX /> : <IconMenu2 />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/entries"
                className="px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                入出金
              </Link>
              <Link
                href="/categories"
                className="px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                カテゴリ
              </Link>
              <Link
                href="/summary"
                className="px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                月次収支
              </Link>
            </nav>

            {/* ログイン・新規登録・ログアウト */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-2">
              {!session ? (
                <>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      ログイン
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full">
                      新規登録
                    </Button>
                  </Link>
                </>
              ) : (
                <Button variant="outline" size="sm" className="w-full" onClick={() => signOut()}>
                  ログアウト
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
