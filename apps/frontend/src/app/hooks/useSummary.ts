import { defaultMonthlySummaryData, demoYearlySummaryData } from '@/data/demo-data';
import { getMonthlySummary, getYearlySummary } from '@/services/summary';
import { Summary, YearlySummary } from '@/types/summary';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useSummary = () => {
  const [monthlySummary, setMonthlySummary] = useState<Summary | null>(null);
  const [yearlySummary, setYearlySummary] = useState<YearlySummary[] | null>(null);
  const [currentMonth, setCurrentMonth] = useState<{ year: number; month: number }>({
    year: 2025,
    month: 8,
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchMonthlySummary(status);
    fetchYearlySummary(status);
  }, [status, currentMonth]);

  const fetchYearlySummary = async (status: string) => {
    switch (status) {
      case 'authenticated':
        if (!session?.user.id) return;
        if (yearlySummary !== null && currentMonth.month !== 1 && currentMonth.month !== 12) return;
        const summary = await getYearlySummary({
          userId: session.user.id,
          year: currentMonth.year,
        });
        setYearlySummary(summary);
        break;

      case 'unauthenticated':
        setYearlySummary(demoYearlySummaryData);
        break;

      default:
        break;
    }
  };

  const fetchMonthlySummary = async (status: string) => {
    switch (status) {
      case 'authenticated':
        if (!session?.user.id) return;
        const summary = await getMonthlySummary({
          userId: session.user.id,
          year: currentMonth.year,
          month: currentMonth.month,
        });
        setMonthlySummary(summary);
        break;

      // 未認証時
      case 'unauthenticated':
        setMonthlySummary(defaultMonthlySummaryData);
        break;

      // default時は何もしない
      default:
        break;
    }
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    let newYear = currentMonth.year;
    let newMonth = currentMonth.month;

    if (direction === 'prev') {
      newMonth--;
      if (newMonth < 1) {
        newMonth = 12;
        newYear--;
      }
    } else {
      newMonth++;
      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      }
    }

    setCurrentMonth({ year: newYear, month: newMonth });
  };

  return { monthlySummary, currentMonth, yearlySummary, changeMonth };
};
