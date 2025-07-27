import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { GetCategoriesDto } from './dto/get-category.dto';

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

  @Delete()
  async deleteCategory(@Body() deleteCategoryDto: DeleteCategoryDto) {
    return await this.categoryService.deleteCategory({
      id: deleteCategoryDto.id,
    });
  }

  @Get()
  async getCategories(@Body() getCategoriesDto: GetCategoriesDto) {
    return await this.categoryService.getCategories({
      userId: getCategoriesDto.userId,
    });
  }
}
