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
 * @returns 入出金情報
 */
export const useEntries = () => {
  const [entries, setEntries] = useState<EntryWithoutId[]>([]);
  const { data: session, status } = useSession();

  /**
   * 入出金情報を取得する
   */
  useEffect(() => {
    initEntries(status);
  }, [status]);

  /**
   * 入出金情報を取得する
   * @param status セッションの状態
   */
  const initEntries = async (status: string) => {
    // セッションの状態に応じて入出金情報を取得する
    switch (status) {
      // 認証時
      case 'authenticated':
        if (!session?.user.id) return;
        const entries = await getEntries({ userId: session?.user.id });
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
