import { EntryWithCategory } from '@/types/entry';

// デモデータ
export const demoData: EntryWithCategory[] = [
  {
    id: '1',
    userId: '1',
    amount: 300000,
    categoryId: 1,
    date: new Date('2025-01-25'),
    memo: '1月分給与',
    category: {
      name: '給与',
      type: 'income',
    },
  },
  {
    id: '2',
    userId: '1',
    amount: 1200,
    categoryId: 2,
    date: new Date('2025-01-24'),
    memo: 'スーパーで買い物',
    category: {
      name: '食費',
      type: 'expense',
    },
  },
];
