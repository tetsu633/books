'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert(res.error);
      return;
    }

    router.push('/entries');

    // ログイン後はページをリロードする
    router.refresh();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-center text-gray-900">ログイン</h1>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  パスワード
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">ログイン状態を保持</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  パスワードを忘れた方
                </a>
              </div>

              <Button type="submit" className="w-full">
                ログイン
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">または</span>
                </div>
              </div>

              {/* お試しでの収支管理ページへの遷移 */}
              <div className="mt-6">
                <Link href="/entries">
                  <Button variant="outline" className="w-full">
                    ログインせずにお試し（収支管理）
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  登録不要のサンプルデータで機能を体験できます
                </p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  アカウントをお持ちでない方は
                  <Link
                    href="/signup"
                    className="ml-1 font-medium text-blue-600 hover:text-blue-500"
                  >
                    新規登録
                  </Link>
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
