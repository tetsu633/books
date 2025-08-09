import { demoData } from '@/data/demo-data';
import { EntryWithCategory } from '@/types/entry';
import { useEffect, useState } from 'react';

/**
 * 入出金情報を取得する
 * @returns 入出金情報
 */
export const useEntries = () => {
  const [entries, setEntries] = useState<EntryWithCategory[]>([]);

  // デモデータを取得する
  useEffect(() => {
    setEntries(demoData);
  }, []);

  return { entries, setEntries };
};
