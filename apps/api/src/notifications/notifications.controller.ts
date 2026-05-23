import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationsService } from './notifications.service';
import { NotificationsDto } from './dto/notifications.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationService: NotificationsService) {}

  @Post()
  create(
    @Body() body: NotificationsDto,
    @Req() req: { user: { userId: number } },
  ) {
    return this.notificationService.createNotification(body, req.user.userId);
  }

  @Get()
  findAll(@Req() req: { user: { userId: number } }) {
    return this.notificationService.findAll(req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateNotificationDto) {
    return this.notificationService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.notificationService.remove(+id);
  }
}
