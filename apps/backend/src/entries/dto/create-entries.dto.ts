import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEntriesDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  entryType: 'income' | 'expense';

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @IsString()
  memo: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date; // ISO 8601 形式の日付

  constructor(
    userId: string,
    amount: number,
    date: Date,
    memo: string,
    categoryName: string,
    entryType: 'income' | 'expense'
  ) {
    this.userId = userId;
    this.amount = amount;
    this.date = date;
    this.memo = memo;
    this.categoryName = categoryName;
    this.entryType = entryType;
  }
}
