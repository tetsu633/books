import { Controller, Get, Query } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { GetMonthlySummaryDto } from './dto/get-monthly-summary.dto';
import { GetYearlySummaryDto } from './dto/get-yearly-summary.dto';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get('monthly')
  async getMonthlySummary(@Query() getSummaryDto: GetMonthlySummaryDto) {
    return await this.summaryService.getMonthlySummary({
      userId: getSummaryDto.userId,
      year: getSummaryDto.year,
      month: getSummaryDto.month,
    });
  }

  @Get('yearly')
  async getYearlySummary(@Query() getSummaryDto: GetYearlySummaryDto) {
    return await this.summaryService.getYearlySummary({
      userId: getSummaryDto.userId,
      year: getSummaryDto.year,
    });
  }
}
