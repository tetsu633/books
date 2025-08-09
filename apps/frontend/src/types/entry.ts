import { Category } from './category';

// 入出金情報
export interface Entry {
  id: string;
  userId: string;
  amount: number;
  categoryId: number;
  date: Date;
  memo: string;
}

// 入出金情報とカテゴリー情報を結合した型
export interface EntryWithCategory extends Entry {
  category: Omit<Category, 'id'>;
}
