'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../../lib/api';
import { useAuthStore } from '../../../stores/authStore';

export function useAuth() {
  const { signIn, signOut, user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { access_token, user: newUser } = await api.auth.register({
        email,
        password,
      });
      signIn(access_token, newUser);
      router.push('/auth/dashboard');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { access_token } = await api.auth.login({ email, password });
      const payload = JSON.parse(atob(access_token.split('.')[1])) as {
        sub: number;
        email: string;
      };
      signIn(access_token, { id: payload.sub, email: payload.email });
      router.push('/auth/dashboard');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    signOut();
    router.push('/auth/login');
  };

  return { register, login, logout, loading, error, user, isAuthenticated };
}
