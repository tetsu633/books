import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Userを作成する
   * @param param0 email, password
   * @returns User
   */
  async createUser({ email, password }: CreateUserDto) {
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

  /**
   * Userをログインする
   * @param param0 email, password
   * @returns User
   */
  async loginUser({ email, password }: LoginUserDto): Promise<User | null> {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          email,
          password,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException(
            {
              type: '/errors?type=invalid-credentials',
              title: 'Invalid credentials',
              status: 401,
              detail: 'The email or password is incorrect',
            },
            401
          );
        }
      }

      throw error;
    }
  }
}
