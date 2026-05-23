import { IsEnum, IsString, MinLength } from 'class-validator';

export enum NotificationChannel {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
}

export class NotificationsDto {
  @IsString()
  @MinLength(3)
  title: string;
  @MinLength(5)
  @IsString()
  content: string;

  @IsEnum(NotificationChannel)
  channel: NotificationChannel;
}
