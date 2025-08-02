import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteEntriesDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
