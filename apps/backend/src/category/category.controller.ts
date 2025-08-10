import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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
      color: createCategoryDto.color,
    });
  }

  @Patch(':id')
  async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto, @Param('id') id: string) {
    return await this.categoryService.updateCategory({
      id: Number(id),
      name: updateCategoryDto.name,
      type: updateCategoryDto.type,
      color: updateCategoryDto.color,
    });
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory({
      id: Number(id),
    });
  }

  @Get()
  async getCategories(@Query('userId') userId: string) {
    return await this.categoryService.getCategories({
      userId,
    });
  }
}
