import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { AuthResponse, ApiError, User, Task, TasksResponse, TaskStats } from '@/types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = Cookies.get('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          Cookies.remove('auth_token');
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> {
    const response = await this.api.post('/auth/register', data);
    return response.data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.api.post('/auth/login', { email, password });
    return response.data;
  }

  async getCurrentUser(): Promise<{ user: User }> {
    const response = await this.api.get('/auth/me');
    return response.data;
  }

  async logout(): Promise<{ message: string }> {
    const response = await this.api.post('/auth/logout');
    return response.data;
  }

  // User endpoints
  async getProfile(): Promise<{ user: User }> {
    const response = await this.api.get('/users/profile');
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<{ message: string; user: User }> {
    const response = await this.api.put('/users/profile', data);
    return response.data;
  }

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> {
    const response = await this.api.put('/users/change-password', data);
    return response.data;
  }

  async deactivateAccount(password: string): Promise<{ message: string }> {
    const response = await this.api.delete('/users/account', {
      data: { password }
    });
    return response.data;
  }

  // Task endpoints
  async getTasks(params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    search?: string;
  }): Promise<TasksResponse> {
    const response = await this.api.get('/tasks', { params });
    return response.data;
  }

  async getTask(id: string): Promise<{ task: Task }> {
    const response = await this.api.get(`/tasks/${id}`);
    return response.data;
  }

  async createTask(data: {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
    tags?: string[];
  }): Promise<{ message: string; task: Task }> {
    const response = await this.api.post('/tasks', data);
    return response.data;
  }

  async updateTask(id: string, data: Partial<Task>): Promise<{ message: string; task: Task }> {
    const response = await this.api.put(`/tasks/${id}`, data);
    return response.data;
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    const response = await this.api.delete(`/tasks/${id}`);
    return response.data;
  }

  async getTaskStats(): Promise<{ stats: TaskStats }> {
    const response = await this.api.get('/tasks/stats/summary');
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; environment: string }> {
    const response = await this.api.get('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;

