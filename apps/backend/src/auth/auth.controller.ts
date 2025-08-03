import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  @Post('login')
  async login(@Body() LoginUserDto: LoginUserDto): Promise<User | null> {
    return await this.authService.loginUser({
      email: LoginUserDto.email,
      password: LoginUserDto.password,
    });
  }
}
