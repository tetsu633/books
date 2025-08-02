import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateEntriesDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
  date: Date;

  constructor(id: number, amount: number, date: Date, memo: string, categoryId: number) {
    this.id = id;
    this.amount = amount;
    this.date = date;
    this.memo = memo;
    this.categoryId = categoryId;
  }
}
