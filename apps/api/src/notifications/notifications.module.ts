import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notifications } from './entities/notifications.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notifications])],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
