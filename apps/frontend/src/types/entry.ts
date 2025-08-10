// 入出金情報
export interface Entry {
  id?: number;
  userId: string;
  amount: number;
  categoryName: string;
  date: Date;
  memo: string;
  entryType: string; // 'income' | 'expense'
}
