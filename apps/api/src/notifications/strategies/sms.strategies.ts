import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from '../interfaces/ notification-strategy.interface';
import { Notifications } from '../entities/notifications.entity';
@Injectable()
export class SmsStrategy implements NotificationStrategy {
  send(notification: Notifications): void {
    const content = notification.content.slice(0, 160);
    console.log(`Contenido limitado a 160 chars: ${content}`);
    console.log(`SMS enviado al número registrado`);
    console.log(`Fecha de envío: ${new Date().toISOString()}`);
  }
}
