import type { Notification, NotificationPayload, User } from '../types';
import { useAuthStore } from '../stores/authStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (res.status === 401) {
    useAuthStore.getState().signOut();
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? 'Request failed');
  }

  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

export const api = {
  auth: {
    register: (data: { email: string; password: string }) =>
      request<{ access_token: string; user: User }>('/Auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    login: (data: { email: string; password: string }) =>
      request<{ access_token: string }>('/Auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  notifications: {
    list: () => request<Notification[]>('/notifications'),
    create: (data: NotificationPayload) =>
      request<Notification>('/notifications', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number, data: Partial<NotificationPayload>) =>
      request<Notification>(`/notifications/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    remove: (id: number) =>
      request<void>(`/notifications/${id}`, { method: 'DELETE' }),
  },
};
