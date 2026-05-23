'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/authStore';
import { useNotifications } from '../../features/notifications/hooks/useNotifications';
import { NotificationsList } from '../../features/notifications/components/NotificationsList';
import { NotificationsForm } from '../../features/notifications/components/NotificationsForm';
import { DeleteConfirmModal } from '../../features/notifications/components/DeleteConfirmModal';
import type { Notification, NotificationPayload } from '../../types';

export default function DashboardPage() {
  const { user, signOut, isAuthenticated, hasHydrated } = useAuthStore();
  const { notifications, loading, error, create, update, remove } =
    useNotifications();
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Notification | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated) return null;

  const handleEdit = (notification: Notification) => {
    setEditTarget(notification);
    setShowForm(true);
  };

  const handleDelete = (id: number) => setDeleteTargetId(id);

  const handleConfirmDelete = () => {
    if (deleteTargetId !== null) void remove(deleteTargetId);
    setDeleteTargetId(null);
  };

  const handleFormSubmit = async (data: NotificationPayload) => {
    if (editTarget) {
      await update(editTarget.id, data);
    } else {
      await create(data);
    }
    setShowForm(false);
    setEditTarget(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditTarget(null);
  };

  const handleLogout = () => {
    signOut();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <span className="font-semibold text-gray-900">NotifyApp</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-500 sm:block">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Your Notifications
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              {notifications.length}{' '}
              {notifications.length === 1 ? 'notification' : 'notifications'}
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Notification
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <NotificationsList
          notifications={notifications}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {showForm && (
        <NotificationsForm
          key={editTarget?.id ?? 'new'}
          initial={editTarget}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}

      {deleteTargetId !== null && (
        <DeleteConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}
    </div>
  );
}
