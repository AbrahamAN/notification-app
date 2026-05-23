import { PartialType } from '@nestjs/mapped-types';
import { NotificationsDto } from './notifications.dto';

export class UpdateNotificationDto extends PartialType(NotificationsDto) {}
