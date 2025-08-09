import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntriesDto } from './dto/create-entries.dto';
import { DeleteEntriesDto } from './dto/delete-entries.dto';
import { GetEntriesDto } from './dto/get-entries.dto';
import { UpdateEntriesDto } from './dto/update-entries.dto';
import { GetSummaryDto } from './dto/get-summary.dto';

@Injectable()
export class EntriesService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 入出金を作成する
   * @param param0 入出金の情報
   * @returns 作成した入出金
   */
  async createEntries({ amount, date, memo, userId, categoryId }: CreateEntriesDto) {
    return await this.prismaService.entry.create({
      data: {
        userId,
        amount,
        categoryId,
        memo,
        date,
      },
    });
  }

  /**
   * 入出金を更新する
   * @param param0 入出金の情報
   * @returns 更新した入出金
   */
  async updateEntries({ id, amount, date, memo, categoryId }: UpdateEntriesDto) {
    return await this.prismaService.entry.update({
      where: {
        id,
      },
      data: {
        amount,
        categoryId,
        memo,
        date,
      },
    });
  }

  /**
   * 入出金を削除する
   * @param param0 入出金のID
   * @returns 削除した入出金
   */
  async deleteEntries({ id }: DeleteEntriesDto) {
    return await this.prismaService.entry.delete({
      where: {
        id,
      },
    });
  }

  /**
   * 入出金を取得する
   * @returns 入出金
   */
  async getEntries({ userId }: GetEntriesDto) {
    return await this.prismaService.entry.findMany({
      where: {
        userId,
      },
      include: {
        Category: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });
  }

  /**
   * 月次の集計を取得する
   * @param param0 月次の集計の情報
   * @returns 月次の集計
   */
  async getSummary({ userId, year, month }: GetSummaryDto) {
    return await this.prismaService.entry.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        date: {
          gte: new Date(year, month, 1),
          lte: new Date(year, month + 1, 0),
        },
      },
      _sum: {
        amount: true,
      },
    });
  }
}
