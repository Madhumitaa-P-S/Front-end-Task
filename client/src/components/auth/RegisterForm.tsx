'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterFormData } from '@/types';
import { validateEmail, validatePassword, validateUsername, validateName } from '@/utils/validation';
import toast from 'react-hot-toast';

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      const success = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      
      if (success) {
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldBlur = (field: keyof RegisterFormData, value: string) => {
    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) {
          setError('email', { message: 'Please enter a valid email address' });
        }
        break;
      case 'username':
        if (value) {
          const validation = validateUsername(value);
          if (!validation.isValid) {
            setError('username', { message: validation.message });
          }
        }
        break;
      case 'firstName':
        if (value) {
          const validation = validateName(value, 'First name');
          if (!validation.isValid) {
            setError('firstName', { message: validation.message });
          }
        }
        break;
      case 'lastName':
        if (value) {
          const validation = validateName(value, 'Last name');
          if (!validation.isValid) {
            setError('lastName', { message: validation.message });
          }
        }
        break;
      case 'password':
        if (value) {
          const validation = validatePassword(value);
          if (!validation.isValid) {
            setError('password', { message: validation.message });
          }
        }
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <UserPlus className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/auth/login"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                    type="text"
                    autoComplete="given-name"
                    onBlur={(e) => handleFieldBlur('firstName', e.target.value)}
                    className={`input pl-10 ${errors.firstName ? 'input-error' : ''}`}
                    placeholder="First name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                    type="text"
                    autoComplete="family-name"
                    onBlur={(e) => handleFieldBlur('lastName', e.target.value)}
                    className={`input pl-10 ${errors.lastName ? 'input-error' : ''}`}
                    placeholder="Last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('username', {
                    required: 'Username is required',
                  })}
                  type="text"
                  autoComplete="username"
                  onBlur={(e) => handleFieldBlur('username', e.target.value)}
                  className={`input pl-10 ${errors.username ? 'input-error' : ''}`}
                  placeholder="Choose a username"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  type="email"
                  autoComplete="email"
                  onBlur={(e) => handleFieldBlur('email', e.target.value)}
                  className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  onBlur={(e) => handleFieldBlur('password', e.target.value)}
                  className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`input pl-10 pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

