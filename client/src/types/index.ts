export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  tags: string[];
  user: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  highPriority: number;
  urgentPriority: number;
}

export interface Pagination {
  current: number;
  pages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: Pagination;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  tags?: string[];
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface TaskFilters {
  status?: string;
  priority?: string;
  search?: string;
  page?: number;
  limit?: number;
}

