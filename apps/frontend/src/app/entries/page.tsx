'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { useEntries } from '../hooks/useEntries';
import { EntryWithCategory } from '@/types/entry';

export default function EntriesPage() {
  const { entries, setEntries } = useEntries();

  const [showForm, setShowForm] = useState(false);
  const [entryType, setEntryType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: EntryWithCategory = {
      id: Date.now().toString(),
      userId: '1',
      amount: Number(amount),
      categoryId: Number(category),
      date: new Date(date),
      memo: note,
      category: {
        name: category,
        type: entryType,
      },
    };
    setEntries([newEntry, ...entries]);
    setShowForm(false);
    setAmount('');
    setCategory('');
    setNote('');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">入出金管理</h1>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => {}}>
              すべて
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              収入
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              支出
            </Button>
          </div>

          <Button onClick={() => setShowForm(!showForm)} size="sm">
            {showForm ? 'キャンセル' : '新規登録'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">選択してください</option>
                      {entryType === 'income' ? (
                        <>
                          <option value="給与">給与</option>
                          <option value="副業">副業</option>
                          <option value="その他">その他</option>
                        </>
                      ) : (
                        <>
                          <option value="食費">食費</option>
                          <option value="交通費">交通費</option>
                          <option value="日用品">日用品</option>
                          <option value="光熱費">光熱費</option>
                          <option value="その他">その他</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="任意"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    キャンセル
                  </Button>
                  <Button type="submit">登録</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} variant="bordered">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-12 rounded ${
                        entry.category.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{entry.category.name}</div>
                      <div className="text-sm text-gray-500">{entry.date.toLocaleDateString()}</div>
                      {entry.memo && <div className="text-sm text-gray-600 mt-1">{entry.memo}</div>}
                    </div>
                  </div>
                  <div
                    className={`text-lg font-semibold ${
                      entry.category.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {entry.category.type === 'income' ? '+' : '-'}
                    {formatCurrency(entry.amount)}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
