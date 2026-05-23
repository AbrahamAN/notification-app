import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from '../interfaces/ notification-strategy.interface';
import { Notifications } from '../entities/notifications.entity';

@Injectable()
export class PushStrategy implements NotificationStrategy {
  send(notification: Notifications): void {
    console.log(`Validando token del dispositivo...`);
    console.log(
      `Payload: { title: "${notification.title}", body: "${notification.content}" }`,
    );
    console.log(`Push enviado - estado: OK`);
  }
}
