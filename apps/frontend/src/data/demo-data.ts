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
