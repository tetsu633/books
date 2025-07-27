import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * カテゴリを作成する
   * @param param0 カテゴリの情報
   * @returns 作成したカテゴリ
   */
  async createCategory({ userId, name, type }: CreateCategoryDto) {
    return await this.prismaService.category.create({
      data: {
        userId,
        name,
        type,
      },
    });
  }
}
