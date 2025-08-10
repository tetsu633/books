import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetMonthlySummaryDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  month: number;

  constructor(userId: string, year: number, month: number) {
    this.userId = userId;
    this.year = year;
    this.month = month;
  }
}
