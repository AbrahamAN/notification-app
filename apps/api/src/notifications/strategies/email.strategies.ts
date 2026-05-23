import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from '../interfaces/ notification-strategy.interface';
import { Notifications } from '../entities/notifications.entity';

@Injectable()
export class EmailStrategy implements NotificationStrategy {
  send(notification: Notifications): void {
    console.log(`Validando destinatario: ${notification.channel}`);
    console.log(
      `Generando template: ${notification.title} - ${notification.content}`,
    );
    console.log(`Email enviado exitosamente`);
  }
}
