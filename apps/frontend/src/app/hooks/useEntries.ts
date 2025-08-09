import { demoData } from '@/data/demo-data';
import { createEntry } from '@/services/entry';
import { Entry } from '@/types/entry';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// 入出金情報の型
interface EntryWithoutId extends Omit<Entry, 'id' | 'userId'> {}

/**
 * 入出金情報を取得する
 * @returns 入出金情報
 */
export const useEntries = () => {
  const [entries, setEntries] = useState<EntryWithoutId[]>([]);
  const { data: session } = useSession();

  // デモデータを取得する
  useEffect(() => {
    setEntries(demoData);
  }, []);

  /**
   * 入出金情報を追加する
   * @param entry 入出金情報
   */
  const addEntry = async (entry: EntryWithoutId) => {
    if (!session) {
      setEntries([entry, ...entries]);
    } else {
      await createEntry({
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

  return { entries, addEntry };
};
