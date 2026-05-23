'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { Notification, NotificationPayload } from '../../../types';

const QUERY_KEY = ['notifications'];

export function useNotifications() {
  const qc = useQueryClient();

  const { data: notifications = [], isLoading: loading, error } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: api.notifications.list,
  });

  const createMutation = useMutation({
    mutationFn: api.notifications.create,
    onSuccess: (notification) => {
      qc.setQueryData<Notification[]>(QUERY_KEY, (prev = []) => [
        notification,
        ...prev,
      ]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<NotificationPayload> }) =>
      api.notifications.update(id, data),
    onSuccess: (updated) => {
      qc.setQueryData<Notification[]>(QUERY_KEY, (prev = []) =>
        prev.map((n) => (n.id === updated.id ? updated : n)),
      );
    },
  });

  const removeMutation = useMutation({
    mutationFn: api.notifications.remove,
    onSuccess: (_, id) => {
      qc.setQueryData<Notification[]>(QUERY_KEY, (prev = []) =>
        prev.filter((n) => n.id !== id),
      );
    },
  });

  return {
    notifications,
    loading,
    error: error instanceof Error ? error.message : null,
    create: createMutation.mutateAsync,
    update: (id: number, data: Partial<NotificationPayload>) =>
      updateMutation.mutateAsync({ id, data }),
    remove: removeMutation.mutateAsync,
    refetch: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  };
}
