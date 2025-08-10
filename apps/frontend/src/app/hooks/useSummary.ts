import { defaultMonthlySummaryData } from '@/data/demo-data';
import { getSummary } from '@/services/summary';
import { Summary } from '@/types/summary';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useSummary = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [currentMonth, setCurrentMonth] = useState<{ year: number; month: number }>({
    year: 2025,
    month: 8,
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchSummary(status);
  }, [status, currentMonth]);

  const fetchSummary = async (status: string) => {
    switch (status) {
      case 'authenticated':
        if (!session?.user.id) return;
        const summary = await getSummary({
          userId: session.user.id,
          year: currentMonth.year,
          month: currentMonth.month,
        });
        setSummary(summary);
        break;

      // 未認証時
      case 'unauthenticated':
        setSummary(defaultMonthlySummaryData);
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

  return { summary, currentMonth, changeMonth };
};
