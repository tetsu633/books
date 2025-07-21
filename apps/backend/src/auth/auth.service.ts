import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  createUser({ email, password }: { email: string; password: string }) {
    try {
      return this.prismaService.user.create({
        data: {
          email,
          password,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
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
