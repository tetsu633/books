import { IsNotEmpty, IsString } from 'class-validator';

export class GetEntriesDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
