import React from 'react';
import Link from 'next/link';
import { APP_NAME } from '@/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{APP_NAME}</h3>
            <p className="text-gray-600 text-sm">
              シンプルで使いやすい家計簿アプリで、あなたの資産管理をサポートします。
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">機能</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/entries"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  入出金管理
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  カテゴリ管理
                </Link>
              </li>
              <li>
                <Link
                  href="/summary"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  月次レポート
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">サポート</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={'/tutorial'}
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  使い方ガイド
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  よくある質問
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            &copy; {currentYear} 家計簿アプリ {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
