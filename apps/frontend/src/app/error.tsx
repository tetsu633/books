'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { IconHome, IconRefresh } from '@tabler/icons-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          エラーが発生しました
        </h1>
        <p className="text-gray-600 mb-8">
          申し訳ございません。予期しないエラーが発生しました。
          しばらく時間をおいてから再度お試しください。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => reset()} className="w-full sm:w-auto">
            <IconRefresh className="w-4 h-4 mr-2" />
            再試行
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <IconHome className="w-4 h-4 mr-2" />
              ホームへ戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}