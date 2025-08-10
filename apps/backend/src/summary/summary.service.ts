import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetMonthlySummaryDto } from './dto/get-summary.dto';

@Injectable()
export class SummaryService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 月次の集計を取得する
   * @param param0 月次の集計の情報
   * @returns 月次の集計
   */
  async getMonthlySummary({ userId, year, month }: GetMonthlySummaryDto) {
    // カテゴリ別・タイプ別の集計
    const categorySummary = await this.prismaService.entry.groupBy({
      by: ['categoryName', 'entryType'],
      where: {
        userId,
        date: {
          gte: new Date(year, month - 1, 1),
          lte: new Date(year, month, 0),
        },
      },
      _sum: {
        amount: true,
      },
    });

    // 収入・支出の合計
    const totalSummary = await this.prismaService.entry.groupBy({
      by: ['entryType'],
      where: {
        userId,
        date: {
          gte: new Date(year, month - 1, 1),
          lte: new Date(year, month, 0),
        },
      },
      _sum: {
        amount: true,
      },
    });

    // カテゴリの詳細情報
    const categories = await this.prismaService.category.findMany({
      where: {
        userId,
      },
    });

    // 前月比較
    const previousMonthSummary = await this.getPreviousMonthSummary({
      userId,
      year,
      month,
    });

    const previousMonthIncome = previousMonthSummary.income || undefined;
    const previousMonthExpense = previousMonthSummary.expense || undefined;

    return {
      categorySummary: categorySummary.map((item) => ({
        categoryName: item.categoryName,
        entryType: item.entryType,
        amount: item._sum.amount,
      })),
      totalIncome: totalSummary.find((item) => item.entryType === 'income')?._sum.amount || 0,
      totalExpense: totalSummary.find((item) => item.entryType === 'expense')?._sum.amount || 0,
      categories,
      previousMonthIncome,
      previousMonthExpense,
    };
  }

  /**
   * 前月の集計を取得する
   * @param param0 前月の集計の情報
   * @returns 前月の集計
   */
  async getPreviousMonthSummary({ userId, year, month }: GetMonthlySummaryDto) {
    const previousMonth = month - 1;
    const previousYear = year;

    const previousMonthSummary = await this.prismaService.entry.groupBy({
      by: ['entryType'],
      where: {
        userId,
        date: {
          gte: new Date(previousYear, previousMonth - 1, 1),
          lte: new Date(previousYear, previousMonth, 0),
        },
      },
      _sum: {
        amount: true,
      },
    });

    return {
      income: previousMonthSummary.find((item) => item.entryType === 'income')?._sum.amount || 0,
      expense: previousMonthSummary.find((item) => item.entryType === 'expense')?._sum.amount || 0,
    };
  }
}
