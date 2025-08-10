import { Category } from './category';

/**
 * 月次の集計
 */
export interface Summary {
  month: { year: number; month: number };
  categorySummary: {
    categoryName: string;
    entryType: string;
    amount: number;
  }[];
  totalIncome: number;
  totalExpense: number;
  categories: Category[];
  previousMonthIncome: number;
  previousMonthExpense: number;
}

/**
 * 年次の集計
 */
export interface YearlySummary {
  month: string;
  income: number;
  expense: number;
}
