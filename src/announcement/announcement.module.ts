import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { HistoryModule } from 'src/history/history.module';
import { AnnouncementController } from './announcement.controller';
import { Announcement } from './announcement.entity';
import { AnnouncementService } from './announcement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announcement]),
    CompanyModule,
    HistoryModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
