import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
  imports: [PrismaModule],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
