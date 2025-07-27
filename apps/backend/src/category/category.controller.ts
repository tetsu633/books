import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.createCategory({
      userId: createCategoryDto.userId,
      name: createCategoryDto.name,
      type: createCategoryDto.type,
    });
  }

  @Patch()
  async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.updateCategory({
      id: updateCategoryDto.id,
      name: updateCategoryDto.name,
      type: updateCategoryDto.type,
    });
  }
}
