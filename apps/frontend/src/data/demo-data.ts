import { Category } from '@/types/category';
import { Entry } from '@/types/entry';

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
