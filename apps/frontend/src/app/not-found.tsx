'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { IconHome, IconArrowLeft } from '@tabler/icons-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">ページが見つかりません</h2>
        <p className="text-gray-600 mb-8">
          お探しのページは移動または削除された可能性があります。 URLをご確認ください。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto">
              <IconHome className="w-4 h-4 mr-2" />
              ホームへ戻る
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <IconArrowLeft className="w-4 h-4 mr-2" />
            前のページへ
          </Button>
        </div>
      </div>
    </div>
  );
}
