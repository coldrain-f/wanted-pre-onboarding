import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { DetailAnnouncementDto } from './dto/detail-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    this.announcementService.create(createAnnouncementDto);
  }

  @Patch(':id')
  modify(
    @Param('id') id: number,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    this.announcementService.modify(id, updateAnnouncementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.announcementService.remove(id);
  }

  @Get()
  async findAll() {
    const annList = await this.announcementService.findAll();
    return annList.map(
      (ann) =>
        new DetailAnnouncementDto(
          ann.aid,
          ann.company.name,
          ann.company.country,
          ann.company.region,
          ann.position,
          ann.compensation,
          ann.skill,
        ),
    );
  }
}
