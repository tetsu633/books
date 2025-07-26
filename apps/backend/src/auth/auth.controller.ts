import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser({
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }
}
