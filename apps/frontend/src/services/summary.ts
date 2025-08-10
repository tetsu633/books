/**
 * 月次の集計を取得する
 * @param userId ユーザーID
 * @param year 年
 * @param month 月
 * @returns 月次の集計
 */
export const getSummary = async ({
  userId,
  year,
  month,
}: {
  userId: string;
  year: number;
  month: number;
}) => {
  const params = new URLSearchParams({ userId, year: year.toString(), month: month.toString() });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/summary/monthly?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error(res);
    throw new Error('Failed to get summary');
  }

  return await res.json();
};
