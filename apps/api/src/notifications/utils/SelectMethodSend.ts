import { NotificationChannel } from '../dto/notifications.dto';
import { EmailStrategy, SmsStrategy, PushStrategy } from '../strategies';

export function SelectMethodSend(channel: NotificationChannel) {
  const strategies = {
    [NotificationChannel.EMAIL]: new EmailStrategy(),
    [NotificationChannel.SMS]: new SmsStrategy(),
    [NotificationChannel.PUSH]: new PushStrategy(),
  };

  return strategies[channel];
}
