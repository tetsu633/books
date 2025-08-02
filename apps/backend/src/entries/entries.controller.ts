import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntriesDto } from './dto/create-entries.dto';
import { DeleteEntriesDto } from './dto/delete-entries.dto';
import { GetEntriesDto } from './dto/get-entries.dto';
import { UpdateEntriesDto } from './dto/update-entries.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  async createEntries(@Body() createEntriesDto: CreateEntriesDto) {
    return await this.entriesService.createEntries({
      userId: createEntriesDto.userId,
      amount: createEntriesDto.amount,
      date: createEntriesDto.date,
      memo: createEntriesDto.memo,
      categoryId: createEntriesDto.categoryId,
    });
  }

  @Patch()
  async updateEntries(@Body() updateEntriesDto: UpdateEntriesDto) {
    return await this.entriesService.updateEntries({
      id: updateEntriesDto.id,
      amount: updateEntriesDto.amount,
      date: updateEntriesDto.date,
      memo: updateEntriesDto.memo,
      categoryId: updateEntriesDto.categoryId,
    });
  }

  @Delete()
  async deleteEntries(@Body() deleteEntriesDto: DeleteEntriesDto) {
    return await this.entriesService.deleteEntries({
      id: deleteEntriesDto.id,
    });
  }

  @Get()
  async getEntries(@Body() getEntriesDto: GetEntriesDto) {
    return await this.entriesService.getEntries({
      userId: getEntriesDto.userId,
    });
  }
}
