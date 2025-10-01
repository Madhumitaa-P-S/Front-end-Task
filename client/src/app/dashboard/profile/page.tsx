'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import Header from '@/components/layout/Header';
import { 
  User, 
  Mail, 
  Calendar, 
  Save, 
  Key, 
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle
} from 'lucide-react';
import { getInitials, formatDate } from '@/utils/format';
import { validateUsername, validateName, validatePassword } from '@/utils/validation';
import toast from 'react-hot-toast';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
}

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    setError: setProfileError,
  } = useForm<ProfileFormData>();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    watch,
    reset: resetPassword,
  } = useForm<ChangePasswordFormData>();

  const newPassword = watch('newPassword');

  const onSubmitProfile = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const response = await apiService.updateProfile(data);
      updateUser(response.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    try {
      await apiService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      resetPassword();
      setShowPasswordForm(false);
      toast.success('Password changed successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to change password';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivateAccount = async () => {
    const password = prompt('Enter your password to deactivate account:');
    if (!password) return;

    if (!confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    try {
      await apiService.deactivateAccount(password);
      toast.success('Account deactivated successfully');
      // The auth context will handle the logout
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to deactivate account';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldBlur = (field: keyof ProfileFormData, value: string) => {
    switch (field) {
      case 'username':
        if (value) {
          const validation = validateUsername(value);
          if (!validation.isValid) {
            setProfileError('username', { message: validation.message });
          }
        }
        break;
      case 'firstName':
        if (value) {
          const validation = validateName(value, 'First name');
          if (!validation.isValid) {
            setProfileError('firstName', { message: validation.message });
          }
        }
        break;
      case 'lastName':
        if (value) {
          const validation = validateName(value, 'Last name');
          if (!validation.isValid) {
            setProfileError('lastName', { message: validation.message });
          }
        }
        break;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <form onSubmit={handleProfileSubmit(onSubmitProfile)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      {...registerProfile('firstName', {
                        required: 'First name is required',
                        value: user.firstName,
                      })}
                      type="text"
                      disabled={!isEditing}
                      onBlur={(e) => handleFieldBlur('firstName', e.target.value)}
                      className={`input ${profileErrors.firstName ? 'input-error' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                    {profileErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{profileErrors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      {...registerProfile('lastName', {
                        required: 'Last name is required',
                        value: user.lastName,
                      })}
                      type="text"
                      disabled={!isEditing}
                      onBlur={(e) => handleFieldBlur('lastName', e.target.value)}
                      className={`input ${profileErrors.lastName ? 'input-error' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                    {profileErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{profileErrors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    {...registerProfile('username', {
                      required: 'Username is required',
                      value: user.username,
                    })}
                    type="text"
                    disabled={!isEditing}
                    onBlur={(e) => handleFieldBlur('username', e.target.value)}
                    className={`input ${profileErrors.username ? 'input-error' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                  {profileErrors.username && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.username.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="input bg-gray-50"
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Password</h2>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                >
                  {showPasswordForm ? 'Cancel' : 'Change Password'}
                </button>
              </div>

              {showPasswordForm ? (
                <form onSubmit={handlePasswordSubmit(onSubmitPassword)} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        {...registerPassword('currentPassword', {
                          required: 'Current password is required',
                        })}
                        type={showCurrentPassword ? 'text' : 'password'}
                        className={`input pr-10 ${passwordErrors.currentPassword ? 'input-error' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        {...registerPassword('newPassword', {
                          required: 'New password is required',
                          validate: (value) => {
                            const validation = validatePassword(value);
                            return validation.isValid || validation.message;
                          },
                        })}
                        type={showNewPassword ? 'text' : 'password'}
                        className={`input pr-10 ${passwordErrors.newPassword ? 'input-error' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        {...registerPassword('confirmPassword', {
                          required: 'Please confirm your new password',
                          validate: (value) => value === newPassword || 'Passwords do not match',
                        })}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`input pr-10 ${passwordErrors.confirmPassword ? 'input-error' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary flex items-center"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-gray-600">
                  <p>Password was last changed on {user.updatedAt ? formatDate(user.updatedAt) : 'Unknown'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Profile Sidebar */}
          <div className="space-y-6">
            {/* Profile Avatar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="mb-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-24 w-24 rounded-full mx-auto"
                  />
                ) : (
                  <div className="h-24 w-24 bg-primary-600 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white text-2xl font-medium">
                      {getInitials(user.firstName, user.lastName)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-600">@{user.username}</p>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    Joined {formatDate(user.createdAt)}
                  </span>
                </div>
                {user.lastLogin && (
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">
                      Last login {formatDate(user.lastLogin)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
              <h3 className="text-lg font-medium text-red-900 mb-4">Danger Zone</h3>
              <div className="space-y-3">
                <button
                  onClick={handleDeactivateAccount}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Deactivate Account
                </button>
                <p className="text-xs text-red-600">
                  This action cannot be undone. You will need to contact support to reactivate your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
