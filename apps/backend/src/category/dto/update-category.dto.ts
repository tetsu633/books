import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  color: string;

  constructor(name: string, type: string, color: string) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}
