'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';

interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
  balance: number;
  categories: {
    name: string;
    amount: number;
    percentage: number;
  }[];
}

export default function SummaryPage() {
  const [currentMonth, setCurrentMonth] = useState('2024-01');

  const monthlySummary: MonthlySummary = {
    month: '2024年1月',
    income: 300000,
    expense: 185000,
    balance: 115000,
    categories: [
      { name: '食費', amount: 45000, percentage: 24.3 },
      { name: '家賃', amount: 70000, percentage: 37.8 },
      { name: '光熱費', amount: 15000, percentage: 8.1 },
      { name: '交通費', amount: 12000, percentage: 6.5 },
      { name: '日用品', amount: 8000, percentage: 4.3 },
      { name: 'その他', amount: 35000, percentage: 18.9 },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const [year, month] = currentMonth.split('-').map(Number);
    let newYear = year;
    let newMonth = month;

    if (direction === 'prev') {
      newMonth--;
      if (newMonth < 1) {
        newMonth = 12;
        newYear--;
      }
    } else {
      newMonth++;
      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      }
    }

    setCurrentMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">月次収支レポート</h1>

        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={() => changeMonth('prev')}>
            前月
          </Button>
          <h2 className="text-xl font-semibold">{monthlySummary.month}</h2>
          <Button variant="outline" size="sm" onClick={() => changeMonth('next')}>
            翌月
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardBody>
              <h3 className="text-sm text-gray-600 mb-2">総収入</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(monthlySummary.income)}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-sm text-gray-600 mb-2">総支出</h3>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(monthlySummary.expense)}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-sm text-gray-600 mb-2">収支</h3>
              <p
                className={`text-2xl font-bold ${
                  monthlySummary.balance >= 0 ? 'text-blue-600' : 'text-red-600'
                }`}
              >
                {formatCurrency(monthlySummary.balance)}
              </p>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">カテゴリ別支出</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {monthlySummary.categories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{formatCurrency(category.amount)}</span>
                      <span className="ml-2 text-gray-500">({category.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">月別推移</h3>
            </CardHeader>
            <CardBody>
              <div className="h-64 flex items-center justify-center text-gray-500">
                グラフ表示エリア（実装予定）
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">前月比較</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">収入</span>
                  <span className="text-green-600 font-medium">+5.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">支出</span>
                  <span className="text-red-600 font-medium">-2.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">貯蓄率</span>
                  <span className="text-blue-600 font-medium">38.3%</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
