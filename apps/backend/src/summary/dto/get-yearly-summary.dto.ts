import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetYearlySummaryDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  constructor(userId: string, year: number) {
    this.userId = userId;
    this.year = year;
  }
}
