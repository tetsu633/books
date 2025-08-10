'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { useSummary } from '../hooks/useSummary';
import { formatCurrency } from '@/utils/currency';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function SummaryPage() {
  const { monthlySummary, currentMonth, yearlySummary, changeMonth } = useSummary();

  // 数値かどうかをチェック
  const isNum = (v: unknown): v is number => typeof v === 'number' && !Number.isNaN(v);

  // 増減率を計算
  const changeRate = (current: number, previous: number): number | undefined => {
    if (previous === 0) return current === 0 ? 0 : undefined;
    return ((current - previous) / previous) * 100;
  };

  // 前月のデータがあるかどうかをチェック
  const hasPrev =
    isNum(monthlySummary?.previousMonthIncome) && isNum(monthlySummary?.previousMonthExpense);

  // 今月のデータがあるかどうかをチェック
  const hasCurr = isNum(monthlySummary?.totalIncome) && isNum(monthlySummary?.totalExpense);

  // 収入の増減率を計算
  const incomeChangeRate =
    hasPrev && hasCurr
      ? changeRate(monthlySummary!.totalIncome!, monthlySummary!.previousMonthIncome!)
      : undefined;

  // 支出の増減率を計算
  const expenseChangeRate =
    hasPrev && hasCurr
      ? changeRate(monthlySummary!.totalExpense!, monthlySummary!.previousMonthExpense!)
      : undefined;

  // 貯蓄率の増減率を計算
  const financeChangeRate =
    hasPrev && hasCurr
      ? changeRate(
          monthlySummary!.totalIncome! - monthlySummary!.totalExpense!,
          monthlySummary!.previousMonthIncome! - monthlySummary!.previousMonthExpense!
        )
      : undefined;

  // 増減率をフォーマット
  const formatRate = (v: number | undefined) => (v === undefined ? '—' : `${v.toFixed(1)}%`);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">月次収支レポート</h1>

        {/* 月次収支レポート */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={() => changeMonth('prev')}>
            前月
          </Button>
          <h2 className="text-xl font-semibold">
            {currentMonth.year}年{currentMonth.month}月
          </h2>
          <Button variant="outline" size="sm" onClick={() => changeMonth('next')}>
            翌月
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardBody>
              <h3 className="text-sm text-gray-600 mb-2">総収入</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(monthlySummary?.totalIncome || 0)}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-sm text-gray-600 mb-2">総支出</h3>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(monthlySummary?.totalExpense || 0)}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-sm text-gray-600 mb-2">収支</h3>
              <p
                className={`text-2xl font-bold ${
                  (monthlySummary?.totalIncome || 0) - (monthlySummary?.totalExpense || 0) >= 0
                    ? 'text-blue-600'
                    : 'text-red-600'
                }`}
              >
                {formatCurrency(
                  (monthlySummary?.totalIncome || 0) - (monthlySummary?.totalExpense || 0)
                )}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* カテゴリ別支出 */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">カテゴリ別支出</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {monthlySummary?.categorySummary.length === 0 && (
                <div className="text-center">データなし</div>
              )}
              {monthlySummary?.categorySummary.map((categorySummary, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 w-1/3 text-left">
                      {categorySummary.categoryName}
                    </span>
                    <span className="text-sm font-medium text-gray-700 w-1/3 text-center">
                      {categorySummary.entryType === 'income' ? '収入' : '支出'}
                    </span>
                    <span className="text-sm font-medium text-gray-700 w-1/3 text-right">
                      {formatCurrency(categorySummary.amount)}
                    </span>
                  </div>
                </div>
              ))}
              {monthlySummary?.categorySummary.map((categorySummary, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {categorySummary.categoryName}
                    </span>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{formatCurrency(categorySummary.amount)}</span>
                      <span className="ml-2 text-gray-500">
                        ({((categorySummary.amount / monthlySummary.totalExpense) * 100).toFixed(1)}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        categorySummary.entryType === 'income' ? 'bg-green-600' : 'bg-red-600'
                      }`}
                      style={{
                        width: `${
                          (categorySummary.amount /
                            (categorySummary.entryType === 'income'
                              ? monthlySummary.totalIncome
                              : monthlySummary.totalExpense)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 月別推移 */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">月別推移</h3>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={256}>
                <LineChart data={yearlySummary || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis
                    tickFormatter={(value) => formatCurrency(Number(value))}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{ fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="income" stroke="#82ca9d" name="収入" />
                  <Line type="monotone" dataKey="expense" stroke="#ff8042" name="支出" />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* 前月比較 */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">前月比較</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">収入</span>
                  <span className="text-green-600 font-medium">{formatRate(incomeChangeRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">支出</span>
                  <span className="text-red-600 font-medium">{formatRate(expenseChangeRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">貯蓄率</span>
                  <span className="text-blue-600 font-medium">{formatRate(financeChangeRate)}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
