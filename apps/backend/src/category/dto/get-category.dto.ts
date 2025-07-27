import { IsNotEmpty, IsString } from 'class-validator';

export class GetCategoriesDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
