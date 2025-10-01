import Cookies from 'js-cookie';
import { apiService } from '@/services/api';

export const setAuthToken = (token: string) => {
  Cookies.set('auth_token', token, { 
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get('auth_token');
};

export const removeAuthToken = () => {
  Cookies.remove('auth_token');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const logout = async () => {
  try {
    await apiService.logout();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    removeAuthToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }
};

