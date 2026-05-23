'use client';

import type { Notification } from '../../../types';
import { NotificationsCard } from './NotificationsCard';

interface Props {
  notifications: Notification[];
  loading: boolean;
  onEdit: (notification: Notification) => void;
  onDelete: (id: number) => void;
}

export function NotificationsList({
  notifications,
  loading,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="mb-3 h-4 w-24 rounded bg-gray-200" />
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mb-1 h-3 w-full rounded bg-gray-100" />
            <div className="h-3 w-5/6 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-900">No notifications yet</p>
        <p className="mt-1 text-sm text-gray-500">
          Create your first notification to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notifications.map((notification) => (
        <NotificationsCard
          key={notification.id}
          notification={notification}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
