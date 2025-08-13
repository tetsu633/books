'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { IconInfoCircle } from '@tabler/icons-react';

export const DemoDataBanner: React.FC = () => {
  const { data: session } = useSession();

  return (
    // ログインしていない場合にのみ表示
    session === null && (
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="container mx-auto px-4 py-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconInfoCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                現在、デモデータで体験中です。データは保存されません。
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
