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

/**
 * 入出金情報を取得する
 * @returns 入出金情報
 */
export const getEntries = async ({ userId }: { userId: string }): Promise<Entry[]> => {
  const params = new URLSearchParams({ userId });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/entries?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error(res);
    throw new Error('Failed to get entries');
  }

  return res.json();
};

/**
 * 入出金情報を削除する
 * @param id 入出金情報のID
 * @returns 入出金情報
 */
export const deleteEntry = async ({ id }: { id: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/entries/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    console.error(res);
    throw new Error('Failed to delete category');
  }

  return res.json();
};
