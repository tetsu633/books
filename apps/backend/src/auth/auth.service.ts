import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Userを作成する
   * @param param0 email, password
   * @returns User
   */
  async createUser({ email, password }: { email: string; password: string }) {
    try {
      return await this.prismaService.user.create({
        data: {
          email,
          password,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // ユーザーがすでに存在する場合
        if (error.code === 'P2002') {
          throw new HttpException(
            {
              type: '/errors?type=duplicate-email',
              title: 'Duplicate email',
              status: 409,
              detail: 'The email address is already in use',
            },
            409
          );
        }
      }

      throw error;
    }
  }
}
