import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  IconWallet,
  IconChartPie,
  IconCategory,
  IconCalendarEvent,
  IconRocket,
  IconCheck,
  IconChevronRight,
  IconChevronLeft,
} from '@tabler/icons-react';

interface TutorialProps {
  onComplete?: () => void;
}

export const Tutorial: React.FC<TutorialProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="relative w-full max-w-4xl h-[600px] px-4">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
            bulletActiveClass: 'bg-green-500',
            bulletClass:
              'inline-block w-2 h-2 bg-gray-300 rounded-full mx-1 cursor-pointer transition-all',
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          className="w-full h-full"
        >
          {/* ウェルカムスライド */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="mb-8">
                <IconWallet size={100} className="text-green-500 mx-auto" />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-gray-800">収支管理アプリへようこそ！</h1>
              <p className="text-lg text-gray-600 max-w-md">
                シンプルで使いやすい収支管理を始めましょう。
                このチュートリアルで基本的な使い方をご紹介します。
              </p>
            </div>
          </SwiperSlide>

          {/* カテゴリ管理の説明 */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="mb-8">
                <IconCategory size={80} className="text-purple-500 mx-auto" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">まずはカテゴリを設定しよう</h2>
              <div className="max-w-md space-y-4">
                <p className="text-gray-600">
                  あなたのライフスタイルに合わせて、 カテゴリを自由に追加・編集できます。
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    食費
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    交通費
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    娯楽費
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    給料
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* 収支入力の説明 */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="mb-8">
                <IconCalendarEvent size={80} className="text-blue-500 mx-auto" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">収支を記録する</h2>
              <div className="text-left max-w-md space-y-4">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800 text-lg">1. 日付を選択</span>
                  <br />
                  記録したい日付を選びます
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800 text-lg">2. カテゴリを選択</span>
                  <br />
                  収入・支出に応じたカテゴリを選びます
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800 text-lg">3. 金額を入力</span>
                  <br />
                  金額を入力して保存します
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* グラフ表示の説明 */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="mb-8">
                <IconChartPie size={80} className="text-orange-500 mx-auto" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">収支を可視化</h2>
              <p className="text-gray-600 max-w-md">
                月別・年別のグラフで収支の推移を確認できます。
                <br />
                カテゴリ別の内訳も一目で分かります。
              </p>
              <div className="mt-6 flex gap-4 justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-green-600 font-bold">収入</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-red-600 font-bold">支出</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* 完了スライド */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="mb-8">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                  <IconCheck size={60} className="text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">準備完了！</h2>
              <p className="text-gray-600 max-w-md mb-8">
                それでは、収支管理を始めましょう。 いつでもメニューからヘルプを確認できます。
              </p>
              <button
                onClick={onComplete}
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2 animate-bounce"
              >
                <IconRocket size={20} />
                始める
              </button>
            </div>
          </SwiperSlide>

          <button
            onClick={onComplete}
            className="absolute bottom-3 right-3 z-10 text-gray-400 hover:text-gray-600 font-bold transition-colors"
          >
            スキップする
          </button>
        </Swiper>

        {/* カスタムナビゲーションボタン */}
        <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 transition-colors">
          <IconChevronLeft size={48} />
        </button>
        <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 transition-colors">
          <IconChevronRight size={48} />
        </button>

        {/* カスタムページネーション */}
        <div className="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-10"></div>
      </div>
    </div>
  );
};
