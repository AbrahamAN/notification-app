import { Injectable, NotFoundException } from '@nestjs/common';
import { Notifications } from './entities/notifications.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsDto } from './dto/notifications.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { SelectMethodSend } from './utils/SelectMethodSend';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private notificationsRepository: Repository<Notifications>,
  ) {}

  async createNotification(data: NotificationsDto, userId: number) {
    const notification = this.notificationsRepository.create({
      ...data,
      user: { id: userId },
    });

    const save = await this.notificationsRepository.save(notification);

    const strategy = SelectMethodSend(notification.channel);

    strategy.send(notification);

    return save;
  }

  findAll(userId: number) {
    return this.notificationsRepository.find({
      where: { user: { id: userId } },
    });
  }

  async update(id: number, data: UpdateNotificationDto) {
    await this.notificationsRepository.update(id, data);
    return this.notificationsRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const notification = await this.notificationsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!notification) {
      throw new NotFoundException('notification not found');
    }

    await this.notificationsRepository.remove(notification);
  }
}
