export type NotificationChannel = 'SMS' | 'EMAIL' | 'PUSH';

export interface User {
  id: number;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  channel: NotificationChannel;
  createAt: string;
  updatedAt: string;
}

export type NotificationPayload = Pick<Notification, 'title' | 'content' | 'channel'>;
