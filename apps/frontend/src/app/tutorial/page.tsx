'use client';

import { Tutorial } from '@/components/Tutorial';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function TutorialPage() {
  const router = useRouter();

  return (
    <Tutorial
      onComplete={() => {
        router.push('/');
      }}
    />
  );
}
