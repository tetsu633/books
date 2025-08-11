import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntriesDto } from './dto/create-entries.dto';
import { GetEntriesDto } from './dto/get-entries.dto';
import { UpdateEntriesDto } from './dto/update-entries.dto';

@Injectable()
export class EntriesService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 入出金を作成する
   * @param param0 入出金の情報
   * @returns 作成した入出金
   */
  async createEntries({ amount, date, memo, userId, categoryName, entryType }: CreateEntriesDto) {
    return await this.prismaService.entry.create({
      data: {
        userId,
        entryType,
        categoryName,
        amount,
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
  async updateEntries({ id, amount, date, memo, categoryName }: UpdateEntriesDto) {
    return await this.prismaService.entry.update({
      where: {
        id,
      },
      data: {
        amount,
        categoryName,
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
  async deleteEntries({ id }: { id: number }) {
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
  async getEntries({ userId, year, month }: GetEntriesDto) {
    return await this.prismaService.entry.findMany({
      where: {
        userId,
        // 年月が指定されている場合は、その年月のデータを取得する
        ...(year && month
          ? {
              date: {
                gte: new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)),
                lt: new Date(Date.UTC(year, month, 1, 0, 0, 0)),
              },
            }
          : {}),
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}
