import './global.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Providers } from './providers';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '家計簿アプリ - シンプルな資産管理',
  description:
    'シンプルで使いやすい家計簿アプリ。収支管理、カテゴリ分類、月次レポートで賢く資産管理。',
  keywords: ['家計簿', '資産管理', '収支管理', 'お金管理', '節約', '貯金'],
  authors: [{ name: 'Tetsu Nishimura' }],
  openGraph: {
    title: '家計簿アプリ - シンプルな資産管理',
    description: 'シンプルで使いやすい家計簿アプリ。収支管理、カテゴリ分類、月次レポートで賢く資産管理。',
    url: 'https://books-frontend-mu-eight.vercel.app',
    siteName: '家計簿アプリ',
    images: [
      {
        url: 'https://books-frontend-mu-eight.vercel.app/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '家計簿アプリ - シンプルな資産管理',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '家計簿アプリ - シンプルな資産管理',
    description: 'シンプルで使いやすい家計簿アプリ。収支管理、カテゴリ分類、月次レポートで賢く資産管理。',
    images: ['https://books-frontend-mu-eight.vercel.app/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Providers>
        <body className="bg-gray-50 min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </body>
      </Providers>
    </html>
  );
}
