import { Entry } from '@/types/entry';

/**
 * 入出金情報を作成する
 * @param entry 入出金情報
 * @returns 入出金情報
 */
export const createEntry = async (entry: {
  userId: string;
  amount: number;
  date: Date;
  memo: string;
  categoryName: string;
  entryType: string;
}): Promise<Entry> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    console.error(res);
    throw new Error('Failed to create entry');
  }

  return res.json();
};
