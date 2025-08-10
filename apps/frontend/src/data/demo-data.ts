import { Category } from '@/types/category';
import { Entry } from '@/types/entry';
import { Summary } from '@/types/summary';

// デモデータ
export const demoData: Entry[] = [
  {
    id: '1',
    userId: '1',
    amount: 300000,
    date: new Date('2025-01-25'),
    memo: '1月分給与',
    categoryName: '給与',
    entryType: 'income',
  },
  {
    id: '2',
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
    color: 'bg-green-500',
  },
  {
    name: '副業',
    type: 'income',
    color: 'bg-green-400',
  },
  {
    name: '食費',
    type: 'expense',
    color: 'bg-red-500',
  },
  {
    name: '交通費',
    type: 'expense',
    color: 'bg-blue-500',
  },
  {
    name: '日用品',
    type: 'expense',
    color: 'bg-yellow-500',
  },
  {
    name: '光熱費',
    type: 'expense',
    color: 'bg-purple-500',
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
