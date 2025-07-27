import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
