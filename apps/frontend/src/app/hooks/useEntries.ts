import { demoData } from '@/data/demo-data';
import {
  createEntry as createEntryApi,
  getEntries,
  deleteEntry as deleteEntryApi,
} from '@/services/entry';
import { Entry } from '@/types/entry';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// 入出金情報の型
interface EntryWithoutId extends Omit<Entry, 'userId'> {}

/**
 * 入出金情報を取得する
 * @param year 年（オプション）
 * @param month 月（オプション）
 * @returns 入出金情報
 */
export const useEntries = (year?: number, month?: number) => {
  const [entries, setEntries] = useState<EntryWithoutId[]>([]);
  const { data: session, status } = useSession();

  /**
   * 入出金情報を取得する
   */
  useEffect(() => {
    initEntries(status, year, month);
  }, [status, year, month]);

  /**
   * 入出金情報を取得する
   * @param status セッションの状態
   * @param year 年（オプション）
   * @param month 月（オプション）
   */
  const initEntries = async (status: string, year?: number, month?: number) => {
    // セッションの状態に応じて入出金情報を取得する
    switch (status) {
      // 認証時
      case 'authenticated':
        if (!session?.user.id) return;

        // 指定された年月、または今月の入出金情報を取得する
        const currentDate = new Date();
        const targetYear = year || currentDate.getFullYear();
        const targetMonth = month || currentDate.getMonth() + 1;
        const entries = await getEntries({ userId: session?.user.id, year: targetYear, month: targetMonth });

        setEntries(
          entries.map((entry) => ({
            ...entry,
            date: new Date(entry.date),
          }))
        );
        break;

      // 未認証時
      case 'unauthenticated':
        setEntries(demoData);
        break;

      // default時は何もしない
      default:
        break;
    }
  };

  /**
   * 入出金情報を追加する
   * @param entry 入出金情報
   */
  const createEntry = async (entry: EntryWithoutId) => {
    if (!session) {
      setEntries([entry, ...entries]);
    } else {
      await createEntryApi({
        userId: session.user.id,
        amount: entry.amount,
        date: entry.date,
        memo: entry.memo,
        categoryName: entry.categoryName,
        entryType: entry.entryType,
      });
      setEntries([entry, ...entries]);
    }
  };

  /**
   * 入出金情報を削除する
   * @param id 入出金情報のID
   */
  const deleteEntry = async (id: number) => {
    if (!session) {
      setEntries(entries.filter((entry) => entry.id !== id));
    } else {
      await deleteEntryApi({ id: id.toString() });
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  return { entries, createEntry, deleteEntry };
};
