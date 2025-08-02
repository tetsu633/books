import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { EntriesModule } from '../entries/entries.module';

@Module({
  imports: [AuthModule, CategoryModule, EntriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
