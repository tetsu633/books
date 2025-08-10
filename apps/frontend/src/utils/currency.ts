/**
 * 金額をフォーマットする
 * @param amount 金額
 * @returns フォーマットされた金額
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount);
};
