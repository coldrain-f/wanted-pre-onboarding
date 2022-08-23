import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/company.entity';
import { Repository } from 'typeorm';
import { Announcement } from './announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

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

  async remove(id: number) {
    this.announcementRepository.delete({ aid: id });
  }

  async modify(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    const announcement = await this.announcementRepository.findOneBy({
      aid: id,
    });

    // 뭐가 좀 아닌 것 같은데... 방법을 변경 할 필요성이 있음.
    this.announcementRepository.update(
      { aid: id },
      {
        position:
          updateAnnouncementDto.position === undefined
            ? announcement.position
            : updateAnnouncementDto.position,
        compensation:
          updateAnnouncementDto.compensation === undefined
            ? announcement.compensation
            : updateAnnouncementDto.compensation,
        content:
          updateAnnouncementDto.content === undefined
            ? announcement.content
            : updateAnnouncementDto.content,
        skill:
          updateAnnouncementDto.skill === undefined
            ? announcement.skill
            : updateAnnouncementDto.skill,
      },
    );
  }

  findAll() {
    return this.announcementRepository.find({ relations: ['company'] });
  }

  async findById(id: number) {
    const ann = await this.announcementRepository.findOne({
      where: { aid: id },
      relations: ['company'],
    });

    const annList = await this.announcementRepository.findBy({
      company: ann.company,
    });

    const aidList: number[] = annList
      .map((an) => an.aid)
      .filter((aid) => aid !== ann.aid);

    // ListDetailDTO와 DetailDTO를 분리해서 응답하도록 하면 좋을 것 같다.
    return {
      aid: ann.aid,
      companyName: ann.company.name,
      country: ann.company.country,
      region: ann.company.region,
      position: ann.position,
      compensation: ann.compensation,
      skill: ann.skill,
      content: ann.content,
      diffAnnouncements: aidList,
    };
  }
}
