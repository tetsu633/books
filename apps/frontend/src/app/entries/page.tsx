'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { useEntries } from '../hooks/useEntries';
import { useForm } from 'react-hook-form';
import { formatCurrency } from '@/utils/currency';
import { IconTrash } from '@tabler/icons-react';
import { useCategories } from '../hooks/useCategories';
import { DemoDataBanner } from '@/components/DemoDataBanner';
import { TutorialProvider } from '@/components/TutorialProvider';

interface IEntryForm {
  userId: string;
  amount: number;
  categoryName: string;
  date: string;
  memo: string;
}

export default function EntriesPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const { entries, createEntry, deleteEntry } = useEntries(year, month);
  const { categories } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [entryType, setEntryType] = useState<'income' | 'expense'>('expense');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const {
    register,
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm<IEntryForm>({
    defaultValues: {
      amount: undefined,
      memo: '',
      categoryName: undefined,
      date: new Date().toISOString().split('T')[0],
    },
  });

  /**
   * 入出金情報を追加する
   * @param data 入出金情報
   */
  const handleSubmit = async (data: IEntryForm) => {
    await createEntry({
      amount: Number(data.amount),
      categoryName: data.categoryName,
      date: new Date(data.date),
      memo: data.memo,
      entryType,
    });

    setShowForm(false);
    setEntryType('expense');
    reset();
  };

  /**
   * フォームをキャンセルする
   */
  const handleCancel = () => {
    setShowForm(false);
    setEntryType('expense');
    reset();
  };

  /**
   * 前月へ移動
   */
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  /**
   * 次月へ移動
   */
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <>
      <TutorialProvider />
      <DemoDataBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">入出金管理</h1>

          <div className="flex justify-between items-center mb-4">
            <Button onClick={handlePreviousMonth} variant="outline" size="sm">
              ←
            </Button>
            <h2 className="text-lg font-semibold text-gray-800">
              {year}年{month}月
            </h2>
            <Button onClick={handleNextMonth} variant="outline" size="sm">
              →
            </Button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  setFilterType('all');
                }}
              >
                すべて
              </Button>
              <Button
                variant={filterType === 'income' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  setFilterType('income');
                }}
              >
                収入
              </Button>
              <Button
                variant={filterType === 'expense' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  setFilterType('expense');
                }}
              >
                支出
              </Button>
            </div>

            <Button onClick={() => setShowForm(!showForm)} size="sm">
              {showForm ? 'キャンセル' : '新規登録'}
            </Button>
          </div>

          {/* 入出金情報登録フォーム */}
          {showForm && (
            <Card className="mb-6">
              <CardBody>
                <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-4">
                  <div className="flex gap-4 mb-4">
                    <Button
                      type="button"
                      variant={entryType === 'income' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setEntryType('income')}
                    >
                      収入
                    </Button>
                    <Button
                      type="button"
                      variant={entryType === 'expense' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setEntryType('expense')}
                    >
                      支出
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">金額</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                        required
                        {...register('amount')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        カテゴリ
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        {...register('categoryName')}
                      >
                        <option value="">選択してください</option>
                        {entryType === 'income'
                          ? categories
                              .filter((category) => category.type === 'income')
                              .map((category) => (
                                <option key={category.id} value={category.name}>
                                  {category.name}
                                </option>
                              ))
                          : categories
                              .filter((category) => category.type === 'expense')
                              .map((category) => (
                                <option key={category.id} value={category.name}>
                                  {category.name}
                                </option>
                              ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        {...register('date')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="任意"
                        {...register('memo')}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      キャンセル
                    </Button>
                    <Button type="submit">登録</Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          )}

          {/* 入出金情報一覧 */}
          <div className="space-y-4">
            {entries
              .filter((entry) => {
                if (filterType === 'all') return true;
                if (filterType === 'income') return entry.entryType === 'income';
                if (filterType === 'expense') return entry.entryType === 'expense';
                return false;
              })
              .slice(0, 5)
              .map((entry, index) => (
                <Card key={`${entry.categoryName}-${index}`} variant="bordered">
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-2 h-12 rounded ${
                            entry.entryType === 'income' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{entry.categoryName}</div>
                          <div className="text-sm text-gray-500">
                            {entry.date.toLocaleDateString()}
                          </div>
                          {entry.memo && (
                            <div className="text-sm text-gray-600 mt-1">{entry.memo}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div
                          className={`text-lg font-semibold ${
                            entry.entryType === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {entry.entryType === 'income' ? '+' : '-'}
                          {formatCurrency(entry.amount)}
                        </div>

                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            if (entry.id && confirm('このデータを削除してもよろしいですか？')) {
                              deleteEntry(entry.id);
                            }
                          }}
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
