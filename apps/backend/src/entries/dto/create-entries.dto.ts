import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEntriesDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsString()
  memo: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date; // ISO 8601 形式の日付

  constructor(userId: string, amount: number, date: Date, memo: string, categoryId: number) {
    this.userId = userId;
    this.amount = amount;
    this.date = date;
    this.memo = memo;
    this.categoryId = categoryId;
  }
}
