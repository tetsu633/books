import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetEntriesDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  year?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  month?: number;

  constructor(userId: string, year?: number, month?: number) {
    this.userId = userId;
    this.year = year;
    this.month = month;
  }
}
