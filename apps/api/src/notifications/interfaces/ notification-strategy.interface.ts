import { Notifications } from '../entities/notifications.entity';

export interface NotificationStrategy {
  send(notification: Notifications): void;
}
