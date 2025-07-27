import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  constructor(userId: string, name: string, type: string) {
    this.userId = userId;
    this.name = name;
    this.type = type;
  }
}
