import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HistoryModule } from './history/history.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { CompanyModule } from './company/company.module';
import { Announcement } from './announcement/announcement.entity';
import { Company } from './company/company.entity';
import { User } from './user/user.entity';
import { History } from './history/history.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [Announcement, Company, User, History],
      synchronize: process.env.MODE === 'dev' ? true : false,
    }),
    UserModule,
    AnnouncementModule,
    CompanyModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
