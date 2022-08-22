import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    this.announcementService.create(createAnnouncementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.announcementService.remove(id);
  }
}
