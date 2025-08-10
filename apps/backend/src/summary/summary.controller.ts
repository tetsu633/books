import { Controller, Get, Query } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { GetMonthlySummaryDto } from './dto/get-summary.dto';

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
}
