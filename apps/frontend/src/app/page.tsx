import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          シンプルで使いやすい
          <br />
          <span className="text-blue-600">家計簿アプリ</span>
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

      <section className="py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">主な機能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="elevated">
            <CardBody className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">収支管理</h3>
              <p className="text-gray-600">収入と支出を簡単に記録。 日付やメモも追加できます。</p>
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardBody className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
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
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">月次レポート</h3>
              <p className="text-gray-600">月ごとの収支を集計。 資産の推移を把握できます。</p>
            </CardBody>
          </Card>
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
  );
}
