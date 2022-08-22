import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/company.entity';
import { Repository } from 'typeorm';
import { Announcement } from './announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createAnnouncementDto: CreateAnnouncementDto) {
    // 찾은 회사가 없을 경우 Exception 처리하기
    const company = await this.companyRepository.findOneBy({
      cid: createAnnouncementDto.cid,
    });

    const announcement = new Announcement(
      company,
      createAnnouncementDto.position,
      createAnnouncementDto.compensation,
      createAnnouncementDto.content,
      createAnnouncementDto.skill,
    );
    this.announcementRepository.save(announcement);
  }
}
