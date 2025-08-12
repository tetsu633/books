import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import {
  IconCategory,
  IconChartBar,
  IconCoin,
  IconDeviceMobile,
  IconDownload,
} from '@tabler/icons-react';
import Link from 'next/link';
import { APP_NAME } from '@/constants';

export default function LandingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: APP_NAME,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description:
      'シンプルで使いやすい家計簿アプリ。収支管理、カテゴリ分類、月次レポートで賢く資産管理。',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
    featureList: ['収支管理', 'カテゴリ別分類', '月次レポート', 'シンプルなUI', '無料で利用可能'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8">
        <section className="text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex flex-col items-center gap-4">
            <p>シンプルで使いやすい</p>
            <p className="text-blue-600">家計簿アプリ</p>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            日々の収支を簡単に記録し、カテゴリ別に管理。 月次レポートで資産の流れを把握できます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                無料で始める
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                ログイン
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gray-50 rounded-2xl my-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">まずは体験してみませんか？</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              登録不要でサンプルデータを使って実際の使用感をお試しいただけます。
              <br />
              収支の記録やカテゴリ管理など、すべての機能を体験できます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/entries">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <IconCoin className="w-5 h-5 mr-2" />
                  収支管理を体験
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <IconCategory className="w-5 h-5 mr-2" />
                  カテゴリ管理を体験
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ※サンプルデータは保存されません。本格的に使い始めるには無料登録をお願いします。
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">主な機能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated">
              <CardBody className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconCoin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">収支管理</h3>
                <p className="text-gray-600">収入と支出を簡単に記録。 日付やメモも追加できます。</p>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconCategory className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">カテゴリ分類</h3>
                <p className="text-gray-600">
                  支出をカテゴリ別に分類。 何にお金を使っているか一目瞭然。
                </p>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardBody className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconChartBar className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">月次レポート</h3>
                <p className="text-gray-600">月ごとの収支を集計。 資産の推移を把握できます。</p>
              </CardBody>
            </Card>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">アプリとして使える</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              PWA対応でスマホにインストール可能。 オフラインでも使えて、いつでもどこでも家計管理。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconDownload className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ホーム画面に追加</h3>
              <p className="text-gray-600 text-sm">
                スマホのホーム画面に追加して、アプリのように使えます
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconDeviceMobile className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">スマホ最適化</h3>
              <p className="text-gray-600 text-sm">
                スマホでの操作性を重視した設計で快適に使えます
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-blue-50 rounded-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">今すぐ始めましょう</h2>
            <p className="text-lg text-gray-600 mb-8">登録は無料。クレジットカード不要です。</p>
            <Link href="/signup">
              <Button size="lg">無料アカウント作成</Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
