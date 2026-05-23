'use client';

import type { Notification, NotificationChannel } from '../../../types';

const CHANNEL_STYLES: Record<NotificationChannel, string> = {
  EMAIL: 'bg-blue-100 text-blue-700',
  SMS: 'bg-green-100 text-green-700',
  PUSH: 'bg-orange-100 text-orange-700',
};

interface Props {
  notification: Notification;
  onEdit: (notification: Notification) => void;
  onDelete: (id: number) => void;
}

export function NotificationsCard({ notification, onEdit, onDelete }: Props) {
  const date = new Date(notification.createAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${CHANNEL_STYLES[notification.channel]}`}
            >
              {notification.channel}
            </span>
            <span className="text-xs text-gray-400">{date}</span>
          </div>
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {notification.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {notification.content}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onEdit(notification)}
            aria-label="Edit"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 13.5l6.75-6.75a2.121 2.121 0 013 3L12 16.5H9v-3z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(notification.id)}
            aria-label="Delete"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
