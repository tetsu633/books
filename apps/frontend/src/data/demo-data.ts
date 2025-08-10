import { Category } from '@/types/category';
import { Entry } from '@/types/entry';
import { Summary, YearlySummary } from '@/types/summary';

// デモデータ
export const demoData: Entry[] = [
  {
    id: 1,
    userId: '1',
    amount: 300000,
    date: new Date('2025-01-25'),
    memo: '1月分給与',
    categoryName: '給与',
    entryType: 'income',
  },
  {
    id: 2,
    userId: '1',
    amount: 1200,
    date: new Date('2025-01-24'),
    memo: 'スーパーで買い物',
    categoryName: '食費',
    entryType: 'expense',
  },
];

// デフォルトカテゴリ
export const defaultCategories: Category[] = [
  {
    name: '給与',
    type: 'income',
    color: 'green',
  },
  {
    name: '副業',
    type: 'income',
    color: 'green',
  },
  {
    name: '食費',
    type: 'expense',
    color: 'red',
  },
  {
    name: '交通費',
    type: 'expense',
    color: 'blue',
  },
  {
    name: '日用品',
    type: 'expense',
    color: 'yellow',
  },
  {
    name: '光熱費',
    type: 'expense',
    color: 'purple',
  },
];

export const defaultMonthlySummaryData: Summary = {
  month: { year: 2024, month: 1 },
  categorySummary: [
    {
      amount: 45000,
      categoryName: '食費',
      entryType: 'expense',
    },
    {
      amount: 70000,
      categoryName: '家賃',
      entryType: 'income',
    },
    {
      amount: 15000,
      categoryName: '光熱費',
      entryType: 'expense',
    },
    {
      amount: 12000,
      categoryName: '交通費',
      entryType: 'expense',
    },
    {
      amount: 8000,
      categoryName: '日用品',
      entryType: 'expense',
    },
    {
      amount: 35000,
      categoryName: 'その他',
      entryType: 'expense',
    },
  ],
  totalIncome: 300000,
  totalExpense: 185000,
  categories: defaultCategories,
  previousMonthIncome: 100000,
  previousMonthExpense: 50000,
};

// 年次収支レポートデータ
const defaultMonth = 1;
export const demoYearlySummaryData: YearlySummary[] = [
  { month: `${new Date().getFullYear()}-${defaultMonth}`, income: 280000, expense: 220000 },
  { month: `${new Date().getFullYear()}-${defaultMonth + 1}`, income: 285000, expense: 230000 },
  { month: `${new Date().getFullYear()}-${defaultMonth + 2}`, income: 290000, expense: 225000 },
  { month: `${new Date().getFullYear()}-${defaultMonth + 3}`, income: 295000, expense: 240000 },
  { month: `${new Date().getFullYear()}-${defaultMonth + 4}`, income: 300000, expense: 235000 },
  {
    month: `${new Date().getFullYear()}-${defaultMonth + 5}`,
    income: 300000,
    expense: 235000,
  },
  {
    month: `${new Date().getFullYear()}-${defaultMonth + 6}`,
    income: 300000,
    expense: 235000,
  },
  {
    month: `${new Date().getFullYear()}-${defaultMonth + 7}`,
    income: 300000,
    expense: 235000,
  },
  {
    month: `${new Date().getFullYear()}-${defaultMonth + 8}`,
    income: 300000,
    expense: 235000,
  },
  {
    month: `${new Date().getFullYear()}-${defaultMonth + 9}`,
    income: 300000,
    expense: 235000,
  },
  {
    month: `${new Date().getFullYear()}-${defaultMonth + 10}`,
    income: 300000,
    expense: 235000,
  },
  {
    month: `${new Date().getFullYear()}-${defaultMonth + 11}`,
    income: 300000,
    expense: 235000,
  },
];
